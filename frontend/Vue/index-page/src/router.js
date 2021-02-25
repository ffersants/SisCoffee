import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router)

import Inicial from './views/Inicial.vue'
import ListUsers from './views/ListUsers.vue'
import RemoveUser from './views/RemoveUser.vue'
import SignUp from './views/SignUp.vue'

export default new Router({
    mode: "history",
    routes: [
        {
            path: '/', 
            component: Inicial
        },
        {
            path: '/list-users', 
            component: ListUsers
        },
        {
            path: '/remove-user',
            component: RemoveUser
        },
        {
            path: '/sign-up',
            component: SignUp
        }
      
    ]
})