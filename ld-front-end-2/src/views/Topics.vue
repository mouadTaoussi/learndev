<template>
	<section>
		<!-- Custom Header -->
		<costumHeader></costumHeader>
		<!-- Custom Header -->
		<section class="container search-and-filter-container">
			<h1 class="text-left title">Some of the recommended Topics</h1>
			<!-- Search And Filter -->
			<SearchAndFilter v-on:searchQuery="search"></SearchAndFilter>
			<!-- Search And Filter -->
		</section>
		<section class="container topics-container">
			<Topic 
				img="https://images.wallpaperscraft.com/image/code_text_programming_146694_1920x1080.jpg" 
				title="Javascript" 
				topic_id="fbgbggbf"></Topic>
			<Topic 
				img="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%3Fid%3DOIP.Po2093NQhOs70WCOV5eBtQHaEK%26pid%3DApi&f=1" 
				title="Typescript" 
				topic_id="fbgbggbf"></Topic>
			<Topic 
				img="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%3Fid%3DOIP.pNzwj00Fd1YGH8DpD4bp-AHaEL%26pid%3DApi&f=1" 
				title="Ruby" 
				topic_id="fbgbggbf"></Topic>
			<Topic 
				img="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse3.mm.bing.net%2Fth%3Fid%3DOIP._DbjqYETkIJJ6B_v1d8flQHaEK%26pid%3DApi&f=1" 
				title="C++" 
				topic_id="fbgbggbf"></Topic>
			<Topic 
				img="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse4.mm.bing.net%2Fth%3Fid%3DOIP.4vK181HqskjACRtwR7RgtgHaEK%26pid%3DApi&f=1" 
				title="Java" 
				topic_id="fbgbggbf"></Topic>
			<Topic 
				img="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse3.mm.bing.net%2Fth%3Fid%3DOIP.JeDHfgDRRG98FRSFaycpdQHaEK%26pid%3DApi&f=1" 
				title="Backend dev" 
				topic_id="fbgbggbf"></Topic>
			<Topic 
				img="https://images.wallpaperscraft.com/image/code_text_programming_146694_1920x1080.jpg" 
				title="Node.js" 
				topic_id="fbgbggbf"></Topic>
			<Topic 
				img="https://images.wallpaperscraft.com/image/code_text_programming_146694_1920x1080.jpg" 
				title="Internet of things" 
				topic_id="fbgbggbf"></Topic>
			<Topic 
				img="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse4.mm.bing.net%2Fth%3Fid%3DOIP.UJCFmFuv2SCYtSrng1qFFQHaEK%26pid%3DApi&f=1" 
				title="Blockchain" 
				topic_id="fbgbggbf"></Topic>
		</section>
		<button v-on:click="loadMore" class="btn btn-light shadow mt-4 mb-4">Load more</button>
		<!-- Custom Footer -->
		<costumFooter></costumFooter>
		<!-- Custom Footer -->
	</section>
</template>

<script>
	import costumHeader from ".././components/Header.vue";
	import Topic from ".././components/Topicspage/Topic.vue";
	import SearchAndFilter from ".././components/Topicspage/SearchAndFilter.vue";
	import costumFooter from ".././components/Footer.vue";
	const  apihost = require('../.././api.config.js');

	export default {

	  name: 'Topics',

	  components: {
	  	costumHeader,
	  	SearchAndFilter,
	  	Topic,
	  	costumFooter
	  },

	  data () {
	    return {
	    	topics : [],
	    	search_query : null,
	    	skip  : 0,
	    	limit : 10,
	    }
	  },

	  mounted (){
	  	window.scrollTo(0, 0);
	  	// Fetch some Topics
	  	this.skip;
	  	this.limit;
	  },
	  methods : {
	  	search : function(item_query){
	  		// Fetch query
	  		alert('Found '+ item_query)
	  		// Save query to use it in load more
	  		this.search_query = item_query
	  		this.skip;
	  		this.limit;
	  		// Graphql request
	  	},
	  	loadMore: function(){
	  		//
	  		this.search_query;
	  		this.skip;
	  		this.limit;
	  		// increment skip
	  		// push to this.topics
	  	}
	  }
	}
</script>

<style lang="css" scoped>
	.search-and-filter-container {
		padding-top: 100px;
	}
	.topics-container {
		display: grid;
		grid-template-columns: 2fr 2fr 2fr;
		grid-row-gap: 20px;
		grid-column-gap: 20px;
		margin-top: 20px;
	}
	.title {
		font-family: var(--font--);
		margin-top: 20px;
		margin-bottom: 20px;
	}
	@media only screen and (max-width: 800px) {
		.topics-container {
			display: grid;
			grid-template-columns: 100%;
			grid-gap: 20px;
			width: 100%;
		}
	}
</style>