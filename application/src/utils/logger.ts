import sensors from 'sa-sdk-javascript'
import { isDev } from '@/utils/is'

const getAgent = () => (window as any).imToken && (window as any).imToken.agent
const getDeviceToken = () =>
  (window as any).imToken && (window as any).imToken.deviceToken
const isStaging = window.location.host.indexOf('.staging.') !== -1
const isProd = window.location.host.indexOf('small-dapps.token.im') === 0

const logger = ((): { track: Function } => {
  if (
    (window as any).mixpanel &&
    (isStaging || isProd) &&
    (window as any).imToken
  ) {
    return {
      track: (event, options) => {
        let opt = options || {}
        const agent = getAgent()
        if (agent) {
          const matchs = agent.split(':')
          opt = { ...opt, version: matchs[1], deviceToken: getDeviceToken() }
        }
        ;(window as any).mixpanel.track(
          isStaging ? 'staging_' + event : event,
          opt
        )
      },
    }
  }

  return {
    track: (event, options) => console.warn('track', event, options),
  }
})()

export function track(event, options = {}) {
  const agent = getAgent()

  let extraInfo = { version: '', device_id: '', dapp_distinct_id: '' }
  const win = window as any
  if (agent && win.imToken) {
    const matchs = agent.split(':')
    extraInfo = {
      version: matchs[1],
      device_id: win.imToken.deviceToken,
      dapp_distinct_id: win.imToken.distinctId,
    }
    sensors.identify(win.imToken.distinctId, true)
    sensors.track(event, { ...options, ...extraInfo })
  }
}
export const trackTokenlonWeb = (event, options = {}) => {
  if (isDev()) {
    console.log('sensors log: ', event, options)
  } else {
    track(event, {
      ...options,
      is_tokenlon_web: true,
    })
  }
}

export default logger
