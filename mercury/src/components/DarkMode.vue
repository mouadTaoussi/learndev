<template>
	<button id="btn" v-on:click="mode" class="darkmode-btn shadow btn-sm btn-dark-mode text-white">Dark</button>
</template>

<script>
export default {
	name: "DarkMode",

	data() {
		return {};
	},
	mounted (){//
	},//
	methods: {
		mode: function() {
			// const style = document.createElement("style");
			const style = document.querySelector('#mode');
			// add CSS styles
			// style.id = "mode";

			// set mode and set it to local storage
			if (localStorage.getItem("mode") == "dark") {
				style.innerHTML = "";
				localStorage.setItem("mode", "light");

				// Change btn 
				document.querySelector('#btn').classList.remove('btn-light','text-dark');
				document.querySelector('#btn').classList.add('btn-dark-mode','text-white');
				document.querySelector('#btn').innerHTML = "Dark";
			} else {
				style.innerHTML = `
			   /* Darkmore started */
				body, html {
				  background-color: var(--dark-mode--);
				  color: white!important;
				}
				.single-card {
				  background-color: var(--darkless-mode--)!important;
				  color: white!important;
				}
				/* auth pages to be dark */
				.login-components, .register-components, .resetpassword-components  {
				  background-color: var(--darken-mode--)!important;
				}
				.login-components a, .register-components a, .resetpassword-components a {
				  color: white!important;
				}
				.background-area {
				  background-image: url()!important;
				  background-color: var(--darkless-mode--)!important;
				}
				.no-content {
					background-image: url('https://raw.githubusercontent.com/mouadTaoussi/learndev/794f9925ed9afe9e618e2e04b0e6c6ed61164891/ld-front-end-2/src/assets/undraw_No_data_re_kwbl.svg')!important;
					margin-top :30px; 
					margin-bottom :30px; 
				}
				/* logo texts to be white */
				.logo {
				  background-image: url('https://raw.githubusercontent.com/mouadTaoussi/learndev/b9559ebdabe0a5eac45c728a00cc2d01a551a09f/ld-front-end-2/src/assets/logoblue.svg')!important;
				}
				p,h1,h2,h3,h4,h5,h6, strong {
				  color: white!important;
				}
				h2, .title-preview-topics {
				  color: white!important;
				}

				/* modal background */
				.modal {
				  background-color: rgba(0,0,0,.1);
				}
				/* modal to be dark and bigger by padding */
				.modal-content {
				  background-color: var(--darken-mode--)!important;
				  color: white!important;
				  padding: 8px;
				}
				/* remove borders */
				.modal-header, .modal-footer {
				  border:0;
				}
				/* set to dark on sections and header */
				section {
				  background-color: var(--dark-mode--)!important;
				  color: white!important;
				}
				header {
				  background-color: var(--darkless-mode--)!important;
				  color: white!important;
				}
				/* set to darkless at resource cards */
				#resource-card , .resource-area  {
				  background-color: var(--darkless-mode--)!important;
				  color: white!important;
				  border-color: transparent!important;
				}
				/* topic component in user page */
				.topic-container {
				  background-color: var(--darkless-mode--)!important;
				}
				/*set text to white*/
				.upvote-btn {
				  color: white!important;
				}
				/* remove its border */
				.description-hidden {
				  border-color: transparent!important;
				}
				/* set them to dark */
				input, select, option {
				  background-color: var(--darkless-mode--)!important;
				  color: white!important;
				  border-color: rgba(255,255,255,.0)!important;
				}
				/*div {
				  background-color: var(--dark-mode--);
				  color: white!important;
				}*/
				/*Dark mode ended*/
			`;

				localStorage.setItem("mode", "dark");

				// Change btn 
				document.querySelector('#btn').classList.add('btn-light','text-dark');
				document.querySelector('#btn').classList.remove('btn-dark-mode','text-white');
				document.querySelector('#btn').innerHTML = "Light";
			}

			// append the style to the DOM in <head> section
			// document.head.appendChild(style);
		},
	},
};
</script>

<style lang="css" scoped>
	.darkmode-btn {
		border:0;
		border-radius: 3px;
	}
	.btn-light {
		color: black!important; 
	}
	.btn-dark-mode {
		background-color: var(--darkless-mode--);
	}
</style>
