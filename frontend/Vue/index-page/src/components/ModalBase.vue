<template>
    <transition>
        <div id="makes-fullscreen">
            
            <div id="smoked-mask">
                <div id="modal">
                    <slot></slot>
                </div>
            </div>

        </div>
    </transition>
</template>

<script>
export default {
    name: "ModalBase"
}
</script>

<style scoped>

#makes-fullscreen{
    z-index:50;
    position:fixed;
    width:100%!important; 
    height:100%!important;
}

#smoked-mask{
    box-sizing: border-box;
    position: relative!important;
    width: 100%;
    height: 100%;
    background: rgba(112, 112, 112, 0.5);
    z-index: 50;
    backdrop-filter: blur(2px);
    -webkit-backdrop-filter: blur(2px);
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
}


#modal{
    width: fit-content;
    color: var(--modal-text-color);
    background-color: #35373E;
    border-radius: 1rem;
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

.v-leav,
.v-enter-to{
    -webkit-filter: blur(0);
            filter: blur(0);
    opacity: 1;
}


</style>