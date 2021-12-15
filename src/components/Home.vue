<template>   
  <div>
    <div class="video-background">
      <div class="video-wrap">
        <div id="video">
          <video id="bgvid"  autoplay loop muted playsinline>
            <source src="../assets/videos/stars.mp4" type="video/mp4" >
          </video>
        </div>
      </div>
    </div>  
    <div id="categories">
      <h3>Catégories</h3>
      <div class="row mt-4">
          
          <div class="col-3">
            <a href="#"> <img src="../assets/images/maison.png" class="rounded" alt="Maison et Jardin" style="width:90%; height:auto"></a>
          </div>
          <div class="col-3">
            <a href="#"><img src="../assets/images/quotidien.png" class="rounded" alt="Famille" style="width:90%; height:auto"></a>
          </div>
          <div class="col-3">
            <a href="#"><img src="../assets/images/vetements.png" class="rounded" alt="Vetements" style="width:90%; height:auto"></a>
          </div>
          <div class="col-3">
            <a href="#"><img src="../assets/images/loisirs.png" class="rounded" alt="Loisirs" style="width:90%; height:auto"></a>
          </div>      
          <a href="/ads" class="btn mt-5" type="submit">Voir toutes les annonces</a>

      </div>

    </div>
 

    <div class="row">
      <div id="carousel">
        <h3>Annonces <b>récentes</b></h3>
          <b-carousel id="carousel-1" v-model="slide" :interval="300000"  controls   indicators  :value=0 style="text-shadow: 1px 1px 2px #333;" >
            <b-carousel-slide class="card" v-for="ad in filterdList" v-bind:key="ad.id">
            <p class="captionTitre"> {{ ad.title }} </p>
            <img class="d-block rounded" :src="getMedia(ad.id)">
            <p class="prix"><span v-if="ad.price== 0" > <strong> Gratuit </strong></span>
              <span v-else> <strong> {{ ad.price }} € </strong></span></p>
            <a :href="'/detailAd/'+ad.id" class="btnDetail">Voir détails</a>
            </b-carousel-slide>

          </b-carousel>
      </div>

    </div>
  </div>
</template>


<script>
import { mapGetters } from "vuex"
let userId = localStorage.getItem('user')
let token = localStorage.getItem('token')
export default {
  name: "Home",
  data(){
    return {
      userId : userId,
      token : token,
      list: [],
      annonces:this.$store.getters.annonces,
      categories:[],
      campus:[],
      medias:[],
      adsCampus:[],
      filterdList:[]
      ,a:""}

  },

  computed:{
    ...mapGetters(['user'])
  },  async mounted() {
  console.log("User id : "+userId)
    //   let id=this.$store.getters.getUserId;
            try {
        await fetch("http://localhost:8000/ads", {
          method: "GET"
        }).then(response => response.json()).then((response)=>{
                console.log(response)
                response.campus.forEach(e=>e.fields["id"]=e.pk);
                this.campus= response.campus.map(e=>e.fields);
                response.categories.forEach(e=>e.fields["id"]=e.pk);
                this.categories=response.categories.map(e=>e=e.fields)
                response.medias.forEach(e=>e.fields["id"]=e.pk);
                this.medias=response.medias.map(e=>e=e.fields);
                this.adsCampus=response.adsCampus.map(e=>e=e.fields);
                response.ads.forEach(e=>e.fields["id"]=e.pk);
                this.list=response.ads.map(e=>e=e.fields)
                this.list.forEach(e=>e['category']=this.categories.filter(i=>i.id==e.id)[0].categoryName)
                 console.log(this.medias)
                 console.log(response)
                 this.filterdList=this.list
                 this.filterdList=this.filterdList.sort(function(a, b){return b.id-a.id});
                 console.log(this.filterdList)
            
        })
      } catch (e) {
        this.error = "Une erreur est survenue!";
      }
  },methods:{
      getMedia(adId){
      return this.medias.filter(e=>e.ad==adId)[0] ? this.medias.filter(e=>e.ad==adId)[0].url: "testici"   
  }
  }
}
</script>

<style scoped src="../assets/css/home.css"></style>
<style >
#carousel {
 
  width: 800px !important;
  height: 1094px !important;
  margin: auto !important;
}
</style>