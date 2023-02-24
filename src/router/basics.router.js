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
    path: '/echarTest1',
    name: 'echarTest1',
    component: () => import('@/view/echart/barAnimation3D.vue'),
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
    component: () => import('@/view/threeTest/gltfTest.vue'),
  },
  // {
  //   path: '/GrassGround',
  //   name: 'GrassGround',
  //   component: () => import('@/view/threeTest/grassGround.vue'),
  // },
];
