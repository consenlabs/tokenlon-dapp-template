import React, { useEffect } from 'react'
import t from '@/utils/i18n'
import { setTitle } from '@/utils/sdk'
import './index.scss'
import { track } from '@/utils/logger'

export const Home = () => {
  useEffect(() => {
    setTitle(t('currencyTrade'))
    track('otc_aggregator')
    document.body.style.backgroundColor = '#fff'
    if (window['imToken']['callAPI']) {
      window['imToken'].callAPI('navigator.configure', {
        navigatorColor: '#098DE6',
      })
    }
  }, [])
  return <div className='main-container'>tokenlon dapp</div>
}
