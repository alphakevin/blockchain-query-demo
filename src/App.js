import logo from './Bitcoin_logo.svg';
import './App.css';

import { Link, Route, Switch } from "react-router-dom";
import BlockQuery from './components/BlockQuery';
import BlockDetail from './components/BlockDetail';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Link to="/">
          <img src={logo} className="App-logo" alt="logo" />
        </Link>
        <div className="App-tip">
          Input block hash to get block information
        </div>
      </header>
      <Switch>
        <Route path="/" exact component={BlockQuery} />
        <Route path="/hash/:hash" exact component={BlockQuery} />
      </Switch>
      <Route path="/hash/:hash" component={BlockDetail} />
    </div>
  );
}

export default App;
