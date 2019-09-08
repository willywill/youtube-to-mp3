import YouTubeDownloader from 'youtube-mp3-downloader';
import { getVideoID, initDownloader } from '../handlers/common';

/**
 * Downloads the YouTube video and transcodes it asynchronously.
 *
 * @param {any} YouTubeToMP3
 * @param {string} videoID
 * @returns {Promise}
 */
const downloadVideoAsync = async (YouTubeToMP3, videoID) => new Promise((resolve, reject) => {
  YouTubeToMP3.download(videoID);

  YouTubeToMP3.on('finished', (error, data) => {
    if (error) {
      reject(error);
    } else {
      resolve(data);
    }
  });
});

/**
 * Asynchronously handles the download provided the request body supplies
 * a YouTube link and download path.
 * @param {any} req
 * @param {any} res
*/
const download = async (req, res) => {
  try {
    const { youtubeLink, downloadPath } = req.body;

    if (!youtubeLink || !downloadPath) {
      throw new Error("Not all provided parameters were passed in the body - 'youtubeLink' & 'downloadPath'");
    }

    const youtubeMP3 = initDownloader(YouTubeDownloader, { path: downloadPath });

    const videoID = getVideoID(youtubeLink);

    const downloadedMP3Data = await downloadVideoAsync(youtubeMP3, videoID);

    res.status(200).send({ data: { ...downloadedMP3Data, downloadPath } });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

export default {
  download,
};
