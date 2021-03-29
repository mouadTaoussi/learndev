<template>
  <div id="app">
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


/* Darkmore started */
#app {
  background-color: var(--dark-mode--);
  color: white!important;
}
.single-card {
  background-color: var(--darkless-mode--)!important;
  color: white!important;
}
/* auth pages to be dark */
.login-components, .register-components, .resetpassword-components  {
  background-color: var(--darken-mode--)!important;
}
.login-components a, .register-components a, .resetpassword-components a {
  color: white!important;
}
.background-area {
  background-image: url()!important;
  background-color: var(--darkless-mode--)!important;
}
/* texts to be white */

p,h1,h2,h3,h4,h5,h6, strong {
  color: white!important;
}
h2, .title-preview-topics {
  color: white!important;
}

/* modal background */
.modal {
  background-color: rgba(0,0,0,.7);
}
/* modal to be dark and bigger by padding */
.modal-content {
  background-color: var(--darken-mode--)!important;
  color: white!important;
  padding: 8px;
}
/* remove borders */
.modal-header, .modal-footer {
  border:0;
}
/* set to dark on sections and header */
section {
  background-color: var(--dark-mode--)!important;
  color: white!important;
}
header {
  background-color: var(--darkless-mode--)!important;
  color: white!important;
}
/* set to darkless at resource cards */
#resource-card , .resource-area  {
  background-color: var(--darkless-mode--)!important;
  color: white!important;
  border-color: transparent!important;
}
/* topic component in user page */
.topic-container {
  background-color: var(--darkless-mode--)!important;
}
/*set text to white*/
.upvote-btn {
  color: white!important;
}
/* remove its border */
.description-hidden {
  border-color: transparent!important;
}
/* set them to dark */
input, select, option {
  background-color: var(--darkless-mode--)!important;
  color: white!important;
  border-color: rgba(255,255,255,.0)!important;
}
/*div {
  background-color: var(--dark-mode--);
  color: white!important;
}*/
/*Dark mode ended*/
</style>
