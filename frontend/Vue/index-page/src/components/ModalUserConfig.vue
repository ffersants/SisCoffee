<template>
    <modal-default>
            <div class="text-right display-4">
                <span @click="closeModal" id="close">X</span>
            </div>
            <section>
                <h1>ESCOLHA UMA <br>OPÇÃO</h1>
                <router-link to="sign-up">
                    Adicionar usuário
                </router-link>
               
                <router-link to="remove-user">
                    Remover usuário
                </router-link>
            </section>
    </modal-default>
</template>

<script>
import {EventBus} from '../event-bus.js'
import ModalDefault from './ModalDefault.vue';
export default {
    name: "ModalUserConfig",
    components:{
        ModalDefault
    },
    methods:{
        closeModal: function(){
            EventBus.$emit('closeUserConfig')
        }
    },
    
}
</script>

<style scoped>


</style>