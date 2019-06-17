import React from 'react'
import { createGlobalStyle } from 'styled-components'

import store, { history } from './store/configureStore'
import createRoutes from './routes'
import Root from './containers/Root'

if(process.env.NODE_ENV === 'test') {
  const { whyDidYouUpdate } = require('why-did-you-update')
  whyDidYouUpdate(React)
}

const routes = createRoutes(history)

const GlobalStyle = createGlobalStyle({
  body: {
    backgroundColor: 'rgb(239, 239, 239) !important'
  }
})

export default () => <Root store={store}><GlobalStyle />{routes}</Root>
