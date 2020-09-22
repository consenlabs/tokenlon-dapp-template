const requestHost = {
  dev: {
    auth: 'https://mainnet-auth.dev.token.im/rpc',
    tokenlonMarket: 'https://tokenlon-market.dev.tokenlon.im/rpc',
    tokenlonExchange: 'https://exchange.dev.tokenlon.im/rpc',
    tokenlonPublisher: 'https://publisher.dev.tokenlon.im/rpc',
    otc: 'https://api.dev.tokenlon.im/v1/otc',
  },
  staging: {
    auth: 'https://mainnet-auth.staging.token.im/rpc',
    tokenlonMarket: 'https://tokenlon-market.staging.tokenlon.im/rpc',
    tokenlonExchange: 'https://exchange.staging.tokenlon.im/rpc',
    tokenlonPublisher: 'https://publisher.staging.tokenlon.im/rpc',
    otc: 'https://api.staging.tokenlon.im/v1/otc',
  },
  mainnet: {
    auth: 'https://mainnet-auth.token.im/rpc',
    tokenlonMarket: 'https://tokenlon-market.tokenlon.im/rpc',
    tokenlonExchange: 'https://exchange.tokenlon.im/rpc',
    tokenlonPublisher: 'https://publisher.tokenlon.im/rpc',
    otc: 'https://api.tokenlon.im/v1/otc',
  },
}
export { requestHost }
