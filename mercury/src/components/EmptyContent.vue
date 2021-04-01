<template>
	<section>
		<div class="empty-area no-content"></div>
		<p class="text-center">Nothing for now to show you!</p>
	</section>
</template>

<script>
export default {

  name: 'EmptyContent',

  data () {
    return {

    }
  }
}
</script>

<style lang="css" scoped>
	section {
		margin-top: 70px;
		margin-bottom: 70px;
		color: black;
	}
	section p {
		font-family: 'Poppins'
	}
	.no-content {
		background-image: url('.././assets/undraw_empty_street_sfxm.svg');
	}
	.empty-area {
		background-repeat: no-repeat;
		background-position: center;
		background-size: contain;
		/*margin: 0 auto!important;*/
		margin-left: auto;
		margin-right: auto;
		width: 400px;
		height: 230px;
	}
	@media only screen and (max-width: 800px)  {
		.empty-area {
			width: 220px;
			height: 180px;		
		}
		section p {
			font-size: 12px;
		}
	}
</style>