import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        theNext: "",
        theOne: "",
        theLast: "",
        allUsers: ""
    },
    mutations: {
        GET_ALL_USERS(state, allUsers){
            state.allUsers = allUsers
        },
        GET_PODIUM(state, threeUsers){
            const {theNext, theOne, theLast} = threeUsers;
            state.theNext = theNext
            state.theOne = theOne
            state.theLast = theLast
        }
    },
    actions: {
        getAllUsers(context){
            console.log('tamo aqui')
            fetch("http://localhost:3300/users/")
                .then(r => r.json())
                .then(r => context.commit('GET_ALL_USERS', r))
        },
        getPodium(context){
            console.log('tamo aqui getPodium')
            fetch("http://localhost:3300/")
                .then(r => r.json())
                .then(r => {
                    context.commit('GET_PODIUM', r)
                })
        },
        
    }
})