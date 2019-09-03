import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import router from './routes/routes';

dotenv.config();

const app = express();
const port = process.env.PORT || 3600;

app.use(bodyParser.json());
app.use(cors());

router(app);

app.listen(port, (error) => {
  if (error) {
    throw error;
  }

  console.log(`> Server successfully started on port ${port}.`);
});
