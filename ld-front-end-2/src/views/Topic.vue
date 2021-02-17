<template>
	<section>
		<!-- Custom Header -->
		<costumHeader></costumHeader>
		<!-- Custom Header -->
		<section class="container">
			<div class="search-and-filter-container">
				<h1 class="text-left title">Android Development</h1>
				<!-- Search And Filter -->
				<SearchAndFilter></SearchAndFilter>
				<!-- Search And Filter -->
				<!-- Resources -->
				<Resources docs="dddddd" cources="" articels="" projectideas=""></Resources>
				<!-- Resources -->
			</div>
		</section>
		<!-- Custom Footer -->
		<!-- <costumFooter></costumFooter> -->
		<!-- Custom Footer -->
	</section>
</template>

<script>
	import costumHeader from ".././components/Header.vue";
	import SearchAndFilter from ".././components/Topicpage/SearchAndFilter.vue";
	import Resources from ".././components/Topicpage/Resources.vue";
	import costumFooter from ".././components/Footer.vue";


	export default {

	  name: 'Topic',

	  components: {
	  	costumHeader,
	  	SearchAndFilter,
	  	Resources,
	  	costumFooter

	  },

	  data () {
	    return {

	    }
	  }
	}
</script>

<style lang="css" scoped>
	.search-and-filter-container {
		padding-top: 100px;
	}
	.title {
		font-family: var(--font--);
		margin-top: 20px;
		margin-bottom: 20px;
	}
</style>