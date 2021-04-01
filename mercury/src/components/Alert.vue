<template>
	<div class="alert local-alert bg-danger">
		<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x-circle-fill" viewBox="0 0 16 16">
		  <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293 5.354 4.646z"/>
		</svg>
	{{ message }}</div>
</template>

<script>
export default {

  name: 'Alert',
  props : ['type','message'],

  data () {
    return {
    	type : this.type,
    	message : this.message,
    }
  },
  mounted  (){
  }
}
</script>

<style lang="css">
	.local-alert {
		position: absolute;
		/*top : 100px;
		right: 50px;*/
		top: 10px;
		right: 10px;
		background-color: red!important;
		width: 300px;
		text-align: left;
		color: white;
		display: none;
		transition: all .2s ease-out;
		position: fixed;
		z-index: 999;
	}
</style>