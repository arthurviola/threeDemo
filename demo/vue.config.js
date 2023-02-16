const { defineConfig } = require('@vue/cli-service')
const path = require('path')
const isProduction = process.env.NODE_ENV === 'production'
function resolve (dir) {
    return path.join(__dirname, '', dir)
}

module.exports = defineConfig({
    filenameHashing: isProduction,
    lintOnSave: 'error',
    productionSourceMap: false,
    devServer: {
        proxy: {
            '/': {
                target: 'http://132.126.1.253:8800', // 接口的域名或ip
                ws: false, // 是否代理websockets
                secure: false, // 如果是https接口，需要配置这个参数
                changeOrigin: false, // 如果接口跨域，需要进行这个参数配置
                pathRewrite: {
                    // pathRewrite 来重写地址，将前缀 '/api' 转为 ''
                    '^/': ''
                }
            }
        }
    },
    chainWebpack: (config) => {
        config.plugins.delete('preload')
        config.plugins.delete('prefetch')
        // 别名
        config.resolve.alias.set('styles', resolve('src/styles'))
        config.resolve.alias.set('components', resolve('src/components'))
        config.resolve.alias.set('images', resolve('src/assets/images'))
        // 添加flash模块
        config.module
            .rule('swf')
            .test(/\.(mp4|flv|swf)(\?v=[0-9]\.[0-9]\.[0-9])?$/)
            .use('file-loader')
            .loader('file-loader')
            .options({
                name: 'swf/[name].[hash:8].[ext]'
            })
        config.when(isProduction, (diffConfig) => {
            diffConfig.optimization.splitChunks({
                // 提取公共代码并合并
                chunks: 'all',
                cacheGroups: {
                    libs: {
                        name: 'chunk-libs',
                        test: /[\\/]node_modules[\\/]/,
                        priority: 10,
                        chunks: 'initial'
                    },
                    commons: {
                        name: 'chunk-commons',
                        test: resolve('src/components'),
                        minChunks: 3,
                        priority: 5,
                        reuseExistingChunk: true
                    }
                }
            })
        })
    },
    css: {
        sourceMap: !isProduction,
        loaderOptions: {
            postcss: {
                postcssOptions: {
                    plugins: [
                        require('postcss-pxtorem')({
                            rootValue: 100, // 换算的基数
                            // 忽略转换正则匹配项。插件会转化所有的样式的px。比如引入了三方UI，也会被转化。selectorBlackList字段来过滤
                            // 如果个别地方不想转化px。可以简单的使用大写的 PX 或 Px 。
                            // selectorBlackList: ['ig'],
                            propList: ['*'],
                            // exclude: /node_modules/
                            exclude: function (file) {
                                return file.indexOf('views/room/') === -1
                            }
                        })
                    ]
                }
            },
            sass: {
                additionalData: '@import "~styles/variables.scss";'
            }
        }
    }
})
