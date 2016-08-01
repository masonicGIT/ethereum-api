import http from 'http';
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import api from './api';
import config from './config.json'

let app = express();
app.server = http.createServer(app);

app.use(cors({
  exposedHeaders: config.corsHeaders
}));

app.use(bodyParser.json({
  limit: config.bodyLimit
}));

const init = () => {

  app.use('/api/v1/etc', api({ config }));

  app.server.listen(process.env.PORT || config.port);

  console.log(`Started on port ${app.server.address().port}`);
};

init();

export default app;
