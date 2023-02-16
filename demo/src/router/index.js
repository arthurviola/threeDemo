import Vue from 'vue'
import Router from 'vue-router'
import config from '@/config'

Vue.use(Router)

const router = new Router({
    mode: config.routeMode,
    scrollBehavior: () => ({
        y: 0
    }),
    routes: [
        {
            path: '',
            redirect: '/park'
        },
        {
            path: '/park',
            name: 'park',
            component: () => import('@/views/park/index')
        }
    ]
})

export default router
