import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withStyles } from 'material-ui/styles'
import AppBar from 'material-ui/AppBar'
import Toolbar from 'material-ui/Toolbar'
import Typography from 'material-ui/Typography'
import IconButton from 'material-ui/IconButton'
import MenuIcon from 'material-ui-icons/Menu'
import Drawer from 'material-ui/Drawer'
import Button from 'material-ui/Button'
import Close from 'material-ui-icons/Close'
import CallReceived from 'material-ui-icons/CallReceived'

import '../App.css'

const { app } = window.require('electron').remote
const appWindow = window.require('electron').remote.getCurrentWindow()

const styles = {
  root: {
    width: '100%',
    height: '10vh',
    paddingBottom: 15,
    fontSize: 16
  },
  flex: {
    flex: 1
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20
  }
}

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
      <Drawer 
        open={this.state.showDrawer}
        onClose={this.toggleDrawer}>
          <Button color="primary"
            tabIndex={0}
            role="button">
            Hello World
          </Button>
        </Drawer>
        <AppBar position="static" className='draggableBar'>
          <Toolbar>
            <IconButton
              className={classes.menuButton}
              color="inherit"
              onClick={this.handleClick}
              aria-label="Menu">
              <MenuIcon />
            </IconButton>
            <Typography
              color='inherit'
              className={classes.flex}>
              YouTube to MP3
            </Typography>
            <Button color='inherit' size='small' onClick={this.handleToggleVisibility}>
              <CallReceived />
            </Button>
            <Button color='inherit' size='small' onClick={this.handleExitClick}>
              <Close />
            </Button>
          </Toolbar>
        </AppBar>
      </div>
    )
  }
}

TitleBar.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(TitleBar)
