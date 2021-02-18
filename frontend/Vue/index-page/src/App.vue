<template>
  <div id="app">
    <HeaderDefault>
      <i id="user-config" class="fas fa-users-cog"></i>
      <i id="list-users" class="fas fa-list"></i>
    </HeaderDefault>
    <list-users-index></list-users-index>
  </div>
</template>

<script>
import ListUsersIndex from './components/ListUsersIndex.vue'
import HeaderDefault from './components/HeaderDefault.vue'

export default {
  name: 'App',
  components: {
    HeaderDefault,
    ListUsersIndex
  }
}
</script>

<style>

</style>
