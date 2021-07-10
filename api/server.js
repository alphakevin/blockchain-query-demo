const path = require('path');
const express = require('express');
const morgan = require('morgan');
const compression = require('compression');
const cors = require('cors');
const fallback = require('express-history-api-fallback');
const { graphqlRoute } = require('./graph');

const isProduction = process.env.NODE_ENV !== 'development'

const server = express();
server.use(cors());

server.use(
  morgan((tokens, req, res) => {
    const log = [
      tokens.method(req, res),
      tokens.url(req, res),
      tokens.status(req, res),
      tokens.res(req, res, 'content-length'),
      '-',
      tokens['response-time'](req, res),
      'ms',
    ].join(' ');

    if (isProduction) {
      // Log only in AWS context to get back function logs
      console.log(log);
    }

    return log;
  })
);

const router = express.Router();
router.use('/graphql', graphqlRoute);
router.get('/status', (req, res) => {
  res.send({
    status: 'OK',
    timestamp: new Date(),
    version: process.versions,
  });
});

if (isProduction) {
  server.use(compression());
  server.use(router);

  if (process.env.BLOCKLET_DID) {
    server.use(`/${process.env.BLOCKLET_DID}`, router);
  }

  const staticDir = process.env.BLOCKLET_APP_ID ? './' : '../../';
  const staticDirNew = path.resolve(__dirname, staticDir, 'build');
  server.use(express.static(staticDirNew, { maxAge: '365d', index: false }));
  if (process.env.BLOCKLET_DID) {
    server.use(`/${process.env.BLOCKLET_DID}`, express.static(staticDirNew, { maxAge: '365d', index: false }));
  }
  server.use(fallback('index.html', { root: staticDirNew }));

  server.use((req, res) => {
    res.status(404).send({
      uri: req.url,
      message: '404 NOT FOUND',
    });
  });

  // eslint-disable-next-line no-unused-vars
  server.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
  });
} else {
  server.use(router);
};

exports.server = server;
