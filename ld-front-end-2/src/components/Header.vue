<template>
	<section class="header">
	 	<header class="header-landingpage">
	 		<div class="brand-child">
		 		<router-link to="/">
					<!-- <p class="logo text-dark">.learnDev()</p> -->
					<div class="logo logo-blue"></div>
				</router-link>
			</div>
			<div class="list-child">
				<router-link tag="a" class="list-item" to="/topics">Discover Topics</router-link>
				<router-link tag="a" class="list-item" to="/about">About</router-link>
				<router-link v-if="user_name" tag="a" class="list-item" to="/user">{{ user_name }}</router-link>
				<p v-if="user_name" class="list-item text-danger" v-on:click='logout()'>Log out</p>
				<router-link v-if="!user_name" tag="button" class="shadow list-item btn btn-primary" to="/login">Contribute</router-link>

			</div>
		</header>
	</section>
</template>

<script>
	const  apihost = require('../.././api.config.js');

	export default {

	  name: 'costumHeader',

	  data () {
	    return {
	    	user_name : localStorage.getItem('user_name')
	    }
	  },
	  mounted(){
	  },
	  methods : {
	  	logout: function(){
	  		this.$http({
				url : apihost.api_domain + '/auth/logout',
				method : "GET",
				// data : {email: this.email, password:this.password}
			})
			.then((res)=>{
				// Set a localstorage value to know whether the user already logged in or not
				localStorage.removeItem('user_name');
				// push to topics page
				this.$router.push({ path: '/' });
			})
	  	}
	  }
	}
</script>

<style lang="css" scoped>
	.logo {
		background-size: contain;
		background-repeat: no-repeat;
		background-position: center;
		width: 150px;
		height: 48px;
	}
	.btn {
		color: white!important;
		font-family: var(--font--);
	}	
	.header-landingpage {
		display: grid;
		grid-template-columns: 1fr 2fr;
		grid-gap: 20px;
		padding: 20px;
		position: fixed;
		width: 100%;
		z-index: 999;
		transform: all .2s ease-out;
	}
	.list-item {
		display: inline;
		margin-left: 18px;
	}
	.brand-child {
		padding-left: 30px;	
		justify-self: start;
	}
	.list-child {
		padding-top: 12px;
		padding-right: 30px;	
		justify-self: end;
	}
	.text-danger {
		cursor: pointer;
	}
	/*.logo {
		/*font-family: var(--font--);*/
		/*font-size: 50px;
	}*/
	.logo-light {
		background-image: url('.././assets/logolight.svg');
	}
	.logo-blue {
		background-image: url('.././assets/logoblue.svg');
	}
	@media only screen and (max-width: 800px) {
		.list-item {
			display: none;
		}
		.logo {
			width: 100px;
		}
		.brand-child {
			padding-left: 0;
		}
	}
/*	.header {
		background-color: white;
		height: 60px;
		width: 100%;
		margin: 0;
	}
	#nav {
	  padding: 30px;
	}

	#nav a {
	  font-weight: bold;
	  color: #2c3e50;
	}

	#nav a.router-link-exact-active {
	  color: #42b983;
	}*/
</style>