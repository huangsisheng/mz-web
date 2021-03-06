import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

import user  from "./modules/user";
import city from "./modules/city";
export default new Vuex.Store({
    modules:{
        user: user,
        city: city,
    },
	state: {
        countnum:0
	},
	mutations: {
        incream(state){
            state.countnum++
        }
	},
	actions: {

    },
    // 派生属性，相当于vuex的计算属性
    getters:{
        boom(state){
            return state.countnum
        }
    }
})
