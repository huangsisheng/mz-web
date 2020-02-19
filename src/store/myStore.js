import Vue from 'vue'
import Vuex from './myvuex'
Vue.use(Vuex)

export default new Vuex.Store({
	state: {
        countnum:0
	},
	mutations: {
        incream(state){
            state.countnum++
        }
	},
	actions: {
        increamAsync({commit}){
            commit('incream')
        }
    },
    // 派生属性，相当于vuex的计算属性
    getters:{
        boom(state){
            return state.countnum
        }
    }
})
