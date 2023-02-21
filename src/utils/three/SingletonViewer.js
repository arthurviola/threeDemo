export default class SingletonViewer {
    static instance
    customClass = {}
    // 静态方法
    static getInstance () {
        if (!this.instance) {
            this.instance = new SingletonViewer()
        }
        return this.instance
    }
    setCustomClass(name,customClass) {
        if(name) {
            this.customClass[name] = customClass
        }
    }
    getCustomClass(name) {
       return  name && this.customClass[name]
    }
}
