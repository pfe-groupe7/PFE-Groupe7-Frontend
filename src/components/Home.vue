<template>   
  <div class="container" >
    <div class="showcase mt-4">
          <video src="" muted loop autoplay></video>
    <div class="overlay"> </div>
    </div>
    <div id="categories">

      <h2>Catégories</h2>
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