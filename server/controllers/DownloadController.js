'use strict'

const helpers = require('../handlers/common')
const YouTubeDownloader = require('youtube-mp3-downloader')

module.exports = {
  /**
   * Asynchronously handles the download provided the request body supplies
   * a YouTube link and download path.
   * @param {any} req
   * @param {any} res
   */
  async download(req, res) {
    try {
      const { youtubeLink, downloadPath } = req.body
      const videoID = await helpers.getVideoID(youtubeLink)
      const downloadOptions = { path: downloadPath }
      const youtubeMP3 = await helpers.initDownloader(
        YouTubeDownloader,
        downloadOptions
      )
      const downloadedMP3Data = await helpers.downloadAsync(youtubeMP3, videoID)
      res.send(JSON.stringify(downloadedMP3Data, null, 2))
    } catch (error) {
      res.send({ error })
    }
  }
}
