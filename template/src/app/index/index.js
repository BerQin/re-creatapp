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
  component:asyncComponent(() => import('./home.js')),
  // component_404:asyncComponent(() => import('./views/nomatch/home.js')),
  routes:[
    require('./views/about'),
    require('./views/linke'),
    require('./views/nomatch')
  ]
});

ReactDOM.render(
  <Router>{rootRoute}</Router>,
  document.getElementById('root')
);