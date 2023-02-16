import Vue from 'vue'
import VueBus from 'vue-bus'
import axios from 'axios'
import moment from 'vue-moment'
import mixins from '@/mixins'
import router from '@/router'
import store from '@/store'
import App from './App.vue'

// 按需加载 element
import '@/plugins/element.js'

// css
import '@/styles/common.scss'

Vue.config.productionTip = false

Vue.use(VueBus)
Vue.use(moment)
Vue.use(mixins)

Vue.prototype.$http = axios

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')

console.info(process.env)
