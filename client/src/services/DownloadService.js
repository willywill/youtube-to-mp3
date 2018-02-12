import DownloadAPI from './DownloadAPI'

export default {
  download (downloadOptions) {
    return DownloadAPI().post('/api/download', downloadOptions)
  }
}