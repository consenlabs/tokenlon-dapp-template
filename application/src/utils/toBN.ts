import BN from 'bignumber.js'

export const toBN = (x): BN => {
  if (isNaN(Number(x))) return new BN(0)
  if (x instanceof BN) return x

  if (typeof x === 'string') {
    if (x.indexOf('0x') === 0 || x.indexOf('-0x') === 0) {
      return new BN(x.replace('0x', ''), 16)
    }
  }
  return new BN(x)
}
