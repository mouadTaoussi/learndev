<template>
	<section class="search-area">
		<input 
			v-model="query" 
			type="text" 
			class="form-control search-input" 
			placeholder="Search about a Topic! eg: Javascript, Blockchain...">
		<button v-on:click="search()" class="search-btn btn btn-primary shadow">Search</button>
	</section>
</template>

<script>
export default {

  name: 'SearchAndFilter',

  data () {
    return {
    	query : null
    }
  },
  methods : {
	  search: function(){
	  	if (this.query == null || this.query == '') {
	  		alert('Provide us search query!');
	  		return;
	  	}
	  	this.$emit('searchQuery',this.query);
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