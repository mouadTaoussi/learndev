<template>
	<section>
		<!-- <h1 class="text-dark">Hello World</h1> -->
		<div 
			data-toggle="modal" 
			data-target="#addResource"
			class="shadow bg-primary btn text-white addResource"
		>Add new Resource +</div>

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
							class="form-control my-2" 
							placeholder="Enter the topic title"
						>
					</div>

					<div class="modal-footer">
						<button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
						<button v-on:click="addResource()" type="button" class="btn btn-primary">Add Resource</button>
					</div>
				</div>
			</div>
		</div>
	</section>
</template>

<script>
export default {

  name: 'AddResource',

  data () {
    return {
    	newresource : {
    		title : null,
    		level : null,
    		link : null,
    	}
//     		user_id	 : {
// 		type : String, required: true
// 	},
// 	creator_name : {
// 		type : String, required: true
// 	},
// 	topic_id : {
// 		type : String, required: true
// 	},
// 	title : {
// 		type : String, required: true
// 	},
// 	level : {
// 		type : String, required: true
// 	},
// 	article_link  : {
// 		type : String, required: true
// 	},
// 	upvotes_count : {
// 		type : Number, default: 0, required: false
// 	},
// 	upvotes : [{type: String}],
// 	// tags : [{type: String}]

// });

// const ProjectIdeaSchema = new Schema({
// 	user_id : {
// 		type : String, required: true
// 	},
// 	creator_name : {
// 		type : String, required: true
// 	},
// 	topic_id: {
// 		type : String, required: true
// 	},
// 	title : {
// 		type : String, required: true
// 	}, 
// 	level : {
// 		type : String, required: true
// 	},
// 	description : {
// 		type : String, required: true
// 	},
// 	upvotes_count : {
// 		type : Number, default: 0, required: false
// 	},
// 	upvotes : [{type: String}],
    }
  },
  methods : {
  	addResource : function(){
  		alert('added');
  	}
  }
}
</script>

<style lang="css" scoped>
	.addResource {
		position: absolute;
		top: 100px;
		right: 0;
		position: fixed;
		z-index: 999;
	}
</style>