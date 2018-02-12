import React, { Component } from 'react'
import SwipeableViews from 'react-swipeable-views'
import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles'

import TitleBar from './components/TitleBar.jsx'
import Typography from 'material-ui/Typography'
import Button from 'material-ui/Button'
import Dots from './components/Dots.jsx'

import DownloadService from './services/DownloadService'

const { dialog } = window.require('electron').remote
let dialogPath = undefined
let downloadData = {}

class App extends Component {
  constructor () {
    super ()

    this.state = { value: 0, youtubeLink: ''}
  }

  handleChange = event => {
    this.setState({ youtubeLink: event.target.value })
  }

  handleChangeIndex = index => {
    this.setState({ value: index })
  }

  handleNextSlide = event => {
    event.preventDefault()
    const currentIndex = this.state.value
    this.setState({ value: currentIndex })
  }

  handleDialog = () => {
    if (dialog) {
      dialogPath = dialog.showOpenDialog({
        properties: ['openDirectory']
      })
    }

    downloadData = {
      youtubeLink: this.state.youtubeLink,
      downloadPath: dialogPath[0].replace(/\\/g,"/")
    }

    console.log(downloadData)
  }

  handleDownload = async () => {
    const data = await DownloadService.download(downloadData)
    console.log(data)
  }

  render() {
    const style = {
      firstSlide: {
        padding: 30,
        minHeight: '50vh',
        color: '#fff',
        background: '#FF0000',
        textAlign: 'center'
      },
      secondSlide: {
        padding: 30,
        minHeight: '50vh',
        color: '#282828',
        background: '#F1F1F1',
        textAlign: 'center'
      },
      thirdSlide: {
        padding: 30,
        minHeight: '50vh',
        color: '#FFFFFF',
        background: '#282828',
        textAlign: 'center'
      },
      dots: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        width: '95%'
      }
    }

    const theme = createMuiTheme({
      palette: {
        primary: {
          main: '#FFFFFF',
          light: '#FFFFFF',
          dark: '#FFFFFF'
        },
        secondary: {
          main: '#FF0000'
        }
      }
    })

    const textField = { width: '50vw', height: '8vh', color: '#282828', border: '1px solid #aaaaaa', borderRadius: 2 }

    return (
      <div className='App'>
      <MuiThemeProvider theme={theme}>
        <TitleBar/>
        <SwipeableViews 
        enableMouseEvents
        index={this.state.value}
        onChangeIndex={this.handleChangeIndex}>
          <Typography variant='display3' style={style.firstSlide}> Got a link? 
            <br/> <br/>
            <input
            id='youtubeLink'
            style={textField}
            value={this.state.youtubeLink}
            onChange={this.handleChange}/>
          </Typography>
          <Typography variant='display3' style={style.secondSlide}> Tell us where to save it. 
            <br/> <br/>
            <Button variant='raised' color='secondary' onClick={this.handleDialog}>
             Browse 
            </Button> 
          </Typography>
          <Typography variant='display3' style={style.thirdSlide}>Download the music! 
            <br/> <br/>
            <Button variant='raised' color='primary' onClick={this.handleDownload}>
              Download 
            </Button> 
          </Typography>
        </SwipeableViews>
        <Dots
        style={style.dots}
        index={this.state.value}
        count={3}
        onDotClick={(value) => this.setState({ value })}/>
        </ MuiThemeProvider>
      </div>
    )
  }
}

export default App
