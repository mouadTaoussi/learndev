<template>
	<section class="">
		<!-- <costumHeader></costumHeader> -->
		<!-- Alert Message -->
		<Alert v-bind:type="alert.type" v-bind:message="alert.message"></Alert>
		<!-- Alert Message -->
		<div class="shadow login-components">
			
			<router-link to="/">
				<div class="logo"></div>
			</router-link>

			<input 
				id="email"
				v-model="email"
				class="form-control mb-2" 
				type="email" 
				placeholder="Enter your email">

			<input 
				id="password"
				v-model="password"
				class="form-control mb-4" 
				type="password" 
				placeholder="Enter your password">
				
			<button @click="login()" class='login-btns mb-2 btn btn-primary shadow'>Log in</button>
			<a href="http://localhost:8000/auth/Oauth/login">
				<button class='login-btns mb-4 btn btn-dark shadow'>
					<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-github" viewBox="0 0 16 16">
					  <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.012 8.012 0 0 0 16 8c0-4.42-3.58-8-8-8z"/>
					</svg>
					Log in with Github
				</button>
			</a>
			<router-link tag='a' to="/register" class="text-center text-dark">Have no account?</router-link>
			<router-link tag='a' to="/resetpassword" class="text-center text-dark">forgot your password?</router-link>
		</div>
	</section>
</template>

<script>
	import costumHeader from ".././components/Header.vue";
	import Alert from ".././components/Alert.vue";
	const  apihost = require('../.././api.config.js');

	export default {

	  name: 'Login',

	  components: {
	  	costumHeader,
	  	Alert
	  },

	  data () {
	    return {
	    	email    : null,
	    	password : null,
	    	alert : {
	    		type : null,
	    		message : null
	    	}
	    }
	  },
	  mounted (){
	  	if (!!localStorage.getItem('user_name') == true){
	  		this.$router.push({ path: '/topics' });
	  	}
	  },
	  methods : {
		login : function(){
			// Validate
			if (this.email == null || this.email.length == 0) {

				this.showAlert('error','Fill all the inputs', null);

			}else if(this.password == null || this.password.length == 0) {

				this.showAlert('error','Fill all the inputs', null);

			}
			else if (this.email.length < 5 || this.email.includes('@') == false || this.email.includes('.') == false) {

				this.showAlert('error','Enter a valid email', "#email");
			
			}
			else {
				document.querySelector('.login-btns').innerHTML = "Please wait...";
	
				this.$http({
					url : apihost.api_domain + '/auth/login',
					method : "POST",
					data : {email: this.email, password:this.password}
				})
				.then((res)=>{
					// Set a localstorage value to know whether the user already logged in or not
					localStorage.setItem('user_name',res.data.user.user.user_name);
					
					// push to topics page
					this.$router.push({ path: '/topics' });
				})
				.catch((err)=>{
					if ( err.message == "Request failed with status code 404" ) {
						document.querySelector('.login-btns').innerHTML = "Log in";

						document.querySelector('#email').classList.add("is-invalid");
						document.querySelector('#password').classList.add("is-invalid");

						this.showAlert('error', "incorrect credentials", null);
					}
					else {
						document.querySelector('.login-btns').innerHTML = "Log in";

						document.querySelector('#email').classList.add("is-invalid");
						document.querySelector('#password').classList.add("is-invalid");

						this.showAlert('error', "something went wrong", null);
					}
				})
			}
		},
		showAlert : function(type, message, target){
			// Set message to the alert
			this.alert.message = message
			this.alert.type = type
	  		// Show alert
			document.querySelector('.local-alert').style.opacity = "10";
			
			// Determine where
			if (target !== null) {
				document.querySelector(target).classList.add("is-invalid");
			}

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
		background-color: white;
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
	.login-components {
		background-color: white;
		margin: 0 auto;
		width: 400px;
		height: height;
		padding: 20px;
	}
	.login-btns {
		width: 100%;
	}
	@media only screen and (max-width: 800px) {
		section {
			padding-top: 0;
		}
		.login-components {
			width: 100%;
			height: 100vh;
		}
		.title {
			text-align: left!important;
		}
	}
</style>