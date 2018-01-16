import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Link
} from 'react-router-dom';
import asyncComponent from '../async';

const RouteWithSubRoutes = (route) => (
  <Route path={route.path} exact={route.exact} render={props =>
     <route.component {...props} routes={route.routes} children={
        <Switch>
          {route.routes.map((routeItem, i) => (
            <RouteWithSubRoutes key={i} {...routeItem}/>
          ))}
        </Switch>
     }/>
  }/>
)

const deepClone=(obj)=>{
  var proto=Object.getPrototypeOf(obj);
  return Object.assign({},Object.create(proto),obj);
}

const blitem = (routes, path, component_404) => {
  var Children = [];
  for(let i = 0; i<routes.length; i++){
    let item = deepClone(routes[i]);
    if(item.path){
      if(/^\//.test(item.path) || /\/$/.test(path)){
        item.path = path + item.path;
      }else{
        item.path = path + '/' + item.path;
      }
      if(item.routes && item.routes.length){ //&& !isConfig
        item.routes = blitem(item.routes, path, component_404);
      }
      Children.push(item);
    }
  }
  Children.push({
    component:component_404,
    routes:[]
  });
  return Children;
}

const AutoRouter = function(Config, isConfig){
  Config = Config || {};
  const path = Config.path || '';
  const indexRoute = Config.indexRoute || null;
  const routes = Config.routes || [];
  const exact = Config.exact || false;
  const component = Config.component;
  const component_404 = Config.component_404;

  let Rroutes = [];
  let childrenRoutes = [];
  if(routes.length){
    routes.map((route) => {
      if(route.default.length){
        route.default.map((item) => {
          childrenRoutes.push(item);
        });
      }
    });
  }

  if(indexRoute){
    Rroutes.push({
      path: indexRoute.replace,
      component: component,
      exact: exact,
      routes: blitem(childrenRoutes, indexRoute.replace, component_404)
    });
  }

  Rroutes.push({
    path: path,
    component: component,
    exact: exact,
    routes: blitem(childrenRoutes, path, component_404)
  });

  let routerDom = null;
  if (!isConfig) {
    routerDom = Rroutes.map((route, i) => (
      <RouteWithSubRoutes key={i} {...route}/>
    ));
    console.log(routerDom);
  }

  return isConfig ? Rroutes : <Switch> {routerDom}</Switch>;
}

export default AutoRouter;
exports.AutoRouterConfig = (config) => AutoRouter(config, true);
