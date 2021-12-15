import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import "./axios";
import store from "./vuex";
import VueStepWizard from 'vue-step-wizard'
import 'vue-step-wizard/dist/vue-step-wizard.css'
import VueSimpleAlert from "vue-simple-alert";
// import * as VueGoogleMaps from 'vue2-google-maps'
// import VueSplide from '@splidejs/vue-splide';

Vue.use(VueSimpleAlert);
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'

// Import Bootstrap an BootstrapVue CSS files (order is important)
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

// Make BootstrapVue available throughout your project
Vue.use(BootstrapVue)
// Optionally install the BootstrapVue icon components plugin
Vue.use(IconsPlugin)
// Vue.use(VueGoogleMaps, {
//   load: {
//     key: 'AIzaSyB80ihnigEJF8yfku9UlTAO5JcxpgbT4iQ',
//     libraries: 'places',
//   }
// });

Vue.config.productionTip = false;

Vue.use(VueStepWizard);

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");

