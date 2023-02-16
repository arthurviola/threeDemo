export default class SingletonViewer {
    static instance
    customClass = null
    // 静态方法
    static getInstance () {
        if (!this.instance) {
            this.instance = new SingletonViewer()
        }
        return this.instance
    }
    setCustomClass(customClass) {
        this.customClass = customClass
    }
    getCustomClass() {
       return  this.customClass
    }
}
