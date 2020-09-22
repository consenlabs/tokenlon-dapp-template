type __getOrderParams = {
  base: string
  quote: string
  side: 'BUY' | 'SELL'
  amount: number
  userAddr: string
}

type __tokenlonConfig = {
  networkId: number,
  erc20ProxyContractAddress: string
  exchangeContractAddress: string
  forwarderContractAddress: string
  zrxContractAddress: string
  tokenlonExchangeContractAddress: string
  wethContractAddress: string
  userProxyContractAddress: string
}

type __tokenlonToken = {
  symbol: string
  contractAddress: string
  decimal: number
  logo?: string
}

type __allowance = {
  enough: boolean
}

type __tokenlonMakerOrderBNToString = {
  makerAddress: string
  makerAssetAmount: string
  makerAssetData: string
  makerFee: string
  takerAddress: string
  takerAssetAmount: string
  takerAssetData: string
  takerFee: string
  senderAddress: string
  feeRecipientAddress: string
  expirationTimeSeconds: string
  exchangeAddress: string
  salt: string
  makerWalletSignature: string
  quoteId: string
  feeFactor: number
}

type __getOderParams = {
  base: string
  quote: string
  side: 'BUY' | 'SELL'
  amount: number
  userAddr: string
}

type __placeOrderParams = {
  userAddr: string
  order: any
}

type __getOrderStateParams = {
  executeTxHash: string
}

type __allowancePendingSelector = {
  timestamp: number
  txHash: string
}
