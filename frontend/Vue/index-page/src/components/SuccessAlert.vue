<template>
    <modal-base>
        <div id="alert-success">
            <h1>AÇÃO REALIZADA</h1>
            <!-- icon -->
            <slot></slot>
            <b-container>
                <b-row id="first-row" class="text-center">
                    <b-col cols="5">
                        <p>Nome</p>
                        <!-- <p>Fernando Santos</p> -->
                        <p>{{userInAction.name}}</p>
                    </b-col>
                    <b-col cols="2">
                        <p>Seção</p>
                        <!-- <p>SSTM</p> -->
                        <p>{{userInAction.section}}</p>
                    </b-col>
                    <b-col cols="5">
                        <div v-if="action == 'payment' || action == 'signup'">
                            <p>Data do pagamento</p>
                            <!-- <p>28/08/2000</p> -->
                            <p>{{userInAction.currentDate}}</p>
                        </div>
                        <div v-else>
                            <p>Data do cadastro</p>
                            <!-- <p>28/08/2000</p> -->
                            <p>{{userInAction.signUpDate}}</p>
                        </div>
                    </b-col>
                </b-row>
            </b-container>
            
            <div id="main">
                <p>{{description}}</p>
                <button @click="closeSuccessAlert()">OK</button>
            </div>

            

        </div>
    </modal-base>
</template>

<script>
import {mapState} from 'vuex'
import {EventBus} from '../event-bus.js'

import ModalBase from './ModalBase.vue'

export default {
    props: {
        action: {
            type: String
        },
        description: {
            type: String,
            required: true
        },
    },
    methods: {
        closeSuccessAlert(){
            this.$destroy()
            EventBus.$emit("closeSuccessAlert")
        }
    },
    computed: mapState(['userInAction']),
    components: {
        ModalBase
    },
}
</script>

<style scoped>
     #alert-success{
        padding: 1em;  
        width: 60vw;      
    }

    #alert-success h1{
        font-size: 3em;
    }
    
    p{
        margin: 0!important;
        padding: 0!important;
        text-align: center;
        font-size: 1.5em!important;
    }

    p:nth-child(2){
        font-size: 1.5em!important;
    }

    i{
        color: #F0A82E!important;
    }

    #main{
        margin-top: 5%;
    }

    #main p{
        font-size: 1.8em!important;
        margin-bottom: 5%!important;
    }

    @media (max-width: 575.98px) { 
        #alert-success{
            padding: 1em -1em;  
            width: 100vw;   
            font-size: .7rem;   
        }
    }


    @media (min-width: 576px) and (max-width: 767.98px) { 
        #alert-success{ 
            width: 90vw;     
        }
     }


    @media (min-width: 768px) and (max-width: 991.98px) { 
        #alert-success{ 
            width: 90vw;   
            font-size: .8rem;  
        }
     }


    @media (min-width: 992px) and (max-width: 1199.98px) {  }


    @media (min-width: 1200px) {  }   


</style>