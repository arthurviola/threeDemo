import config from '@/config'

export default {
    install (Vue, options) {
        Vue.mixin({
            methods: {
                setTitle (title) {
                    const meta = this.$route && this.$route.meta ? this.$route.meta : {}
                    document.title = title || meta.title || config.sysName || ''
                }
            }
        })
    }
}
