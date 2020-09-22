import {
  autorun,
  reaction,
  when,
  IReactionDisposer,
  IReactionPublic,
  IAutorunOptions,
  IReactionOptions,
  Lambda,
  IWhenOptions,
} from 'mobx'

type PromiseCancel = Promise<void> & {
  cancel(): void
}

function isPromiseCancel(
  result: IReactionDisposer | PromiseCancel
): result is PromiseCancel {
  if (result instanceof Promise && typeof result.cancel === 'function') {
    return true
  }

  return false
}

function isLambda(effectOrOpts: Lambda | IWhenOptions): effectOrOpts is Lambda {
  if (typeof effectOrOpts === 'function') {
    return true
  }
  return false
}
abstract class StoreViewModel<P = {}> {
  props: P

  private _reactionDisposers: (
    | IReactionDisposer
    | PromiseCancel['cancel']
  )[] = []

  constructor(props: P) {
    this.props = props
  }

  protected autorun(view: (r: IReactionPublic) => any, opts?: IAutorunOptions) {
    const disposer = autorun(view, opts)
    this._reactionDisposers.push(disposer)
    return disposer
  }

  protected reaction<T>(
    expression: (r: IReactionPublic) => T,
    effect: (arg: T, r: IReactionPublic) => void,
    opts?: IReactionOptions
  ) {
    const disposer = reaction(expression, effect, opts)
    this._reactionDisposers.push(disposer)
    return disposer
  }

  protected when(predicate: () => boolean, opts?: IWhenOptions): PromiseCancel

  protected when(
    predicate: () => boolean,
    effect: Lambda,
    opts?: IWhenOptions
  ): IReactionDisposer

  protected when(
    predicate: () => boolean,
    effectOrOpts?: Lambda | IWhenOptions,
    opts?: IWhenOptions
  ) {
    let res: IReactionDisposer | PromiseCancel
    if (effectOrOpts && isLambda(effectOrOpts)) {
      res = when(predicate, effectOrOpts, opts)
    } else {
      res = when(predicate, effectOrOpts)
    }
    const disposer = isPromiseCancel(res) ? res.cancel : res

    this._reactionDisposers.push(disposer)

    return res
  }

  dispose() {
    this._reactionDisposers.forEach((disposer) => disposer())
  }
}

export default StoreViewModel
