<template>
    <modal-default>
            <div class="text-right display-4">
                <span @click="closeModal" id="close">X</span>
            </div>
            <section>
                <h1>ESCOLHA UMA <br>OPÇÃO</h1>
                <button>
                    Adicionar usuário
                </button>
                <button>
                    Remover usuário
                </button>
            </section>
    </modal-default>
</template>

<script>
import ModalDefault from './ModalDefault.vue';
export default {
    name: "ModalUserConfig",
    components:{
        ModalDefault
    },
    methods:{
        closeModal: function(){
            this.$emit("closeModal")
            this.$destroy()
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

section > button{
    display: block;
    background-color:#414141;
    border: 1px solid #707070;
    border-radius: 1.5em;
    margin-left: auto;
    margin-right: auto;
    width: 100%;
    padding: 0.8em 1.5em;
    color: #F1E5D1;
    font-size: 1em;
    font-family: Candara;
    margin-top: 2em;
    margin-bottom: 2em;
}

span:hover{
    cursor: pointer;
}

button:hover{
    transform: translateY(-1px);
    box-shadow: 0 5px 10px rgba(0, 0, 0, 0.2);
}

button:active{
    transform: translateY(3px);
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