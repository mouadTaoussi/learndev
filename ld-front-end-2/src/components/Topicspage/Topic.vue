<template>
	<router-link v-bind:to="/topic/+topic_id">
		<aside class='topic shadow'>
			<img v-bind:src="img">
			<p></p>
			<h2 class="topic-title text-white">{{ title }}</h2>
		</aside>
	</router-link>
</template>

<script>
export default {

  name: 'Topic',
  props : ['img','title','topic_id'],
  data () {
    return {

    }
  }
}
</script>

<style lang="css" scoped>
	.topic {
		width: 350px;
		height: 220px;
		position: relative;
		border-radius: 3px;
		cursor: pointer;
	}
	.topic img {
		width: 350px;
		height: 220px;
		border-radius: 3px;
	}
	.topic-title {
		font-family: var(--font--);
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
	}
	@media only screen and (max-width: 800px) {
		.topic img, .topic {
			width: 100%;
			border: 2px solid;
		}	
	}
</style>