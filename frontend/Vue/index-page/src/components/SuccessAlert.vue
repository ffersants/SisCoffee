<template>
	<modal-base>
		<div id="alert-success">
			<h1>AÇÃO REALIZADA</h1>
			<!-- icon -->
			<slot></slot>

			<b-container>
				<b-row id="first-row" class="text-center">
					<b-col cols="5">
						<p class="data-title">Nome</p>
						<!-- <p>Fernando Santos</p> -->
						<p>{{ userInAction.name }}</p>
					</b-col>

					<b-col cols="2">
						<p class="data-title">Seção</p>
						<!-- <p>SSTM</p> -->
						<p>{{ userInAction.section }}</p>
					</b-col>

					<b-col cols="5">
						<div v-if="action == 'payment'">
							<p class="data-title">Data do pagamento</p>
							<!-- <p>28/08/2000</p> -->
							<p>{{ userInAction.currentDate }}</p>
						</div>

						<div v-else-if="action == 'signUp'">
							<p class="data-title">Data do cadastro</p>
							<!-- <p>28/08/2000</p> -->
							<p>{{ userInAction.currentDate }}</p>
						</div>

						<div v-else>
							<p class="data-title">Data do cadastro</p>
							<!-- <p>28/08/2000</p> -->
							<p>{{ userInAction.signUpDate }}</p>
						</div>
					</b-col>

					<b-col class="text-center">
						<p class="data-title">E-mail</p>
						<p>{{ userInAction.email }}</p>
					</b-col>
				</b-row>
			</b-container>

			<div id="main">
				<p>{{ description }}</p>
				<button @click="closeSuccessAlert()">OK</button>
			</div>
		</div>
	</modal-base>
</template>

<script>
import { mapState } from "vuex";
import { EventBus } from "../event-bus.js";

import ModalBase from "./ModalBase.vue";

export default {
	name: "SuccessAlert",
	props: {
		action: {
			type: String,
		},
		description: {
			type: String,
			required: true,
		},
	},
	computed: mapState(["userInAction"]),
	methods: {
		closeSuccessAlert() {
			this.$destroy();
			EventBus.$emit("closeSuccessAlert");
		},
	},
	components: {
		ModalBase,
	},
};
</script>

<style scoped>
#alert-success {
	padding: 1em;
	width: 42vw !important;
}

#alert-success h1 {
	font-size: 3em;
}

p {
	margin: 0 !important;
	padding: 0 !important;
	text-align: center;
	font-size: 1.5em !important;
}

p:nth-child(2) {
	font-size: 1.5em !important;
}

i {
	color: #f0a82e !important;
}

#main {
	margin-top: 1em;
}

#main p {
	font-size: 1.8em !important;
	margin-bottom: 1em !important;
}

#main button:active {
	background-color: #fcab1f;
}

@media (max-width: 575.98px) {
	#alert-success {
		padding: 1em -1em;
		width: 100vw;
		font-size: 0.7rem;
	}
}

@media (min-width: 576px) and (max-width: 767.98px) {
	#alert-success {
		width: 90vw;
	}
}

@media (min-width: 768px) and (max-width: 991.98px) {
	#alert-success {
		width: 90vw;
		font-size: 0.8rem;
	}
}

@media (min-width: 992px) and (max-width: 1199.98px) {
}

@media (min-width: 1200px) {
}
</style>
