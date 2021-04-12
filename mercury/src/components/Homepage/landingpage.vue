<template>
	<section>
		<customHeader></customHeader>
		<section class="showcase-area">
			<!-- custom Header -->
			<!-- custom Header -->
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
	</section>
</template>

<script>
	import customHeader from ".././Header.vue"
	export default {

	  name: 'landingpage',
	  components: {
	  	customHeader
	  },
	  data () {
	    return {

	    }
	  }
	}
</script>

<style lang="css" scoped>
	/* Dont apply dark mode classes */
	section, div {
		background-color: transparent!important;
	}
	/**/
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
		padding-top: 220px;
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
	.main-title {
		font-family: var(--font--);
		font-size: 50px;
	}
	.image-credit {
		color: white;
		position: absolute;
		bottom: 50px;
		left: 50px;
	}

	@media only screen and (max-width: 800px) {
		.content-area {
			padding: 20px;
		}
		.main-title {
			font-family: var(--font--);
			font-size: 30px;
		}
	}
</style>