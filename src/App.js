import React from 'react';
import { Provider } from 'react-redux';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import { store } from './store/global'
import Home from './Home';
import NotFound from './NotFound';
import Login from './Login';

export default function App() {
  return (
    <Provider store={ store }>
      <Router>
        <Switch>
          <Route exact path="/"><Home /></Route>
          <Route><NotFound /></Route>
        </Switch>
      </Router>
  </Provider>
  );
}

