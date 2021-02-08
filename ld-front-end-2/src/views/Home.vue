<template>
  <div class="home">
  	<costumHeader></costumHeader>
    <!-- <img alt="Vue logo" src="../assets/logo.png" /> -->
    <br>
    <br>
    <br>
    <HelloWorld msg="Welcome to Your Vue.js App" />
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from "@/components/HelloWorld.vue";
import costumHeader from '.././components/Header.vue';

export default {
  name: "Home",
  components: {
    HelloWorld,
    costumHeader
  }
};
</script>
