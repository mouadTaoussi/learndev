<template>
	<section>
		<div class="empty-area"></div>
		<p class="text-center text-dark">Nothing for now to show you!</p>
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
	}
	section p {
		font-family: 'Poppins'
	}
	.empty-area {
		background-image: url('.././assets/undraw_empty_street_sfxm.svg');
		background-repeat: no-repeat;
		background-position: center;
		background-size: contain;
		/*margin: 0 auto!important;*/
		margin-left: auto;
		margin-right: auto;
		width: 400px;
		height: 230px;
	}
</style>