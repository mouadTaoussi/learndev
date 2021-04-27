<template>
	<aside class='announcement shadow'>
		<img v-bind:src="img">
	</aside>
</template>

<script>
export default {

  name: 'announcements',
  props : ['img'],
  data () {
    return {

    }
  }
}
</script>

<style lang="css" scoped>
	.announcement {
		width: 350px;
		height: 220px;
		position: relative;
		border-radius: 3px;
		cursor: pointer;
	}
	.announcement img {
		width: 350px;
		height: 220px;
		border-radius: 3px;
	}
	@media only screen and (max-width: 800px) {
		.announcement img, .announcement {
			width: 100%;
			border: 2px solid;
		}	
	}
</style>