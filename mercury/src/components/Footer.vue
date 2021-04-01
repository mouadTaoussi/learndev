<template>
	<section class="footer">
		<div>
			<div class="logo"></div>
		</div>
		<div class="list-one">
			<ul class="lists">
				<!-- <li><router-link to="/howitworks">How it works?</router-link></li> -->
				<li><router-link to="/about">About</router-link></li>
				<li><router-link to="/privacy">Privacy& Policy</router-link></li>
				<!-- <li><router-link to="/">Terms of use</router-link></li> -->
			</ul>
		</div>
		<div class="list-two">
			<ul class="lists">
				<li><router-link to="/login">Login</router-link></li>
				<li><router-link to="/register">Contribute</router-link></li>
				<li><router-link to="/resetpassword">Reset password</router-link></li>
				<!-- <li>Item</li> -->
			</ul>
		</div>
		<div class="social-media">
			<ul class="lists">
				<li><a href="" target="_blank">Code available on Github!</a></li>
			</ul>
		</div>
		<p class="cc text-white">Copyright 2021, by mouadTaoussi</p>
	</section>
</template>

<script>
export default {

  name: 'costumFooter',

  data () {
    return {

    }
  }
}
</script>

<style lang="css" scoped>
	.footer {
		position: relative;
		background-color: black;
		height: 280px;
		width: 100%;
		margin-top: 100px;
		padding-top: 50px;
		display: grid;
		grid-template-columns: 300px 300px 300px 300px;
		grid-gap: 5px;
		padding: 50px 50px 0 50px;
		font-family: "Poppins";
	}
	/*.footer div {
		background-color: red;
	}*/
	.logo {
		background-image: url('.././assets/logoblue.svg');
		background-size: contain;
		background-repeat: no-repeat;
		background-position: center;
		width: 200px;
		height: 48px;
		/*margin: 0 auto;*/
		/*margin-bottom: 20px;*/
	}
	.lists {
		list-style: none;
		color: white;
		text-align: left;
		padding:0;
	}
	.lists li {
		padding: 5px;
	}
	.cc {
		position: absolute;
		bottom: 20px;
		right: 50px;
	}
	@media only screen and (max-width: 800px) {
		.footer {
			display: none;
			height: auto;
			background-color: black;
			/*grid-template-columns: 300px 300px 300px 300px;*/
			/*grid-gap: 5px;*/
			/*padding: 50px 50px 0 50px;*/
			/*font-family: "Poppins";*/
		}
		.cc {
			position: static;
			text-align: left;
			margin: 0;
		}
	}
</style>