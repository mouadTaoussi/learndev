<template>
	<section id="resource-card">
			<!-- Alert -->
			<!-- <Alert v-bind:type="alert.type" v-bind:message="alert.message"></Alert> -->
			<Alert v-bind:type="alert.type" v-bind:message="alert.message"></Alert>
			<!-- Alert -->
			<div class="border bg-light resource-area text-left my-2 p-2">

				<div class="upvote">
					<button 
						@click="upvote(upvoted)" 
						v-if="!upvoted" 
						v-bind:class="'upvote-btn btn btn-outline-warning text-dark upvote-btn'+id"
					>
						<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-caret-up-fill" viewBox="0 0 16 16">
						  <path d="M7.247 4.86l-4.796 5.481c-.566.647-.106 1.659.753 1.659h9.592a1 1 0 0 0 .753-1.659l-4.796-5.48a1 1 0 0 0-1.506 0z"/>
						</svg><br>
						{{ resource_upvotes }}
					</button>
					<button 
						@click="upvote(upvoted)" 
						v-else 
						v-bind:class="'upvote-btn btn btn-warning text-dark upvote-btn'+id"
					>
						<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-caret-up-fill" viewBox="0 0 16 16">
						  <path d="M7.247 4.86l-4.796 5.481c-.566.647-.106 1.659.753 1.659h9.592a1 1 0 0 0 .753-1.659l-4.796-5.48a1 1 0 0 0-1.506 0z"/>
						</svg><br>
						{{ resource_upvotes }}
					</button>
				</div>

				<div class="content">
				
						<a class="text-dark"  
							v-bind:href='"http://localhost"' target="_blank"
							v-on:click="showDescription($event,id,link,description)" 
							>
							<h5 class="title">{{ title }}</h5>
						</a>
						<i>
							By {{ creator_name }}
						</i>
					<span class="level badge badge-danger ml-2">{{ level }}</span>
				</div>
			</div>
			<div v-bind:id="'a'+id" class="description-hidden border shadow p-4">
				<p class="text-left text-dark">{{description}}</p>
			</div>
	</section>
</template>

<script>
	const apihost = require('../../.././api.config.js');
	import { print } from 'graphql';
	import gql from "graphql-tag";
	import Alert from ".././Alert.vue";

	export default {

	  name: 'Resource',
	  props : [ "id", "type", "title","upvotes", "upvoted", "creator_name", "link", "level", "user_id","description" ],
	  components: {
	  	Alert
	  },
	  data () {
	    return {
	    	id               : this.id,
	    	type             : this.type,
	    	user_id          : this.user_id,
	    	creator_name     : this.creator_name,
	    	title            : this.title,
	    	link             : this.link,
	    	level            : this.level,
	    	resource_upvotes : this.upvotes,
	    	upvoted          : this.upvoted,
	    	description      : this.description,
	    	alert : {
	    		type : "error",
	    		message : "Something went wrong!"
	    	}
	    }
	  },
	  methods: {
	  	showDescription : function(event,id,link,description) {

	  		// if there is description but there is no link then this is a projectidea
	  		if (description && !link) {
	  			// Don't redirect user 
	  			event.preventDefault()

		  		const description_area = document.querySelector("#a"+id);

		  		if (description_area.classList.contains('description-show')) {
		  			if (!description_area.classList.contains('description-hidden')) {
			  			// Hide description area
			  			description_area.classList.add('description-hidden');
			  			description_area.classList.remove('description-show');
		  			}
		  		}
		  		else if(description_area.classList.contains('description-hidden')) {
		  			if (!description_area.classList.contains('description-show')) {
		  				// Show description area
			  			description_area.classList.add('description-show');
			  			description_area.classList.remove('description-hidden');
		  			}
		  		}
	  		}
	  		else {
	  			// Redirect user
	  		}
	  	},
	  	// if the user owns that resource
	  	deleteResource : function (){

	  	},
	  	upvote : function(upvote){
	  		const upvote_btn = document.querySelector('.upvote-btn'+this.id); 
	  		// Check if already upvoted
	  		// Toggle the button color
	  		if ( upvote_btn.classList.contains('btn-warning') ) {
	  			upvote_btn.classList.remove('btn-warning');
	  			upvote_btn.classList.add('btn-outline-warning');
	  			// Decrement the upvote
	  			this.resource_upvotes --;
	  		}
	  		else {
	  			upvote_btn.classList.add('btn-warning');
	  			upvote_btn.classList.remove('btn-outline-warning');
	  			// Increase the upvote
	  			this.resource_upvotes ++;
	  		}

	  		// Send that upvote including -resource_id -type -user_id (in session)
	  		const UPVOTE = gql`
	  			mutation ($type: String!, $resource_id:String!) {
				  upvote( type:$type, resource_id:$resource_id ){ upvoted }
				}
	  		`;
	  		// alert(upvote);

	  		// add
   			this.$http({
   				url : apihost.api_domain + "/graphql",
   				method: "POST",
   				headers: {
					// 'Content-Type': 'application/json',
			        // 'Accept'      : `application/json`
				},
   				data: {
   					query: print(UPVOTE),
					variables: {
						type : this.type,
						resource_id : this.id
					},
   				}
   			})
   			.then((res)=>{
   				//
   				console.log(res)
   				if (res.data.errors && res.data.data == null) {
					// if not then we can reset the upvotes back to normal
	   				this.resource_upvotes = this.upvotes;
	   				this.showAlert('error',"You are not authenticated!",null);
   				}
   			})
   			.catch((err)=>{
   				// if not then we can reset the upvotes back to normal
   				this.resource_upvotes = this.upvotes;
   				this.showAlert('error',"Something went wrong!",null);
   			})
	  	},
	  	showAlert : function(type, message, target){
			// Set message to the alert
			this.alert.message = message
			this.alert.type = type
	  		// Show alert
			document.querySelector('.local-alert').style.opacity = "10";
			
			// Determine where
			if (target !== null) {
				document.querySelector(target).classList.add("is-invalid");
			}

			window.setTimeout(()=>{
				document.querySelector('.local-alert').style.opacity = "0";				
			},5000)
	  	}
	  }
	}
</script>

<style lang="css" scoped>
	a {
		text-decoration: none;
	}
	.resource-area {
		cursor: pointer;
		display: grid;
		grid-template-columns: 2fr 25fr;
		grid-gap: 10px;
		z-index: -1;

	}
 	.title {
 		font-family: var(--font--);
 		/*color: rgba(0,0,0,.8);*/
 	}
 	.creator_name {
 		font-size: 12px;
 		/*color: rgba(0,0,0,.8);*/
 	}
 	.upvote-btn {
 		height: 100%;
 	}

 	.description-hidden {
 		transition: all .1s ease-in!important; 
 		height: 0;
 		padding: 0!important;
 	}
 	.description-hidden p {
 		transform: scaleY(0);
 		transition: all .1s ease-in!important;
 	}
 	.description-show {
 		transition: all .1s ease-in!important; 
 		height: auto;
 	}
 	.description-show p {
 		transform: scaleY(1);
 		transition: all .1s ease-in!important;
 	}
 	@media only screen and (max-width: 800px) {
 		.title {
	 		font-size: 17px;
	 	}
	 	.creator_name {
	 		font-size: 8px;
	 	}
 	}
</style>