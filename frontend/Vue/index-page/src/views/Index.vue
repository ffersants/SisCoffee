<template>
	<transition name="list-users">
		<div id="index">
			<HeaderDefault title="CAFÉ DO MÊS">
				<i
					@click="openUserConfig"
					id="user-config"
					class="fas fa-users-cog"
				></i>

				<router-link to="/list-users">
					<i id="list-users" class="fas fa-list"></i>
				</router-link>
			</HeaderDefault>

			<div v-if="fetching" class="text-center">
				<b-spinner variant="light" label="Text Centered"></b-spinner>
				<p class="text-light">Carregando...</p>
			</div>

			<div id="cards">
				<div v-if="!fetchFailed && !fetching" id="container">
					<div class="card card-the-next">
						<div
							v-bind:title="theNext.name"
							v-if="theNext && theNext.name.length > 12"
						>
							<marquee direction="left">{{ theNext.name }}</marquee>
						</div>

						<p v-else-if="theNext" v-bind:title="theNext.name">
							{{ theNext.name }}
						</p>

						<div v-else>
							<img width="20px" src="../assets/emoji.png" alt="" />
							<p>Vazio</p>
						</div>

						<div id="coffee-icon">
							<img src="../assets/coffee-cup.png" alt="" />
						</div>

						<p>
							sua vez <br />
							está chegando
						</p>
					</div>

					<div class="card card-the-one">
						<div
							class="bigName"
							id="big-name-the-next"
							v-bind:title="theOne.name"
							v-if="theOne.name.length > 12"
						>
							<p>{{ theOne.name }}</p>
						</div>

						<p v-else-if="theOne" v-bind:title="theOne.name">
							{{ theOne.name }}
						</p>

						<div v-else>
							<img width="20px" src="../assets/emoji.png" alt="" />
							<p>Vazio</p>
						</div>

						<div id="coffee-icon">
							<img src="../assets/coffee-cup.png" alt="" />
						</div>

						<p>é a sua vez</p>

						<button @click="openModal()" id="pay-btn">
							PAGAR
						</button>
					</div>

					<div class="card card-the-last">
						<div
							class="bigName"
							id="big-name-the-next"
							v-bind:title="theLast.name"
							v-if="theLast && theLast.name.length > 12"
						>
							<p>{{ theLast.name }}</p>
						</div>

						<p v-else-if="theLast" v-bind:title="theLast.name">
							{{ theLast.name }}
						</p>

						<div v-else>
							<img width="20px" src="../assets/emoji.png" alt="" />
							<p>Vazio</p>
						</div>

						<div id="coffee-icon">
							<img src="../assets/coffee-cup.png" alt="" />
						</div>

						<p>
							sua vez <br />
							já passou
						</p>
					</div>
				</div>
				<!--container ends-->

				<div id="fetch-failed-alert" v-if="fetchFailed">
					<div id="fetch-failed-icon">
						<img src="../assets/fetch-failed.png" alt="" />
					</div>

					<div id="fetch-failed-msg">
						<h1>
							Ops...
						</h1>

						<br />

						<p>Não foi possível carregar as informações</p>
						<small>Contate o admnistrador do sistema</small>
					</div>
				</div>
				<!--fetchFailed div ends-->
			</div>
			<!--cards area ends-->

			<div id="modal-area">
				<transition-group>
					<success-alert
						key="success-alert"
						description="Compra registrada com sucesso!"
						v-if="showSuccessAlert"
						action="payment"
					>
						<div class="text-center mb-2 mt-2" id="icon-1">
							<svg
								id="Cafe_checked"
								data-name="Cafe checked"
								xmlns="http://www.w3.org/2000/svg"
								width="57.747"
								height="45.934"
								viewBox="0 0 57.747 45.934"
							>
								<path
									id="coffee-solid"
									d="M17.272,68.091H34.594c4.782,0,8.661-4.409,8.661-9.843h2.887c6.37,0,11.548-5.885,11.548-13.124S52.513,32,46.143,32H10.776A2.322,2.322,0,0,0,8.61,34.461V58.248C8.61,63.682,12.49,68.091,17.272,68.091ZM46.143,38.562c3.185,0,5.774,2.943,5.774,6.562s-2.589,6.562-5.774,6.562H43.256V38.562Zm4.3,39.372H4.307c-4.295,0-5.5-6.562-3.248-6.562H53.686c2.256,0,1.065,6.562-3.239,6.562Z"
									transform="translate(0.056 -32)"
									fill="#f0a82e"
								/>
								<path
									id="check-circle-regular"
									d="M22.459,8A14.459,14.459,0,1,0,36.918,22.459,14.459,14.459,0,0,0,22.459,8Zm0,2.8A11.661,11.661,0,1,1,10.8,22.459,11.654,11.654,0,0,1,22.459,10.8m8.174,7.6L29.32,17.069a.7.7,0,0,0-.989,0L20.089,25.24,16.6,21.726a.7.7,0,0,0-.989,0l-1.325,1.314a.7.7,0,0,0,0,.989l5.293,5.336a.7.7,0,0,0,.989,0L30.63,19.383a.7.7,0,0,0,0-.989Z"
									transform="translate(4 -5)"
									fill="#fff"
								/>
							</svg>
						</div>
					</success-alert>

					<modal-user-config v-if="showUserConfig" key="modal-user-config">
					</modal-user-config>

					<modal-use-surplus
						v-if="showModalUserSurplus"
						key="modal-use-surplus"
					>
					</modal-use-surplus>

					<modal
						v-if="showModal"
						action="payment"
						:reqBody="reqBody"
						key="modal"
					>
						<div id="icon-1">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								width="57.747"
								height="45.934"
								viewBox="0 0 57.747 45.934"
							>
								<path
									id="coffee-solid"
									d="M17.272,68.091H34.594c4.782,0,8.661-4.409,8.661-9.843h2.887c6.37,0,11.548-5.885,11.548-13.124S52.513,32,46.143,32H10.776A2.322,2.322,0,0,0,8.61,34.461V58.248C8.61,63.682,12.49,68.091,17.272,68.091ZM46.143,38.562c3.185,0,5.774,2.943,5.774,6.562s-2.589,6.562-5.774,6.562H43.256V38.562Zm4.3,39.372H4.307c-4.295,0-5.5-6.562-3.248-6.562H53.686c2.256,0,1.065,6.562-3.239,6.562Z"
									transform="translate(0.056 -32)"
									fill="#f0a82e"
								/>
								<path
									id="check-circle-regular"
									d="M22.459,8A14.459,14.459,0,1,0,36.918,22.459,14.459,14.459,0,0,0,22.459,8Zm0,2.8A11.661,11.661,0,1,1,10.8,22.459,11.654,11.654,0,0,1,22.459,10.8m8.174,7.6L29.32,17.069a.7.7,0,0,0-.989,0L20.089,25.24,16.6,21.726a.7.7,0,0,0-.989,0l-1.325,1.314a.7.7,0,0,0,0,.989l5.293,5.336a.7.7,0,0,0,.989,0L30.63,19.383a.7.7,0,0,0,0-.989Z"
									transform="translate(4 -5)"
									fill="#fff"
								/>
							</svg>
						</div>
					</modal>
				</transition-group>
			</div>
			<!--modal-area ends-->
		</div>
		<!--index ends-->
	</transition>
</template>
<script>
import { EventBus } from "../event-bus.js";

import HeaderDefault from "../components/HeaderDefault.vue";
import Modal from "../components/Modal.vue";
import ModalUserConfig from "../components/ModalUserConfig.vue";
import ModalUseSurplus from "../components/ModalUseSurplus.vue";
import SuccessAlert from "../components/SuccessAlert.vue";

export default {
	name: "Index",
	data() {
		return {
			fetching: true,
			fetchFailed: false,
			showModal: false,
			showUserConfig: false,
			showModalUserSurplus: false,
			showSuccessAlert: false,
			useSurplus: false,
			theNext: "",
			theOne: "",
			theLast: "",
		};
	},
	computed: {
		reqBody() {
			return {
				name: this.theOne.name,
				section: this.theOne.section,
				email: this.theOne.email,
				useSurplus: String(this.useSurplus),
				position: this.theOne.position,
			};
		},
	},
	methods: {
		openUserConfig() {
			this.showUserConfig = true;
		},
		openModal() {
			if (this.theOne.surplus > 0) {
				this.showModalUserSurplus = true;
			} else {
				this.showModal = true;
			}
		},
	},
	beforeCreate() {
		console.log(process.env.AMBIENT);
		fetch(process.env.VUE_APP_AMBIENT)
			.then((r) => {
				if (!r.ok) {
					throw new Error("Falha ao fetchar");
				} else {
					return r.json();
				}
			})
			.then((r) => {
				if (r.theOne != undefined) {
					this.theNext = r.theNext;
					this.theOne = r.theOne;
					this.theLast = r.theLast;
					this.fetching = false;
				}
			})
			.catch((r) => {
				console.log("ERRO -> ", r);
				this.fetching = false;
				this.fetchFailed = true;
			});

		setTimeout(() => {
			if (this.fetching === true || !this.theOne) {
				this.fetching = false;
				this.fetchFailed = true;
			}
		}, 10000);
	},
	created() {
		EventBus.$on("closeUserConfig", () => {
			this.showUserConfig = false;
		});
		EventBus.$on("closeModal", () => {
			this.useSurplus = false;
			this.showModal = false;
		});
		EventBus.$on("dontUseSurplus", () => {
			this.showModalUserSurplus = false;
			this.showModal = true;
		});
		EventBus.$on("yesUseSurplus", () => {
			this.showModalUserSurplus = false;
			this.useSurplus = true;
			this.showModal = true;
		});
		EventBus.$on("paymentFinished", () => {
			this.showModal = false;
			this.showSuccessAlert = true;
		});
		EventBus.$on("closeSuccessAlert", () => {
			this.$router.go();
			this.showSuccessAlert = false;
		});
	},
	components: {
		HeaderDefault,
		Modal,
		ModalUserConfig,
		ModalUseSurplus,
		SuccessAlert,
	},
};
</script>

<style scoped>
* {
	margin: 0;
	padding: 0;
}

#modal-area {
	position: absolute;
}

#index {
	height: 100vh;
	display: flex;
	flex-direction: column;
}

#cards {
	width: 50em;
	font-family: var(--card-font-family);
	position: relative;
	margin: auto;
	bottom: 8%;
}

#container {
	display: grid;
	grid-template-rows: auto;
	grid-template-columns: 0.8fr 1fr 0.8fr;
}

.card {
	background-color: var(--light-coffee-color);
	border: none;
	text-align: center;
	font-size: 1.5em;
	height: fit-content;
	margin-top: auto;
	margin-bottom: auto;
	padding: 1em 0;
}

.card-the-next {
	border-radius: 1em 0em 0em 1em;
	border-right: 1em px solid #bbb09d;
}

.card-the-last {
	border-radius: 0em 1em 1em 0em;
	border-left: 1em px solid #bbb09d;
}

.card-the-next,
.card-the-last {
	background-color: #bbb09d;
}

.card-the-one {
	border-radius: 1em;
	font-size: 2em;
}

#pay-btn {
	background-color: #a35d2f;
	font-family: Candara;
	font-size: 0.8em;
	color: #f1e5d1;
	height: 30%;
	width: 60%;
	border-radius: 1em;
	margin-left: auto;
	margin-right: auto;
	margin-top: 1em;
	margin-bottom: 0.6rem;
	padding: 0.3em 0.5em;
	transition: background 0.4s;
}

#pay-btn:hover {
	background-color: #b87446;
}

button#pay-btn:active {
	background-color: #a35d2f;
}

div.bigName {
	position: relative;
	box-sizing: border-box;
	margin-right: 10%;
	margin-left: 10%;
	overflow: hidden;
}

div.bigName > p {
	white-space: nowrap;
	/* Starting position */
	-moz-transform: translateX(100%);
	-webkit-transform: translateX(100%);
	transform: translateX(100%);
	/* Apply animation to this element */
	transition: all 0.3s;
	-moz-animation: example1 5s linear infinite;
	-webkit-animation: example1 5s linear infinite;
	animation: leftRoll 5s linear infinite;
}
@keyframes leftRoll {
	0% {
		-moz-transform: translateX(80%); /* Firefox bug fix */
		-webkit-transform: translateX(80%); /* Firefox bug fix */
		transform: translateX(80%);
	}
	100% {
		-moz-transform: translateX(-120%); /* Firefox bug fix */
		-webkit-transform: translateX(-120%); /* Firefox bug fix */
		transform: translateX(-120%);
	}
}

#coffee-icon > img {
	width: 4em;
}

@media (max-width: 575.98px) {
	#cards {
		width: 90%;
	}

	#container {
		font-size: 0.6rem;
	}
}

/* Small devices (landscape phones, 576px and up) */
@media (min-width: 576px) and (max-width: 767.98px) {
	#cards {
		width: 90%;
	}

	#container {
		font-size: 0.8rem;
	}

	.card {
		padding: 0.6em;
	}
}

/* Medium devices (tablets, 768px and up) */
@media (min-width: 768px) and (max-width: 991.98px) {
	#container {
		font-size: 0.8rem;
	}

	#cards {
		width: 90%;
	}

	.card {
		padding: 0.7em;
	}
}

/* Large devices (desktops, 992px and up) */
@media (min-width: 992px) and (max-width: 1199.98px) {
	.card {
		padding: 0.8em;
	}
}

/* Extra large devices (large desktops, 1200px and up) */
@media (min-width: 1200px) {
	#container {
		font-size: 1rem;
	}
}

.list-users-enter-active,
.list-users-leave-active {
	transition: opacity 0.4s;
}

.list-users-enter,
.list-users-leave-to {
	opacity: 0;
}

.list-users-leave,
.list-users-enter-to {
	opacity: 1;
}
</style>
