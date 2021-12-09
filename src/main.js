import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import "./axios";
import store from "./vuex";
import VueStepWizard from 'vue-step-wizard'
import 'vue-step-wizard/dist/vue-step-wizard.css'

Vue.config.productionTip = false;

Vue.use(VueStepWizard);

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
