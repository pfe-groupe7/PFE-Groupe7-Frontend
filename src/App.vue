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

// import axios from "axios";

export default {
  name: "App",
    components: {
   Nav,
   Footer
  },data(){
    return{
      user:[]
    }
  },

  async created() {
    // this.user=this.$store.getters.user
    // const response = await axios.get("user");
    //  this.$store.dispatch('user',response.data);
    //  console.log("1")
    //    await fetch("http://localhost:8000/users/"+localStorage.getItem("user") , {
    //     method: "GET"
    //   }).then(response => response.json()).then((us)=>{
    //      this.user=us[0].fields
    //      console.log(this.user)
    //   this.user["id"]=us[0].pk;
    //   console.log(this.user)
    //   })
     
},
async mounted(){
  // this.user=this.$store.getters.user
  console.log("1")
  await fetch("http://localhost:8000/users/"+localStorage.getItem("user") , {
        method: "GET"
      }).then(response => response.json()).then((us)=>{
         this.user=us[0].fields
         console.log(this.user)
      this.user["id"]=us[0].pk;
      console.log(this.user)
      })
},methods:{
     async update(){
       this.user=  await fetch("http://localhost:8000/users/"+localStorage.getItem("user") , {
        method: "GET"
      }).then(response => response.json())
       return this.user;
       
     }
     
  }
}
</script>


<style>


@import url("https://fonts.googleapis.com/css?family=Fira+Sans:400.500.600.700.800");

* {
  box-sizing: border-box;
}
body {
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
#root {
  width: 100%;
  height: 98%;
}


#app {
  text-align: center;
  margin-bottom: 10%;
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
