import React from 'react';
import ReactDOM from 'react-dom';

import { Router, Route, IndexRoute, browserHistory } from 'react-router';

import AppLayout from './pages/AppLayout';

import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import MessagesPage from './pages/MessagesPage';

import './style.css';

ReactDOM.render(
  <Router history={browserHistory}>
    <Route path="/" component={AppLayout}>
      <IndexRoute component={HomePage} />
      <Route path="/about" component={AboutPage} />
      <Route path="/messages" component={MessagesPage} />
    </Route>
  </Router>,
  document.getElementById('app')
);
