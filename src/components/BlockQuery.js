import { Button, TextField } from '@material-ui/core';
import React, { useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { usePrevious } from '../hooks';
import './BlockQuery.css';

const defaultHash = '00000000000000000007878ec04bb2b2e12317804810f4c26033585b3f81ffaa';

export default function BlockQuery() {
  const [hash, setHash] = React.useState(defaultHash);
  const history = useHistory();
  const { hash: routeHash } = useParams();
  const prevRouteHash = usePrevious(routeHash);

  useEffect(() => {
    if (routeHash && routeHash !== prevRouteHash && hash !== routeHash) {
      setHash(routeHash);
    } 
  }, [hash, routeHash, prevRouteHash]);
  
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
