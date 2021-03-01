<template>
	<section>
		<!-- Custom Header -->
		<costumHeader></costumHeader>
		<!-- Custom Header -->
		<section class="container">
			<div class="search-and-filter-container">
				<h1 class="text-left title">Android Development</h1>
				<!-- Search And Filter -->
				<SearchAndFilter v-on:searchQuery="search"></SearchAndFilter>
				<!-- Search And Filter -->
				<!-- AddResource -->
				<AddResource></AddResource>
				<!-- AddResource -->
				<!-- Resources -->
				<Resources docs="dddddd" cources="" articles="" projectideas=""></Resources>
				<!-- Resources -->
				<button v-on:click="loadMore" class="btn btn-light shadow mt-4 mb-4">Load more</button>
			</div>
		</section>
		<!-- Custom Footer -->
		<costumFooter></costumFooter>
		<!-- Custom Footer -->
	</section>
</template>

<script>
	import costumHeader from ".././components/Header.vue";
	import SearchAndFilter from ".././components/Topicpage/SearchAndFilter.vue";
	import AddResource from ".././components/Topicpage/AddResource.vue";
	import Resources from ".././components/Topicpage/Resources.vue";
	import costumFooter from ".././components/Footer.vue";
	const  apihost = require('../.././api.config.js');


	export default {

	  name: 'Topic',

	  components: {
	  	costumHeader,
	  	SearchAndFilter,
	  	AddResource,
	  	Resources,
	  	costumFooter
	  },
	  mounted (){
	  	// Fetch Topic within 
	  	// - Docs (Check upvoted ones)
	  	// - Courses(Check upvoted ones) 
	  	// - Articles(Check upvoted ones) 
	  	// - ProjectIdeas(Check upvoted ones)
	  	this.skip;
	  	this.limit;
	  },
	  data () {
	    return {
	    	docs         : [],
	    	courses      : [],
	    	articles     : [],
	    	projectIdeas : [],
	    	search_query : null,
	    	skip         : 0,
	    	limit        : 10
	    }
	  },
	  methods : {
	  	// Search
	  	search : function(item_query){
	  		// Fetch query // send query+ topic_id +user_id in session
	  		alert('found '+ item_query)
	  		// Save query to use it in load more
	  		this.search_query = item_query
	  		this.skip;
	  		this.limit;
	  		// Graphql request
	  	},
	  	loadMore : function() {
	  		//
	  		this.search_query;
	  		this.skip;
	  		this.limit;
	  		// increment skip
	  		// push to docs + courses + articels + projectIdeas
	  	}
	  }
	}
</script>

<style lang="css" scoped>
	.search-and-filter-container {
		padding-top: 100px;
	}
	.title {
		font-family: var(--font--);
		margin-top: 20px;
		margin-bottom: 20px;
	}
</style>