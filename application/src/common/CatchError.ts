import { showToast, TOAST_TYPE } from './ShowToast'

type StrategyProps = {
  type: TOAST_TYPE
  message?: string
}

function handleError(options: StrategyProps) {
  showToast({
    message: options.message,
    type: options.type,
  })
}

function wrapHandleError(originalMethod: Function, options: StrategyProps) {
  return function (this: Function, ...args: any[]) {
    try {
      const result = originalMethod.apply(this, args)

      // if method is asynchronous
      if (result instanceof Promise) {
        return result.catch((error: any) => {
          return handleError(options)
        })
      }
      return result
    } catch (error) {
      return handleError(options)
    }
  }
}

function decorate(options: StrategyProps): any {
  return function (target: any, propertyName: string, descriptor?: any) {
    // bound instance methods
    if (!descriptor) {
      Object.defineProperty(target, propertyName, {
        configurable: true,
        enumerable: false,
        get() {
          return undefined
        },
        set(oridinalMethod) {
          Object.defineProperty(this, propertyName, {
            enumerable: false,
            writable: true,
            configurable: true,
            value: wrapHandleError(oridinalMethod, options).bind(this),
          })
        },
      })
      return
    }

    if (descriptor.initializer) {
      return {
        enumerable: false,
        configurable: true,
        writable: true,
        initializer() {
          // N.B: we can't immediately invoke initializer; this would be wrong
          return wrapHandleError(descriptor.initializer!.call(this), options)
        },
      }
    }

    if (descriptor.value) {
      const oridinalMethod = descriptor.value
      return {
        value: wrapHandleError(oridinalMethod, options),
        enumerable: false,
        configurable: true,
      }
    }

    return descriptor
  }
}

function catchError(options: StrategyProps) {
  return decorate(options)
}

export { catchError, TOAST_TYPE }
