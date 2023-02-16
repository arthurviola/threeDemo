<template>
    <div id="app">
        <router-view />
    </div>
</template>

<script>
export default {
    name: 'app',
    created () {
        this.setTitle()
    },
    watch: {
        $route () {
            this.setTitle()
        }
    }
}
</script>
