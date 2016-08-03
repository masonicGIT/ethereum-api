import cors from 'cors';
import http from 'http';
import express from 'express';
import bodyParser from 'body-parser';
import RedisServer from 'redis-server';

import api from './api';
import config from './config.json'

let app = express();

const redisServerInstance = new RedisServer(config.redis.port);

const init = () => {

  app.server = http.createServer(app);

  app.use(cors({
    exposedHeaders: config.corsHeaders
  }));

  app.use(bodyParser.json({
    limit: config.bodyLimit
  }));

  app.use('/api/v1/etc', api({ config }));

  redisServerInstance.open(function(err) {
    if (err) throw new Error(err);
  });

  app.server.listen(process.env.PORT || config.port, function () {
    console.log("Started on port %d", this.address().port);
  })

};

init();

export default app;
