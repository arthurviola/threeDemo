
import { constantRouterMap } from './basics.router';
import {
  createRouter,
  createWebHistory,
  createWebHashHistory,
} from 'vue-router';


const router = createRouter({
  history: createWebHashHistory('/'),
  routes: constantRouterMap,
});
export default router;
