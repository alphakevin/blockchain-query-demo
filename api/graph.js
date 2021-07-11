const { graphqlHTTP } = require('express-graphql');
const { buildSchema } = require('graphql');
const { blockchainInfo } = require('./blockchain');
 
// Construct a schema, using GraphQL schema language
const schema = buildSchema(`
  type Transaction {
    hash: String
  }

  type BlockInfo {
    hash: String
    ver: Float
    prev_block: String
    mrkl_root: String
    time: Float
    bits: Float
    nonce: Float
    n_tx: Float
    size: Float
    block_index: Float
    main_chain: Boolean
    height: Float
    received_time: Float
    relayed_by: String
    tx: [Transaction]
  }

  type Query {
    rawBlock(hash: String!): BlockInfo
  }
`);

// The root provides a resolver function for each API endpoint
const root = {
  rawBlock: ({ hash }) => blockchainInfo.get(hash),
};

exports.graphqlRoute = graphqlHTTP({
  schema: schema,
  rootValue: root,
  graphiql: true,
  // customFormatErrorFn: (err) => {
  //   console.dir(err);
  //   return err.message + '\n' + err.stack;
  // }
});
