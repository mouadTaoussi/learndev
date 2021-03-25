<template>
	<section class="container">
		<div class="card-area">
			<div class="">
				<h2 class="text-left">Hello World</h2>
				<p class="text-left">
					Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
				</p>
			</div>
			<div class="">ccccccccccccccccccccccccccccccc</div>
		</div>
	</section>
</template>

<script>
export default {

  name: 'SecondShowCase',

  data () {
    return {

    }
  }
}
</script>

<style lang="css" scoped>

	.card-area {
		display: grid;
		grid-template-columns: 2fr 2fr;
		grid-gap:10px;
		margin-top: var(--margin-between-sections-in-homepage--);
		margin-bottom: var(--margin-between-sections-in-homepage--);
	}
	.card-area {
		font-family: var(--font--);
	}
	@media only screen and (max-width: 800px) {
		.card-area {
			display: grid;
			grid-template-columns: 2fr;
			grid-gap:10px;
		}		
	}
</style>