<template>
	<section class="header">
	 	<header class="header-landingpage">
	 		<div class="brand-child">
		 		<router-link to="/">
					<p class="logo text-dark">.learnDev()</p>
				</router-link>
			</div>
			<div class="list-child">
				<router-link tag="a" class="list-item" to="/topics">Discover Topics</router-link>
				<router-link tag="a" class="list-item" to="/about">About</router-link>
				<router-link tag="a" class="list-item" v-bind:to="'/user/'+'vvvv'">MOUAD</router-link>
				<router-link tag="button" class="shadow list-item btn btn-primary" to="/login">Contribute</router-link>
			</div>
		</header>
	</section>
</template>

<script>
export default {

  name: 'costumHeader',

  props : { 'user_name': String, 'user_id': String },

  data () {
    return {

    }
  }
}
</script>

<style lang="css" scoped>
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
		padding-right: 30px;	
		justify-self: end;
	}
	.logo {
		font-family: var(--font--);
		/*font-size: 50px;*/
	}
	@media only screen and (max-width: 800px) {
		.list-item {
			display: none;
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