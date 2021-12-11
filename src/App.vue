<template>
  <div id="app">
    <Nav :user="user" />
    <div class="auth-wrapper">
      <div class="auth-inner">
      <router-view :user="user"/>
        </div>
    </div>
    <Footer />
  </div>
</template>

<script>

import Nav from './components/Nav.vue'
import Footer from './components/Footer.vue'

import axios from "axios";

export default {
  name: "App",
    components: {
   Nav,
   Footer
  },
  async created() {
    const response = await axios.get("user");
     this.$store.dispatch('user',response.data);
},
}
</script>

<style>


@import url("https://fonts.googleapis.com/css?family=Fira+Sans:400.500.600.700.800");

* {
  box-sizing: border-box;
}
body {
  min-height: 50vh;
  display: flex;
  font-weight: 400;
  font-family: "Fira Sans", sans-serif;
}
h1,
h2,
h3,
h4,
h5,
h6,
label,
span {
  font-weight: 500;
  font-family: "Fira Sans", sans-serif;
}
body,
html,
#app,
#root,
.auth-wrapper {
  width: 100%;
  height: 98%;
}

#app {
  text-align: center;
}

.auth-wrapper {
  display: flex;
  justify-content: center;
  flex-direction: column;
  text-align: left;
}


.auth-wrapper h3 {
  text-align: center;
  margin: 0;
  line-height: 1;
  padding-bottom: 20px;
}

.custom-control-label {
  font-weight: 400;
}

</style>
