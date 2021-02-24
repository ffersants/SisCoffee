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
        ATUALIZA_PODIUM(state, threeUsers){
            const [theNext, theOne, theLast] = threeUsers;
            state.theNext = theNext
            state.theOne = theOne
            state.theLast = theLast
            console.log(state.theLast, state.theNext, state.theOne)
        }
    },
    actions: {
        buscaPodium(context){
            fetch("http://localhost:3300/")
                .then(r => r.json())
                .then(r => context.commit(r))
        }
    }
})