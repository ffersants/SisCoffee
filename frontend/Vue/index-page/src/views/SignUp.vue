<template>
	<transition name="sign-up">
		<div id="sign-up" class="text-center">
			<Header-Default title="FICHA DE CADASTRO">
				<router-link to="/">
					<i class="fas fa-arrow-left"></i>
				</router-link>
			</Header-Default>

			<form
				novalidate="true"
				id="form-sign-up"
				v-on:submit.prevent="checkFormSignUp()"
			>
				<b-container class="text-center">
					<b-row id="first-row" class="text-center">
						<b-col cols="12" md="6">
							<div class="holds-input">
								<input
									ref="autoFocus"
									v-model="name"
									autocomplete="off"
									placeholder="Nome"
									id="userName"
									type="text"
								/>

								<label for="userName">Nome</label>
							</div>
						</b-col>

						<b-col cols="12" md="6">
							<div class="holds-input">
								<input
									v-model="section"
									autocomplete="off"
									placeholder="Seção"
									id="userSection"
									type="text"
								/>

								<label for="userSection">Seção</label>
							</div>
						</b-col>
					</b-row>

					<div id="holdsEmailInput">
						<input
							type="email"
							v-model="email"
							placeholder="E-mail"
							id="userEmail"
							@input="verifyEmail"
						/>

						<label for="userEmail">E-mail</label>
					</div>
					<p id="is-invalid" class="invalid-message invalid-inactive">
						Certifique-se de que todos os campos estão devidamente preenchidos
					</p>

					<h2>Data de cadastro</h2>

					<h1 id="date">{{ signUpDate }}</h1>

					<b-row>
						<b-col cols="6">
							<button
								type="reset"
								class="btn-in-signup"
								@click="cancelSignUp()"
								id="cancel-signup"
							>
								Cancelar
							</button>
						</b-col>

						<b-col cols="6">
							<button class="btn-in-signup" type="submit" id="confirm-signup">
								Confirmar
							</button>
						</b-col>
					</b-row>
				</b-container>
			</form>

			<div id="modal-area">
				<transition>
					<success-alert
						description="Usuário cadastrado com sucesso!"
						v-if="showSuccessAlert"
						action="signUp"
					>
						<div id="icon-1">
							<i class="fas fa-user-plus"></i>
						</div>
					</success-alert>

					<modal v-if="showModal" :reqBody="reqBody" action="signUp">
						<div id="icon-1">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								width="55"
								height="40"
								viewBox="0 0 75 60"
							>
								<path
									id="user-plus-solid"
									d="M73.125,24.375h-7.5v-7.5A1.881,1.881,0,0,0,63.75,15H60a1.881,1.881,0,0,0-1.875,1.875v7.5h-7.5A1.881,1.881,0,0,0,48.75,26.25V30a1.881,1.881,0,0,0,1.875,1.875h7.5v7.5A1.881,1.881,0,0,0,60,41.25h3.75a1.881,1.881,0,0,0,1.875-1.875v-7.5h7.5A1.881,1.881,0,0,0,75,30V26.25A1.881,1.881,0,0,0,73.125,24.375ZM26.25,30a15,15,0,1,0-15-15A15,15,0,0,0,26.25,30Zm10.5,3.75H34.793a20.4,20.4,0,0,1-17.086,0H15.75A15.754,15.754,0,0,0,0,49.5v4.875A5.626,5.626,0,0,0,5.625,60h41.25A5.626,5.626,0,0,0,52.5,54.375V49.5A15.754,15.754,0,0,0,36.75,33.75Z"
									fill="#f7b74a"
								/>
							</svg>
						</div>
					</modal>
				</transition>
			</div>
			<!--modal area ends-->
		</div>
		<!--signup ends-->
	</transition>
</template>

<script>
import { EventBus } from "../event-bus.js";

import HeaderDefault from "../components/HeaderDefault.vue";
import Modal from "../components/Modal.vue";
import SuccessAlert from "../components/SuccessAlert.vue";

export default {
	name: "SignUp",
	data() {
		return {
			surplus: 0,
			translateValue: "translate(56 27)",
			showSuccessAlert: false,
			showModal: false,
			showingModal: false,
			name: "",
			section: "",
			signUpDate: "",
			email: "",
			emailOk: false,
		};
	},
	computed: {
		reqBody() {
			return {
				name: this.name.trim(),
				email: this.email.trim(),
				section: this.section.trim(),
				currentDate: this.signUpDate.trim(),
			};
		},
	},
	methods: {
		addSurplus() {
			if (this.surplus > 8) {
				this.translateValue = "translate(50 27)";
			}
			this.surplus += 1;
		},
		verifyEmail() {
			const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
			const isEmailValid = re.test(String(this.email).toLowerCase());

			isEmailValid ? (this.emailOk = true) : (this.emailOk = false);
		},
		checkFormSignUp() {
			let isInvalid = document.getElementById("is-invalid");

			if (
				!this.name.trim() ||
				!this.section.trim() ||
				!this.email.trim() ||
				!this.emailOk
			) {
				isInvalid.classList.remove("invalid-inactive");
				isInvalid.classList.add("invalid-active");
				//clona o elemento
				const isInvalidClone = isInvalid.cloneNode(true);
				//substitui a si mesmo por seu clone, aplicando novamente a animação
				isInvalid.parentNode.replaceChild(isInvalidClone, isInvalid);

				return false;
			} else {
				isInvalid.classList.remove("invalid-active");
				isInvalid.classList.add("invalid-inactive");

				this.showModal = true;
				this.showingModal = true;
			}
		},
		cancelSignUp() {
			this.$router.push("/");
		},
	},
	created() {
		this.signUpDate = new Date().toLocaleDateString("pt-br", {
			dateStyle: "short",
		});

		this.$nextTick(() => this.$refs.autoFocus.focus());

		EventBus.$on("closeModal", () => {
			this.showModal = false;
			this.showingModal = false;
		});
		EventBus.$on("userCreated", () => {
			this.showModal = false;
			this.showingModal = false;
			this.showSuccessAlert = true;
		});
		EventBus.$on("closeSuccessAlert", () => {
			console.log("bus chamado");
			this.$router.go();
			this.showSuccessAlert = false;
		});
	},
	components: {
		HeaderDefault,
		Modal,
		SuccessAlert,
	},
};
</script>

<style scoped>
label,
div,
input {
	color: #ffffff !important;
}
#sign-up,
#modal-area {
	width: 100%;
	text-align: center;
	position: absolute;
	top: 0;
	left: 0;
}

#first-row div {
	margin-top: 1em;
}

label {
	display: block;
	z-index: 20;
	text-align: left;
	font-size: 1.5em;
	transform: translateY(-1.7em);
	padding-left: 0.8em;
	transform-origin: 0 0;
	transition: all 0.3s;
}

label:hover {
	cursor: text;
}

input {
	box-sizing: border-box;
	width: 100%;
	padding: 0.2em 0.7em;
	background-color: #414141;
	border: 1px solid #707070;
	font-size: 1.3em;
	border-radius: 0.7em;
	position: relative;
	transition: all 0.5s;
}

input::placeholder {
	color: transparent;
}

input:active {
	border: 1px solid #8f8f8f;
}

input:focus {
	border: 1px solid #8f8f8f;
	outline: none;
}
input:focus-within {
	transform: scale(1.05, 1.05);
}

input:focus + label,
input:not(:placeholder-shown) + label {
	transform: translateY(-3.3em) translateX(-0.5em) scale(0.9);
}

#holdsEmailInput {
	margin: 1em auto;
}

.invalid-message {
	margin-top: 0 !important;
	padding: 0 !important;
}

.btn-in-signup {
	display: block;
	margin-left: auto;
	margin-right: auto;
	margin-bottom: 1em;
	width: 100%;
	border-radius: 2em;
	padding: 0.5em 2em;
}

#cancel-signup {
	border: 1px solid #ff0000;
}

#cancel-signup:active {
	background-color: #ff0000;
}

#confirm-signup {
	border: 1px solid #31ff00;
}

#confirm-signup:active {
	background-color: #31ff00;
}

#date {
	margin-bottom: 1em;
}

@media (min-width: 992px) {
	.btn-in-signup {
		max-width: 400px;
		font-size: 1.5em;
	}

	.holds-input {
		max-width: 400px;
		margin-left: 4em;
	}

	#holdsEmailInput {
		width: 400px;
	}
}

.sign-up-enter-active,
.sign-up-leave-active {
	transition: opacity 0.4s;
}

.sign-up-enter,
.sign-up-leave-to {
	opacity: 0;
}

.sign-up-leave,
.sign-up-enter-to {
	opacity: 1;
}
</style>
