import numeral from 'numeral'
import BN from 'bignumber.js'

BN.config({
  EXPONENTIAL_AT: 1000,
})

export const isBigNumber = BN.isBigNumber

export const ellipsis = (str: string, lead: number = 12, tail: number = 6): string => {
  if (str && str.length > lead + tail + 8) {
    return `${str.substring(0, lead)}...${str.substring(str.length - tail, str.length)}`
  }
  return str
}

export const toBN = (x): BN => {
  if (isNaN(Number(x))) return new BN(0)
  if (x instanceof BN) return x

  if (typeof x === 'string') {
    if (x.indexOf('0x') === 0 || x.indexOf('-0x') === 0) {
      return new BN((x).replace('0x', ''), 16)
    }
  }
  return new BN(x)
}

/**
 * used for render balance in jsx
 * the decimals length depend on the value
 * if value < 1, at least keep the non-zero and following four places
 * if integer, keep interger
 * if otherwise, keep ${decimalLength} places decimals
 */
export const formatSmartBalance = (num: number | string, defaultDecimalLength: number = 4, maxDecimalLength: number = 6) => {
  const valueBN = toBN(num)
  const valueString = valueBN.toFixed()

  if (valueBN.eq(valueBN.toFixed(0))) {
    return thousandCommas(valueString, 0)
  }

  if (valueBN.lt(1)) {
    for (let i = 2; i < valueString.length; i++) {
      if (i >= 2 + maxDecimalLength) return '0'  // if 0.000000* return 0
      if (valueString[i] !== '0') {
        let max = Math.min(maxDecimalLength, i + defaultDecimalLength) // display 0. + maxDecimalLength zero at most.
        return valueBN.toFixed(Math.max(max, defaultDecimalLength)).replace(/[0]+$/, '')
      }
    }
  }

  return thousandCommas(valueBN.toFixed(defaultDecimalLength), defaultDecimalLength)
}

export const thousandCommas = (num: string | number, place: number = 4) => {
  const decimals = '0'.repeat(place)
  return numeral(num).format(`0,0.[${decimals}]`)
}

export const fPercent = (p: number, fixed = 3) => {
  return !isNaN(Number(p)) ? `${(p * 100).toFixed(fixed)}%` : '~'
}

// YYYY/MM/DD hh:mm
export const formatDate = (timestamp: number) => {
  const date = new Date(timestamp)
  const y = date.getFullYear()
  let mm = `${date.getMonth() + 1}`
  mm = +mm < 10 ? `0${mm}` : mm
  let d = `${date.getDate()}`
  d = +d < 10 ? `0${d}` : d
  let h = `${date.getHours()}`
  h = +h < 10 ? `0${h}` : h
  let m = `${date.getMinutes()}`
  m = +m < 10 ? `0${m}` : m
  return `${y}/${mm}/${d} ${h}:${m}`
}
