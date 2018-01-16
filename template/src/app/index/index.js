import React from 'react';
import ReactDOM from 'react-dom';
import AutoRouter from './serve/autorouter'
import asyncComponent from './serve/async';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Link
} from 'react-router-dom';

const rootRoute = AutoRouter({
  path:'/',
  indexRoute:{
    replace:'/home',
  },
  exact: false,
  component:asyncComponent(() => import('./home.js')),
  component_404:asyncComponent(() => import('./views/nomatch/home.js')),
  routes:[
    require('./views/about'),
    require('./views/linke')
  ]
});

ReactDOM.render(
  <Router>{rootRoute}</Router>,
  document.getElementById('root')
);