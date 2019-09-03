
import DownloadController from '../controllers/DownloadController';

export default (app) => app.post('/api/download', DownloadController.download);
