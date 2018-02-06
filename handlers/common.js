'use strict'

const getTail = async (arr) => arr[1]
/**
 * Splits the YouTube link string and returns the video ID.
 * 
 * @param {string} s 
 */
const getVideoID = async (s) => getTail(await s.split('?v='))

/**
 * Initilizes the download by supplying the path to transcode to mp3 via FFMPEG,
 * the final file's output path, youtube video quality, and more.
 * @param {any} YouTubeToMP3 
 * @param {object} options 
 * @returns 
 */
const initDownloader = async (YouTubeToMP3, options) => {
  const yt = new YouTubeToMP3({
      ffmpegPath: process.env.FFMPEG_PATH,
      outputPath: options.path,
      youtubeVideoQuality: process.env.DEFAULT_QUALITY,
      queueParallelism: process.env.DOWNLOAD_THREADS,
      progrssTimeout: process.env.PROGRESS_INTERVAL
    })
    return yt
}
/**
 * Downloads the youtube video and transcodes it asynchronously.
 * 
 * @param {any} YouTubeToMP3 
 * @param {string} videoID 
 * @returns 
 */
const downloadAsync = async (YouTubeToMP3, videoID) => {
  return new Promise((resolve, reject) => {
    YouTubeToMP3.download(videoID)
    YouTubeToMP3.on('finished', (error, data) => {
      if(error) {
        reject(error)
      } else {
        resolve(data)
      }
    })
  })
}

module.exports = { getTail, getVideoID, initDownloader, downloadAsync }