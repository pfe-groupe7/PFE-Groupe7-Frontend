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
      <div class="col-md-12">
        <h3>Annonces <b>récentes</b></h3>
        <div id="myCarousel" class="carousel slide" data-ride="carousel" data-interval="0">
        <ol class="carousel-indicators">
          <li data-target="#myCarousel" data-slide-to="0" class="active"></li>
          <li data-target="#myCarousel" data-slide-to="1"></li>
          <li data-target="#myCarousel" data-slide-to="2"></li>
        </ol>   
      <div class="carousel-inner">
        <div class="carousel-item active">
          <div class="row">
            <div class="col-sm-3" v-for="ad in list"  v-bind:key="ad.id">
              <div class="thumb-wrapper">
                <div class="img-box">
                  <img src= "" class="img-fluid" alt="">
                </div>
                <div class="thumb-content">
                  <h4>Apple iPad</h4>
                  <p class="item-price"> <span> {{ad.price}}</span></p>
                 
                  <a href="#" class="btn mt-5">Contactez le vendeur</a>
                </div>
              </div>
            </div>
          </div>
        </div>  
        <a class="carousel-control-prev" href="#myCarousel" data-slide="prev">
        <i class="fa fa-angle-left"></i>
      </a>
      <a class="carousel-control-next" href="#myCarousel" data-slide="next">
        <i class="fa fa-angle-right"></i>
      </a>
      </div>
    </div>
    
    </div>

    </div>
  </div>
</template>


<script>
import { mapGetters } from "vuex"

export default {
  name: "Home",

  computed:{
    ...mapGetters(['user'])
  }
}
</script>

<style scoped src="../assets/css/home.css"></style>