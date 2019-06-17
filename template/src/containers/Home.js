import React, { Component, Fragment } from 'react'

import { Button } from 'antd'

import productsDucks from 'reducers/products'

class Home extends Component {
  render() {
    const {
      products: {
        items
      }
    } = this.props

    return (
      <Fragment>
        <h1>Products List</h1>
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

