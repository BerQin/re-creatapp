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
  const exact = Config.exact || false;
  const component = Config.component;
  const component_404 = Config.component_404;
  const RouteWithSubRoutes = (route) => (
    <Route path={route.path} exact={route.exact} render={props =>
       <route.component {...props} routes={route.routes} children={
        route.routes.map((routeItem, i) => (
          <RouteWithSubRoutes key={i} {...routeItem}/>
        ))
       }/>
    }/>
  )

  const deepClone=(obj)=>{
    var proto=Object.getPrototypeOf(obj);
    return Object.assign({},Object.create(proto),obj);
  }

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
    let ChildrenRR = [];
    for(let i = 0; i<childrenRoutes.length; i++){
      let item = deepClone(childrenRoutes[i]);
      if(item.path){
        if(/^\//.test(item.path) || /\/$/.test(indexRoute.replace)){
          item.path = indexRoute.replace + item.path;
        }else{
          item.path = indexRoute.replace + '/' + item.path;
        }
        ChildrenRR.push(item);
      }
    }
    Rroutes.push({
      path: indexRoute.replace,
      component: component,
      exact: exact,
      routes: ChildrenRR
    });
  }

  let ChildrenRI = [];
  
  for(let i = 0; i<childrenRoutes.length; i++){
    let item = deepClone(childrenRoutes[i]);
    if(item.path){
      if(/^\//.test(item.path) || /\/$/.test(path)){
        item.path = path + item.path;
      }else{
        item.path = path + '/' + item.path;
      }
    }
    ChildrenRI.push(item);
  }
  Rroutes.push({
    path: path,
    component: component,
    exact: exact,
    routes: ChildrenRI
  });
  
  let routerDom = null;
  if (!isConfig) {
    routerDom = Rroutes.map((route, i) => (
      <RouteWithSubRoutes key={i} {...route}/>
    ));
  }
  return isConfig ? Rroutes : <Switch> {routerDom}</Switch>;
}

export default AutoRouter;
exports.AutoRouterConfig = (config) => AutoRouter(config, true);
