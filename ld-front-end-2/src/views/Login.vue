<template>
	<section class="bg-light">
		<!-- <costumHeader></costumHeader> -->
		<div class="shadow login-components">
			<h1 class="title text-center mb-4">Log in</h1>
			<input 
				class="form-control mb-2" 
				type="email" 
				placeholder="Enter your email">

			<input 
				class="form-control mb-4" 
				type="password" 
				placeholder="Enter your password">
				
			<button class='login-btns mb-2 btn btn-primary shadow'>Log in</button>
			<button class='login-btns mb-4 btn btn-dark shadow'>
				<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-github" viewBox="0 0 16 16">
				  <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.012 8.012 0 0 0 16 8c0-4.42-3.58-8-8-8z"/>
				</svg>
				Log in with Github
			</button>
			<router-link tag='a' to="/register" class="text-center text-dark">Have no account?</router-link>
			<router-link tag='a' to="/resetpassword" class="text-center text-dark">forgot your password?</router-link>
		</div>
	</section>
</template>

<script>
	import costumHeader from ".././components/Header.vue";

	export default {

	  name: 'Login',

	  components: {
	  	costumHeader
	  },

	  data () {
	    return {

	    }
	  }
	}
</script>

<style lang="css" scoped>
	section {
		height: 100vh;
		padding-top: 120px;
		background-color: var(--primary--);
		font-family: "Changa";
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