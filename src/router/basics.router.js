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
    path: '/gradient',
    name: 'gradient',
    component: () => import('@/view/threeTest/gradientTest.vue'),
  },
  {
    path: '/mergeBufferGeometriesTest',
    name: 'mergeBufferGeometriesTest',
    component: () => import('@/view/threeTest/mergeBufferGeometriesTest.vue'),
  },
  {
    path: '/modelTest',
    name: 'modelTest',
    component: () => import('@/view/threeTest/modelTest.vue'),
  },
];
