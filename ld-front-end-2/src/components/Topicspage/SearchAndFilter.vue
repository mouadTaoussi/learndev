<template>
	<section class="search-area">
		<input type="text" class="form-control search-input" placeholder="Search about a Topic! eg: Javascript, Blockchain...">
		<button class="search-btn btn btn-primary shadow">Search</button>
	</section>
</template>

<script>
export default {

  name: 'SearchAndFilter',

  data () {
    return {

    }
  }
}
</script>

<style lang="css" scoped>
	.search-area {
		display: grid;
		grid-template-columns: 78% 20%;
		grid-gap: 1%;	
	}
	@media only screen and (max-width: 800px) {
		.search-area {
			display: grid;
			grid-template-columns: 100%;
			grid-gap: 1%;	
		}
	}
</style>