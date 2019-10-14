import Vue from 'vue'
import Router from 'vue-router'
import _import from './_import'
import store from "store";
Vue.use(Router)

const router = new Router({
    routes: [
        {
            name: '',
            path: '/',
            component: _import('films/index'),
            redirect:'/films'
        },
        {
            name:'films',
            path:'/films',
            component: _import('films/index'),
            meta:{
                title:'电影',
                keepAlive:false,
                // requireAuth: true, //登陆权限

            },
            redirect:'films/nowPlaying',
            children:[
                {
                    name: 'nowPlaying',
                    path: 'nowPlaying',
                    component: _import('films/nowPlaying'),
                    meta:{
                        title:'电影',
                        showtabbar:true,
                        keepAlive:false,
                        // requireAuth: true, //登陆权限

                    },
                },
                {
                    name: 'comingSoon',
                    path: 'comingSoon',
                    component: _import('films/comingSoon'),
                    meta: {
                        title: '电影',
                        showtabbar: true,
                        keepAlive: false,
                        // requireAuth: true, //登陆权限

                    },
                }

            ]
        },
        {
            name: 'fDetails',
            path: '/films/fDetails',
            component: _import('films/fDetails'),
            meta: {
                title: '电影详情',
                showtabbar: false,
                keepAlive: false,
                // requireAuth: true, //登陆权限
            }
        },
        {
            name: 'cinemas',
            path: '/cinemas',
            component: _import('cinemas/index'),
            meta: {
                title: '影院',
                showtabbar: true,
                keepAlive: false,
                // requireAuth: true, //登陆权限
            }
        },
        {
            name: 'mz-act',
            path: '/mz-act',
            component: _import('mz-act/index'),
            meta: {
                title: '咨询',
                showtabbar: false,
                keepAlive: false,
                // requireAuth: true, //登陆权限

            }
        },
        {
            name: 'center',
            path: '/center',
            component: _import('center/index'),
            meta: {
                title: '我的',
                showtabbar: true,
                keepAlive: false,
                // requireAuth: true, //登陆权限

            }
        },
        {
            name: 'city',
            path: '/city',
            component: _import('city/index'),
            meta: {
                title: '选择城市',
                keepAlive: false,
                // requireAuth: true, //登陆权限

            }
        },
        {
            name: 'login',
            path: '/login',
            component: _import('login/index'),
            meta: {
                title: '登陆',
                keepAlive: false,
                // requireAuth: true, //登陆权限
            }
        },
        {
            name: 'register',
            path: '/register',
            component: _import('register/index'),
            meta: {
                title: '注册',
                keepAlive: false,
                // requireAuth: true, //登陆权限
            }
        },
        // { path: '*', redirect: '/404', hidden: true }
    ],

    scrollBehavior(to, from, savedPosition) {
        setTimeout(() => {
            window.scrollTo(0, 0)
        }, 0)
        // 页面是内容是通过网络请求之后再渲染的,所以设置一个延时加载，等到网络请求完毕再调用滚动操作
        // return { x: 0, y: 0 }
    }
})
router.beforeEach((to, from, next) => {
    const title = to.meta.title
    if(title){
        document.title = title
    }
    if (to.matched.some(record => record.meta.requiresAuth)) {
        // this route requires auth, check if logged in
        // if not, redirect to login page.
        if (!store.state.user.token) {
            next({
                path: '/login',
                query: { redirect: to.fullPath }
            })
        } else {
            next()
        }
    } else {
        next() // 确保一定要调用 next()
    }
})
export default router