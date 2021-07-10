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
    ver: Int
    prev_block: String
    mrkl_root: String
    time: Int
    bits: Int
    nonce: Int
    n_tx: Int
    size: Int
    block_index: Int
    main_chain: Boolean
    height: Int
    received_time: Int
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
});
