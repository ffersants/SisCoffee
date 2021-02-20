<template>
    <transition>
        <div id="smoked-mask">
                <div :style="{width: widthRef + 'em'}" id="modal">
                    <slot></slot>
                </div>
            
        </div>
    </transition>
</template>

<script>
export default {
    name: "ModalDefault",
    props: {
        widthRef:{
            type: [String, Number]
        }
    }
}
</script>

<style scoped>

#smoked-mask{
    -webkit-box-sizing: border-box;
            box-sizing: border-box;
    position: absolute;
    width: 100vw;
    height: 100vh!important;
    background: rgba(112, 112, 112, 0.5);
    z-index: 50;
    backdrop-filter: blur(2px);
    -webkit-backdrop-filter: blur(2px);
    
}

#smoked-mask > div#modal{
    position:absolute;
    max-width: 100%;
   
    background-color: #35373E;
    top: 50%;
    left: 50%;
    /* bring your own prefixes */
    -webkit-transform: translate(-50%, -50%);
        -ms-transform: translate(-50%, -50%);
            transform: translate(-50%, -50%);
    padding: 1em;
    border-radius: 1em;
    box-sizing: border-box;
}

.v-enter-active,
.v-leave-active{
    -webkit-transition: all .3s;
    -o-transition: all .3s;
    transition: all .3s;
}

.v-enter,
.v-leave-to{
    opacity: 0;
    -webkit-filter: blur(0.7em);
            filter: blur(0.7em);
}

.v-leavbe,
.v-enter-to{
    -webkit-filter: blur(0);
            filter: blur(0);
    opacity: 1;
}




</style>