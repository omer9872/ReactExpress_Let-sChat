import React from 'react';
import './style/app.css'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import Sign from './components/Sign';
import Main from './components/Main';

function App() {
  return (
    <Router>
        <Switch>
          <Route exact path="/">
            <Sign />
          </Route>
          <Route path="/welcome">
            <Main />
          </Route>
        </Switch>
    </Router>
  );
}

export default App;