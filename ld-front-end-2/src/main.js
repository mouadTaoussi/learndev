import Vue from "vue";
import App from "./App.vue";
import router from "./router";

Vue.config.productionTip = false;

new Vue({
  router,
  render: h => h(App)
}).$mount("#app");

if (window.location.pathname) {
	window.onscroll = ()=>{
		if (window.scrollY == 0 ){
			document.querySelector('.header-landingpage').style.backgroundColor = 'transparent';
			// document.querySelector('.header-landingpage').style.transform = "all .2s ease-out";
			document.querySelector('.header-landingpage').classList.remove('shadow');
			
			document.querySelectorAll('.list-item').forEach((item)=>{
				item.style.color = "white";
			})
		

		}else if ( window.scrollY > 100 ) {
			document.querySelector('.header-landingpage').style.backgroundColor = 'white';
			document.querySelector('.header-landingpage').classList.add('shadow');
			
			document.querySelectorAll('.list-item').forEach((item)=>{
				item.style.color = "black";
			})
		}
	}
}