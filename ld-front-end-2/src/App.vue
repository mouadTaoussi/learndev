<template>
  <div id="app">
    <router-view />
  </div>
</template>
<style>
@import url('https://fonts.googleapis.com/css2?family=Changa:wght@600&family=Poppins:wght@400;500&display=swap');
/*@import url("https://cdn.jsdelivr.net/npm/bulma@0.9.1/css/bulma.min.css");*/


:root {
    --primary-- :  #0652DD;
    --bootstrap--primary-- : #2962FF;
    --dark-mode--             : #031f30;
    --darkless-mode--      : #053552;
    --font--    :'Changa', sans-serif;
    --margin-between-sections-in-homepage-- : 100px;
    --list-color--              : rgba(0,0,0,.8);
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
    font-family: var(--font--);
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
/* Darkmore started */
#app {
  background-color: var(--dark-mode--);
  color: white!important;
}

.logo {
  background-image: url('./assets/logoblue.svg')!important;
}
p,h1,h2,h3,h4,h5,h6, strong {
  color: white!important;
}
h2 {
  color: white!important;
}
.modal-content {
  background-color: var(--darkless-mode--)!important;
  color: white!important;
  padding: 30px;
}
section {
  background-color: var(--dark-mode--)!important;
  color: white!important;
}
header {
  background-color: var(--dark-mode--)!important;
  color: white!important;
}
#resource-card , .resource-area  {
  background-color: var(--darkless-mode--)!important;
  color: white!important;
  border-color: transparent!important;
}
.upvote-btn {
  color: white!important;
}
.description-hidden {
  border-color: transparent!important;
}
input, option {
  background-color: var(--darkless-mode--)!important;
  color: white!important;
  border-color: rgba(255,255,255,.0)!important;
}
/*div {
  background-color: var(--dark-mode--);
  color: white!important;
}*/
/*Dark mode ended*/
body {
	margin: 0;
	padding: 0;
}
</style>
