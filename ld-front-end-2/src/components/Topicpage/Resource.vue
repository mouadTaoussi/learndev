<template>
	<section>
			<div class="border bg-light resource-area text-left my-2 p-2">

				<div class="upvote">
					<button 
						@click="upvote(upvoted)" 
						v-if="upvoted == 'true'" 
						v-bind:class="'btn btn-outline-warning text-dark upvote-btn'+id"
					>
						<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-caret-up-fill" viewBox="0 0 16 16">
						  <path d="M7.247 4.86l-4.796 5.481c-.566.647-.106 1.659.753 1.659h9.592a1 1 0 0 0 .753-1.659l-4.796-5.48a1 1 0 0 0-1.506 0z"/>
						</svg><br>
						{{ resource_upvotes }}
					</button>
					<button 
						@click="upvote(upvoted)" 
						v-else 
						v-bind:class="'btn btn-warning text-dark upvote-btn'+id"
					>
						<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-caret-up-fill" viewBox="0 0 16 16">
						  <path d="M7.247 4.86l-4.796 5.481c-.566.647-.106 1.659.753 1.659h9.592a1 1 0 0 0 .753-1.659l-4.796-5.48a1 1 0 0 0-1.506 0z"/>
						</svg><br>
						{{ resource_upvotes }}
					</button>
				</div>

				<a class="text-dark" href='' target="_blank">
					<div class="content">
						<h5 class="title">{{ title }}</h5>
						<router-link v-bind:to="/user/+ user_id" tag='i' class="creator_name">
							By {{ creator_name }}
						</router-link>
						<span class="level badge badge-danger ml-2">{{ level }}</span>
					</div>
				</a>
			</div>
	</section>
</template>

<script>
	const apihost = require('../../.././api.config.js');

export default {

  name: 'Resource',
  props : [ "id", "title","upvotes", "upvoted", "creator_name", "level", "user_id" ],

  data () {
    return {
    	resource_upvotes : this.upvotes
    }
  },
  methods: {
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
  		console.log(upvote_btn)
  		// Send that upvote including -resource_id -type -user_id (in session)
  		// alert(upvote);
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
</style>