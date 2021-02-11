<template>
  <div class="home">
  	<!-- <costumHeader></costumHeader> -->
    <!-- <img alt="Vue logo" src="../assets/logo.png" /> -->
    <landingpage></landingpage>
    <br>
    <br>
    <br>
    <HelloWorld msg="Welcome to Your Vue.js App" />
    <HelloWorld msg="Welcome to Your Vue.js App" />
    <costumFooter></costumFooter>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from "@/components/HelloWorld.vue";
import costumHeader from '.././components/Header.vue';
import landingpage from ".././components/Homepage/landingpage.vue";
import costumFooter from '.././components/Footer.vue';

export default {
  name: "Home",
  components: {
    HelloWorld,
    costumHeader,
    landingpage,
    costumFooter
  }
};
</script>
