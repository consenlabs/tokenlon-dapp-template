import { isDev } from '@/utils/is'

export function getRequestHost() {
  const host = {
    ETHEREUM: isDev()
      ? 'https://kovan.infura.io/v3/bf419bb938be4ce18c712080e90c2a26'
      : 'https://mainnet-eth.token.im',
    BITCOIN: 'https://api.tokenlon.im/v1/bitcoin',
    IMBTC_API: 'https://api.tokenlon.im/v1/gto-imbtc',
    MARKET_API: 'https://mainnet-dexapi.token.im/rpc',
    TOKENLON_API: 'https://tokenlon-core-market.tokenlon.im/rpc',
  }
  return host
}
