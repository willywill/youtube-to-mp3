'use strict'

const DownloadController = require('../controllers/DownloadController')

module.exports = app => {
  app.post('/api/download', DownloadController.download)
}
