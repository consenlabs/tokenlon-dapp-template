import Axios from 'axios'
import { isTestnet } from '@/utils/sdk'
import { isDev, isStaging } from '@/utils/is'
import { requestHost } from './tokenlon'

export function get(url, params = {}, headers?: any) {
  return Axios({
    method: 'get',
    url: url,
    params,
    headers: headers || {},
  }).then((res) => {
    if (res.data) {
      return res.data
    } else {
      throw new Error(`null response ${url} ${JSON.stringify(params)}`)
    }
  })
}

export function rpc(url, method, params) {
  const data = {
    jsonrpc: '2.0',
    id: 1,
    method,
    params,
  }
  const headers = { 'X-LOCALE': 'zh-cn' }
  return Axios({ method: 'post', url, headers: headers, data }).then((res) => {
    if (res.data) {
      return res.data.result
    } else {
      throw new Error(`null response ${url} ${JSON.stringify(params)}`)
    }
  })
}

export function getBizUrl() {
  const isStaging = window.location.host.indexOf('.staging.') !== -1
  return isTestnet()
    ? 'https://biz.dev.tokenlon.im/rpc'
    : isStaging
    ? 'https://biz.staging.tokenlon.im/rpc'
    : 'https://mainnet-bizapi.tokenlon.im/rpc'
}
export const getRequestHost = () => {
  return isDev()
    ? requestHost.dev
    : isStaging()
    ? requestHost.staging
    : requestHost.mainnet
}
export const getSupportTokensAsync = async (): Promise<any> => {
  const configs = await rpc(getRequestHost().otc, 'otc.getConfigs', {})
  return configs.tokens
}
export default {}
