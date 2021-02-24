<template>
    <transition name="remove-user">
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
       

            
                <modal v-if="showModal">
                    <div id="icon-1">
                        <svg  xmlns="http://www.w3.org/2000/svg" width="74.227" height="56.933" viewBox="0 0 74.227 56.933">
                            <path id="user-times-solid" d="M68.39,26.687l5.289-5.071a1.74,1.74,0,0,0,0-2.535l-2.645-2.535a1.927,1.927,0,0,0-2.645,0L63.1,21.617l-5.289-5.071a1.927,1.927,0,0,0-2.645,0l-2.645,2.535a1.74,1.74,0,0,0,0,2.535l5.289,5.071-5.289,5.071a1.74,1.74,0,0,0,0,2.535l2.645,2.535a1.927,1.927,0,0,0,2.645,0L63.1,31.758l5.289,5.071a1.927,1.927,0,0,0,2.645,0l2.645-2.535a1.74,1.74,0,0,0,0-2.535ZM25.983,28.466c8.2,0,14.847-6.372,14.847-14.233S34.183,0,25.983,0,11.135,6.372,11.135,14.233,17.782,28.466,25.983,28.466Zm10.393,3.558H34.438a20.984,20.984,0,0,1-16.912,0H15.59C6.983,32.025,0,38.719,0,46.97V51.6a5.458,5.458,0,0,0,5.568,5.337H46.4A5.458,5.458,0,0,0,51.965,51.6V46.97C51.965,38.719,44.982,32.025,36.376,32.025Z" fill="#f7b74a"/>
                        </svg>
                    </div>
                </modal>
         
            </transition>
        </div>
    </div>
    </transition>
</template>

<script>
import {EventBus} from '../event-bus.js'

import HeaderDefault from '../components/HeaderDefault.vue'
import TableWithUsers from '../components/TableWithUsers.vue'
import ModalDefault from '../components/ModalDefault.vue'
import Modal from '../components/Modal.vue'

export default {
    name: 'RemoveUser',
    data(){
        return{
            showModal: false,
            showAlert: false,
            action: 'remove'
        }
    },
    components: {
        HeaderDefault,
        TableWithUsers,
        ModalDefault, 
        Modal
    },
    methods: {
        closeAlert(){
        }
    }
    ,
    created(){
        EventBus.$on("openAlert", () => {
            this.showAlert = true;
        }),
        EventBus.$on("openModal", () => {
            this.showModal = true;
        }),
         EventBus.$on("closeModal", () => {
            this.showModal = false;
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

    .remove-user-enter-active,
    .remove-user-leave-active{
        transition: opacity .4s;
    }

    .remove-user-enter,
    .remove-user-leave-to{
        opacity: 0;
    }

    .remove-user-leave,
    .remove-user-enter-to{
        opacity: 1;
    }
</style>