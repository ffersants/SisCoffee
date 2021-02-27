import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        userInAction: "", 
        userInActionTable: "",
    },
    mutations: {
        UPDATE_USER_IN_ACTION(state, userInfo){
            state.userInAction = userInfo
        }, 
        UPDATE_USER_IN_ACTION_TABLE(state, userInfo){
            state.userInActionTable = userInfo
        }, 
    },
    actions: {
        setUserInAction(context, userInfo){
            context.commit('UPDATE_USER_IN_ACTION', userInfo);
        },
        setUserInActionTable(context, userInfo){
            context.commit('UPDATE_USER_IN_ACTION_TABLE', userInfo);
        }
    }
})