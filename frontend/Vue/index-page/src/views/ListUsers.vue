<template>
    <div id="app" >
        <header>
            <HeaderDefault>
                <router-link to="/">
                    <i class="fas fa-arrow-left"></i>
                </router-link>
            </HeaderDefault>
            <h1 class="pt-1">PAINEL DE VISUALIZAÇÃO</h1>
        </header>
    </div>
</template>

<script>
// import {EventBus} from '../event-bus.js'

import HeaderDefault from '../components/HeaderDefault.vue'

export default {
    components: {
        HeaderDefault,
    }
}
</script>

<style scoped>
    *{
        margin: 0;
        padding: 0;
    }
    #app{
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    header{
        text-align:center;
        position: absolute;
        top: 0;
        width: 100%;
    }

</style>