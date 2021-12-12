<template>
<div class="main">
  <nav id="navbar" class="navbar">
    <a class="navbar-brand" href="/">
      <img src="../assets/images/vincilogo.png" height="100" alt="vinci market logo">
    </a>
      
       <select name="categorie" id="subject" class=" btn mt-1 nav-link dropdown-toggle"  required value="Catégorie">
          <option selected disabled>Catégorie</option>
          <option value="1">Maison et jardin</option>
          <option value="2">Famille</option>
          <option value="3">Vêtements et accessoires</option>
          <option value="4">Loisirs - hobbys</option>
      </select>
     
      <form class="form-inline">
        <div class="flexbox">
          <div class="search">
            <div>
              <input type="text" placeholder="Recherche...">
            </div>
          </div>
        </div>
      </form>
        <router-link to="/createAd"><a class="btn mt-1">
          Publier une annonce &nbsp; <i class="fa fa-paper-plane" aria-hidden="true"></i></a>
        </router-link>
        <ul class="navbar-nav ml-auto" v-if="!user">
          <li class="nav-item">
            <router-link to="/login" class="nav-link"><i id="userIcon" class="fa fa-user-circle" aria-hidden="true"></i></router-link>
          </li>
        </ul>
        
        <ul class="mt-2 pb-2 nav-link  dropdown fa-10x" v-else  id="profile">
           <i class="dropbtn fa fa-user-circle " ></i>
           
          <div class="dropdown-content" >
            
            <a href="javascript:void(0)" @click="myAds"   class="dropdown-item">Mes annonces</a>                   
            <a href="javascript:void(0)" @click="profile"   class="dropdown-item">Éditer mon profil</a>
     
            <a href="javascript:void(0)" @click="handleClick" class="dropdown-item">Déconnexion</a>

          </div>
       </ul>

  </nav>
  
</div>
</template>

<script>
//  import { mapGetters } from "vuex";


export default {
  name: 'Nav',
  data () {
    let user=this.$store.getters.user
    return {
      user:user

}
  },
  methods:{
     handleClick(){
       console.log(this.user)
       localStorage.removeItem('token');
       this.$store.dispatch('user',null);
       this.user=null;
       this.$router.go(this.$router.currentRoute)
     },
     profile(){
       this.$router.push("/profile")
     },
     myAds(){
      this.$router.push("/myads")
       
     }
     
     
  }
  
}
</script>
<style scoped src="../assets/css/navbar.css"></style>