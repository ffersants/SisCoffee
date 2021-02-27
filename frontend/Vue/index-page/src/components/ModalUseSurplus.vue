<template>
    <modal-base>
        <div id="use-surplus">
            <h1>SALDO POSITIVO</h1>

            <div id="main">
            <p>
                Foi identificado que este usuário possui saldo disponível
            </p>

            <p>
                Gostaria de utilizá-lo para registrar essa compra?
            </p>

            <b-container>
                <b-row id="row-with-btns" class="mb-1">
                    <b-col cols="6">
                        <button 
                            @click="no()" 
                            id="no"
                        >
                            Não
                        </button>
                    </b-col>
                    
                   

                    <b-col cols="6">
                        <button  
                            @click="yes()"
                            id="yes"
                        >
                            Sim
                        </button>
                    </b-col>  
                </b-row>
            </b-container>
            </div>
        </div>
    </modal-base>
</template>

<script>
import {EventBus} from '../event-bus.js'
import ModalBase from './ModalBase.vue'
export default {
    name: "ModalUseSurplus",
    methods: {
        no(){
            EventBus.$emit("dontUseSurplus")
            this.$destroy()
        },
        yes(){
            EventBus.$emit("yesUseSurplus")
            this.$destroy()
        }
    },
    components: {
        ModalBase
    }
}
</script>

<style scoped>
    #use-surplus{
        padding: 1em;       
    }

    #use-surplus h1{
        font-size: 3em;
    }
    
    #use-surplus p{
        margin: 0!important;
        padding: 0!important;
        text-align: center;
    }

    p,
    button{
        font-size: 1.5em!important;
    }

    i{
        color: #F0A82E!important;
    }

    #main{
        margin-top: 5%;
    }

    #main p{
        font-size: 1.5em!important;
        margin-bottom: 5%!important;
    }

    button{
        display: block;
        margin-left: auto;
        margin-right: auto;
        width: 100%;
        border-radius: 2em;
        padding: .5em 2em;
        font-size: 1.8em;
    }

    #no{
        border: 1px solid #FF0000;
    }

    #yes{
        border: 1px solid #31FF00;
    }

    @media (max-width: 575.98px) { 
        #use-surplus{
            padding: 1em -1em;  
            width: 100vw;   
            font-size: .7rem;   
        }
         #use-surplus p{
            font-size: 1.7em!important;
        }
    }


    @media (min-width: 576px) and (max-width: 767.98px) { 
        #use-surplus{ 
            width: 70vw;  
            font-size: .7rem;      
        }
        #use-surplus p{
            font-size: 2em;
        }
     }


    @media (min-width: 768px) and (max-width: 991.98px) { 
        #use-surplus{ 
            width: 60vw;   
            font-size: .8rem;  
        }

        #use-surplus p{
            font-size: 1.3em;
        }
     }


</style>