<template>
  <div class="home">
  	<!-- <costumHeader></costumHeader> -->
    <!-- <img alt="Vue logo" src="../assets/logo.png" /> -->
    <landingpage></landingpage>
    <FirstShowCase></FirstShowCase>
    <SecondShowCase></SecondShowCase>
    <ContentPreview></ContentPreview>
    <div class="topics-section container">
      <h1 class="text-left my-4 title-preview-topics">Powerful topics to see:</h1>
      <div class="topics-exemples">
        <Topic 
          img="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwallup.net%2Fwp-content%2Fuploads%2F2017%2F11%2F22%2F407978-programming-PHP-programming_language-syntax_highlighting-minified-knowledge-coding-code-HTML-computer-pixels-Computer_screen-logic.jpg&f=1&nofb=1" 
          title="HTML" 
          topic_id="6070db54021b36001518db81" ></Topic>
        <Topic 
          img="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fs3.amazonaws.com%2Fmedia-p.slid.es%2Fuploads%2F573039%2Fimages%2F4409450%2Ftypescript-intro-background.png&f=1&nofb=1" 
          title="Typescript" 
          topic_id="6059fed36e42e12bb8844fd1" ></Topic>
        <Topic 
          img="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fcdn.wallpapersafari.com%2F48%2F51%2FJjyohW.jpg&f=1&nofb=1" 
          title="NodeJS" 
          topic_id="60736525fa40cb001562d384" ></Topic>
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

