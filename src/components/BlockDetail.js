import React from 'react';
import { useParams } from 'react-router-dom';
import { gql, useQuery } from "@apollo/client";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  CircularProgress,
  Typography,
  Paper,
  makeStyles,
  Button,
} from '@material-ui/core';
import TransactionList from './TransactionList';

const useStyles = makeStyles({
  root: {
    maxWidth: 720,
    margin: '0 auto',
  },
  table: {
  },
  actions: {
    marginTop: 20,
  },
  transactions: {
    marginTop: 20,
    marginBottom: 20,
  },
});

const hashPattern = /^[\da-f]{64}$/i 

const BLOCKCHAIN_INFO = gql`
  query Query($hash: String!) {
    rawBlock(hash: $hash) {
      hash
      ver
      prev_block
      mrkl_root
      time
      bits
      nonce
      n_tx
      size
      block_index
      main_chain
      height
      received_time
      relayed_by
      tx {
        hash
      }
    }
  }
`;

const dataFields = [
  { label: 'Hash', field: 'hash' },
  // { label: 'Confirmations', field: '' },
  { label: 'Timestamp', field: 'time' },
  { label: 'Height', field: 'height' },
  // { label: 'Miner', field: '' },
  { label: 'Number of Transactions', field: 'n_tx' },
  // { label: 'Difficulty', field: '' },
  { label: 'Merkle root', field: 'mrkl_root' },
  { label: 'Version', field: 'ver' },
  { label: 'Bits', field: 'bits' },
  // { label: 'Weight', field: '' },
  { label: 'Size', field: 'size' },
  { label: 'Nonce', field: 'nonce' },
  // { label: 'Transaction Volume', field: '' },
  // { label: 'Block Reward', field: '' },
  // { label: 'Fee Reward', field: '' },
];

export default function BlockDetail() {
  const classes = useStyles();
  const { hash } = useParams();
  const { loading, error, data } = useQuery(BLOCKCHAIN_INFO, {
    variables: { hash }
  });

  const { rawBlock } = data || {};
  const gotoBlockDetail = (hash) => window.open(`https://www.blockchain.com/btc/block/${hash}`, '_blank');

  if (!hash) {
    return (
      <Typography>Please input hash and click Search</Typography>
    )
  } else if (!hashPattern.test(hash)) {
    return (
      <Typography>Please input correct block hash</Typography>
    )
  } else if (loading) {
    return (
      <Typography><CircularProgress /></Typography>
    )
  } else if (error) {
    return (
      <Typography color="error">Error: {error.message}</Typography>
    )
  } else {
    return (
      <section className={classes.root}>
        <h2>Block {rawBlock.height}</h2>
        <Paper>
          <TableContainer>
            <Table className={classes.table} aria-label="simple table">
              <TableBody>
                {dataFields.map(({ label, field}) => (
                  <TableRow key={label}>
                    <TableCell>{label}</TableCell>
                    <TableCell>{rawBlock[field]}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <div className={classes.actions}>
            <Button onClick={event => gotoBlockDetail(rawBlock.hash)}>More Information</Button>
          </div>
          <h3>Block Transactions</h3>
          <div className={classes.transactions}>
            <TransactionList tx={rawBlock.tx} />
          </div>
        </Paper>
      </section>
    );
  }
}
