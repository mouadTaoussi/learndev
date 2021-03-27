<template>
	<section>
		<!-- Custom Header -->
		<costumHeader></costumHeader>
		<!-- Custom Header -->
		<!-- Alert -->
		<Alert v-bind:type="alert.type" v-bind:message="alert.message"></Alert>
		<!-- Alert -->
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
				<div v-if="topics.length > 0" class="tabs-pages-topics-grid">
					<div v-for="topic in topics">
						<Topic 
							v-bind:topic_id="topic._id" 
							v-bind:img="topic.background_image" 
							v-bind:title="topic.title"
							v-on:reFetchTopics="refreachTopics"
						></Topic>
					</div>
				</div>
				<!-- EmptyContent -->
				<EmptyContent v-if="topics.length == 0"></EmptyContent>
				<!-- EmptyContent -->
				<div 
					data-toggle="modal" 
					data-target="#addNewTopic"
					class="addTopic-btn shadow bg-primary btn text-white mr-2"
				>✏</div>
			</section>

			<section class='tabs-pages-upvoted tab-hidden'>
				<div v-if="upvoted_content.length > 0" v-for="upvoted in upvoted_content">
					<Resource 
						v-bind:id="upvoted._id"
						v-bind:title="upvoted.title" 
						v-bind:upvotes="upvoted.upvotes_count" 
						v-bind:upvoted="true"
						v-bind:type="'nooo'"
						v-bind:creator_name="upvoted.creator_name" 
						v-bind:level="upvoted.level" 
						v-bind:user_id="upvoted.user_id"
					></Resource>
				</div>
				<!-- EmptyContent -->
				<EmptyContent v-if="upvoted_content.length == 0"></EmptyContent>
				<!-- EmptyContent -->
			</section>

			<section class='tabs-pages-userprofile py-4 tab-hidden'>	
				<!-- <img v-bind:src='current_user.avatar' width="200" height="200" class=""><br> -->
				<p class="text-left text-dark">Full name</p>
				<input
					v-on:change="toggleSaveChanges()" 
					class="current_user form-control my-2" 
					type="text" 
					v-model="current_user.fullname" 
					placeholder="fullname" >
				<p class="text-left text-dark">User name</p>
				<input
					v-on:change="toggleSaveChanges()" 
					class="current_user form-control my-2" 
					type="text" 
					v-model="current_user.user_name" 
					placeholder="user_name" >
				<p class="text-left text-dark">Email</p>
				<input 
					v-on:change="toggleSaveChanges()"
					class="current_user form-control my-2" 
					type="text" 
					v-model="current_user.email"
					placeholder="Email"
					>
				<p  
					style="cursor: pointer"
					data-toggle="modal" 
					data-target="#changePassword"
					class="text-left text-dark"
					>Change Password</p>
				<button 
					v-on:click="updateProfile()" 
					id="saveChanges" 
					disabled
					class="save_changes_btn btn btn-info float-left"
				>Save Changes</button>
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
								id="email"
								v-model="newTopic.title" 
								class="form-control my-2" 
								placeholder="Enter the topic title">

							<p class="text-left text-dark">
								<strong>Provide a link about an image</strong>
							</p>
							<input
								id="password"
								v-model="newTopic.background_image" 
								class="form-control my-2" 
								placeholder="Provide us an image link">
							</div>

						<div class="modal-footer">
							<button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
							<button 
								v-on:click="addNewTopic()" 
								type="button" 
								class="btn add-topic-btn btn-primary">Add Topic</button>
						</div>
					</div>
				</div>
			</div>

			<!-- Change password Modal -->
			<div 
				class="modal fade" 
				id="changePassword" 
				tabindex="-1" 
				role="dialog" 
				aria-labelledby="changePassword" 
				aria-hidden="true"
			>
				<div class="modal-dialog modal-dialog-centered" role="document">
					<div class="modal-content">
						<div class="modal-header">
							<h5 class="modal-title" id="changePassword">Change password</h5>
							<button type="button" class="close" data-dismiss="modal" aria-label="Close">
							<span aria-hidden="true">&times;</span>
							</button>
						</div>
						<div class="modal-body">

							<p class="text-left text-dark">
								<strong>Enter your current password</strong>
							</p>
							<input
								id="current_password"
								type="password"
								v-model="passwords.current_password" 
								class="form-control my-2" 
								placeholder="Enter the current password">

							<p class="text-left text-dark">
								<strong>Enter the newest password</strong>
							</p>
							<input
								id="new_password"
								type="password"
								v-model="passwords.new_password" 
								class="form-control my-2" 
								placeholder="Enter the newest password">
							<p class="text-left text-dark">
								<strong>Confirm the newest password</strong>
							</p>
							<input
								id="confirmation_password"
								type="password"
								v-model="passwords.new_password_confirmed" 
								class="form-control my-2" 
								placeholder="Confirm the newest password">
						</div>

						<div class="modal-footer">
							<button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
							<button 

								v-on:click="changePassword()" 
								type="button" 
								class="change_password_btn btn add-topic-btn btn-primary">Change it
							</button>
						</div>
							
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
	import Topic from ".././components/Userpage/Topic.vue";
	import AddTopic from ".././components/Userpage/AddTopic.vue";
	import Resource from ".././components/Topicpage/Resource.vue";
	import Alert from ".././components/Alert.vue";
	import EmptyContent from '.././components/EmptyContent.vue';
	import costumFooter from ".././components/Footer.vue";
	const  apihost = require('../.././api.config.js');
	import { print } from 'graphql';
	import gql from "graphql-tag";

	export default {

	  name: 'User',

	  components: {
	  	costumHeader,
	  	Topic,
	  	AddTopic,
	  	Resource,
	  	Alert,
	  	EmptyContent,
	  	costumFooter
	  },
	  
	  data () {
	    return {
	    	current_user : null,
	    	topics : null,
	    	upvoted_content : null,
	    	newTopic : {
	    		title : null,
	    		background_image : null,
	    		tags : []
	    	},
	    	alert : {
	    		type : null,
	    		message : null
	    	},
	    	updatedProfile : {
	    		fullname : null,
	    		user_name: null,
	    		email    : null
	    	},
	    	passwords : {
	    		current_password : null,
	    		new_password : null,
	    		new_password_confirmed : null
	    	},
	    	new_topic_added : null
	    }
	  },
	  mounted (){
	  	window.scrollTo(0, 0);

	  	this.$http({
	  		method : "GET",
	  		url    : apihost.api_domain + '/auth/getuser',
	  	})
	  	.then((res)=>{
	  		console.log(res)
	  		this.current_user = res.data.user;
	  		// if (!this.current_user){ this.$router.push({ path: '/login' }); return };

	  		this.topics = res.data.topics;
	  		this.upvoted_content = res.data.upvoted_content;
	  	})
	  	.catch((err)=>{
	  		this.$router.push({ path: '/login' })
	  	})
	  },
	   methods : {
	   	addNewTopic : function(){
			// Check the values
			if (this.newTopic.title == null || this.newTopic.title == "") {
				document.querySelector('#email').classList.add('is-invalid');
			}
			else if (this.newTopic.background_image == null || this.newTopic.background_image == ""){
	   			document.querySelector('#password').classList.add('is-invalid');
			}
	   		else {

				const ADD_TOPIC = gql`
					mutation($title: String!, $background_image: String!) {
						addTopic(title: $title, background_image: $background_image) {
							title
							user_id
							creator_name
							background_image
						}
					}
				`
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
				.then(function(res){
					document.querySelector('.add-topic-btn').innerHTML = "Added👍";
					document.querySelector('.add-topic-btn').classList.add('btn-success');
					document.querySelector('.add-topic-btn').classList.remove('btn-primary');

				})
				.catch((err)=>{
					this.showAlert('error', 'something went wrong!, Try again!', null);
				})
				// Add topic to the Page
				// Refreach topics 
				this.refreachTopics("res.data.data.addTopic");
			}
		},
		updateProfile : function(){
			// // Check inputs
			if ( this.current_user.fullname == "" || this.current_user.fullname == null ){
				this.showAlert('error', "Fill all the inputs", "null"); return;
			}
			if ( this.current_user.user_name == "" || this.current_user.user_name == null ){
				this.showAlert('error', "Fill all the inputs", "null"); return;
			}
			if ( this.current_user.email == "" || this.current_user.email == null ){
				this.showAlert('error', "Fill all the inputs", "null"); return;
			}

			document.querySelector('.save_changes_btn').innerHTML = "Please wait...";

			// Update
			this.$http({
				url : apihost.api_domain + "/auth/updateUser",
				method : "POST",
				data : {
					fullname: this.current_user.fullname,
					user_name: this.current_user.user_name, 
					email: this.current_user.email 
				}
			})
			.then((res)=>{
				if (!res.data.updated) {
					this.showAlert('error', res.data.message, "null");
					return;
				}
				else {
					document.querySelector('.save_changes_btn').innerHTML = "Changed👍";
					document.querySelector('.save_changes_btn').classList.add('btn-success');
					document.querySelector('.save_changes_btn').classList.remove('btn-primary');	
				}
			})
			.catch((err)=>{
			})
		},
		changePassword : function(){
			if (this.current_user.at_provider_id != null) {
				this.showAlert('error','Your are not allowed to set password',"null");
				return;
			}
			if ( this.passwords.current_password == "" || this.passwords.current_password == null ) {
				this.showAlert('error','Fill the inputs',"null");
				return;
			}
			if ( this.passwords.new_password == "" || this.passwords.new_password == null ) {
				this.showAlert('error','Fill the inputs',null);
				return;
			}
			if ( this.passwords.new_password_confirmed == "" || this.passwords.new_password_confirmed == null ) {
				this.showAlert('error','Fill the inputs',null);
				return;
			}

			if (this.passwords.new_password != this.passwords.new_password_confirmed) {
				this.showAlert('error','Confirm your password',"#confirmation_password");
				return;
			}
			document.querySelector('.change_password_btn').innerHTML = "Please wait...";

			this.$http({
		  		method : "POST",
		  		url    : apihost.api_domain + '/auth/changePassword',
		  		data : { 
		  			current_password: this.passwords.current_password,
		  			new_password: this.passwords.new_password 
		  		}
		  	})
		  	.then((res)=>{

		  		if (!res.data.changed) {
		  			this.showAlert('#error',res.data.message,null);
		  			return;
		  		}

		  		document.querySelector('.change_password_btn').innerHTML = "Changed👍";
				document.querySelector('.change_password_btn').classList.add('btn-success');
				document.querySelector('.change_password_btn').classList.remove('btn-primary');
		  	})
		  	.catch((err)=>{
		  		
		  	})
		},
		refreachTopics : function(deleted){
			this.$http({
		  		method : "GET",
		  		url    : apihost.api_domain + '/auth/getuser',
		  	})
		  	.then((res)=>{
		  		this.topics = res.data.topics;
		  	})
		  	.catch((err)=>{
		  		this.$router.push({ path: '/login' })
		  	})
		},
		toggleSaveChanges : function(){
			document.querySelector('#saveChanges').removeAttribute('disabled');
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
	.tabs-pages-topics {
	}
	.tabs-pages-topics-grid {
		display: grid;
		grid-template-columns: 2fr 2fr 2fr;
		grid-row-gap: 20px;
		grid-column-gap: 20px;
		margin-top: 20px;
		z-index: -1;

	}
	.addTopic-btn {
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
	.title {
		font-family: var(--font--);
		margin-top: 20px;
		margin-bottom: 20px;
	}
	#addNewTopicTitle, .user-credentials {
		font-family: var(--font--);
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
	.tab-title {
		font-family: var(--font--);
	}
	.current_user {
		border :0;
		padding: 0;
		font-weight: bolder;
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