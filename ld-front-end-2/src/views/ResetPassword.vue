<template>
	<section class="bg-light">
		<!-- <costumHeader></costumHeader> -->
		<div class="shadow resetpassword-components">
			<h1 class="text-center mb-4">Reset Password</h1>
			<input 
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

	export default {

	  name: 'resetpassword',

	  components: {
	  	costumHeader
	  },

	  data () {
	    return {
	    	email: null
	    }
	  },
	  methods : {
	  	resetPassword : function() {
	  		if (this.email.length < 5 || this.email.includes('@') == false || this.email.includes('.') == false) {
	  			alert("Fill the inputs")
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