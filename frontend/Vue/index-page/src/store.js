import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        userInAction: "", 
        userInActionTable: "",
        userInSurplusTable: ""
    },
    mutations: {
        UPDATE_USER_IN_ACTION(state, userInfo){
            state.userInAction = userInfo
        }, 
        UPDATE_USER_IN_ACTION_TABLE(state, userInfo){
            state.userInActionTable = userInfo
        }, 
        UPDATE_USER_IN_SURPLUS_TABLE(state, userInfo){
            state.userInSurplusTable = userInfo
        }
    },
    actions: {
        setUserInAction(context, userInfo){
            context.commit('UPDATE_USER_IN_ACTION', userInfo);
        },
        setUserInActionTable(context, userInfo){
            context.commit('UPDATE_USER_IN_ACTION_TABLE', userInfo);
        },
        setUserInSurplusTable(context, userInfo){
            context.commit('UPDATE_USER_IN_SURPLUS_TABLE', userInfo);
        }
    }
})