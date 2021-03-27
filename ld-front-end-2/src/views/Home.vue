<template>
  <div class="home">
  	<!-- <costumHeader></costumHeader> -->
    <!-- <img alt="Vue logo" src="../assets/logo.png" /> -->
    <landingpage></landingpage>
    <FirstShowCase></FirstShowCase>
    <SecondShowCase></SecondShowCase>
    <ContentPreview></ContentPreview>
    <div class="topics-section container">
      <h1 class="text-left text-dark my-4">Powerful topics to see:</h1>
      <div class="topics-exemples">
        <Topic 
          img="https://images.pexels.com/photos/360591/pexels-photo-360591.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940" 
          title="HTML" 
          topic_id="6059ff5d6e42e12bb8844fd3" ></Topic>
        <Topic 
          img="https://images.pexels.com/photos/374563/pexels-photo-374563.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940" 
          title="CSS" 
          topic_id="6059fed36e42e12bb8844fd1" ></Topic>
        <Topic 
          img="https://images.pexels.com/photos/3888149/pexels-photo-3888149.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940" 
          title="React Native" 
          topic_id="6059fff46e42e12bb8844fd5" ></Topic>
      </div>
    </div>
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
import Topic from ".././components/Topicspage/Topic.vue";
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
    Topic,
    costumFooter
  },
  mounted (){
    window.scrollTo(0, 0);
  }
};
</script>
<style scoped>
    .topics-section {
      margin-top: var(--margin-between-sections-in-homepage--);
      margin-bottom: var(--margin-between-sections-in-homepage--);
      font-family: var(--font--);
    }
    .topics-exemples {
      display: grid!important;
      grid-template-columns: 2fr 2fr 2fr;
      grid-gap: 10px;
    }
    @media only screen and (max-width: 800px) {
       .topics-exemples {
          display: grid!important;
          grid-template-columns: 2fr;
          grid-gap: 10px;
        } 
    }
</style>

