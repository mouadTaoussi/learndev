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
		<section v-if="topics" class="container topics-container">
			<announcements 
				img="https://raw.githubusercontent.com/mouadTaoussi/learndev/a53c485da1c8abe7ab6ef2d2306fc72e4c6ece86/mercury/src/assets/announcements/announcement_smaller.svg"></announcements>
			<Topic 
				v-for='topic in topics'
				v-bind:img="topic.background_image" 
				v-bind:title="topic.title" 
				v-bind:topic_id="topic._id"></Topic>
		</section>
		<!-- EmptyContent -->
		<EmptyContent v-else></EmptyContent>
		<!-- EmptyContent -->
		<button v-on:click="loadMore" class="btn btn-primary btn-sm shadow mt-4 mb-4">Load more</button>
		<!-- Custom Footer -->
		<costumFooter></costumFooter>
		<!-- Custom Footer -->
	</section>
</template>

<script>
	import costumHeader from ".././components/Header.vue";
	import announcements from ".././components/Topicspage/announcements.vue";
	import Topic from ".././components/Topicspage/Topic.vue";
	import SearchAndFilter from ".././components/Topicspage/SearchAndFilter.vue";
	import EmptyContent from '.././components/EmptyContent.vue';
	import costumFooter from ".././components/Footer.vue";
	import { print } from 'graphql';
	import gql from "graphql-tag";
	const  apihost = require('../.././api.config.js');

	export default {

	  name: 'Topics',

	  components: {
	  	costumHeader,
	  	SearchAndFilter,
	  	announcements,
	  	Topic,
	  	EmptyContent,
	  	costumFooter
	  },

	  data () {
	    return {
	    	topics : null,
	    	topics_demo : [
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

	  	// if the user is logged in from Oauth then we need to store an indicator in localstorage
	  	if (this.$route.query.Oauth = true && this.$route.query.user_token) {
	  		this.$http({
		  		method : "GET",
		  		url    : apihost.api_domain + '/auth/getuser',
		  		headers : {
		  			user_token : this.user_token
		  		},
		  	})
		  	.then((res)=>{
		  		// Set a localstorage value to know whether the user already logged in or not
				localStorage.setItem('user_name',res.data.user.user_name);
				localStorage.setItem('user_token',this.$route.query.user_token);
		  	})
		  	.catch((err)=>{
		  	})
	  	}

	  	const GET_TOPICS = gql`
		  	query ($limit:Float!,$skip:Float!) {
			  	getTopics(limit:$limit,skip:$skip){
			    	_id
			    	title
			    	background_image
				}
		  	}
	  	`
	  	// Fetch some Topics
	  	this.$http({
			url : apihost.api_domain + "/graphql",
			method: "POST",
			headers: {
			// 'Content-Type': 'application/json',
	        // 'Accept'      : `application/json`
			},
			data: {
				query: print(GET_TOPICS),
				variables: {
					limit: this.limit,
					skip: this.skip,
				},
			},
			onUploadProgress : function(progressEvent) {
				const totalLength = progressEvent.lengthComputable ? progressEvent.total : progressEvent.target.getResponseHeader('content-length') || progressEvent.target.getResponseHeader('x-decompressed-content-length');

                if (totalLength !== null) {
                    const progress_status = Math.round( (progressEvent.loaded * 100) / totalLength );
                    // Display progress bar
                    document.querySelector('.progress').style.width = progress_status + "%";
                    // Hide progress bar
                    window.setTimeout(function(){
	                    document.querySelector('.progress').style.width = 0 + "%";
                    },1200)

                }

			}
		})
		.then((res)=>{
			// Attach that to the topics
			this.topics = res.data.data.getTopics;
			// Increment the skip 
			this.skip += this.limit;
		})
		.catch(()=>{

		})
	  },
	  methods : {
	  	search : function(item_query){
	  		// Save query to use it in load more
	  		this.search_query = item_query

	  		// back to 0 beacuse we search new one
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
   				this.skip += this.limit;
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

	  		// Or load more on the recommended topics
	  		const TOPICS = gql`
		  		query ($limit:Float!,$skip:Float!) {
				  	getTopics(limit:$limit,skip:$skip){
				    	_id
				    	title
				    	background_image
					}
			  	}
	  		`;

	  		// Deciding which query should be sent
	  		const query_sends_to_server = this.search_query == null ? TOPICS : SEARCH_QUERY;

	  		this.$http({
   				url : apihost.api_domain + "/graphql",
   				method: "POST",
   				headers: {
					// 'Content-Type': 'application/json',
			        // 'Accept'      : `application/json`
				},
   				data: {
   					query: print(query_sends_to_server),
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
   				if(  !!res.data.data.getTopics ) {
   					for (var i = 0; i < res.data.data.getTopics.length; i++) {
	   					this.topics.push(res.data.data.getTopics[i])
	   				}	
   				}
   				else if ( !!res.data.data.searchTopic ) {
	   				for (var i = 0; i < res.data.data.searchTopic.length; i++) {
	   					this.topics.push(res.data.data.searchTopic[i])
	   				}
   				}
	   			// Increment the skip 
	   			this.skip += this.limit;
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
		.title {
			font-size: 30px;	
		}
	}
</style>