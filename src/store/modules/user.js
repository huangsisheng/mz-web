import * as types from "../mutation_types";
import { getToken } from "utils/auth";
const user = {
    state:{
        token:''
    },
    mutations:{
        [types.SET_TOKEN]: (state,token) => {
            state.token = token
        }
    },
    actions:{
        // 登陆
        login({commit}){
            return new Promise((resolve,reject) => {
                try {
                    commit(types.SET_TOKEN, 'token')
                    resolve()
                } catch (error) {
                    reject(error)
                }
            })
        },
        // 退出
        logout(){
            return new Promise((resolve, reject) => {
                try {
                    resolve()
                } catch (error) {
                    reject(error)
                }
            })
        }
    }
}
export default user