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
				v-for='topic in topics'
				v-bind:img="topic.background_image" 
				v-bind:title="topic.title" 
				v-bind:topic_id="topic._id"></Topic>
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
	import { print } from 'graphql';
	import gql from "graphql-tag";
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
	    	topics : [
	    		{
	    			_id : "gvv",
	    			title : "Javascript",
	    			background_image : "https://images.wallpaperscraft.com/image/code_text_programming_146694_1920x1080.jpg"
	    		},
	    		{
	    			_id : "gvv",
	    			title : "Typescript",
	    			background_image : "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%3Fid%3DOIP.Po2093NQhOs70WCOV5eBtQHaEK%26pid%3DApi&f=1"
	    		},
	    		{
	    			_id : "gvv",
	    			title : "Cyber security",
	    			background_image : "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwallpaper.wiki%2Fwp-content%2Fuploads%2F2017%2F04%2Fwallpaper.wiki-Download-Free-Data-Background-PIC-WPB0010542.jpg&f=1&nofb=1"
	    		},
	    		{
	    			_id : "gvv",
	    			title : "Ruby",
	    			background_image : "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%3Fid%3DOIP.pNzwj00Fd1YGH8DpD4bp-AHaEL%26pid%3DApi&f=1"
	    		},
	    		{
	    			_id : "gvv",
	    			title : "C++",
	    			background_image : "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse3.mm.bing.net%2Fth%3Fid%3DOIP._DbjqYETkIJJ6B_v1d8flQHaEK%26pid%3DApi&f=1"
	    		},
	    		{
	    			_id : "gvv",
	    			title : "Java",
	    			background_image : "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse4.mm.bing.net%2Fth%3Fid%3DOIP.4vK181HqskjACRtwR7RgtgHaEK%26pid%3DApi&f=1"
	    		},
	    		{
	    			_id : "gvv",
	    			title : "Backend dev",
	    			background_image : "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse3.mm.bing.net%2Fth%3Fid%3DOIP.JeDHfgDRRG98FRSFaycpdQHaEK%26pid%3DApi&f=1"
	    		},
	    		{
	    			_id : "gvv",
	    			title : "NodeJs",
	    			background_image : "https://images.wallpaperscraft.com/image/code_text_programming_146694_1920x1080.jpg"
	    		},
	    		{
	    			_id : "gvv",
	    			title : "Internet of things",
	    			background_image : "https://images.wallpaperscraft.com/image/code_text_programming_146694_1920x1080.jpg"
	    		},
	    		{
	    			_id : "gvv",
	    			title : "Blockchain",
	    			background_image : "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse4.mm.bing.net%2Fth%3Fid%3DOIP.UJCFmFuv2SCYtSrng1qFFQHaEK%26pid%3DApi&f=1"
	    		},

	    	],
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
	  		// Save query to use it in load more
	  		this.search_query = item_query

	  		// Back to 0
	  		this.skip = 0;

	  		// Graphql request
	  		const SEARCH_QUERY = gql`
	  		query ($limit:Float!, $skip:Float!, $search_term:String!) {
	  			searchTopic(limit:$limit, skip:$skip, search_term:$search_term){
					_id
					title
					background_image
				}

	  		}
	  		`
	  		this.topics = null;

	  		this.$http({
   				url : apihost.api_domain + "/graphql",
   				method: "POST",
   				headers: {
					// 'Content-Type': 'application/json',
			        // 'Accept'      : `application/json`
				},
   				data: {
   					query: print(SEARCH_QUERY),
					variables: {
						limit: this.limit,
						skip: this.skip,
						search_term: this.search_query,
						// tags : this.newTopic.tags
					},
   				}
   			})
   			.then((res)=>{
   				// Attach that to the topics
   				this.topics = res.data.data.searchTopic;
	   			// Increment the skip 
   			})


	  	},
	  	loadMore: function(){

	  		const SEARCH_QUERY = gql`
	  		query ($limit:Float!, $skip:Float!, $search_term:String!) {
	  			searchTopic(limit:$limit, skip:$skip, search_term:$search_term){
					_id
					title
					background_image
				}

	  		}
	  		`
	  		this.$http({
   				url : apihost.api_domain + "/graphql",
   				method: "POST",
   				headers: {
					// 'Content-Type': 'application/json',
			        // 'Accept'      : `application/json`
				},
   				data: {
   					query: print(SEARCH_QUERY),
					variables: {
						limit: this.limit,
						skip: this.skip,
						search_term: this.search_query,
						// tags : this.newTopic.tags
					},
   				}
   			})
   			.then((res)=>{
   				// Push new content to the topics
   				for (var i = 0; i < res.data.data.searchTopic.length; i++) {
   					this.topics.push(res.data.data.searchTopic[i])
   				}
	   			// Increment the skip 
	   			this.skip += this.limit;
	   			console.log(this.skip)
   			})
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