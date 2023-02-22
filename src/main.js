import { createApp } from 'vue'
import './utils/tool';
import './style.css'
import router from './router';
import App from './App.vue'
const app = createApp(App);
app.use(router);
router.isReady().then(() => {
    app.mount('#app')
});

// router.beforeEach(async (to, from, next) => {
//     debugger
// })



