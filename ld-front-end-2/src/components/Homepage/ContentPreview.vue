<template>
	<section class="previewapp">
		<div class="container">
			<div class="content">
				<p class="first-title text-left text-white">- Explore -</p>
				<h1 class="text-white text-left">The resources are more clear to navigate</h1>
				<p class="text-white text-left">
					No need to spend time finding the good resource to you to learn, with LearnDev you can get specific resources that match your needs! 
				</p>
			</div>
			<iframe src="http://localhost:8080/topic/605a004f6e42e12bb8844fd7" class="shadow iframe"></iframe>
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
	.first-title {
		margin: 0;
		padding: 0;
		font-family: "Poppins";
		font-size: 17px;
	}
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
		padding-top: 40px;
		display: grid;
		grid-template-columns: 2fr 3fr;
		grid-gap: 20px;
		height: 300px;
		height: 500px;
	}
	.iframe {
		width: 100%;
		height: 100%;
	    /*overflow:hidden!important;*/
	    overflow-x:hidden!important;
		overflow-Y:hidden!important;
		border: 0;
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