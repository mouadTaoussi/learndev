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
				<aside v-for="topic in recommended_topics" class='topic shadow'>
					<a v-bind:href="'https://learndevelopment.vercel.app/topic/'+topic._id">
						<!-- <router-link v-bind:to="'/topic/' +topic._id"> -->
							<img v-bind:src="topic.background_image">
							<p></p>
							<h2 class="topic-title text-white">{{ topic.title }}</h2>
						<!-- </router-link> -->
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
			recommended_topics : [],
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
	  	const RECOMMENDED_TOPICS = gql`
	  		query ($limit:Float!,$skip:Float!) {
			  	getTopics(limit:$limit,skip:$skip){
			    	_id
			    	title
			    	background_image
				}
		  	}
  		`;

  		// Topic resources
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

		// Recommended topics 
		this.$http({
				url : apihost.api_domain + "/graphql",
				method: "POST",
				headers: {
				// 'Content-Type': 'application/json',
		        // 'Accept'      : `application/json`
		        user_token : this.user_token
			},
			data: {
				query: print(RECOMMENDED_TOPICS),
				variables: {
					limit: 4,
					skip: 0,
					// tags : this.newTopic.tags
				}
			}
		})
		.then((res)=>{
			this.recommended_topics = res.data.data.getTopics;
		})
		.catch((err)=>{

		})

	  },
	  methods : { 
	  	// Search
	  	search : function(item_query){
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

	  		// Or load more on the recommended topics
	  		const RESOURCES = gql`
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

	  		// Deciding which query should be sent
	  		const query_sends_to_server = this.search_query == null ? RESOURCES : SEARCH_CONTENT;
	  		
	  		// Get content
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
						topic_id: this.topic_id,
						search_term: this.search_query,
						// tags : this.newTopic.tags
					},
   				}
   			})
   			.then((res)=>{
   				// Push to the current content
   				if (!!res.data.data.getTopic) {
					for (var i = 0; i < res.data.data.getTopic.docs.length; i++) { 
						this.docs.push(res.data.data.getTopic.docs[i]);
					}
					for (var i = 0; i < res.data.data.getTopic.courses.length; i++) { 
						this.courses.push(res.data.data.getTopic.courses[i]);
					}

					for (var i = 0; i < res.data.data.getTopic.articles.length; i++) { 
						this.articles.push(res.data.data.getTopic.articles[i]);
					}

					for (var i = 0; i < res.data.data.getTopic.project_idea.length; i++) { 
						this.projectIdeas.push(res.data.data.getTopic.project_idea[i]);
					}

   				}else if (!!res.data.data.searchContentInTopic){
   					for (var i = 0; i < res.data.data.searchContentInTopic.docs.length; i++) { 
						this.docs.push(res.data.data.searchContentInTopic.docs[i]);
					}
					for (var i = 0; i < res.data.data.searchContentInTopic.courses.length; i++) { 
						this.courses.push(res.data.data.searchContentInTopic.courses[i]);
					}

					for (var i = 0; i < res.data.data.searchContentInTopic.articles.length; i++) { 
						this.articles.push(res.data.data.searchContentInTopic.articles[i]);
					}

					for (var i = 0; i < res.data.data.searchContentInTopic.project_idea.length; i++) { 
						this.projectIdeas.push(res.data.data.searchContentInTopic.project_idea[i]);
					}

   				}

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
		position: sticky;
		top: 80px;
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
		font-size: 20px;
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
		.other-topics {
			margin-top: 25px;
			width: 100%;
			
		}
		.topic {
			width: 100%;
			height: 220px;
			position: relative;
		}
		.topic img {
			width: 100%;
			height: 220px;
		}
		.topic-title {
			font-family: var(--font--);
			position: absolute;
			top: 50%;
			left: 50%;
			transform: translate(-50%, -50%);
		}
	}
</style>