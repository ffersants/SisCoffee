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

.v-enter-active,
.v-leave-active{
    transition: all .3s;
}

.v-enter,
.v-leave-to{
    opacity: 0;
    filter: blur(0.7em);
}

.v-leavbe,
.v-enter-to{
    filter: blur(0);
    opacity: 1;
}




</style>