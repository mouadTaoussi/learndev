<template>
	<section class="header">
		<!-- <div class="alert alert-warning alert-dismissible fade show" role="alert">
		  Hello! Help us grow this platform by contributing and sharing best resources that helped you being a good programmer! and help others!
		  <button type="button" class="close" data-dismiss="alert" aria-label="Close">
		    <span aria-hidden="true">&times;</span>
		  </button>
		</div> -->
		<!-- <div class="alert alert-info alert-dismissible fade show" role="alert">
		  {{ad}}
		  <button type="button" class="close" data-dismiss="alert" aria-label="Close">
		    <span aria-hidden="true">&times;</span>
		  </button>
		</div> -->
	 	<header class="header-landingpage">
	 		<div class="brand-child">
		 		<router-link to="/">
					<!-- <p class="logo text-dark">.learnDev()</p> -->
					<div class="logo logo-blue"></div>
				</router-link>
			</div>
			<div class="list-child">
				<div v-on:click="toggleMenu()" class="menu-for-smaller-devices">
					<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-list" viewBox="0 0 16 16">
					  <path fill-rule="evenodd" d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z"/>
					</svg>
				</div>
				<router-link 
					tag="p" 
					class="list-item" 
					to="/topics"
				>Discover</router-link>
				<router-link 
					v-if="!user_name" 
					tag="p" 
					class="list-item" 
					to="/login"
				>Log in</router-link>
				<router-link 
					v-if="user_name" 
					tag="p" 
					class="list-item list-item-to-be-hidden" 
					to="/user"
				>{{ user_name }}</router-link>
				<p 
					v-if="user_name" 
					class="list-item text-danger" 
					v-on:click='logout()'
				>Log out</p>
				<p class="list-item">
					<DarkMode></DarkMode>
				</p>
				<router-link 
					v-if="!user_name" 
					tag="button" 
					class="shadow btn-sm list-item btn btn-primary list-item-to-be-hidden" 
					to="/register"
				>Contribute</router-link>
			</div>
		</header>
		<aside class="header-smaller-devices shadow"></aside>
			
		</aside>
	</section>
</template>

<script>
	const  apihost = require('../.././api.config.js');
	import DarkMode from "./DarkMode.vue";

	export default {

	  name: 'costumHeader',
	  components: {
		DarkMode
	  },
	  data () {
	    return {
	    	user_name : localStorage.getItem('user_name'),
	    	ad : "The app is still under development! you might face some issues that are gonna be fixed!"
	    }
	  },
	  created(){
	  	  
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
				localStorage.removeItem('user_token');
				// push to topics page
				this.$router.push({ path: '/' });
			})
	  	},
	  	toggleMenu : function(){
	  		const header = document.querySelector('.header-smaller-devices');
	  		console.log(header.style)
	  		console.log(header.style.right)
	  		if (header.style.right == "0px"){
	  			header.style.right = "-300px"
	  		}
	  		else {
	  			header.style.right = "0px"	
	  		}
	  	}
	  }
	}
</script>

<style lang="css" scoped>
	.header {
		position: fixed;
		width: 100%;
		z-index: 999;
	}
	.alert {
		margin: 0;
	}
	.logo {
		background-size: contain;
		background-repeat: no-repeat;
		background-position: center;
		width: 150px;
		height: 38px;
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
	/*	position: fixed;
		width: 100%;
		z-index: 999;*/
		transform: all .2s ease-out;
		height: 80px;
	}
	.list-item {
		color:white;
		display: inline;
		margin-left: 18px;
	}
	.brand-child {
		padding-left: 30px;	
		justify-self: start;
	}
	.list-child {
		padding-top: 8px;
		padding-right: 30px;	
		justify-self: end;
	}
	.list-child p {
		color: var(--list-color--);
		/*font-family: 'Poppins';*/
		cursor: pointer;
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
	.menu-for-smaller-devices {
		display: none;
	}
	.header-smaller-devices {
		width: 300px;
		height: 100vh;
		position: fixed;
		background-color: var(--primary--);
		position: absolute;
		right: -300px;
		transition: all .2s ease-out;
	}
	@media only screen and (max-width: 800px) {
		/*.list-item-to-be-hidden {
			display: none;
		}
		.list-item {
			font-size: 13px;
		}*/
		.menu-for-smaller-devices {
			display: block;
		}
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