import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import App from './views/App/App';
import DashboardView from "./views/DashboardView/DashboardView";
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';
import {Redirect} from 'react-router-dom'

import * as serviceWorker from './serviceWorker';

const routing = (
  <Router>
    <Switch>
      <Route path="/dashboard">
        <DashboardView />
      </Route>
      <Route path="/admin">
        <App />
      </Route>
    <Redirect from='/' to='/dashboard' />
    </Switch>
    </Router>
    );
ReactDOM.render(routing, document.getElementById('root'))

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();