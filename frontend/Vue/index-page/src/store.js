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
            // const [theNext, theOne, theLast] = threeUsers;
            // state.theNext = theNext
            // state.theOne = theOne
            // state.theLast = theLast
            // console.log(state.theLast, state.theNext, state.theOne)
        }
    },
    actions: {
        getUsers(context){
            console.log('tamo aqui')
            fetch("http://localhost:3300/users/")
                .then(r => r.json())
                .then(r => context.commit('GET_ALL_USERS', r))
        }
    }
})