<template>
	<section class="container">
		<div class="card-area">
			<div class="content-child">
				<p class="first-title text-left text-primary">- learning -</p>
				<h2 class="text-left">Learn programming by finding the right resources for you!</h2>
				<p class="text-left">
					You can get acces to thousands of resources appropriate to your path, by getting specific content shared by other developers!
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
	.first-title {
		margin: 0;
		padding: 0;
		font-family: "Poppins";
		font-size: 17px;
	}
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