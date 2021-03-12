<template>
	<section>
		<!-- Custom Header -->
		<costumHeader user_name="" user_id=""></costumHeader>
		<!-- Custom Header -->
		<section class="container">
			<div class="search-and-filter-container">
				<h1 class="text-left title">{{ title }}</h1>
				<p class="creator_name text-left">by {{ creator_name }}</p>
				<!-- Search And Filter -->
				<SearchAndFilter v-on:searchQuery="search"></SearchAndFilter>
				<!-- Search And Filter -->
				<!-- AddResource -->
				<AddResource></AddResource>
				<!-- AddResource -->
				<!-- Resources -->
				<Resources 
					v-bind:docs="docs" 
					v-bind:courses="courses" 
					v-bind:articles="articles" 
					v-bind:projectideas="projectIdeas"
				></Resources>
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
	import { print } from 'graphql';
	import gql from "graphql-tag";
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
	  data (){
	  	return {
	  		title        : null,
	  		creator_name : null,
	  		topic_id : this.$route.params.id,
	  		docs         : [],
			courses      : [],
			articles     : [],
			projectIdeas : [],
	  		search_query : null,
	  		skip : 0,
	  		limit: 10
	  	}
	  },
	  mounted (){
	  	window.scrollTo(0, 0);
	  	// Fetch Topic within 
	  	// - Docs (Check upvoted ones)
	  	// - Courses(Check upvoted ones) 
	  	// - Articles(Check upvoted ones) 
	  	// - ProjectIdeas(Check upvoted ones)
	  	const TOPIC_QUERY = gql`
		  	query ($topic_id:String!,$limit:Float!,$skip:Float!){
			  	getTopic(topic_id:$topic_id,limit:$limit,skip:$skip) {
					_id creator_name title
					docs {
						_id topic_id creator_name title link level user_id upvotes_count upvoted
					}
					courses {
						_id topic_id creator_name title link level user_id upvotes_count upvoted
					}
					articles {
						_id topic_id creator_name title link level user_id upvotes_count upvoted
					}
					project_idea {
						_id topic_id creator_name title description user_id upvotes_count upvoted
					}
				}
		  	}
	  	`;

	  	this.$http({
				url : apihost.api_domain + "/graphql",
				method: "POST",
				headers: {
				// 'Content-Type': 'application/json',
		        // 'Accept'      : `application/json`
			},
			data: {
				query: print(TOPIC_QUERY),
				variables: {
					limit: this.limit,
					skip: this.skip,
					topic_id: this.topic_id,
					// tags : this.newTopic.tags
				},
			}
		})
		.then((res)=>{
			//
			this.title = res.data.data.getTopic.title, 
			this.creator_name = res.data.data.getTopic.creator_name, 
			this.docs = res.data.data.getTopic.docs;
			this.courses = res.data.data.getTopic.courses;
			this.articles = res.data.data.getTopic.articles;
			this.projectIdeas = res.data.data.getTopic.project_idea;
		})
		.catch((err)=>{

		})

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
	  		// Incretment skip
	  		this.skip += this.limit;
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
		margin-bottom: 0px;
	}
	.creator_name {
		margin-bottom: 20px;
	}
</style>