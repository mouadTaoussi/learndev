<template>
	<section class="bg-light">
		<!-- <costumHeader></costumHeader> -->
		<!-- Alert Message -->
		<Alert v-bind:type="alert.type" v-bind:message="alert.message"></Alert>
		<!-- Alert Message -->
		<div class="background-area">
			<!-- <h1 class="text-left">Logo Here</h1> -->
			<div class="logo"></div>
			<!-- <img class="brand" width='160px' height='40px' src="https://app.revenual.com/images/logo.svg"> -->
			<aside class="features">
				<h5 class="text-left">
					<svg 
						xmlns="http://www.w3.org/2000/svg" 
						width="16" 
						height="16" 
						fill="currentColor" 
						class="bi bi-check-circle-fill text-success" 
						viewBox="0 0 16 16">
		  				<path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z"/>
					</svg>
					Get access to +2000 programming resources!
				</h5>
				<p class="text-left background-area-text">You can get access of unlimited resources that help you skip lot of obstacles !</p>

					
				<h5 class="text-left">
					<svg 
						xmlns="http://www.w3.org/2000/svg" 
						width="16" 
						height="16" 
						fill="currentColor" 
						class="bi bi-check-circle-fill text-success" 
						viewBox="0 0 16 16">
		  				<path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z"/>
					</svg>
					Contribute to this library of resources!
				</h5>
				<p class="text-left background-area-text">As a developer, you are able to help others by sharing best or resources of learning to all!</p>
			</aside>
		</div>
		<div class="shadow register-components">
			<h2 class="text-left mb-4">Create your account</h2>

			<p class="text-left">Enter your fullname</p>
			<input 
				id="fullname"
				v-model="fullname"
				class="form-control mb-2" 
				type="text" 
				placeholder="Enter your Fullname">

			<p class="text-left">Enter your user name</p>
			<input 
				id="user_name" 
				v-model="user_name"
				class="form-control mb-2" 
				type="text" 
				placeholder="Enter your user name">

			<p class="text-left">Enter your email</p>
			<input 
				id="email"
				v-model="email"
				class="form-control mb-2" 
				type="email" 
				placeholder="Enter your email">

			<p class="text-left">Enter your password (The password should be contains lower and upper letters as well as symbols)</p>
			<input 
				id="password"
				v-model="password"
				class="form-control mb-2" 
				type="password" 
				placeholder="Enter your password">

			<p class="text-left">Confirm your password</p>
			<input 
				id="password2"
				v-model="password2"
				class="form-control mb-4" 
				type="password" 
				placeholder="Confirm your password">

			<button @click="register()" class='register-btns mb-2 btn btn-primary shadow'>Register</button>
			<button class='register-btns mb-4 btn btn-dark shadow'>
				<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-github" viewBox="0 0 16 16">
				  <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.012 8.012 0 0 0 16 8c0-4.42-3.58-8-8-8z"/>
				</svg>
			Register with Github</button>
			<router-link tag='a' to="/login" class="text-center text-dark">Already have an account?</router-link>
		</div>
	</section>
</template>

<script>
	import costumHeader from ".././components/Header.vue";
	import Alert from ".././components/Alert.vue";
	const apihost = require('../.././api.config.js');
	
	export default {

	  name: 'Register',

	  components: {
	  	costumHeader,
	  	Alert
	  },

	  data () {
	    return {
	    	fullname : null, 
	    	user_name: null,
	    	email    : null,
	    	password : null,
	    	password2 : null,
	    	alert : {
	    		type : null,
	    		message : null
	    	}
	    }
	  },
	  methods : {
	  	register: function() {
	  		// Validate
	  		if (
	  			this.fullname == null || this.fullname == '' || this.user_name == null || this.user_name == ''
	  			|| this.email == null || this.email == '' || this.password == null || this.password == ''
	  			) 
	  		{
				this.showAlert('error','Fill all the inputs', null);
	  		}
	  		else if (this.fullname.length < 2) {
	  			this.showAlert('error','Provide your real full name', "#fullname");

	  		}
	  		else if (this.user_name.length < 2) {
	  			this.showAlert('error','Provide long user name', "#user_name");

	  		}
	  		else if (this.email.length < 5 || this.email.includes('@') == false || this.email.includes('.') == false) {
	  			this.showAlert('error','Provide a valid email', "#email");

	  		}
	  		else if (this.password.length < 5) {
	  			this.showAlert('error','Provide a long password', "#password");

	  		}
	  		else if (this.password !== this.password2) {
	  			this.showAlert('error','Confirm your password', "#password2");

	  		}
	  		else {
	  			this.$http({
	  				url : apihost.api_domain + '/auth/register',
	  				method : "POST",
	  				data : {fullname:this.fullname,user_name:this.user_name,email: this.email, password:this.password}
	  			})
	  			.then((res)=>{
	  				// Set a localstorage value to know whether the user already logged in or not
	  				if (res.data.registered) {
	  					this.$router.push({ path: '/topics' });
	  				} 
	  				else {
	  					document.querySelector('.register-btns').innerHTML = "Register";

						this.showAlert('error', res.data.message , null);
	  				}
	  			})
	  			.catch((err)=>{
	  				if ( err.message == "Request failed with status code 404" ) {

						document.querySelector('.register-btns').innerHTML = "Register";

						document.querySelector('#email').classList.add("is-invalid");
						document.querySelector('#password').classList.add("is-invalid");

						this.showAlert('error', "something went wrong!", null);
					}
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
		/*background-color: var(--primary--);*/
		display: grid;
		grid-template-columns: 2fr 3fr;
		font-family: var(--font--);
	}
	.logo {
		background-image: url('.././assets/logolight.svg');
		background-size: contain;
		background-repeat: no-repeat;
		background-position: center;
		width: 200px;
		height: 48px;
		margin-bottom: 20px;
	}
	.background-area {
		background-image: url('../assets/Learndev.svg');
		background-position: center;
		background-repeat: no-repeat;
		background-size: cover;
		padding :20px;
	}
	.brand {
		float: left;
	}
	.features {
		margin-top: 80px;
	}
	.background-area-text {
		font-family: sans-serif;
		font-weight: 100;
	}
	.register-components {
		background-color: white;
		width: 100%;
		height: height;
		padding: 20px;
	}
	.register-btns {
		width: 100%;
	}
	@media only screen and (max-width: 800px) {
		section {
			display: block;
		}
		.background-area {
			display: none;
		}
	}
</style>