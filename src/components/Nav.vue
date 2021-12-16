<template>
<div class="main">
  <nav id="navbar" class="navbar">
    <a class="navbar-brand" href="/">
      <img src="../assets/images/vincilogo.png" height="100" alt="vinci market logo">
    </a>
      
      <form class="form-inline">
        <div class="flexbox">
          <div class="search">
            <div>
              <input @change="search" v-model="title" type="text" placeholder="Recherche par titre...">
            </div>
          </div>
        </div>
      </form>
      <div v-if="user">
        <router-link to="/createAd"><a class="btn mt-1">
          Publier une annonce &nbsp; <i class="fa fa-paper-plane" aria-hidden="true"></i></a>
        </router-link>
      </div>
      <div v-else>
        <router-link to="/login"><a class="btn mt-1">
          Publier une annonce &nbsp; <i class="fa fa-paper-plane" aria-hidden="true"></i></a>
        </router-link>
      </div>
        <ul class="navbar-nav ml-auto" v-if="!user">
          <li class="nav-item">
            <router-link to="/login" class="nav-link"><i id="userIcon" class="fa fa-user-circle" aria-hidden="true"></i></router-link>
          </li>
        </ul>
        
        <ul class="mt-2 pb-2 nav-link  dropdown fa-10x" v-else  id="profile">
           <i class="dropbtn fa fa-user-circle " >&nbsp;{{user.firstname}}</i>
           
          <div class="dropdown-content" >
            
            <a href="javascript:void(0)" @click="myAds"   class="dropdown-item">Mes annonces</a>                   
            <a href="javascript:void(0)" @click="profile"   class="dropdown-item">Éditer mon profil</a>
             <a href="javascript:void(0)" v-if="moderator" @click="modPage"   class="dropdown-item">Annonces à valider</a>
            <a href="javascript:void(0)" @click="handleClick" class="dropdown-item">Déconnexion</a>

          </div>
       </ul>

  </nav>
  
</div>
</template>

<script>
//  import { mapGetters } from "vuex";
import{URL}from '../config'

export default {
  
  name: 'Nav',
  data () {
    let user=this.$store.getters.user
    let token = localStorage.getItem('token')
    return {
      user:user,
      token:token,
      title:"",
      catgroy:"Catégorie",
      categories:[],
      moderator:""

}
  },async mounted(){
    await fetch(URL+"users/" + this.user.id, {
        method: "GET",
      }).then((response) => response.json())
            .then((response) => {
              console.log(response);
              this.moderator = response[0].fields.moderator;
            })
      try{
        await fetch(URL+"categories", {
          method: "GET"
        }).then(response => response.json()).then((response)=>{
                console.log(this.user)         
                console.log("The token")
                response.forEach(e=>e.fields["id"]=e.pk);
                this.categories=response.map(e=>e=e.fields)})
                }catch (e) {
                this.error = "Une erreur est survenue!";
      }
                
            
  },  
  methods:{
    search(){
       if(this.title=="")
      this.title="Tous";
       console.log(this.$router)
      //  this.$router.pop()
      
      this.$router.replace("/ads/"+this.title+"/"+this.catgroy+"")
    //  this.$router.replcae({ name: 'ads', params: {"this.title""this.catgroy" } })
      
    },
     handleClick(){
       
       localStorage.removeItem('token');
       localStorage.removeItem('user');
       this.$store.dispatch('user',null);
       this.$store.dispatch('user',null);
       this.user=null;
       localStorage.clear();
       sessionStorage.clear();
      window.location.href = '/';

     },
     profile(){
       this.$router.push("/profile/"+this.user.id)
     },
     myAds(){
      this.$router.push("/myads")
       
     },modPage(){
       this.$router.push("/modPage")
     }
     
     
  }
  
}
</script>
<style scoped src="../assets/css/navbar.css"></style>