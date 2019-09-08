import React, { Component } from 'react'
// import TitleBar from './components/TitleBar.jsx'
import DownloadService from './services/DownloadService'

const { remote } = require('electron');

const { dialog } = remote;
let dialogPath = undefined;
let downloadData = {};

class App extends Component {
  constructor () {
    super();
    this.state = { value: 0, youtubeLink: '' };
  }

  handleChange = event => {
    this.setState({ youtubeLink: event.target.value });
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

    console.log(downloadData);
  }

  handleDownload = async () => {
    const data = await DownloadService.download(downloadData)
    console.log(data);
  }

  render() {
    return (
      <div className='App'>
        Hello World
      </div>
    )
  }
}

export default App;
