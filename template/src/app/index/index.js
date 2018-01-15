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
  exact: true,
  indexRoute:{
    replace:'/home',
  },
  component:asyncComponent(() => import('./home.js')),
  routes:[
    require('./views/about'),
    require('./views/home')
  ]
});
console.log(rootRoute, 'index');
ReactDOM.render(
  <Router>{rootRoute}</Router>,
  document.getElementById('root')
);