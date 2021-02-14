<template>
	<section>
		<!-- Tabs btns -->
		<aside class="tabs-group">
			<div class="tabs-btns bg-light">
				<p class="text-left text-center"><i class="tab-title">Documentations</i> 📘📄  </p></div>
			<div class="tabs-btns bg-light">
				<p class="text-left text-center"><i class="tab-title">Courses & Videos</i> 🖥💻  </p></div>
			<div class="tabs-btns bg-light">
				<p class="text-left text-center"><i class="tab-title">Articels</i> 📑🧾          </p></div>
			<div class="tabs-btns bg-light">
				<p class="text-left text-center"><i class="tab-title">Project Ideas</i> 🧪💡     </p></div>
		</aside>

		<!-- Tabs pages -->
		<section class='tabs-pages'>
			
		</section>
		<section class='tabs-pages'>
			
		</section>
		<section class='tabs-pages'>
			
		</section>
	</section>
</template>

<script>
export default {

  name: 'Resources',

  data () {
    return {

    }
  }
}
</script>

<style lang="css" scoped>
.tabs-btns {
	/*width: 100px;*/
	margin-top: 20px;
	height: 50px;
	display: inline;
	cursor: pointer;
	padding-top: 10px;
	border-bottom: 1.5px solid var(--primary--);
}
.tabs-group {
	display: grid;
	grid-template-columns: 2fr 2fr 2fr 2fr;
	grid-gap: 5px;
/*	position: -webkit-sticky;
	position: sticky;
	top: 300px;*/

}
@media only screen and (max-width: 800px) {
	.tab-title {
		display: none;
	}
}
</style>