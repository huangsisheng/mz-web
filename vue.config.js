// 配置文件
const path = require('path')
const isProduction = process.env.NODE_ENV === 'production' ? true : false
//const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin

function resolve (dir) {
    return path.join(__dirname, dir)
}
// css预处理 stylus自动化导入
// 没起作用，待解决
function addStyleResource(rule) {
    rule.use('style-resource')
        .loader('style-resources-loader')
        .options({
            patterns: [
                path.resolve(__dirname, './src/assets/css/index.styl'),
            ],
        })
}
module.exports = {
    publicPath: './',
    baseUrl: process.env.baseUrl,
    outputDir: process.env.outputDir,
    assetsDir: process.env.assetsDir,
    lintOnSave: true,

    configureWebpack: config => {
        if (isProduction) {
            // 为生产环境修改配置...
        } else {
            // 为开发环境修改配置...
        }
    },
    chainWebpack: config => {
        const types = ['vue-modules', 'vue', 'normal-modules', 'normal']
        types.forEach(type => addStyleResource(config.module.rule('stylus').oneOf(type)))
        // 为添加的文件取别名
        config.resolve.alias
            .set('vue$', 'vue/dist/vue.esm.js')
            .set('@', resolve('src'))
            .set('components', resolve('src/components'))
            .set('api', resolve('src/api'))
            .set('assets', resolve('src/assets'))
            .set('router', resolve('src/router'))
            .set('store', resolve('src/store'))
            .set('utils', resolve('src/utils'))
            .set('filter', resolve('src/filter'))
            .set('directive', resolve('src/directive'))

        // 后缀扩展
        config.resolve.extensions
            .add('.js')
            .add('.vue')
            .add('.styl')
            .add('.css')

        config.module.rule('svg').uses.clear()
        config.module
            .rule('svg')
            .use('raw-loader')
            .loader('raw-loader')
        // config.module.rule('url')
        //   .test(/\.(eot|svg|ttf|woff|woff2?)(\?.*)?$/)
        //   .use('url')
        //     .loader('url-loader')
        //     .end()

        //config.when(isProduction, config =>
        //  config.plugin('webpack-bundle-analyzer').use(BundleAnalyzerPlugin)
        //)
    },
    // 打包为生产环境时不生成map.js文件
    productionSourceMap: !isProduction,
    /* css: {
    }, */
    css: {
        sourceMap: false,
        loaderOptions: {
            stylus: {
                globalVars: {
                    red: '#03a9f4',
                    blue: '#3eaf7c',
                    orange: '#f08d49'
                }
            }
        }
    },

    devServer: {
        // open: process.platform === 'darwin',
        // host: "localhost",
        port: 8888,
        https: false,
        hotOnly: false,
        // 当没有需要代理的内容时 需将其注释
        proxy:{
            '/gateway':{
                target:'http://localhost:3000',
                changeOrigin: true,
                pathRewrite:{
                    '^/gateway':'/gateway'
                }
            },
            '/movie':{
                target:'http://localhost:3000',
                changeOrigin: true,
                pathRewrite:{
                    '^/movie':''
                }
            },
            '/cinemas':{
                target:'http://localhost:3000',
                changeOrigin: true,
                pathRewrite:{
                    '^/cinemas':'/cinemas'
                }
            },
            '/api':{
                target:'http://localhost:3000',
                changeOrigin: true
            },
        }
    },
}
