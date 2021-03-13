<template>
	<section class="bg-light">
		<!-- <costumHeader></costumHeader> -->
		<!-- Alert -->
		<Alert v-bind:type="alert.type" v-bind:message="alert.message"></Alert>
		<!-- Alert -->
		<div class="shadow resetpassword-components">
			
			<router-link to='/'>
				<div class="logo"></div>
			</router-link>

			<input 
				id="email"
				v-model="email"
				class="form-control mb-2" 
				type="email" 
				placeholder="Enter your email">

			<!-- <input class="form-control mb-4" type="password" placeholder="Enter your password"> -->
			<button @click="resetPassword()" class='resetpassword-btns mb-2 btn btn-primary shadow'>Send email</button>
			<!-- <button class='resetpassword-btns mb-4 btn btn-dark shadow'>Log in with Github</button> -->
			<router-link tag='a' to="/register" class="text-center text-dark">Have no account?</router-link>
		</div>
	</section>
</template>

<script>
	import costumHeader from ".././components/Header.vue";
	import Alert from ".././components/Alert.vue";
	const  apihost = require('../.././api.config.js');

	export default {

	  name: 'resetpassword',

	  components: {
	  	costumHeader,
	  	Alert,
	  	
	  },

	  data () {
	    return {
	    	email: null,
	    	alert : {
	    		type : null,
	    		message : null
	    	}
	    }
	  },
	  methods : {
	  	resetPassword : function() {
	  		if (this.email.length < 5 || this.email.includes('@') == false || this.email.includes('.') == false) {
	  			this.showAlert('error','Enter a valid email!',"#email");
	  		}
	  		else {
	  			this.$http({
	  				url : apihost.api_domain + '/auth/resetPassword',
	  				method : "POST",
	  				data : {email: this.email}
	  			})
	  			.then((res)=>{
	  				// Set a localstorage value to know whether the user already logged in or not
	  				console.log(res);
	  			})
	  			.catch((err)=>{
	  				console.log(err.message == "Request failed with status code 404");
	  			})
	  		}
	  	},
	  	showAlert : function(type, message, target){
			// Set message to the alert
			this.alert.message = message
			this.alert.error = type
	  		// Show alert
			document.querySelector('.local-alert').style.opacity = "10";
			// Determine where
			document.querySelector(target).classList.add("is-invalid");

			window.setTimeout(()=>{
				document.querySelector('.local-alert').style.opacity = "0";				
			},5000)
		}
	  }
	}
</script>

<style lang="css" scoped>
	section {
		height: 100vh;
		padding-top: 120px;
		background-color: var(--primary--);
		font-family: var(--font--);
	}
	.logo {
		background-image: url('.././assets/logolight.svg');
		background-size: contain;
		background-repeat: no-repeat;
		background-position: center;
		width: 200px;
		height: 48px;
		margin: 0 auto;
		margin-bottom: 20px;
	}
	.resetpassword-components {
		background-color: white;
		margin: 0 auto;
		width: 400px;
		height: height;
		padding: 20px;
	}
	.resetpassword-btns {
		width: 100%;
	}
	@media only screen and (max-width: 800px) {

	}
</style>