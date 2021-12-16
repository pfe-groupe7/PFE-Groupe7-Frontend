import Vue from "vue";
import Router from "vue-router";
Vue.use(Router);
import Home from "./components/Home.vue";
import Login from "./components/Login.vue";
import CreateAd from "./components/CreateAd.vue";

import Forgot from "./components/Forgot.vue";
<<<<<<< HEAD
import Reset from './components/Reset.vue'
import DetailAd from './components/DetailAd.vue'
import Profile from './components/Profile.vue'
import MyAds from './components/MyAds.vue'
import Ads from './components/Ads.vue'
import ContactForm from './components/ContactForm.vue'

=======
import Reset from "./components/Reset.vue";
import DetailAd from "./components/DetailAd.vue";
import Profile from "./components/Profile.vue";
import MyAds from "./components/MyAds.vue";
import Ads from "./components/Ads.vue";
import ModPage from "./components/ModeratorPage.vue";
>>>>>>> 980aee0f274d2245e57a4f74fdd8dbc768cfe268
export default new Router({
  mode: "history",
  routes: [
    { path: "/", component: Home },
    { path: "/login", component: Login },
    { path: "/register", component: Login },
    { path: "/createAd", component: CreateAd },
    { path: "/detailAd/:id", component: DetailAd },
    { path: "/ads/:title?/:cat?", component: Ads },
    { path: "/forgot", component: Forgot },
    { path: "/reset/:token", component: Reset },
    { path: "/profile/:id", component: Profile },
    { path: "/myads", component: MyAds },
<<<<<<< HEAD
    { path: "/contactSeller", component: ContactForm },

=======
    { path: "/modPage", component: ModPage },
    { path: "/userAds/:id", component: MyAds },
>>>>>>> 980aee0f274d2245e57a4f74fdd8dbc768cfe268
  ],
});
