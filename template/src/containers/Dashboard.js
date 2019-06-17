import React, { Component, Fragment } from 'react'

class Dashboard extends Component {
  render() {
    return (
      <Fragment>
        {this.props.children}
      </Fragment>
    )
  }
}

export default Dashboard
