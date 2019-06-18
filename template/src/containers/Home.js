import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'

import { Button } from 'antd'

import productsDucks from 'reducers/products'
import Header from 'components/Common/Header'

class Home extends Component {
  render() {
    const {
      products: {
        items
      }
    } = this.props

    return (
      <Fragment>
        <Header>
          <h1>Products List</h1>
        </Header>
        <Button onClick={this._handleClickGetProducts}>Get Products</Button>
        <ul>
          {
            items.map(({ id, name }) => (
              <li key={id}>{name}</li>
            ))
          }
        </ul>
      </Fragment>
    )
  }

  _handleClickGetProducts = () => {
    this.props.getProducts()
  }
}

export default connect(
  ({ products }) => ({
    products
  }),{
    getProducts: productsDucks.creators.getProducts
  }
)(Home)

