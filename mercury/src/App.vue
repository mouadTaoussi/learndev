<template>
  <div id="app">
    <!-- Prograss bar -->
    <div class="progress"></div>
    <!-- Prograss bar -->
    <router-view />
  </div>
</template>
<style>
  @import url('https://fonts.googleapis.com/css2?family=Changa:wght@600&family=Poppins:wght@400;500&display=swap');
  @import url('https://fonts.googleapis.com/css2?family=Hind:wght@500&display=swap');
  /*@import url("https://cdn.jsdelivr.net/npm/bulma@0.9.1/css/bulma.min.css");*/

  :root {
      --primary-- :  #0652DD;
      --bootstrap--primary-- : #2962FF;
      --dark-mode--             : #031f30;
      --darkless-mode--      : #053552;
      --darken-mode--    : #092e50;
      /*--font--    :'Changa', sans-serif;*/
      --font--    :'Hind', sans-serif;
      --margin-between-sections-in-homepage-- : 100px;
      --list-color--              : rgba(0,0,0,.8);
  }
  .progress {
    height: 3px;
    background-color: var(--bootstrap--primary--);
    position : fixed;
    z-index: 9991!important;
    width: 0%;
    transition: all .2s ease-out;
    /*box-shadow: 2px 2px 5px var(--bootstrap--primary--); */
  }
  .btn {
      font-family: var(--font--);
      /*font-family: 'Poppins', sans-serif;*/
  }
  a {
    color: white;
    text-decoration: none;
  }
  body {
    /*overflow:hidden;*/
    font-family: var(--font--);
  }
  body {
    margin: 0;
    padding: 0;
  }
  #app {
    /*font-family: Avenir, Helvetica, Arial, sans-serif;*/
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    /*color: #2c3e50;*/
    margin: 0;
    padding: 0;
  }
  /*add custom scroll bar*/
  /* width */
  ::-webkit-scrollbar {
    width: 8px;
  }

  /* Track */
  ::-webkit-scrollbar-track {
    background: transparent; 
  }
   
  /* Handle */
  ::-webkit-scrollbar-thumb {
    background: #888; 
  }

  /* Handle on hover */
  ::-webkit-scrollbar-thumb:hover {
    background: #555; 
  }
</style>
