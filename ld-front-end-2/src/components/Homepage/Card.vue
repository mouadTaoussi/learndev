<template>
	<section class="container">
		<div class="card-area light shadow bg-light">
			<div>
				<h2 class="text-dark text-left">Save time to focus on what matters</h2>
				<p class="text-dark text-left">
					Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
				</p>
			</div>
			<div><button class='btn  btn-primary'>Explore now!</button></div>
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
	.card-area {
		display: grid;
		grid-template-columns: 2fr 1fr;
		grid-gap: 20px;
		/*background-color: ;*/
		padding: 40px;
		position: relative;
	}
	p, h2 {
		font-family: var(--font--);
	}
	.btn {
		position: absolute;
		top: 40%;
	}
	@media only screen and (max-width: 800px) {
		.card-area {
			display: grid;
			grid-template-columns: 100%;
		}
		.btn {
			position: static;
			float: left;
		}
	}	
</style>