<template>
    <b-container>
        <b-row class="mb-1">
            <b-col cols="6">
                <button @click="cancel()" id="cancel">Cancelar</button>
            </b-col>
            <b-col cols="6">
                <button @click="confirm" id="confirm">Confirmar</button>
            </b-col>
        </b-row>
    </b-container>
</template>

<script>
import {EventBus} from '../event-bus.js'
export default {
    name: "ConfirmCancelBtns",
    methods: {
        cancel(){
            EventBus.$emit("closeModal")
            this.$destroy()
        },
        confirm(){
            EventBus.$emit("confirmClicked")
        }
    }
}
</script>

<style scoped>
    button{
        font-family: "Candara";
        background-color: #414141;
        font-size: 1.8em;
        font-size: 180%;
        border-radius: 1em;
        box-sizing: border-box;
        padding: 3%;
        width: 100%;
        max-width: 100%;
    }

    #cancel{
        border: 2px solid #FF0000;
    }

     #confirm{
        border: 2px solid #31FF00;
    }

    #confirm:active{
        background-color: rgba(49, 225, 0, .3);
        transition: background .1s;
    }

    #cancel:active{
        background-color: rgba(255, 0, 0, .3);
        transition: background .1s;
    }

     @media screen and (max-height: 600px)
    {
        *{
            font-size: 10px;
        }
        button{
            padding: 1%;
            width: 60%;
        }
    }
</style>