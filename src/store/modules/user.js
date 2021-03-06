import * as types from "../mutation_types";
import { removeToken,setToken,getToken } from "utils/auth";
import storage from "utils/storage";
import { login, register, reset} from 'api'
import { showToast} from 'utils/toast'
import router from 'router'
import { encryption } from "utils/crypto";

const user = {
    state:{
        // 防止刷新页面重新登录
        token: getToken('token'),
        username: storage.get('user')
    },
    mutations:{
        [types.SET_TOKEN]: (state,user) => {
            state.token = user.token
            state.username = user.username
            setToken(user.token)
        },
        [types.REMOVE_TOKEN]: (state) => {
            state.token = ''
            removeToken('token')
            router.replace({
                path: '/'
            })
            storage.remove('user')
            state.username = ''
        },
        [types.RESET_PASS]: (state) => {

        }
    },
    actions:{
        // 登陆
        login({commit},payload){
            return new Promise(async (resolve,reject) => {
                try {
                    var userInfo = { password: payload.password }
                    const encryptData = encryption({
                        data: userInfo,
                        key: '1234567887654321',
                        param: ['password']
                    })
                    let params = {
                        name: payload.phone,
                        pass: encryptData.password,
                        grant_type:'password'
                    }
                    const res = await login(params)
                    
                    if (res.code !== 0){
                        showToast(res.msg)
                        router.replace({ //跳转到注册页面
                            path: '/register',
                            query: { redirect: router.currentRoute.fullPath } 
                        })
                    }else{
                        commit('SET_TOKEN', { token: res.token, username:res.username})
                        storage.set('user', res.username)
                        resolve()
                        router.replace({ //跳转到首页
                            path: '/',
                            query: { redirect: router.currentRoute.fullPath }
                        })
                    }
                } catch (error) {
                    reject(error)
                }
            })
        },
        // 注册
        register({commit},payload){
            return new Promise(async (resolve,reject) => {
                try {
                    var userInfo = { password: payload.password }
                    const encryptData = encryption({
                        data: userInfo,
                        key: '1234567887654321',
                        param: ['password']
                    })
                    let params = {
                        name: payload.phone,
                        pass: encryptData.password,
                        grant_type: 'password'
                    }
                    /* let params = {
                        name: payload.phone,
                        pass: payload.password
                    } */
                    const res = await register(params)
                    if (!res.success){
                        showToast(res.msg)
                    }else{
                        resolve()
                    }
                    router.replace({ //跳转到登录页面
                        path: '/login',
                        query: { redirect: router.currentRoute.fullPath } // 将跳转的路由path作为参数，登录成功后跳转到该路由
                    })
                } catch (error) {
                    reject(error)
                }
            })
        },
        // 退出
        logout({commit}){
            return new Promise((resolve, reject) => {
                try {
                    commit('REMOVE_TOKEN')
                    resolve()
                } catch (error) {
                    reject(error)
                }
            })
        },
        // 重置密码
        resetPass({commit},payload){
            return new Promise(async (resolve,reject) => {
                try {
                    var userInfo = { password: payload.newPassword }
                    const encryptData = encryption({
                        data: userInfo,
                        key: '1234567887654321',
                        param: ['password']
                    })
                    let params = {
                        name: payload.phone,
                        pass: encryptData.password,
                        grant_type: 'password'
                    }
                    let res = await reset(params)
                    showToast(res.msg)

                    if(res.code === 0){
                        router.replace({ //跳转到登录页面
                            path: '/',
                        })
                    }
                    commit('REMOVE_TOKEN')
                } catch (error) {
                    reject(error)
                }
            })
        }
    }
}
export default user