<template>
	<section class="container">
		<div class="single-card shadow bg-light">
			<div>
				<h2 class="text-left">Save time to focus on what matters</h2>
				<p class="text-left">
					Instead of being stuck to learn something, here you'll find paths of learning for you
				</p>
			</div>
			<div><router-link to="/topics"><button class='btn  btn-primary'>Explore now!</button></router-link></div>
		</div>
	</section>
</template>

<script>
	export default {

		name: 'Card',

		data () {
			return {

			}
		}
	}
</script>

<style lang="css" scoped>
	.single-card {
		display: grid;
		grid-template-columns: 2fr 1fr;
		grid-gap: 20px;
		/*background-color: ;*/
		padding: 40px;
		position: relative;
		color: black;
	}
	p, h2 {
		font-family: var(--font--);
	}
	.btn {
		position: absolute;
		top: 40%;
	}
	@media only screen and (max-width: 800px) {
		.single-card {
			display: grid;
			grid-template-columns: 100%;
		}
		.btn {
			position: static;
			float: left;
		}
	}	
</style>