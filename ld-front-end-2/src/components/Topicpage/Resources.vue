<template>
	<section>
		<!-- Tabs btns -->
		<section class="tabs-group">
			<div class="tabs-btns tab-btn-docs tab-btn-active">
				<p @click="switchTab('docs')" class="text-left text-center">
					<i class="tab-title">Documentations </i>📘📄
				</p>
			</div>
			<div class="tabs-btns tab-btn-courses">
				<p @click="switchTab('courses')" class="text-left text-center">
					<i class="tab-title">Courses & Videos </i>🖥💻
				</p>
			</div>
			<div class="tabs-btns tab-btn-articles">
				<p @click="switchTab('articles')" class="text-left text-center">
					<i class="tab-title">Articles </i>📑🧾
				</p>
			</div>
			<div class="tabs-btns tab-btn-projectideas">
				<p @click="switchTab('projectideas')" class="text-left text-center">
					<i class="tab-title">Project Ideas </i>🧪💡
				</p>
			</div>
		</section>

		<!-- Tabs pages -->
		<section class='tabs-pages-docs'>
<!-- 			<Resource 
				id="doc._id"
				title="doc.title" 
				upvotes="doc.upvotes_count" 
				upvoted="doc.upvoted"
				creator_name="doc.creator_name" 
				link="doc.link"
				level="doc.hard" 
				user_id="doc.user_id" -->
			<!-- ></Resource> -->
			<Resource 
				v-for="doc in docs"
				v-bind:id="doc._id"
				type="doc"
				v-bind:title="doc.title" 
				v-bind:upvotes="doc.upvotes_count" 
				v-bind:upvoted="doc.upvoted"
				v-bind:creator_name="doc.creator_name" 
				v-bind:link="doc.link"
				v-bind:level="doc.hard" 
				v-bind:user_id="doc.user_id"
			></Resource>
		</section>

		<section class='tabs-pages-courses tab-hidden'>
			<Resource 
				v-for="course in courses"
				v-bind:id="course._id"
				type="course"
				v-bind:title="course.title" 
				v-bind:upvotes="course.upvotes_count" 
				v-bind:upvoted="course.upvoted"
				v-bind:creator_name="course.creator_name" 
				v-bind:link="course.link"
				v-bind:level="course.hard" 
				v-bind:user_id="course.user_id"
			></Resource>
		</section>

		<section class='tabs-pages-articles tab-hidden'>	
			<Resource 
				v-for="article in articles"
				v-bind:id="article._id"
				type="article"
				v-bind:title="article.title" 
				v-bind:upvotes="article.upvotes_count" 
				v-bind:upvoted="article.upvoted"
				v-bind:creator_name="article.creator_name" 
				v-bind:link="article.link"
				v-bind:level="article.hard" 
				v-bind:user_id="article.user_id"
			></Resource>
		</section>

		<section class='tabs-pages-projectideas tab-hidden'>
			<Resource 
				v-for="projectidea in projectideas"
				v-bind:id="projectidea._id"
				type="projectidea"
				v-bind:title="projectidea.title" 
				v-bind:upvotes="projectidea.upvotes_count" 
				v-bind:upvoted="projectidea.upvoted"
				v-bind:creator_name="projectidea.creator_name" 
				v-bind:link="projectidea.link"
				v-bind:level="projectidea.hard" 
				v-bind:user_id="projectidea.user_id"
				v-bind:description="projectidea.description"

			></Resource>	
		</section>
	</section>
</template>

<script>
	import Resource from "./Resource.vue";

	export default {

	  name: 'Resources',

	  props : ["docs","courses","articles","projectideas"],

	  components: {
	  	Resource
	  },

	  data () {
	    return {
	    	docs : this.docs,
	    	courses: this.courses,
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
.tab-title {
	font-family: var(--font--);
}
.tabs-group {
	display: grid;
	grid-template-columns: 2fr 2fr 2fr 2fr;
	grid-gap: 5px;
	/*position: -webkit-sticky!important;*/
	position: sticky!important;
	top: 60px!important;
	background-color: white;
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