import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router)

import Index from './views/Index.vue'
import ListUsers from './views/ListUsers.vue'
import RemoveUser from './views/RemoveUser.vue'
import SignUp from './views/SignUp.vue'

export default new Router({
    routes: [
        {
            path: '/', 
            component: Index
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