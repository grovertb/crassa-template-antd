import React, { Component, Fragment } from 'react'

class Dashboard extends Component {
  render() {
    return (
      <Fragment>
        <div>crassa-antd</div>
        {this.props.children}
      </Fragment>
    )
  }
}

export default Dashboard
