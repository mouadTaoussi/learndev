<template>
  <div class="home">
  	<!-- <costumHeader></costumHeader> -->
    <!-- <img alt="Vue logo" src="../assets/logo.png" /> -->
    <landingpage></landingpage>
    <FirstShowCase></FirstShowCase>
    <SecondShowCase></SecondShowCase>
    <ContentPreview></ContentPreview>
    <Card></Card>
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
import FirstShowCase from ".././components/Homepage/FirstShowCase.vue";
import SecondShowCase from ".././components/Homepage/SecondShowCase.vue";
import ContentPreview from ".././components/Homepage/ContentPreview.vue";
import Card from ".././components/Homepage/Card.vue";
import costumFooter from '.././components/Footer.vue';

export default {
  name: "Home",
  components: {
    HelloWorld,
    costumHeader,
    landingpage,
    FirstShowCase,
    SecondShowCase,
    ContentPreview,
    Card,
    costumFooter
  },
  mounted (){
    window.scrollTo(0, 0);
  }
};
</script>

