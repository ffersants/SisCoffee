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
            type: Number
        }
    }
}
</script>

<style scoped>


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

.v-leav,
.v-enter-to{
    -webkit-filter: blur(0);
            filter: blur(0);
    opacity: 1;
}


</style>