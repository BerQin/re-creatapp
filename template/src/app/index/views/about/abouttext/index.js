import { AutoRouterConfig } from '../../../serve/autorouter';
import asyncComponent from '../../../serve/async';

export default AutoRouterConfig({
  path: 'abouttext',
  exact:false,
  component:asyncComponent(() => import('./home.js')),
  routes:[
    require('./abi'),
  ]
});
