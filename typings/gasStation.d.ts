
type __token = {
  id: string, // walletId + tokenAddress
  address: string,
  walletAddress: string,
  balance: string,
  symbol: string,
  decimal: number,
}

type __suggestToken = {
  address: string,
  symbol: string,
  decimal: number,
  options: number[],
}
