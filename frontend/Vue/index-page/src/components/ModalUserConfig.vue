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

div#modal > div {
    color: #F2F2F2;
    font-size: 1.5em;
}

section{
    text-align: center;
    padding: 0.5em 3em;
}

h1{
    white-space: nowrap;
    font-size: 1.8em;
}

a{
    display: block;
    background-color:#414141;
    border: 1px solid #707070;
    border-radius: 1.5em;
    margin-left: auto;
    margin-right: auto;
    width: 100%;
    padding: 0.8em 1.5em;
    color: rgb(241, 229, 209);
    font-size: 1.3em;
    font-family: Candara;
    margin-top: 2em;
    margin-bottom: 2em;
    transition: all .3s;
}

span:hover{
    cursor: pointer;
}

a:hover{
    transform: translateY(-2px)!important;
    box-shadow: 0 5px 10px rgba(0, 0, 0, 0.2);
    color: #F1E5D1;
}

a:active{
    transform: translateY(3px);
}

@media (max-width: 900px) {
    section > button{
        margin-top: 1em!important;
        margin-bottom: 1em!important;
        padding: 0.4em 1em;
    }
  
}

@media (min-width: 767.98px){
    section > button{
        font-size: 1.3em;
    }
    h1{
        font-size: 2.5em;
    }
}

</style>