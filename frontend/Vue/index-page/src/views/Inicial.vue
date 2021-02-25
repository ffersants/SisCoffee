<template>
    <transition name="list-users">
      <div id="index" >
          <HeaderDefault title="CAFÉ DO MÊS">
              <i @click="openUserConfig" id="user-config" class="fas fa-users-cog"></i>
          
              <i @click="goToListUsers" id="list-users" class="fas fa-list"></i>    
          </HeaderDefault>
            
          <div id="cards">
            <div id="container">
              <div class="card card-the-next">
                <p>Fulano de tal</p>
                <div id="coffee-icon">
                  <img src="../assets/coffee-cup.png" alt="">
                </div>
                <p>sua vez <br> está chegando </p>
                
              </div>

              <div class="card card-the-one">
                <p>Fulano de tal</p>
                <div id="coffee-icon">
                  <img src="../assets/coffee-cup.png" alt="">
                </div>

                <p>é a sua vez</p>

                <button id="pay-btn">
                  TÁ PAGO!
                </button>
              </div>
              
              <div class="card card-the-last">
                <p>Fulano de tal</p>
                <div id="coffee-icon">
                  <img src="../assets/coffee-cup.png" alt="">
                </div>
                <p>sua vez <br> já passou</p>
              </div>
            </div>
          </div>
          
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
    </transition>
</template>
<script>
import HeaderDefault from '../components/HeaderDefault.vue'
import Modal from '../components/Modal.vue'

export default {
  name: 'Inicial',
  data(){
    return{
      showModal: false
    }
  },
  methods: {
    goToListUsers(){
      this.$router.push('/list-users')
    }
  },
  components: {
    HeaderDefault,
    Modal
  }
}
</script>

<style scoped>
    *{
      margin: 0;
      padding: 0;
    }

    #index{
      height: 100vh;
      display:flex;
      flex-direction: column
    }

    #cards{
      width: 50em;
      font-family: var(--card-font-family);
      position: relative;
      margin: auto;
      bottom: 8%;
    }

    #container{
      display: grid;
      grid-template-rows: auto;
      grid-template-columns: .8fr 1fr .8fr;
    }

    .card{
      background-color: var(--light-coffee-color);
      border: none;
      text-align: center;
      font-size: 1.5em;
      height: fit-content;
      margin-top: auto;
      margin-bottom: auto;
      padding: 1em 0;
    }

    .card-the-next{
      border-radius: 1em 0em 0em 1em;
      border-right: 1em px solid #BBB09D;    
    }

    .card-the-last{
      border-radius: 0em 1em 1em 0em;
      border-left: 1em px solid #BBB09D; 
    }

    .card-the-next,
    .card-the-last
    {
      background-color: #BBB09D;
    }

    .card-the-one{
      border-radius: 1em; 
      font-size: 2em;
    }

    #pay-btn{
      background-color: #A35D2F;
      font-family: Candara;
      font-size: 1em;
      color: #F1E5D1;
      height: 30%;
      width: 70%;
      border-radius:1em;
      margin-left: auto;
      margin-right: auto;
      margin-top: 1em;
      margin-bottom: .6rem;
      transition: background .4s;
    }

    #pay-btn:hover{
      background-color: #b87446;
    }

    button#pay-btn:active{
      background-color: #A35D2F;
    }


    #coffee-icon > img{
      width: 4em;
    }

    @media (max-width: 575.98px) {
      #cards{
        width: 90%;
      }

      #container{
        font-size: .6rem 
      }
    }

    /* Small devices (landscape phones, 576px and up) */
    @media (min-width: 576px) and (max-width: 767.98px) {
      #cards{
        width: 90%;
      }

      #container{
        font-size: .8rem 
      }

      .card{
        padding: .6em;
      }

    }

    /* Medium devices (tablets, 768px and up) */
    @media (min-width: 768px) and (max-width: 991.98px) {
      #container{
        font-size: .8rem 
      }

      #cards{
        width: 90%;
      }

      .card{
        padding: .7em;
      }

    }

    /* Large devices (desktops, 992px and up) */
    @media (min-width: 992px) and (max-width: 1199.98px) {
     .card{
        padding: .8em;
      }
    }

    /* Extra large devices (large desktops, 1200px and up) */
    @media (min-width: 1200px) {
      #container{
        font-size: 1rem 
      }
    }

</style>