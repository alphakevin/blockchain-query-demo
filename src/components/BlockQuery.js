import { Button, TextField } from '@material-ui/core';
import React from 'react';
import { useHistory } from 'react-router-dom';
import './BlockQuery.css';

const defaultHash = '00000000000000000007878ec04bb2b2e12317804810f4c26033585b3f81ffaa';

export default function BlockQuery() {
  const [hash, setHash] = React.useState(defaultHash);
  const history = useHistory();
  const handleChange = (event) => setHash(event.target.value);
  const handleSearch = (event) => {
    console.log('search block', hash, '...');
    history.push(`/hash/${hash}`);
  }
  
  return (
    <div className="BlockQuery">
      <div className="BlockQuery-input">
        <TextField
          fullWidth
          value={hash}
          onChange={handleChange}
          inputProps={{
            onClick: event => event.currentTarget.select()
          }}
        />
      </div>
      <div className="BlockQuery-button">
        <Button
          variant="contained"
          color="primary"
          onClick={handleSearch}
        >
          Search
        </Button>
      </div>
    </div>
  );
}
