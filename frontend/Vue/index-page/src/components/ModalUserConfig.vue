<template>
  <modal-base>
    <div id="close" @click="closeModal"><span>X</span></div>

    <div id="modal-user-config">
      <div>
        <h1>
          ESCOLHA UMA <br />
          OPÇÃO
        </h1>
      </div>

      <section>
        <button @click="addUser()">Adicionar usuário</button>

        <button @click="removeUser()">Remover usuário</button>
      </section>
    </div>
  </modal-base>
</template>

<script>
import { EventBus } from "../event-bus.js";
import ModalBase from "./ModalBase.vue";

export default {
  name: "ModalUserConfig",
  methods: {
    closeModal() {
      EventBus.$emit("closeUserConfig");
    },
    addUser() {
      this.$router.push("/sign-up");
    },
    removeUser() {
      this.$router.push("/remove-user");
    },
  },
  components: {
    ModalBase,
  },
};
</script>

<style scoped>
#close {
  position: relative;
  margin-top: 1em;
  margin-right: 1em;
  text-align: right;
  font-size: 1.5rem;
}

#close:hover span {
  cursor: pointer;
}

#modal-user-config {
  font-size: 1.5rem;
  padding: 0 2em 2em 2em;
}

h1 {
  font-size: 180%;
}

span {
  cursor: pointer;
}

section button {
  display: block;
  margin-left: auto;
  margin-right: auto;
  border: 1px solid #707070;
  background-color: #414141;
  color: var(--light-coffee-color);
  border-radius: 2em;
  padding: 0.5em 2em;
}

section button:active {
  background-color: #fcab1f;
}

section button:nth-child(1) {
  margin-bottom: 1em;
  margin-top: 1em;
}
</style>