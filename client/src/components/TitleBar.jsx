import React, { Component } from 'react'
import PropTypes from 'prop-types'

import '../App.css'

const { app } = window.require('electron').remote
const appWindow = window.require('electron').remote.getCurrentWindow()

class TitleBar extends Component {
  constructor () {
    super ()

    this.state = { showDrawer: false }
  }

  toggleDrawer = () => {
    const showDrawer = !this.state.showDrawer
    this.setState({ showDrawer })
  }

  handleClick = () => {
    this.toggleDrawer()
  }

  handleExitClick = () => {
    if (app) {
      app.quit()
    }
  }

  handleToggleVisibility = () => {
    if(appWindow) {
      appWindow.minimize()
    }
  }

  render() {
    const { classes } = this.props
    return (
      <div className={classes.root}>
        Hello World
      </div>
    )
  }
}

TitleBar.propTypes = {
  classes: PropTypes.object.isRequired
}

export default TitleBar;
