const path = require('path');
const express = require('express');
const cors = require('cors');
const { graphqlRoute } = require('./graph');

const server = express();

server.use(cors());
server.use('/graphql', graphqlRoute);

const staticDir = process.env.BLOCKLET_APP_ID ? './' : '../../';
const staticDirNew = path.resolve(__dirname, staticDir, 'build');
server.use(express.static(staticDirNew));

const port = parseInt(process.env.BLOCKLET_PORT || process.env.APP_PORT, 10) || 3030;
server.listen(port, err => {
  if (err) throw err;
  console.log(`> app ready on ${port}`);
});
