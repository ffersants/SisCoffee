<template>
    <div id="list-users" >
        <HeaderDefault>
            <router-link to="/">
                <i class="fas fa-arrow-left"></i>
            </router-link>
        </HeaderDefault>
            
        <h1 class="mt-4 mb-4">PAINEL DE VISUALIZAÇÃO</h1>
        
        <table-with-users :action="action">
        </table-with-users>
    </div>
</template>

<script>
import {EventBus} from '../event-bus.js'

import HeaderDefault from '../components/HeaderDefault.vue'
import TableWithUsers from '../components/TableWithUsers.vue'

export default {
    data(){
        return{
            action: 'pagar'
        }
    },
    components: {
        HeaderDefault,
        TableWithUsers,
    }
}
</script>

<style scoped>
    *{
        margin: 0;
        padding: 0;
    }
    #list-users{
        width: 100%;
        text-align:center;
        position: absolute;
        top: 0;
    }
   

</style>