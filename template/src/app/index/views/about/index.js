import { AutoRouterConfig } from '../../serve/autorouter';
import asyncComponent from '../../serve/async/index';

export default AutoRouterConfig({
  path: 'about',
  exact:true,
  component:asyncComponent(() => import('./home.js')),
});
