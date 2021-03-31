<template>
	<section>
		<costumHeader></costumHeader>	
		<div class="container">
		<!-- brs -->
		<br>
		<br>
		<!-- brs -->
		<h1 class="text-left">About</h1>
		<!-- brs -->
		<br>
		<!-- brs -->
	
		<p class="text-left">
			A platform created by <a class="bg-info" href="https://github.com/mouadTaoussi/">mouadTaoussi </a>that allow developers whether they are beginners or intermediate to find resources of learning for each domain in programming and software development shared by other experienced developers.
		</p>
		</div>
		<!-- brs -->
		<br>
		<br>
		<!-- brs -->
		<costumFooter></costumFooter>	
	</section>
</template>

<script>

	import costumHeader from '.././components/Header.vue';
	import costumFooter from '.././components/Footer.vue';
	
	export default {

		name: 'About',

		components: {
			costumHeader,
			costumFooter
		},
		mounted(){
			window.scrollTo(0, 0);
		},
		data () {
			return {

			}
		}
	}

</script>

<style lang="css" scoped>
	.container {
		padding-top: 80px;
		margin-left: 100px; 
		margin-right: 100px; 
		font-family: var(--font--);
	}
</style>