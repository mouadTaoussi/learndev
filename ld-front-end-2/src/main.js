import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import axios from "axios";

axios.defaults.withCredentials = true // Allows session the be set and sent between the server and the client

Vue.config.productionTip = false;
Vue.prototype.$http = axios;

new Vue({
  router,
  render: h => h(App)
}).$mount("#app");

window.setInterval(()=>{
	//Implement animation when in the home page
	if (window.location.pathname == "/") {
		window.onscroll = ()=>{
			if (window.scrollY == 0 ){
				document.querySelector('.header-landingpage').style.backgroundColor = 'transparent';
				// document.querySelector('.header-landingpage').style.transform = "all .2s ease-out";
				document.querySelector('.header-landingpage').classList.remove('shadow');
				
				document.querySelectorAll('.list-item').forEach((item)=>{
					item.style.color = "white";
				})
			

			}else if ( window.scrollY > 500 ) {
				document.querySelector('.header-landingpage').style.backgroundColor = 'white';
				document.querySelector('.header-landingpage').classList.add('shadow');
				
				document.querySelectorAll('.list-item').forEach((item)=>{
					item.style.color = "black";
				})
			}
		}
	}
	// Dont implement it 
	else if (window.location.pathname == "/login" || window.location.pathname == "/register" || window.location.pathname == "/resetPassword" )  {
		return;
	
	}else {
		document.querySelector('.header-landingpage').style.backgroundColor = 'white';
		document.querySelector('.header-landingpage').classList.add('border');

		document.querySelectorAll('.list-item').forEach((item)=>{
			item.style.color = "black";
		})
	}
},10)
