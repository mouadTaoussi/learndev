<template>
	<section class="container">
		<div class="card-area">
			<div class="content-child">
				<h2 class="text-left">Hello World</h2>
				<p class="text-left">
					Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
				</p>
			</div>
			<div class="svg-child"></div>
		</div>
	</section>
</template>

<script>
export default {

  name: 'FirstShowCase',

  data () {
    return {

    }
  }
}
</script>

<style lang="css" scoped>

	.card-area {
		display: grid;
		grid-template-columns: 2fr 3fr;
		grid-gap:30px;
		margin-top: var(--margin-between-sections-in-homepage--);
		margin-bottom: var(--margin-between-sections-in-homepage--);
	}
	.card-area {
		font-family: var(--font--);
	}
	.svg-child {
		background-image: url('../.././assets/undraw_programming_2svr.svg');
		background-position: center;
		background-size: contain;
		height: 350px;
		background-repeat: no-repeat;

	}
	.content-child {
		padding-top: 80px;
	}
	@media only screen and (max-width: 800px) {
		.card-area {
			display: grid;
			grid-template-columns: 2fr;
			grid-gap:10px;
		}		
	}
</style>