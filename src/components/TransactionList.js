import React from 'react';
import { List, ListItem, ListItemText, makeStyles } from '@material-ui/core';
import { useVirtual } from "react-virtual";

const useStyles = makeStyles({
  root: {
    height: 'calc(100vh - 72px)',
    width: '100%',
    overflow: "auto",
  },
  container: {
    width: '100%',
    position: 'relative',
  },
})

export default function TransactionList(props) {
  const { tx } = props;
  const classes = useStyles();
  const parentRef = React.useRef();

  const rowVirtualizer = useVirtual({
    size: tx.length,
    parentRef
  });
  const gotoTxDetail = (hash) => window.open(`https://www.blockchain.com/btc/tx/${hash}`, '_blank');

  return (
    <List ref={parentRef} className={classes.root}>
      <div
        className={classes.container}
        style={{
          height: `${rowVirtualizer.totalSize}px`,
        }}
      >
        {rowVirtualizer.virtualItems.map(virtualRow => {
          const { hash } = tx[virtualRow.index];
          return (
            <ListItem
              button
              key={virtualRow.index}
              ref={virtualRow.measureRef}
              onClick={event => gotoTxDetail(hash)}
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                transform: `translateY(${virtualRow.start}px)`
              }}
            >
              <ListItemText
                primary={`${virtualRow.index} - ${hash}`}
              />
            </ListItem>
          );
        })}
      </div>
    </List>
  );
}
