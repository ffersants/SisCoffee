import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        userInAction: ""
    },
    mutations: {
        UPDATE_USER_IN_ACTION(state, userInfo){
            state.userInAction = userInfo
        }
    },
    actions: {
        setUserInAction(context, userInfo){
            context.commit('UPDATE_USER_IN_ACTION', userInfo);
        }        
    }
})