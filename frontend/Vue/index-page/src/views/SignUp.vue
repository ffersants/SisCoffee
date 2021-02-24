<template>
    <div id="sign-up">
        <Header-Default>
            <router-link to="/">
                <i class="fas  fa-arrow-left"></i>
            </router-link>
        </Header-Default>
        
        <h1 class="mt-4 mb-4">FICHA DE CADASTRO</h1>

        <b-container>
            <b-row id="second-row" class="text-center">
                <b-col cols="6">
                    <div>
                        <input placeholder="Nome" id="userName" type="text">
                        <label for="userName">Nome</label>
                    </div>
                </b-col>

                <b-col cols="6">
                    <div>
                        <input placeholder="Seção" id="userSection" type="password">
                        <label for="userSection">Seção</label>
                    </div>
                </b-col>
            </b-row>

    
            <h2>Data de cadastro</h2>
               
            <h1>{{currentDate}}</h1>

            <confirm-cancel-btns></confirm-cancel-btns>
        
        </b-container>

        <div id="modal-area">
            <transition>
                <modal v-if="showModal">
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
</template>

<script>
    import {EventBus} from '../event-bus.js'
    import HeaderDefault from '../components/HeaderDefault.vue'
    import ConfirmCancelBtns from '../components/ConfirmCancelBtns.vue'
    import Modal from '../components/Modal.vue'

    export default {
        components: {
            HeaderDefault,
            ConfirmCancelBtns,
            Modal
        },
        data(){
            return{
                surplus: 0,
                translateValue: "translate(56 27)",
                showModal: false,
                showingModal: false  
            }
        },
        methods:{
            addSurplus: function(){
            if(this.surplus > 8){
                this.translateValue="translate(50 27)"
            }
                this.surplus += 1
            }
        },
        computed: {
            currentDate(){
                return new Date().toLocaleDateString('pt-br', {
                    dateStyle: "short"
                })
            },
        },
        created(){
            EventBus.$on("confirmClicked", () => {
                this.showModal = true;
                this.showingModal = true;
            }),
            EventBus.$on("closeModal", () => {
                if(this.$route.path === "/sign-up" && this.showingModal === false) {
                    this.$router.push("/")
                } else{
                    this.showModal = false;
                    this.showingModal = false
                }
            })
            
        }
    }
</script>

<style scoped>

    p, h1, h2, label, span{
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
     #second-row div{
        margin-top: 1em;
    }

    label{
        display: block;
        z-index: 20;
        text-align: left;
        font-size: 1.5em;
        transform: translateY(-1.9em);
        padding-left: .8em;
        transform-origin: 0 0;
        transition: all .3s;
    }

    #second-row input{
        box-sizing: border-box;
        width: 100%;
        padding: .2em .7em;
        background-color: #414141;
        border: 1px solid #707070; 
        font-size: 1.8em;
        border-radius:.7em;
        position: relative;
        transition: all .5s;
    }

    input::placeholder{
        color: transparent;
    }

    #second-row input:focus{
        border: 1px solid #8f8f8f;
        outline:none;
    }

    #second-row input:focus-within{
        transform: scale(1.05, 1.05)
    }
   
    #second-row input:focus + label,
    input:not(:placeholder-shown) + label{
        transform: translateY(-4em) translateX(-.5em) scale(.9)          
    }


    #add-surplus small{
        display: block;
        font-size: 1.3em;
    }

    #add-surplus p{
        font-size: 1.5em;
    }

    #coffee-icon:hover{
        cursor: pointer;
    }
</style>