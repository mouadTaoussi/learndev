<template>
	<section>
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
						  <select id="level" class="custom-select">
						    <option value="1">Easy</option>
						    <option value="2">Intermeditate</option>
						    <option value="3">Hard</option>
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
						<p class="text-left text-dark">
							<strong>Enter resource description</strong>
						</p>
						<input
							id="description"
							v-model="newresource.description"
							class="form-control my-2" 
							placeholder="Enter the description of the resource"
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
    		type     : null,
    		topic_id : this.$route.params.id,
    		title    : null,
    		level : null,
    		link : null,
    		description : null
    	}
    }
  },
  methods : {
  	addResource : function(){
  		document.querySelector('#title').classList.add('is-valid');
  		document.querySelector('#level').classList.add('is-valid');
  		document.querySelector('#link').classList.add('is-valid');
  		document.querySelector('#description').classList.add('is-valid');
  		// document.querySelector('#title').classList.add('is-valid');
  		console.log(this.newresource)
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

	#addNewTopicTitle {
		font-family: var(--font--);
	}
</style>