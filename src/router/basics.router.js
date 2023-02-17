export const constantRouterMap = [
  {
    path: '/',
    redirect: { path: '/home' },
  },
  {
    path: '/home',
    name: 'home',
    component: () => import('@/view/index.vue'),
  },
  {
    path: '/echart',
    name: 'echart',
    component: () => import('@/view/echart/ecart3DDemo.vue'),
  },
  {
    path: '/three',
    name: 'three',
    component: () => import('@/view/threeTest/gradientTest.vue'),
  },
];
