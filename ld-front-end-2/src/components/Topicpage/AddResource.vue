<template>
	<section>
		<!-- Alert -->
		<Alert v-bind:type="alert.type" v-bind:message="alert.message"></Alert>
		<!-- Alert -->
		<!-- <h1 class="text-dark">Hello World</h1> -->
		<div 
			data-toggle="modal" 
			data-target="#addResource"
			class="shadow bg-info btn text-white addResource"
		>✏</div>
		<!-- <div 
			data-toggle="modal" 
			data-target="#addResource"
			class="shadow bg-info btn text-white addResource1"
		>add resource ✏</div>
 -->
		<div 
			class="modal fade" 
			id="addResource" 
			tabindex="-1" 
			role="dialog" 
			aria-labelledby="addResourceTitle" 
			aria-hidden="true"
		>
			<div class="modal-dialog modal-dialog-centered" role="document">
				<div class="modal-content">
					<div class="modal-header">
						<h5 class="modal-title" id="addNewTopicTitle">Add New Resource</h5>
						<button type="button" class="close" data-dismiss="modal" aria-label="Close">
						<span aria-hidden="true">&times;</span>
						</button>
					</div>
					<div class="modal-body">
						<p class="text-left text-dark">
							<strong>Enter resource title</strong>
						</p>
						<input
							id="title"
							v-model="newresource.title"
							class="form-control my-2" 
							placeholder="Enter the title of the resource"
						>
						<p class="text-left text-dark">
							<strong>Define the dificulty</strong>
						</p>
						<div class="input-group my-2 ">
						  <div class="input-group-prepend">
						    <label class="input-group-text" for="level">Options</label>
						  </div>
						  <select
							   v-on:change="selectdifficulty($event)" 
							   id="level" 
							   class="custom-select"
						   >
						    <option value="easy">Easy</option>
						    <option value="intermediate">Intermeditate</option>
						    <option value="hard">Hard</option>
						  </select>
						</div>

						<p class="text-left text-dark">
							<strong>Type</strong>
						</p>
						<div class="input-group my-2">
						  <div class="input-group-prepend">
						    <label class="input-group-text" for="type">Options</label>
						  </div>
						  <select
							   v-on:change="selecttype($event)" 
							   id="type" 
							   class="custom-select" 
							>
						    <option value="docs">Documentation</option>
						    <option value="course">Course</option>
						    <option value="article">Article</option>
						    <option value="projectIdea">Project Idea</option>
						  </select>
						</div>

						<p class="text-left text-dark">
							<strong>Enter resource link</strong>
						</p>
						<input
							id="link"
							v-model="newresource.link"
							class="form-control my-2" 
							placeholder="Enter the link of the resource"
						>
						<p class="description hidden text-left text-dark">
							<strong>Enter resource description</strong>
						</p>
						<input
							id="description"
							v-model="newresource.description"
							class="description hidden form-control my-2" 
							placeholder="Enter the description of the resource"
						>
					</div>

					<div class="modal-footer">
						<button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
						<button v-on:click="addResource()" type="button" class="add-resource-btn btn btn-primary">Add Resource</button>
					</div>
				</div>
			</div>
		</div>
	</section>
</template>

<script>
	import Alert from ".././Alert.vue";
	const  apihost = require('../../.././api.config.js');
	import { print } from 'graphql';
	import gql from "graphql-tag";

	export default {

	  name: 'AddResource',
	  components: {
	  	Alert
	  },

	  data () {
	    return {
	    	newresource : {
	    		type     : "docs",
	    		topic_id : this.$route.params.id,
	    		title    : null,
	    		level : "easy",
	    		link : null,
	    		description : null
	    	},
	    	alert : {
	    		type : null,
	    		message : null
	    	}
	    }
	  },
	  // watch : {
	  // 	 "newresource.title": function(){
	  // 		alert('Changer')
	  // 	}
	  // },
	  methods : {
	  	selecttype : function(event) {
	  		//
	  		this.newresource.type = event.target.value;
	  		// Display or undisplay description field
	  		if ( event.target.value == "projectIdea") {
	  			document.querySelectorAll('.description').forEach((e)=>{
	  				e.classList.add('not-hidden');
	  			})
	  			document.querySelectorAll('.description').forEach((e)=>{
	  				e.classList.remove('hidden');
	  			})
	  		}
	  		else {
	  			document.querySelectorAll('.description').forEach((e)=>{
	  				e.classList.add('hidden');
	  			})
	  			document.querySelectorAll('.description').forEach((e)=>{
	  				e.classList.remove('not-hidden');
	  			})
	  		}
	  	},
	  	selectdifficulty : function(event){
	  		this.newresource.level = event.target.value;
	  	},
	  	addResource : function(){
	  		let ADD_RESOURCE = null;

	  		// Validate inputs
	  		if (this.newresource.title == null || this.newresource.link == null) {
		  		document.querySelector('#title').classList.add('is-invalid');
		  		document.querySelector('#link').classList.add('is-invalid');
		  		document.querySelector('#description').classList.add('is-invalid');
			}if(this.newresource.title == "" || this.newresource.link == "") {
				document.querySelector('#title').classList.add('is-invalid');
		  		document.querySelector('#link').classList.add('is-invalid');
		  		document.querySelector('#description').classList.add('is-invalid');

			}
			if (this.newresource.type == "projectIdea" && this.newresource.description == null || this.newresource.description == "") {
				this.showAlert('error','Provide a short description about the idea',"#description");
				return;
			}
			if (this.newresource.title.length < 5 ) {
				this.showAlert('error','Short title are not allowed',"#title");
				return;
			}
			if (!this.newresource.link.includes('http://')){
				if (!this.newresource.link.includes('https://')) {
					this.showAlert('error','this url is not valid',"#link");
					return;	
				}
			}
	  		console.log(this.newresource)

	  		document.querySelector('.add-resource-btn').innerHTML = "Please wait...";

  			// Check the resource type to determine the mutation
	  		if ( this.newresource.type == "docs" ){
				ADD_RESOURCE = gql`
					mutation($topic_id: String!, $title: String!, $level: String!, $link: String!) {
						addDocs(topic_id: $topic_id, title: $title, level: $level, link: $link) {
							title
						}
					}
				`
	  		}
	  		else if ( this.newresource.type == "course" ){
				ADD_RESOURCE = gql`
					mutation($topic_id: String!, $title: String!, $level: String!, $link: String!) {
						addCourse(topic_id: $topic_id, title: $title, level: $level, link: $link) {
							title
						}
					}
				`
	  		}
	  		else if ( this.newresource.type == "article" ){
				ADD_RESOURCE = gql`
					mutation($topic_id: String!, $title: String!, $level: String!, $link: String!) {
						addArticle(topic_id: $topic_id, title: $title, level: $level, link: $link) {
							title
						}
					}
				`		  			
	  		}else if ( this.newresource.type == "projectIdea" ) {
				ADD_RESOURCE = gql`
					mutation($topic_id: String!, $title: String!, $level: String!, $description: String!) {
						addProjectIdea(topic_id: $topic_id, title: $title, level: $level, description: $description) {
							title
						}
					}
				`
	  		}

	  		// add
   			this.$http({
   				url : apihost.api_domain + "/graphql",
   				method: "POST",
   				headers: {
					// 'Content-Type': 'application/json',
			        // 'Accept'      : `application/json`
				},
   				data: {
   					query: print(ADD_RESOURCE),
					variables: {
						topic_id: this.newresource.topic_id,
						title: this.newresource.title,
						level: this.newresource.level,
						link: this.newresource.link,
						description: this.newresource.description,
					},
   				}
   			})
   			.then((res)=>{
   				// add new resource 
   				document.querySelector('.add-resource-btn').innerHTML = "Added!";
   				document.querySelector('.add-resource-btn').classList.add('btn-success');
   				document.querySelector('.add-resource-btn').classList.remove('btn-primary');
   			})
   			.catch((err)=>{
   				// add new resource 
   				document.querySelector('.add-resource-btn').innerHTML = "Try again!";
   				document.querySelector('.add-resource-btn').classList.add('btn-danger');
   				document.querySelector('.add-resource-btn').classList.remove('btn-primary');
   			}) 
	  	},
	  	showAlert : function(type, message, target){
			// Set message to the alert
			this.alert.message = message
			this.alert.error = type
	  		// Show alert
			document.querySelector('.local-alert').style.opacity = "10";
			// Determine where
			document.querySelector(target).classList.add("is-invalid");

			window.setTimeout(()=>{
				document.querySelector('.local-alert').style.opacity = "0";				
			},5000)
		}
	  }
	}
</script>

<style lang="css" scoped>
	.addResource {
		position: absolute;
		bottom: 50px;
		right: 50px;
		position: fixed;
		z-index: 999;
		border-radius: 50%;
		width: 50px;
		height: 50px;
		font-size: 25px;
	}

	.addResource1 {
		position: absolute;
		bottom: 50px;
		right: 50px;
		position: fixed;
		z-index: 999;
	}
	.hidden {
		display: none;
	}
	.not-hidden {
		display: block;
	}
	#addNewTopicTitle {
		font-family: var(--font--);
	}

	@media only screen and (max-width: 800px) {
		.addResource {
			right: 15px;
		}
	}
</style>