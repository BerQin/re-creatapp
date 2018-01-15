import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Link
} from 'react-router-dom';
import asyncComponent from '../async';

const AutoRouter = function(Config, isConfig){
  Config = Config || {};
  const path = Config.path || '';
  const indexRoute = Config.indexRoute || null;
  const routes = Config.routes || [];
  const exact = Config.exact || true;
  const component = Config.component;

  const RouteWithSubRoutes = (route) => (
    <Route path={route.path} exact={route.exact} render={props =>
       <route.component {...props} routes={route.routes}/>
    }/>
  )

  let Rroutes = [];
  let childrenRoutes = [];
  if(routes.length){
    routes.map((route) => {
      if(route.default.length){
        route.default.map((item) => {
          item.path = path + item.path;
          childrenRoutes.push(item);
        });
      }
    });
  }

  Rroutes.push({
    path: path,
    component: component,
    exact: exact,
    routes: childrenRoutes
  });

  if(indexRoute){
    Rroutes.push({
      path: indexRoute.replace,
      component: component,
      exact: exact,
      routes: childrenRoutes
    });
  }
  
  return isConfig ? Rroutes : <Switch>
      {Rroutes.map((route, i) => (
        <RouteWithSubRoutes key={i} {...route}/>
      ))}
  </Switch>;
}
export default AutoRouter;
exports.AutoRouterConfig = (config) => AutoRouter(config, true);
