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
    --font--    :'Changa', sans-serif;
    --margin-between-sections-in-homepage-- : 100px;
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
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin: 0;
  padding: 0;
}
body {
	margin: 0;
	padding: 0;
}
</style>
