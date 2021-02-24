<template>
  <transition name="index">
        <div id="app">
        <HeaderDefault>
          <i @click="openUserConfig" id="user-config" class="fas fa-users-cog"></i>
          <router-link to="/list-users">
              <i id="list-users" class="fas fa-list"></i>
          </router-link>
        </HeaderDefault>
        
        <list-users-index></list-users-index>

        <transition>
          <modal-user-config v-if="showUserConfig"></modal-user-config>
          
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
  </transition>
</template>

<script>
import {EventBus} from '../event-bus.js'

import ListUsersIndex from '../components/ListUsersIndex.vue'
import HeaderDefault from '../components/HeaderDefault.vue'
import ModalUserConfig from '../components/ModalUserConfig.vue'
import Modal from '../components/Modal.vue'

export default {
  name: 'Index',
  data(){
    return{
      showUserConfig: false,
      showModal: false, 
      theNext: "", 
      theOne: "", 
      theLast: ""
    }
  },
  components: {
    HeaderDefault,
    ListUsersIndex,
    ModalUserConfig,
    Modal
  },
  methods: {
    openUserConfig(){
      EventBus.$emit("openUserConfig")
    }
  },
  created(){
    EventBus.$on('closeModal', () => {
      this.showModal = false;
    })
    EventBus.$on('openModal', () => {
      this.showModal = true;
    })
    EventBus.$on('openUserConfig', () => {
      this.showUserConfig = true;
    })
    EventBus.$on('closeUserConfig', () => {
      this.showUserConfig = false;
    })
  }
  ,
  beforeCreate(){
    fetch("http://localhost:3300/")
      .then(r => {
        if(!r.ok){
          throw new Error(r.statusText)
        } else{
          return r.json()
        }
      })
      .then(r => {
        console.log(r)
        const {theNext, theOne, theLast} = r;      
        this.theNext = theNext.name;
        this.theOne = theOne.name;
        this.theLast = theLast.name;
      })
      .catch(e => {
        console.log(e)
      })
  }, 
}
</script>

<style scoped>
    .index-enter-active,
    .index-leave-active{
        transition: opacity .4s;
    }

    .index-enter,
    .index-leave-to{
        opacity: 0;
    }

    .index-leave,
    .index-enter-to{
        transform: translateX(0);
        opacity: 1;
    }
</style>