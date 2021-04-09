<template>
	<section class="shadow topic-container">
		<aside class='topic shadow'>
			<router-link v-bind:to="/topic/+topic_id">
				<img v-bind:src="img">
			</router-link>

			<h2 class="topic-title">{{ title }}</h2>

			<button 
				v-on:click="deleteTopic(topic_id)" 
				class="btn btn-sm btn-danger float-left m-2"
			>Delete</button>
		</aside>
	</section>
</template>

<script>
	const  apihost = require('../../.././api.config.js');
	import { print } from 'graphql';
	import gql from "graphql-tag";

	export default {

	  name: 'Topic',
	  props : {
	  	"topic_id" : String,
	  	"title" : String,
	  	"img": String
	  },

	  data () {
	    return {

	    }
	  },

	  methods : {
	  	deleteTopic : function(topic_id){	
	  		const confirmed = confirm('Are you sure you wanted to delete that topic?');
			if (!confirmed) return;

			const REMOVE_TOPIC = gql`
				mutation( $topic_id: String! ){
					deleteTopic(topic_id: $topic_id)
				}
			`
	  		this.$http({
   				url : apihost.api_domain + "/graphql",
   				method: "POST",
   				headers: {
					// 'Content-Type': 'application/json',
			        // 'Accept'      : `application/json`
			        user_token : localStorage.getItem('user_token')
				},
   				data: {
   					query: print(REMOVE_TOPIC),
					variables: {
						topic_id: this.topic_id,
					},
   				}
   			})
   			.then((res)=>{
   				if (res.data.data.deleteTopic) {
   					alert('deleted');
   					this.$emit('reFetchTopics',true)

   				}
   				else {
   					alert('not deleted');
   				}
   			})
   			.catch((err)=>{
   				alert('not deleted');
   			})
   		}
	  }
	}
</script>

<style lang="css" scoped>
	section {
		display: grid;
		grid-template-columns: 2fr 2fr 2fr;
		grid-gap: 10px;		
	}
	.topic-container {
		height: 370px;
		/*padding-bottom: 30px;*/
		width: 350px;
	}
	.topic {
		width: 350px;
		height: 220px;
		/*position: relative;*/
		border-radius: 3px;
		cursor: pointer;
		/*z-index: -1;*/
	}
	.topic img {
		width: 350px;
		height: 220px;
		border-radius: 3px;
	}
	.topic-title {
		font-family: var(--font--);
		text-align: left;
		margin: 10px;
		color: black;
	}

	@media only screen and (max-width: 800px) {
		img, .topic {
			width: 100%;
			border: 2px solid;
		}	
	}
</style>