import React, { Component } from 'react'
import './App.scss'
import t from '@/utils/i18n'
import { Home } from '@/containers/Home'
import OpenApp from 'open-app'
import { TRADE_TYPE } from './types'
import sensors from 'sa-sdk-javascript'
import { track } from '@/utils/logger'
import { queryUrlSearchParams } from '@/utils/url'

sensors.init({
  server_url:
    'https://imtoken.datasink.sensorsdata.cn/sa?project=production&token=27d69b3e7fd25949',
})
class App extends Component {
  state = {
    side: 'buy',
  }
  constructor(props: any) {
    super(props)
    const side = queryUrlSearchParams('side')
    if (side && side.toLowerCase() === 'sell') {
      this.setState({
        side,
      })
    }
  }

  componentDidMount() {
    new OpenApp()
  }
  handleBuyTabClick = () => {
    this.setState({
      side: 'buy',
    })
    track('otc_aggregator_buy$click')
  }
  handleSellTabClick = () => {
    this.setState({
      side: 'sell',
    })
    track('otc_aggregator_sell$click')
  }

  renderTabs() {
    const { side } = this.state
    return (
      <ul className="trade-tab">
        <li
          className={`buy-tab ${side === 'buy' ? 'active' : ''}`}
          onClick={this.handleBuyTabClick}
        >
          {t('buy')}
        </li>
        <li
          className={`sell-tab ${side === 'sell' ? 'active' : ''}`}
          onClick={this.handleSellTabClick}
        >
          {t('sell')}
        </li>
      </ul>
    )
  }
  render() {
    const { side } = this.state
    return (
      <>
        {this.renderTabs()}
        {side === 'buy' && <Home type={TRADE_TYPE.BUY} />}
        {side === 'sell' && <Home type={TRADE_TYPE.SELL} />}
      </>
    )
  }
}

export default App
