import { toBN } from './format'
import Web3 from 'web3'
import BN from 'bignumber.js'

const web3 = new Web3((window as any).ethereum)

export const HEX_OF_BALANCE_OF = '70a08231'
export const HEX_OF_GET_ALLOWANCE = 'dd62ed3e'

export const padLeft = (n: string, width: number, z?: string): string => {
  const nz = z || '0'
  const nn = '' + n
  return nn.length >= width ? nn : new Array(width - nn.length + 1).join(nz) + nn
}

export function isHexPrefixed(str) {
  return str.slice(0, 2) === '0x'
}

export function addHexPrefix(str: string) {
  if (typeof str !== 'string') {
    return str
  }
  return isHexPrefixed(str) ? str : `0x${str}`
}

export function stripHexPrefix(str: string) {
  if (typeof str !== 'string') {
    return str
  }
  return isHexPrefixed(str) ? str.slice(2) : str
}

export function fromDecimalToUnit(balance: string | number | BN, decimal: number): BN {
  return toBN(balance).div(Math.pow(10, decimal))
}

export function fromUnitToDecimalBN(balance: string | number, decimal: number) {
  const amountBN = toBN(balance || 0)
  const decimalBN = toBN(10).pow(decimal)
  return amountBN.times(decimalBN)
}

export function fromUnitToDecimal(balance: string | number, decimal: number, base: number): string {
  return fromUnitToDecimalBN(balance, decimal).toString(base)
}

export function getEtherBalance(walletAddress: string) {
  return new Promise((resolve, reject) => {
    console.log(`[web3 req] call params: ${walletAddress}`)
    const method = web3.eth.getBalance.bind(web3.eth)
    return method(walletAddress, (err, balanceBN) => {
      if (!err) {
        const balance = balanceBN.toString()
        resolve(balance)
      } else {
        console.warn(err)
        reject(err)
      }
    })
  })
}

export function getTokenBalance(walletAddress: string, contractAddress: string): Promise<string> {
  return new Promise((resolve, reject) => {
    const data = `0x${HEX_OF_BALANCE_OF}${padLeft(stripHexPrefix(walletAddress), 64)}`
    const params = { to: contractAddress, data }
    console.log(`[web3 req] call params: ${JSON.stringify(params)}`)
    const method = web3.eth.call.bind(web3.eth)
    return method(params, (err, value) => {
      if (!err) {
        const balance = value === '0x' ? '0' : toBN(value).toString()
        resolve(balance)
      } else {
        console.warn(err)
        reject(err)
      }
    })
  })
}

export function getNonce(address: string): Promise<number> {
  return new Promise((resolve, reject) => {
    web3.eth.getTransactionCount(address, (err, nonce) => {
      if (!err) {
        resolve(nonce)
      } else {
        reject(err)
      }
    })
  })
}

export function getGasPrice(): Promise<string> {
  return new Promise((resolve, reject) => {
    web3.eth.getGasPrice((err, gasPriceBN) => {
      if (!err) {
        console.log(`[web3 res] getGasPrice to string: ${gasPriceBN.toString()}`)
        resolve(gasPriceBN)
      } else {
        reject(err)
      }
    })
  })
}

export function getEstimateGas(tx: { value: string, from: string, to: string, data: string }): Promise<number> {
  return new Promise((resolve, reject) => {
    console.log(`[web3 req] estimateGas params: ${JSON.stringify(tx)}`)
    web3.eth.estimateGas(tx, (err, gas) => {
      if (!err) {
        resolve(gas)
      } else {
        reject(err)
      }
    })
  })
}

type getTokenAllowanceParams = {
  walletAddress: string,
  contractAddress: string,
  spenderAddress: string
}

export function getTokenAllowance(params: getTokenAllowanceParams): Promise<string> {
  const { walletAddress, contractAddress, spenderAddress } = params
  return new Promise((resolve, reject) => {
    const data = `0x${HEX_OF_GET_ALLOWANCE}${padLeft(stripHexPrefix(walletAddress), 64)}${padLeft(stripHexPrefix(spenderAddress), 64)}`
    const params = { to: contractAddress, data }
    console.log(`[web3 req] call params: ${JSON.stringify(params)}`)
    const method = web3.eth.call.bind(web3.eth)
    return method(params, (err, value) => {
      if (!err) {
        const allowance = value === '0x' ? '0' : toBN(value).toString(10)
        resolve(allowance)
      } else {
        console.warn(err)
        reject(err)
      }
    })
  })
}
