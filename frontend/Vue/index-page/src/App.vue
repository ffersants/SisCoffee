<template>
  <div id="app">
    <HeaderDefault>
      <i @click="userConfig = !userConfig" id="user-config" class="fas fa-users-cog"></i>
      <i id="list-users" class="fas fa-list"></i>
    </HeaderDefault>
    <list-users-index></list-users-index>
    <transition name=""> 
      <modal-user-config @closeModal="userConfig = !userConfig" v-if="userConfig"></modal-user-config>
    </transition>
  </div>
</template>

<script>
import ListUsersIndex from './components/ListUsersIndex.vue'
import HeaderDefault from './components/HeaderDefault.vue'
import ModalUserConfig from './components/ModalUserConfig.vue'
export default {
  name: 'App',
  data(){
    return{
      userConfig: false
    }
  },
  components: {
    HeaderDefault,
    ListUsersIndex,
    ModalUserConfig
  },
  methods: {
    fechado: function(){
      console.log("close btn was clicked")
    }
  }
}
</script>

<style>

</style>
