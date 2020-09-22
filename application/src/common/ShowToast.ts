import { compareSemver } from '../utils/is'

export enum TOAST_TYPE {
  INFO = 'info',
  WARNNING = 'warning',
  SUCCESS = 'success',
  LOADING = 'loading',
}

interface ToastParams {
  type?: TOAST_TYPE
  algin?: string
  message: string
  model?: 'banner' | 'alert'
}
const showToast = (params: ToastParams) => {
  const version = (window['imTokenAgent'] || '').split(':')[1]
  if (window.imToken.callAPI && version) {
    if (compareSemver(version, '2.6.0') >= 0) {
      window.imToken.callAPI('native.toast', params)
    } else {
      window.imToken.callAPI('native.toastInfo', params.message)
    }
  }
}
export { showToast }
