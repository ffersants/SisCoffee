<template>
    <b-container>
        <b-row>
            <b-col cols="6">
                <button @click="cancel" id="cancel">Cancelar</button>
            </b-col>
            <b-col cols="6">
                <button id="confirm">Confirmar</button>
            </b-col>
        </b-row>
    </b-container>
</template>

<script>
export default {
    name: "ConfirmCancelBtns",
    methods: {
        cancel: function(){
            this.$emit("cancel")
        }
    }
}
</script>

<style scoped>
    button{
        font-family: "Candara";
        background-color: #414141;
        font-size: 1.8em;
        padding: .3em 3em;
        border-radius: 1em;
        
    }

    #cancel{
        border: 2px solid #FF0000;
    }

     #confirm{
        border: 2px solid #31FF00;
    }

    #confirm:active{
        background-color: rgba(49, 225, 0, .3);
        transition: background .5s out;
    }

    #cancel:active{
        background-color: rgba(255, 0, 0, .3)
    }
</style>