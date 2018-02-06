const { app, BrowserWindow } = require('electron')
const path = require('path')
const url = require('url')
const dotenv = require('dotenv').config()

let browserWindow = undefined

function createWindow() {
  browserWindow = new BrowserWindow({ width: 800, height: 600 })

  const displayContent =
    process.env.ELECTRON_DEV_URL ||
    url.format({
      pathname: path.join(__dirname, 'build/index.html'),
      protocol: 'file:',
      slashes: true
    })

  browserWindow.loadURL(displayContent)

  browserWindow.webContents.openDevTools()

  browserWindow.on('closed', () => {
    win = null
  })
}

app.on('ready', createWindow)

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (browserWindow === null) {
    createWindow()
  }
})
