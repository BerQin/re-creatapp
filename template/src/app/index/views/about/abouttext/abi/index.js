import { AutoRouterConfig } from '../../../../serve/autorouter';
import asyncComponent from '../../../../serve/async';

export default AutoRouterConfig({
  path: 'abi',
  exact:true,
  component:asyncComponent(() => import('./home.js')),
});
