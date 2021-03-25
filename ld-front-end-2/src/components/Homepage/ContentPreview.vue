<template>
	<section class="previewapp">
		<div class="container">
			<div class="content">
				<h1 class="text-white text-left">Hello World</h1>
				<p class="text-white text-left">
					Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
				</p>
			</div>
			<iframe src="http://localhost:8080/topic/605a004f6e42e12bb8844fd7" class="iframe"></iframe>
		</div>
	</section>
</template>

<script>
export default {

  name: 'ContentPreview',

  data () {
    return {

    }
  }
}
</script>

<style lang="css" scoped>
	.previewapp {
		background-image: url('../.././assets/backgroundForPreviewApp.svg');
		background-size: contain;
		background-repeat: no-repeat;
		background-position: center;
		width: 100%;
		height: 500px;
		margin-top: var(--margin-between-sections-in-homepage--);
		margin-bottom: var(--margin-between-sections-in-homepage--);
	}
	.container {
		padding-top: 50px;
		display: grid;
		grid-template-columns: 2fr 3fr;
		grid-gap: 20px;
		height: 300px;
		height: 500px;
	}
	.iframe {
		width: 100%;
		height: 90%;
	    /*overflow:hidden!important;*/
	    overflow-x:hidden!important;
		overflow-Y:hidden!important;
	}
	.content {
		font-family: var(--font--);
		margin-top: 140px;
	}
	@media only screen and (max-width: 800px) {
	.container{
		display: grid;
		grid-template-columns: 2fr;
		grid-gap:10px;
	}	
	.iframe {
		display: none;
	}	
} 
</style>