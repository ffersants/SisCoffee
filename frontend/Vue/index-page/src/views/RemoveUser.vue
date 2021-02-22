<template>
    <div id="list-users" >
        <HeaderDefault>
            <router-link to="/">
                <i class="fas fa-arrow-left"></i>
            </router-link>
        </HeaderDefault>
            
        <h1 class="mt-4 mb-4">REMOVER USUÁRIO</h1>
        
        <table-with-users :action="action">
        </table-with-users>

        <div id="modal-area">
            <transition>
                <modal-default v-if="showAlert">
                    <div id="alert-error">
                        <h1 class="m">AÇÃO NEGADA</h1>
                        <i class="fas fa-times-circle"></i>
                        <p>não é possível remover um usuário <br> que possui saldo</p>
                        <button @click="showAlert = false">OK</button>
                    </div>
                </modal-default>
            </transition>
        </div>
    </div>
</template>

<script>
import {EventBus} from '../event-bus.js'

import HeaderDefault from '../components/HeaderDefault.vue'
import TableWithUsers from '../components/TableWithUsers.vue'
import ModalDefault from '../components/ModalDefault.vue'

export default {
    name: 'RemoveUser',
    data(){
        return{
            showAlert: false,
            action: 'remove'
        }
    },
    components: {
        HeaderDefault,
        TableWithUsers,
        ModalDefault
    },
    methods: {
        closeAlert(){
        }
    }
    ,
    created(){
        EventBus.$on("openAlert", () => {
            this.showAlert = true;
        })
    }
}
</script>

<style scoped>
    *{
        margin: 0;
        padding: 0;
    }
    #list-users, #modal-area{
        width: 100%;
        text-align:center;
        position: absolute;
        top: 0;
        left:0;
    }
</style>