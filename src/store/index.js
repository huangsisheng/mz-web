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
	},
	mutations: {

	},
	actions: {

	}
})
