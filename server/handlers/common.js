import flow from 'lodash/fp/flow';
import last from 'lodash/fp/last';
import split from 'lodash/fp/split';

/**
 * Splits the YouTube link string and returns the video ID.
 *
 * @param {string} videoUrl
 */
const getVideoID = flow(
  split('?v='),
  last,
);

/**
 * Initializes the download by supplying the path to transcode to mp3 via FFMPEG,
 * the final file's output path, YouTube video quality, and more.
 * @param {any} YouTubeToMP3
 * @param {object} options
 * @returns
 */
const initDownloader = (YouTubeToMP3, options) => {
  const yt = new YouTubeToMP3({
    ffmpegPath: process.env.FFMPEG_PATH || '/usr/local/bin/ffmpeg',
    outputPath: options.path,
    youtubeVideoQuality: process.env.DEFAULT_QUALITY || 'highest',
    queueParallelism: process.env.DOWNLOAD_THREADS || 2,
    progressTimeout: process.env.PROGRESS_INTERVAL || 2000,
  });
  return yt;
};

export {
  getVideoID,
  initDownloader,
};
