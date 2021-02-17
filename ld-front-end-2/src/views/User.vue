<template>
	<section>
		<!-- Custom Header -->
		<costumHeader></costumHeader>
		<!-- Custom Header -->
		<section class="container">
			<h1 class="text-left title">Your account</h1>
			<!-- Tabs btns -->
			<section class="tabs-group">
				<div class="tabs-btns tab-btn-topics bg-light tab-btn-active">
					<p @click="switchTab('topics')" class="text-left text-center">
						<i class="tab-title">Topics </i>📘📄
					</p>
				</div>
				<div class="tabs-btns tab-btn-upvoted bg-light">
					<p @click="switchTab('upvoted')" class="text-left text-center">
						<i class="tab-title">Upvoted </i>🖥💻
					</p>
				</div>
				<div class="tabs-btns tab-btn-userprofile bg-light">
					<p @click="switchTab('userprofile')" class="text-left text-center">
						<i class="tab-title">Your profile </i>📑🧾
					</p>
				</div>
				<!-- <div class="tabs-btns tab-btn-projectideas bg-light">
					<p @click="switchTab('projectideas')" class="text-left text-center">
						<i class="tab-title">Project Ideas </i>🧪💡
					</p>
				</div> -->
			</section>

				<!-- Tabs pages -->
			<section class='tabs-pages-topics'>
			</section>

			<section class='tabs-pages-upvoted tab-hidden'>
				<Resource></Resource>
				<Resource></Resource>
				<Resource></Resource>
				<Resource></Resource>

			</section>

			<section class='tabs-pages-userprofile tab-hidden'>	
			</section>

			<section class='tabs-pages-projectideas tab-hidden'>	
			</section>
				<!-- Resources -->
				<!-- <Resources></Resources> -->
				<!-- Resources -->
		</section>
		<!-- Custom Footer -->
		<!-- <costumFooter></costumFooter> -->
		<!-- Custom Footer -->
	</section>
</template>

<script>
	import costumHeader from ".././components/Header.vue";
	import costumFooter from ".././components/Footer.vue";
	import Resource from ".././components/Topicpage/Resource.vue";


	export default {

	  name: 'User',

	  components: {
	  	costumHeader,
	  	Resource,
	  	costumFooter
	  },
	  
	  data () {
	    return {

	    }
	  },
	   methods : {
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
	.title {
		font-family: var(--font--);
		margin-top: 20px;
		margin-bottom: 20px;
	}
	.container {
		padding-top: 100px;
	}

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