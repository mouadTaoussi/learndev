<template>
	<section>
		<!-- Custom Header -->
		<costumHeader></costumHeader>
		<!-- Custom Header -->
		<section class="container">
			<h1 class="text-left title">Your account</h1>
			<!-- Tabs btns -->
			<section class="tabs-group">
				<div class="tabs-btns tab-btn-topics tab-btn-active">
					<p @click="switchTab('topics')" class="text-left text-center">
						<i class="tab-title">Topics </i>📘📄
					</p>
				</div>
				<div class="tabs-btns tab-btn-upvoted">
					<p @click="switchTab('upvoted')" class="text-left text-center">
						<i class="tab-title">Upvoted </i>🖥💻
					</p>
				</div>
				<div class="tabs-btns tab-btn-userprofile">
					<p @click="switchTab('userprofile')" class="text-left text-center">
						<i class="tab-title">Your profile </i>📑🧾
					</p>
				</div>
				<!-- <div class="tabs-btns tab-btn-projectideas">
					<p @click="switchTab('projectideas')" class="text-left text-center">
						<i class="tab-title">Project Ideas </i>🧪💡
					</p>
				</div> -->
			</section>

			<!-- Tabs pages -->
			<section class='tabs-pages-topics'>
				<Topic 
					topic_id="fbdbdb" 
					img="https://images.wallpaperscraft.com/image/code_text_programming_146694_1920x1080.jpg" 
					title="Development for beginners"
				></Topic>
				<Topic 
					topic_id="fbdbdb" 
					img="https://images.wallpaperscraft.com/image/code_text_programming_146694_1920x1080.jpg" 
					title="Development for beginners"
				></Topic>
				<Topic 
					topic_id="fbdbdb" 
					img="https://images.wallpaperscraft.com/image/code_text_programming_146694_1920x1080.jpg" 
					title="Development for beginners"
				></Topic>
				<div 
					data-toggle="modal" 
					data-target="#addNewTopic"
					class="shadow bg-primary btn text-white mr-2"
				>Add new Topic +</div>
			</section>

			<section class='tabs-pages-upvoted tab-hidden'>
				<Resource 
				id="sivbfuvbfdhbj"
				title="Typescript course" 
				upvotes="221" 
				upvoted="true"
				creator_name="mouadTaoussi" 
				level="hard" 
				user_id="sdidvhbidfhv"
			></Resource>
			<Resource 
				id="sivvvvbfuvbfdhbj"
				title="Typescript course" 
				upvotes="221" 
				upvoted="true"
				creator_name="mouadTaoussi" 
				level="hard" 
				user_id="sdidvhbidfhv"
			></Resource>
			<Resource 
				id="sivbvbfdhbj"
				title="Typescript course" 
				upvotes="221" 
				upvoted="false"
				creator_name="mouadTaoussi" 
				level="hard" 
				user_id="sdidvhbidfhv"
			></Resource>

			</section>

			<section class='tabs-pages-userprofile tab-hidden'>	
			</section>

			<section class='tabs-pages-projectideas tab-hidden'>	
			</section>

			<!-- Add New Topic Modal -->
			<div 
				class="modal fade" 
				id="addNewTopic" 
				tabindex="-1" 
				role="dialog" 
				aria-labelledby="addNewTopicTitle" 
				aria-hidden="true"
			>
				<div class="modal-dialog modal-dialog-centered" role="document">
					<div class="modal-content">
						<div class="modal-header">
							<h5 class="modal-title" id="addNewTopicTitle">Add New Topic</h5>
							<button type="button" class="close" data-dismiss="modal" aria-label="Close">
							<span aria-hidden="true">&times;</span>
							</button>
						</div>
						<div class="modal-body">

							<p class="text-left text-dark">
								<strong>Enter topic title</strong>
							</p>
							<input
								v-model="newTopic.topic_title" 
								class="form-control my-2" 
								placeholder="Enter the topic title">

							<p class="text-left text-dark">
								<strong>Provide a link about an image</strong>
							</p>
							<input
								v-model="newTopic.background_image" 
								class="form-control my-2" 
								placeholder="Provide us an image link">
							</div>

						<div class="modal-footer">
							<button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
							<button v-on:click="addNewTopic()" type="button" class="btn btn-primary">Add Topic</button>
						</div>
					</div>
				</div>
			</div>
	
		</section>
		<!-- Custom Footer -->
		<costumFooter></costumFooter>
		<!-- Custom Footer -->
	</section>
</template>

<script>
	import costumHeader from ".././components/Header.vue";
	import costumFooter from ".././components/Footer.vue";
	import Topic from ".././components/Userpage/Topic.vue";
	import Resource from ".././components/Topicpage/Resource.vue";
	const  apihost = require('../.././api.config.js');
	import { print } from 'graphql';
	import gql from "graphql-tag";

	export default {

	  name: 'User',

	  components: {
	  	costumHeader,
	  	Topic,
	  	Resource,
	  	costumFooter
	  },
	  
	  data () {
	    return {
	    	newTopic : {
	    		topic_title : null,
	    		background_image : null,
	    		tags : []
	    	}
	    }
	  },
	   methods : {
	   	addNewTopic : function(){
	   		// Check the values
	   		if (this.newTopic.topic_title == null | this.newTopic.topic_title == "") {
	   			alert('Please fill the topic title');
	   		}
	   		else if (this.newTopic.background_image == null || this.newTopic.background_image == ""){
	   			alert('Please fill the background image field');
	   		}
	   		else {

				const ADD_TOPIC = gql`
					mutation($topic_title: String!, $background_image: String!) {
						addTopic(title: $title, background_image: $background_image) {
							title
						}
					}
				`
				const F = `
					query { 
					  getTopic (topic_id: "mytopicid") { 
					    user_id 
					    background_image 
					    title
					    articles { 
					      user_id 
					      topic_id 
					      article_link 
					      title 
					    }
					  }
					}
				`
				// console.log(print(ADD_TOPIC))
				// this.$http({
				// 	url : apihost.api_domain + "/auth/login",
				// 	method : 'GET',
				// })
				// .then((res)=>{
				// 	console.log(res)
				// })
				// .catch((err)=>{
				// 	console.log(err)
				// })
				
	   			// add
	   			this.$http({
	   				url : apihost.api_domain + "/graphql",
	   				method: "POST",
	   				headers: {
						// 'Content-Type': 'application/json',
				        // 'Accept'      : `application/json`
					},
	   				data: {
	   					query: print(ADD_TOPIC),
						variables: {
							title: this.newTopic.title,
							background_image: this.newTopic.background_image,
							// tags : this.newTopic.tags
						},
	   				}
	   			})
	   			.then((res)=>{
	   				// add new topic component
	   			})
	   			.catch((err)=>{

	   			})
	   		}
	   	},
	  	switchTab : function(to){
	  		const topics         = document.querySelector('.tabs-pages-topics');
	  		const upvoted      = document.querySelector('.tabs-pages-upvoted');
	  		const userprofile     = document.querySelector('.tabs-pages-userprofile');
	  		// const projectideas = document.querySelector('.tabs-pages-projectideas');

	  		const topics_btn         =  document.querySelector('.tab-btn-topics');
	  		const upvoted_btn      =  document.querySelector('.tab-btn-upvoted');
	  		const user_profile_btn     =  document.querySelector('.tab-btn-userprofile');
	  		// const projectideas_btn =  document.querySelector('.tab-btn-projectideas');

	  		// Check the target
	  		if(to == "topics") {
	  			topics.classList.remove('tab-hidden');
	  			upvoted.classList.add('tab-hidden');
	  			userprofile.classList.add('tab-hidden');
	  			// projectideas.classList.add('tab-hidden');

	  			// Add mark over tab btn
	  			topics_btn.classList.add('tab-btn-active');
	  			upvoted_btn.classList.remove('tab-btn-active');
	  			user_profile_btn.classList.remove('tab-btn-active');
	  			// projectideas_btn.classList.remove('tab-btn-active');

	  		}
	  		else if (to == "upvoted") {
	  			topics.classList.add('tab-hidden');
	  			upvoted.classList.remove('tab-hidden');
	  			userprofile.classList.add('tab-hidden');
	  			// projectideas.classList.add('tab-hidden');

	  			// Add mark over tab btn
	  			topics_btn.classList.remove('tab-btn-active');
	  			upvoted_btn.classList.add('tab-btn-active');
	  			user_profile_btn.classList.remove('tab-btn-active');
	  			// projectideas_btn.classList.remove('tab-btn-active');
	  		}
	  		else if (to == "userprofile") {
	  			topics.classList.add('tab-hidden');
	  			upvoted.classList.add('tab-hidden');
	  			userprofile.classList.remove('tab-hidden');
	  			// projectideas.classList.add('tab-hidden');

	  			// Add mark over tab btn
	  			topics_btn.classList.remove('tab-btn-active');
	  			upvoted_btn.classList.remove('tab-btn-active');
	  			user_profile_btn.classList.add('tab-btn-active');
	  			// projectideas_btn.classList.remove('tab-btn-active');
	  		}
	  		else if (to == "projectideas") {
	  			topics.classList.add('tab-hidden');
	  			upvoted.classList.add('tab-hidden');
	  			userprofile.classList.add('tab-hidden');
	  			// projectideas.classList.remove('tab-hidden');

	  			// Add mark over tab btn
	  			topics_btn.classList.remove('tab-btn-active');
	  			upvoted_btn.classList.remove('tab-btn-active');
	  			user_profile_btn.classList.remove('tab-btn-active');
	  			// projectideas_btn.classList.add('tab-btn-active');

	  		}
	  	}
	  }
	}
</script>

<style lang="css" scoped>
	.tabs-pages-topics {
		display: grid;
		grid-template-columns: 2fr 2fr 2fr;
		grid-row-gap: 20px;
		grid-column-gap: 20px;
		margin-top: 20px;
		z-index: -1;
	}
	.title {
		font-family: var(--font--);
		margin-top: 20px;
		margin-bottom: 20px;
	}
	.container {
		padding-top: 100px;
	}

	.tabs-btns {
		margin-top: 20px;
		height: 50px;
		display: inline;
		cursor: pointer;
		padding-top: 10px;
		border-bottom: 1.5px solid var(--bootstrap--primary--);
		z-index: 999;
	}
	.tabs-btns:hover {
		background-color: rgba(0,0,0,.1)!important;
		transition: all .1s ease-out;
	}
	.tabs-group {
		background-color: white;
		display: grid;
		grid-template-columns: 2fr 2fr 2fr 2fr;
		/*grid-gap: 5px;*/
		/*position: -webkit-sticky!important;*/
		position: sticky!important;
		top: 60px!important;

	}
	.tab-hidden {
		display: none;
	}
	.tab-btn-active {
		background-color: var(--bootstrap--primary--)!important;
		color: white;
	}
	@media only screen and (max-width: 800px) {
		.tabs-pages-topics {
			display: grid;
			grid-template-columns: 100%;
			grid-gap: 20px;
			width: 100%;
		}
		.tab-title {
			display: none;
		}
		section {
			width: 100%;
		}
	}
</style>