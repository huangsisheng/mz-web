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
//

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
        /* svg,icon  start*/
        // svg配置，排除icons目录
        config.module.rule('svg')
            .exclude.add(resolve('src/icons'))
        //新增icons配置
        config.module.rule('svg-sprite-loader')
            .test(/\.svg$/)
            .include.add(resolve('src/icons'))      //只包含这个目录
            .end()
            .use('svg-sprite-loader')
            .loader('svg-sprite-loader')
            .options({symbolId:'icon-[name]'})  //以什么方式使用icon
            .end()
        /* svg,icon  end*/
        /* config.module.rule('svg').uses.clear()
        config.module
            .rule('svg')
            .use('raw-loader')
            .loader('raw-loader') */
        // config.module.rule('url')
        //   .test(/\.(eot|svg|ttf|woff|woff2?)(\?.*)?$/)
        //   .use('url')
        //     .loader('ur
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
        open: 'chrome',
        // host: "localhost",
        port: 8888,
        https: false,
        hotOnly: false,
        // 当没有需要代理的内容时 需将其注释
        proxy:{
            [process.env.VUE_APP_BASE_API]:{
                target: 'http://localhost:3000',
                changeOrigin: true,
                pathRewrite: {
                    ['^'+process.env.VUE_APP_BASE_API]:''
                }
            },
            /* '/gateway':{
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
            '/act':{
                target:'http://localhost:3000',
                changeOrigin: true,
                pathRewrite:{
                    '^/act':'/act'
                }
            },
            '/banner':{
                target:'http://localhost:3000',
                changeOrigin: true,
                pathRewrite:{
                    '^/banner':'/banner'
                }
            },
            '/api':{
                target:'http://localhost:3000',
                changeOrigin: true
            }, */
        }
    },
}
