<template>
	<section>
		<!-- Tabs btns -->
		<section class="tabs-group">
			<div class="tabs-btns tab-btn-docs bg-light tab-btn-active">
				<p @click="switchTab('docs')" class="text-left text-center">
					<i class="tab-title">Documentations </i>📘📄
				</p>
			</div>
			<div class="tabs-btns tab-btn-courses bg-light">
				<p @click="switchTab('courses')" class="text-left text-center">
					<i class="tab-title">Courses & Videos </i>🖥💻
				</p>
			</div>
			<div class="tabs-btns tab-btn-articles bg-light">
				<p @click="switchTab('articles')" class="text-left text-center">
					<i class="tab-title">Articles </i>📑🧾
				</p>
			</div>
			<div class="tabs-btns tab-btn-projectideas bg-light">
				<p @click="switchTab('projectideas')" class="text-left text-center">
					<i class="tab-title">Project Ideas </i>🧪💡
				</p>
			</div>
		</section>

		<!-- Tabs pages -->
		<section class='tabs-pages-docs'>
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

		<section class='tabs-pages-courses tab-hidden'>
			<Resource 
				id="sivbfuvbfdhbbbbj"
				title="Typescript course" 
				upvotes="221" 
				upvoted="true"
				creator_name="mouadTaoussi" 
				level="hard" 
				user_id="sdidvhbidfhv"
			></Resource>
			<Resource 
				id="sivbfuvfffbfdhbj"
				title="Typescript course" 
				upvotes="221" 
				upvoted="true"
				creator_name="mouadTaoussi" 
				level="hard" 
				user_id="sdidvhbidfhv"
			></Resource>
			<Resource 
				id="sivbfuvbvfffdhbj"
				title="Typescript course" 
				upvotes="221" 
				upvoted="true"
				creator_name="mouadTaoussi" 
				level="hard" 
				user_id="sdidvhbidfhv"
			></Resource>
			<Resource 
				id="sivbfuvbfbj"
				title="Typescript course" 
				upvotes="221" 
				upvoted="true"
				creator_name="mouadTaoussi" 
				level="hard" 
				user_id="sdidvhbidfhv"
			></Resource>
			<Resource 
				id="sivbuvbfdhbj"
				title="Typescript course" 
				upvotes="221" 
				upvoted="true"
				creator_name="mouadTaoussi" 
				level="hard" 
				user_id="sdidvhbidfhv"
			></Resource>
		</section>

		<section class='tabs-pages-articles tab-hidden'>	
		</section>

		<section class='tabs-pages-projectideas tab-hidden'>	
		</section>
	</section>
</template>

<script>
	import Resource from "./Resource.vue";

	export default {

	  name: 'Resources',

	  props : ["docs","cources","articles","projectideas"],

	  components: {
	  	Resource
	  },

	  data () {
	    return {
	    	docs : this.docs,
	    	cources: this.cources,
	    	articles: this.articles,
	    	projectideas: this.projectideas
	    }
	  },

	  methods : {
	  	loadMore: function(){

	  	},
	  	switchTab : function(to){
	  		const docs         = document.querySelector('.tabs-pages-docs');
	  		const courses      = document.querySelector('.tabs-pages-courses');
	  		const articles     = document.querySelector('.tabs-pages-articles');
	  		const projectideas = document.querySelector('.tabs-pages-projectideas');

	  		const docs_btn         =  document.querySelector('.tab-btn-docs');
	  		const courses_btn      =  document.querySelector('.tab-btn-courses');
	  		const articles_btn     =  document.querySelector('.tab-btn-articles');
	  		const projectideas_btn =  document.querySelector('.tab-btn-projectideas');

	  		// Check the target
	  		if(to == "docs") {
	  			docs.classList.remove('tab-hidden');
	  			courses.classList.add('tab-hidden');
	  			articles.classList.add('tab-hidden');
	  			projectideas.classList.add('tab-hidden');

	  			// Add mark over tab btn
	  			docs_btn.classList.add('tab-btn-active');
	  			courses_btn.classList.remove('tab-btn-active');
	  			articles_btn.classList.remove('tab-btn-active');
	  			projectideas_btn.classList.remove('tab-btn-active');

	  		}
	  		else if (to == "courses") {
	  			docs.classList.add('tab-hidden');
	  			courses.classList.remove('tab-hidden');
	  			articles.classList.add('tab-hidden');
	  			projectideas.classList.add('tab-hidden');

	  			// Add mark over tab btn
	  			docs_btn.classList.remove('tab-btn-active');
	  			courses_btn.classList.add('tab-btn-active');
	  			articles_btn.classList.remove('tab-btn-active');
	  			projectideas_btn.classList.remove('tab-btn-active');
	  		}
	  		else if (to == "articles") {
	  			docs.classList.add('tab-hidden');
	  			courses.classList.add('tab-hidden');
	  			articles.classList.remove('tab-hidden');
	  			projectideas.classList.add('tab-hidden');

	  			// Add mark over tab btn
	  			docs_btn.classList.remove('tab-btn-active');
	  			courses_btn.classList.remove('tab-btn-active');
	  			articles_btn.classList.add('tab-btn-active');
	  			projectideas_btn.classList.remove('tab-btn-active');
	  		}
	  		else if (to == "projectideas") {
	  			docs.classList.add('tab-hidden');
	  			courses.classList.add('tab-hidden');
	  			articles.classList.add('tab-hidden');
	  			projectideas.classList.remove('tab-hidden');

	  			// Add mark over tab btn
	  			docs_btn.classList.remove('tab-btn-active');
	  			courses_btn.classList.remove('tab-btn-active');
	  			articles_btn.classList.remove('tab-btn-active');
	  			projectideas_btn.classList.add('tab-btn-active');

	  		}
	  	}
	  }
	}
</script>

<style lang="css" scoped>
.tabs-btns {
	/*width: 100px;*/
	margin-top: 20px;
	height: 50px;
	display: inline;
	cursor: pointer;
	padding-top: 10px;
	border-bottom: 1.5px solid var(--primary--);
}
.tabs-group {
	display: grid;
	grid-template-columns: 2fr 2fr 2fr 2fr;
	grid-gap: 5px;
	/*position: -webkit-sticky!important;*/
	position: sticky!important;
	top: 60px!important;

}
.tab-hidden {
	display: none;
}
.tab-btn-active {
	background-color: var(--primary--)!important;
	color: white;
}
@media only screen and (max-width: 800px) {
	.tab-title {
		display: none;
	}
}
</style>