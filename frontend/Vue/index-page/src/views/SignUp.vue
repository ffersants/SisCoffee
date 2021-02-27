<template>
    <transition name="sign-up">
        <div id="sign-up" class="text-center"> 
        <Header-Default title="FICHA DE CADASTRO">
            <router-link to="/">
                <i class="fas  fa-arrow-left"></i>
            </router-link>
        </Header-Default>
        <form novalidate="true" id="form-sign-up" v-on:submit.prevent="checkFormSignUp()">
            <b-container class="text-center">
                <b-row id="first-row" class="text-center">
                    <b-col cols="12" md="6">
                        <div class="holds-input">
                            <input 
                            v-model="name"  
                            autocomplete="off" 
                            placeholder="Nome" 
                            id="userName" 
                            type="text">
                            <label for="userName">Nome</label>
                        </div>
                    </b-col>

                    <b-col cols="12" md="6">
                        <div class="holds-input">
                            <input 
                                v-model="section" 
                                autocomplete="off" 
                                placeholder="Seção" 
                                id="userSection" 
                                type="text">
                            <label for="userSection">Seção</label>
                        </div>
                    </b-col>
                </b-row>

                <p id="is-invalid" class="invalid-message invalid-inactive" >
                    Certifique-se de que todos os campos estão preenchidos
                </p>
        
                <h2>Data de cadastro</h2>
                
                <h1 id="date">{{signUpDate}}</h1>

                <b-row>
                    <b-col cols="6">
                        <button type="reset" class="btn-in-signup" @click="cancelSignUp()" id="cancel-signup">
                            Cancelar
                        </button>
                    </b-col>
                    <b-col cols="6">
                        <button class="btn-in-signup" type="submit" id="confirm-signup">
                            Confirmar
                        </button>
                    </b-col>
                </b-row>
            </b-container>
        </form>
        <div id="modal-area">
            <transition>
                <success-alert 
                description="Usuário cadastrado com sucesso!" 
                v-if="showSuccessAlert" 
                action="signUp">
                     <div id="icon-1">
                          <i class="fas fa-user-plus"></i>
                      </div>
                </success-alert>

                <modal v-if="showModal"
                    :reqBody="reqBody"
                    action="signUp"
                >
                    <div id="icon-1">
                        <svg xmlns="http://www.w3.org/2000/svg" width="57.747" height="45.934" viewBox="0 0 57.747 45.934">
                            <path id="coffee-solid" d="M17.272,68.091H34.594c4.782,0,8.661-4.409,8.661-9.843h2.887c6.37,0,11.548-5.885,11.548-13.124S52.513,32,46.143,32H10.776A2.322,2.322,0,0,0,8.61,34.461V58.248C8.61,63.682,12.49,68.091,17.272,68.091ZM46.143,38.562c3.185,0,5.774,2.943,5.774,6.562s-2.589,6.562-5.774,6.562H43.256V38.562Zm4.3,39.372H4.307c-4.295,0-5.5-6.562-3.248-6.562H53.686c2.256,0,1.065,6.562-3.239,6.562Z" transform="translate(0.056 -32)" fill="#f0a82e"/>
                            <path id="check-circle-regular" d="M22.459,8A14.459,14.459,0,1,0,36.918,22.459,14.459,14.459,0,0,0,22.459,8Zm0,2.8A11.661,11.661,0,1,1,10.8,22.459,11.654,11.654,0,0,1,22.459,10.8m8.174,7.6L29.32,17.069a.7.7,0,0,0-.989,0L20.089,25.24,16.6,21.726a.7.7,0,0,0-.989,0l-1.325,1.314a.7.7,0,0,0,0,.989l5.293,5.336a.7.7,0,0,0,.989,0L30.63,19.383a.7.7,0,0,0,0-.989Z" transform="translate(4 -5)" fill="#fff"/>
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
    import SuccessAlert from '../components/SuccessAlert.vue'
    import Modal from '../components/Modal.vue'

    export default {
        name: 'SignUp',
        data(){
            return{
                surplus: 0,
                translateValue: "translate(56 27)",
                showSuccessAlert: false,
                showModal: false,
                showingModal: false,
                name: "",
                section: "",
                signUpDate: ""
            }
        },
        computed: {
            reqBody(){
                return {
                    name: this.name.trim(), 
                    section: this.section.trim(), 
                    currentDate: this.signUpDate.trim()
                }
            }
        },
        methods:{
            addSurplus(){
            if(this.surplus > 8){
                this.translateValue="translate(50 27)"
            }
                this.surplus += 1
            },
            checkFormSignUp(){
                let isInvalid = document.getElementById("is-invalid");
                
                if(!this.name.trim() || !this.section.trim()){
                    isInvalid.classList.remove("invalid-inactive")
                    isInvalid.classList.add("invalid-active")
                    //clona o elemento
                    const isInvalidClone = isInvalid.cloneNode(true);
                    //substitui a si mesmo por seu clone, aplicando novamente a animação
                    isInvalid.parentNode.replaceChild(isInvalidClone, isInvalid);
                    
                    return false
                } else{
                    isInvalid.classList.remove("invalid-active")
                    isInvalid.classList.add("invalid-inactive")
                    
                    this.showModal = true
                    this.showingModal = true
                }
                
            },
            cancelSignUp(){
                this.$router.push('/')
            }
        },
        created(){
            this.signUpDate = new Date().toLocaleDateString('pt-br', {
                dateStyle: "short"
            })
            EventBus.$on("closeModal", () => {
                this.showModal = false;
                this.showingModal = false;
            })
            EventBus.$on("userCreated", () => {
                this.showModal = false;
                this.showingModal = false;
                this.showSuccessAlert = true;
            })               
            EventBus.$on("closeSuccessAlert", () => {
                console.log('bus chamado')
                this.name = ""
                this.section = ""
                this.showSuccessAlert = false;
            })
        },
        components: {
            HeaderDefault,
            SuccessAlert,
            Modal
        },
    }
</script>

<style scoped>

    label, div, input{
        color: #FFFFFF!important;
    }
    #sign-up, 
    #modal-area{
        width: 100%;
        text-align:center;
        position: absolute;
        top: 0;
        left:0;
    }

    #first-row div{
        margin-top: 1em;
    }

    label{
        display: block;
        z-index: 20;
        text-align: left;
        font-size: 1.5em;
        transform: translateY(-1.7em);
        padding-left: .8em;
        transform-origin: 0 0;
        transition: all .3s;
    }

    #first-row input{
        box-sizing: border-box;
        width: 100%;
        padding: .2em .7em;
        background-color: #414141;
        border: 1px solid #707070; 
        font-size: 1.3em;
        border-radius:.7em;
        position: relative;
        transition: all .5s;
    }

    input::placeholder{
        color: transparent;
    }

    #first-row input:focus{
        border: 1px solid #8f8f8f;
        outline:none;
    }

    #first-row input:focus-within{
        transform: scale(1.05, 1.05)
    }
   
    #first-row input:focus + label,
    input:not(:placeholder-shown) + label{
        transform: translateY(-3.3em) translateX(-.5em) scale(.9)          
    }

    .btn-in-signup{
        display: block;
        margin-left: auto;
        margin-right: auto;
        margin-bottom: 1em;
        width: 100%;
        border-radius: 2em;
        padding: .5em 2em;
    }

    #cancel-signup{
        border: 1px solid #FF0000;
      
    }

    #confirm-signup{
        border: 1px solid #31FF00;
     
    }

    #date{
        margin-bottom: 1em;
    }

    @media (min-width: 992px){
        .btn-in-signup{
            max-width: 400px;
            font-size: 1.5em;
        }

        .holds-input{
            max-width: 400px;
            margin-left: 4em;
        }
    }

    .sign-up-enter-active,
    .sign-up-leave-active{
        transition: opacity .4s;
    }

    .sign-up-enter,
    .sign-up-leave-to{
        opacity: 0;
    }

    .sign-up-leave,
    .sign-up-enter-to{
        opacity: 1;
    }
</style>