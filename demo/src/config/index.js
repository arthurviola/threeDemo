// 应用具体配置
export default {
    sysName: 'my-test',
    // session有效时间 ms
    sessionDuration: 30 * 60 * 1000,
    routeMode: 'hash',
    // 接口服务器路径
    apiPath: process.env.VUE_APP_apipath ? process.env.VUE_APP_apipath : '',
    accessToken: 'token',
    userInfoKey: 'userInfo'
}
