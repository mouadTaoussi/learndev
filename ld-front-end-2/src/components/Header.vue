<template>
	<section class="header shadow">
	 <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link> |
      <router-link to="/topics">Topics</router-link> |
      <router-link to="/topic">Topic</router-link> |
      <router-link to="/resetpassword">Reset Password</router-link> |
      <router-link to="/register">Register</router-link> |
      <router-link to="/user">User</router-link>
    </div>
	</section>
</template>

<script>
export default {

  name: 'costumHeader',

  data () {
    return {

    }
  }
}
</script>

<style lang="css" scoped>

	.header {
		background-color: white;
		height: 60px;
		width: 100%;
		margin: 0;
	}
	#nav {
	  padding: 30px;
	}

	#nav a {
	  font-weight: bold;
	  color: #2c3e50;
	}

	#nav a.router-link-exact-active {
	  color: #42b983;
	}
</style>