<template>
	<section>
		<!-- Custom Header -->
		<costumHeader user_name="" user_id=""></costumHeader>
		<!-- Custom Header -->
		<section class="container">
			<div class="content">
				<h1 class="text-left title">{{ title }}</h1>
				<p class="creator_name text-left">by {{ creator_name }}</p>
				<!-- Search And Filter -->
				<SearchAndFilter v-on:searchQuery="search"></SearchAndFilter>
				<!-- Search And Filter -->
				<!-- AddResource -->
				<AddResource v-if="isLoggedIn"></AddResource>
				<!-- AddResource -->
				<!-- Resources -->
				<Resources 
					v-bind:docs="docs" 
					v-bind:courses="courses" 
					v-bind:articles="articles" 
					v-bind:projectideas="projectIdeas"
				></Resources>
				<!-- Resources -->
				<button v-on:click="loadMore" class="btn btn-primary btn-sm shadow mt-4 mb-4">Load more</button>
			</div>
			<!-- <div class="ad">
				<img class="ad-section" src="">
			</div> -->
			<div class="other-topics">
				<h5 class="text-left">Topics you might like</h5>
				<aside class='topic shadow'>
					<a href="https://learndevelopment.vercel.app/topic/6070db2d021b36001518db80">
						<img src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fdm0qx8t0i9gc9.cloudfront.net%2Fthumbnails%2Fvideo%2FcW5lDBG%2Fglowing-light-blue-abstract-programming-code-background-on-dark-software-or-script-development-concept_rgg0rnttyl_thumbnail-1080_01.png&f=1&nofb=1">
						<p></p>
						<h2 class="topic-title text-white">Javascript</h2>
					</a>
				</aside>
				<aside class='topic shadow'>
					<a href="https://learndevelopment.vercel.app/topic/6076c8eee9ad1a00153f1d46">
						<img src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwallpapercave.com%2Fwp%2Fwp7733009.jpg&f=1&nofb=1">
						<p></p>
						<h2 class="topic-title text-white">Angular</h2>
					</a>
				</aside>
				<aside class='topic shadow'>
					<a href="https://learndevelopment.vercel.app/topic/60760aa540e46e0015b266d8">
						<img src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fs3.amazonaws.com%2Frevue%2Fitems%2Fimages%2F001%2F916%2F326%2Fmail%2Fvue-wallpaper.jpg%3F1493155295&f=1&nofb=1">
						<p></p>
						<h2 class="topic-title text-white">VueJS</h2>
					</a>
				</aside>
				<aside class='topic shadow'>
					<a href="https://learndevelopment.vercel.app/topic/607609b240e46e0015b266d3">
						<img src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwallpaperplay.com%2Fwalls%2Ffull%2F6%2F6%2F2%2F99686.jpg&f=1&nofb=1">
						<p></p>
						<h2 class="topic-title text-white">C++</h2>
					</a>
				</aside>
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
	// import EmptyContent from '.././components/EmptyContent.vue';
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
	  	// EmptyContent,
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
	  		limit: 20,
	  		isLoggedIn : !!localStorage.getItem('user_name'),
	  		user_token : localStorage.getItem('user_token') == null ? undefined : localStorage.getItem('user_token')
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
					_id 
					creator_name 
					title
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
		        user_token : this.user_token
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

			// Increment skip
	  		this.skip += this.limit;

		})
		.catch((err)=>{

		})

	  },
	  methods : { 
	  	// Search
	  	search : function(item_query){
	  		console.log(item_query)
	  		// back to 0 beacuse we search new one
	  		this.skip = 0;

	  		// Save query to use it in load more
	  		this.search_query = item_query

	  		this.docs         = null;
			this.courses      = null;
			this.articles     = null;
			this.projectIdeas = null;

	  		// Graphql request
	  		const SEARCH_CONTENT = gql`
				query ($topic_id:String!, $search_term: String!, $limit: Float!, $skip: Float!) {
					searchContentInTopic (topic_id:$topic_id, search_term:$search_term, limit:$limit, skip:$skip) {
						user_id
						creator_name
						title
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
			`
				this.$http({
					url : apihost.api_domain + "/graphql",
					method: "POST",
					headers: {
					// 'Content-Type': 'application/json',
			        // 'Accept'      : `application/json`
			        user_token : this.user_token
				},
				data: {
					query: print(SEARCH_CONTENT),
					variables: {
						limit: this.limit,
						skip: this.skip,
						topic_id: this.topic_id,
						search_term: this.search_query,
						// tags : this.newTopic.tags
					},
				}
			})
			.then((res)=>{
				// Get them out
				this.docs = res.data.data.searchContentInTopic.docs;
				this.courses = res.data.data.searchContentInTopic.courses;
				this.articles = res.data.data.searchContentInTopic.articles;
				this.projectIdeas = res.data.data.searchContentInTopic.project_idea;

		  		// Increment skip
		  		this.skip += this.limit;
			})
	  	},
	  	loadMore : function() {

	  		// push to docs + courses + articels + projectIdeas

	  		// Or load more on the recommended topics
	  		const RESOURCES = gql``;
	  		
	  		// Get content
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
   				
	   			// Increment the skip 
	   			this.skip += this.limit;
   			})

	  		// Increment skip
	  		// this.skip += this.limit;
	  	}
	  }
	}
</script>

<style lang="css" scoped>
	.container  {
		display: grid;
		grid-template-columns: 4fr 1fr;
		grid-gap: 20px;
	}
	.content {
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
	.other-topics {
		margin-top: 165px;
		width: 100%;
		height: 250px;
		/*position: sticky;*/
		/*top: 0;*/
	}
	.topic {
		width: 220px;
		height: 120px;
		position: relative;
		border-radius: 3px;
		cursor: pointer;
		margin-top: 15px;
	}
	.topic img {
		width: 220px;
		height: 120px;
		border-radius: 3px;
	}
	.topic-title {
		font-family: var(--font--);
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
	}
	@media only screen and (max-width: 800px) {
		.container  {
			/*display: grid;*/
			grid-template-columns: 100%;
		}
		.title {
			font-size: 30px;
		}
		.creator_name {
			font-size: 12px;
		}
	}
</style>