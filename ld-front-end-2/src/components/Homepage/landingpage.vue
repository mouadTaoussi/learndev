<template>
	<section class="showcase-area">
		<header class="header-landingpage">
			<div class="brand-child"><p class="logo text-white">.learnDev()</p></div>
			<div class="list-child">
				<router-link tag="a" class="list-item" to="/">Discover Topics</router-link>
			    <!-- <router-link to="/topics">Topics</router-link> -->
			    <!-- <router-link to="/topic">Topic</router-link> -->
			    <!-- <router-link to="/resetpassword">Reset Password</router-link> -->
			    <!-- <router-link tag="a" class="list-item" to="/register">Search</router-link> -->
			    <router-link tag="a" class="list-item" to="/about">About</router-link>
			    <!-- <input class="list-item form-control" placeholder="Search" type="text"> -->
			    <router-link tag="button" class="shadow list-item btn btn-primary" to="/login">Contribute</router-link>
			    <!-- <router-link tag="button" class="btn btn-primary" to="/user">User</router-link> -->
			</div>
		</header>
		<section>
			<div class="content-area">
				<h1 class="main-title text-white">
					Learn Development in a straight way!
				</h1>
				<router-link to="/topics">
					<button class="btn btn-primary m-2">Explore Topics</button>
				</router-link>
				<router-link to="/register">
					<button class="btn btn-primary m-2">Contribute</button>
				</router-link>
			</div>
			<p class="image-credit">
				Photo by <a href="https://www.pexels.com/@neo-853421"><strong>Neo</strong></a> from Pexels</p>
		</section>
	</section>
</template>

<script>
export default {

  name: 'landingpage',

  data () {
    return {

    }
  }
}
</script>

<style lang="css" scoped>
	.btn {
		color: white!important;
		font-family: 'Changa', sans-serif;
	}
	.showcase-area {
		background-image: url('../.././assets/pexels-neo-2653362.jpg');
		background-repeat: no-repeat;
		background-origin: content-box;
		background-size: cover;
		background-position: center;
		background-attachment: fixed;
		width: 100%;
		height: 600px;
		position: relative;
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
		font-family: 'Changa', sans-serif;
		/*font-size: 50px;*/
	}
	.main-title {
		font-family: 'Changa', sans-serif;
		font-size: 50px;
	}
	.content-area {
		position: absolute;
		top: 220px;
		left: 20%;
	}
	.image-credit {
		color: white;
		position: absolute;
		bottom: 50px;
		left: 50px;
	}
	a {
		color: white;
		text-decoration: none;
	}

	@media only screen and (max-width: 800px) {

	}
</style>