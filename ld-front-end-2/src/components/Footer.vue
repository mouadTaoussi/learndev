<template>
	<section class="footer">
		<div>
			<div class="logo"></div>
		</div>
		<div class="list-one">
			<ul class="lists">
				<li>Item</li>
				<li>Item</li>
				<li>Item</li>
				<li>Item</li>
			</ul>
		</div>
		<div class="list-two">
			<ul class="lists">
				<li>Item</li>
				<li>Item</li>
				<li>Item</li>
				<li>Item</li>
			</ul>
		</div>
		<div class="social-media">
			<ul class="lists">
				<li>Item</li>
				<li>Item</li>
				<li>Item</li>
				<li>Item</li>
			</ul>
		</div>
		<p class="cc text-white">Copyright 2021, by mouadTaoussi</p>
	</section>
</template>

<script>
export default {

  name: 'costumFooter',

  data () {
    return {

    }
  }
}
</script>

<style lang="css" scoped>
	.footer {
		position: relative;
		background-color: black;
		height: 350px;
		width: 100%;
		margin-top: 100px;
		padding-top: 50px;
		display: grid;
		grid-template-columns: 300px 300px 300px 300px;
		grid-gap: 5px;
		padding: 50px 50px 0 50px;
	}
	/*.footer div {
		background-color: red;
	}*/
	.logo {
		background-image: url('.././assets/logoblue.svg');
		background-size: contain;
		background-repeat: no-repeat;
		background-position: center;
		width: 200px;
		height: 48px;
		/*margin: 0 auto;*/
		/*margin-bottom: 20px;*/
	}
	.lists {
		list-style: none;
		color: white;
		text-align: left;
		padding:0;
	}
	.lists li {
		padding: 5px;
	}
	.cc {
		position: absolute;
		bottom: 20px;
		right: 50px;
	}
</style>