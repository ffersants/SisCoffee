<template>
	<transition name="list-users">
		<div id="list-users">
			<HeaderDefault title="PAINEL DE VISUALIZAÇÃO">
				<router-link to="/">
					<i class="fas fa-arrow-left"></i>
				</router-link>
			</HeaderDefault>

			<table-with-users :action="action"></table-with-users>

			<div id="modal-area">
				<transition>
					<modal-use-surplus v-if="showModalUserSurplus"></modal-use-surplus>

					<success-alert
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

					<table-with-surplus
						v-if="showTableWithSurplus"
						key="table-with-surplus"
					></table-with-surplus>

					<modal-base v-if="showAlert">
						<div id="alert-error">
							<h1>AÇÃO NEGADA</h1>
							<i class="fas fa-times-circle"></i>
							<p>
								Este usuário já teve sua compra adiantada neste ciclo
								<br />

								<br />
								Aguarde chegar a sua vez para registrar uma nova compra
							</p>
							<button @click="showAlert = false">OK</button>
						</div>
					</modal-base>

					<modal v-if="showModal" action="payment" :reqBody="reqBody">
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
				</transition>
			</div>
			<!--modal area ends-->
		</div>
		<!--list users ends-->
	</transition>
</template>

<script>
import { EventBus } from "../event-bus.js";

import HeaderDefault from "../components/HeaderDefault.vue";
import Modal from "../components/Modal.vue";
import ModalBase from "../components/ModalBase.vue";
import ModalUseSurplus from "../components/ModalUseSurplus.vue";
import SuccessAlert from "../components/SuccessAlert.vue";
import TableWithUsers from "../components/TableWithUsers.vue";
import TableWithSurplus from "../components/TableWithSurplus.vue";

export default {
	name: "ListUsers",
	data() {
		return {
			action: "pagar",
			showModal: false,
			showAlert: false,
			showModalUserSurplus: false,
			showSuccessAlert: false,
			showTableWithSurplus: false,
			useSurplus: false,
		};
	},
	computed: {
		reqBody() {
			return {
				name: this.userInTable.name,
				section: this.userInTable.section,
				email: this.userInTable.email,
				useSurplus: String(this.useSurplus),
				position: this.userInTable.position,
			};
		},
		userInTable() {
			return this.$store.state.userInActionTable;
		},
	},
	created() {
		EventBus.$on("openModal", () => {
			if (this.userInTable.surplus > 0 && this.userInTable.position === 1) {
				this.showModalUserSurplus = true;
			} else {
				this.showModal = true;
			}
		}),
			EventBus.$on("closeModal", () => {
				this.useSurplus = false;
				this.showModal = false;
			}),
			EventBus.$on("openAlert", () => {
				this.showAlert = true;
				document.getElementById("list-users").style.position = "fixed";
			});
		EventBus.$on("dontUseSurplus", () => {
			this.showModalUserSurplus = false;
			this.showModal = true;
			this.useSurplus = false;
			console.log("yes, use surplus");
		});
		EventBus.$on("yesUseSurplus", () => {
			this.useSurplus = true;
			this.showModalUserSurplus = false;
			this.showModal = true;
		});
		EventBus.$on("paymentFinished", () => {
			this.showModal = false;
			this.showSuccessAlert = true;
		});
		EventBus.$on("closeSuccessAlert", () => {
			this.showModal = false;
			this.showSuccessAlert = false;
			this.$router.go();
		});
		EventBus.$on("openTableWithSurplus", () => {
			this.showTableWithSurplus = true;
		});
		EventBus.$on("closeTableWithSurplus", () => {
			this.showTableWithSurplus = false;
		});
	},
	components: {
		HeaderDefault,
		Modal,
		ModalBase,
		ModalUseSurplus,
		SuccessAlert,
		TableWithUsers,
		TableWithSurplus,
	},
};
</script>

<style scoped>
* {
	margin: 0;
	padding: 0;
}

#modal-area,
#list-users {
	width: 100%;
	text-align: center;
	display: flex;
	flex-direction: column;
	position: absolute;
	top: 0;
	left: 0;
	right: 0;
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
