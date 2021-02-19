<template>
    <div id="smoked-mask">
        <div id="modal">
            <div class="text-right display-4">
                <button @click="closeModal" id="close">X</button>
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
        </div>
    </div>
</template>

<script>
export default {
    name: "ModalUserConfig",
    methods:{
        closeModal: function(){
            this.$emit("closeModal")
            this.$destroy()
        }
    },
    
}
</script>

<style scoped>
#smoked-mask{
    box-sizing: border-box;
    position: absolute;
    width: 100vw;
    height: 110vh!important;
    background: rgba(112, 112, 112, 0.5);
    z-index: 50;
    backdrop-filter: blur(2px);
    -webkit-backdrop-filter: blur(2px);
}


#smoked-mask > div#modal{
    background-color: #35373E;
    position: fixed;
    top: 50%;
    left: 50%;
    padding: 1em;
    /* bring your own prefixes */
    transform: translate(-50%, -50%);
    border-radius: 1em;
}

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

button:hover{
    cursor: pointer;
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