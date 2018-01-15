import { AutoRouterConfig } from '../../serve/autorouter';
import asyncComponent from '../../serve/async/index';

export default AutoRouterConfig({
  path: 'home',
  exact:true,
  component:asyncComponent(() => import('./home.js')),
});