<template>
	<div class="alert local-alert bg-danger">{{ message }}</div>
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
  }
}
</script>

<style lang="css">
	.local-alert {
		position: absolute;
		top : 100px;
		right: 50px;
		background-color: red!important;
		width: 300px;
		text-align: left;
		color: white;
		opacity: 0;
		transition: all .2s ease-out;
		position: fixed;
		z-index: 999;
	}
</style>