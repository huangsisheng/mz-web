// 封装路由按需引入方法
export default function _import(file, viewPath = 'views') {
    if (process.env.NODE_ENV === 'development') {  //开发环境
        return require(`@/${viewPath}/${file}.vue`).default
    } else if (process.env.NODE_ENV === 'production') { //生产环境
        return () => import(`@/${viewPath}/${file}.vue`)
    }
}
