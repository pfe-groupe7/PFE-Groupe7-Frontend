import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import "./axios";
import store from "./vuex";
import VueStepWizard from 'vue-step-wizard'
import 'vue-step-wizard/dist/vue-step-wizard.css'
import VueSimpleAlert from "vue-simple-alert";

import PubNubVue from 'pubnub-vue'
const publish_Key = 'pub-c-3fdc5de3-f362-4802-9f5c-a64c447c34d0';
const subscribe_Key = 'sub-c-afb1f7b6-5cd2-11ec-96e9-32997ff5e1b9';
// Make a unique uuid for each client
const myUuid = fourCharID();
const me = {
  uuid: myUuid,
};
try{
    if(!publish_Key || !subscribe_Key){
      throw 'PubNub Keys are missing.';
    }
  }catch(err){
    console.log(err);
  }
  Vue.use(PubNubVue, {
  subscribeKey: subscribe_Key,
  publishKey: publish_Key,
  ssl: true
}, store);
function created(){
    this.$store.commit('setMe', {me});
  }
function fourCharID() {
    const maxLength = 4;
    const possible = 'abcdef0123456789';
    let text = '';
    for (let i = 0; i < maxLength; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
  }

Vue.use(VueSimpleAlert);

Vue.config.productionTip = false;

Vue.use(VueStepWizard);

new Vue({
  router,
  store,
  render: (h) => h(App),
  created
}).$mount("#app");

