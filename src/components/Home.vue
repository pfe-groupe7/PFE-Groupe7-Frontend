<template>
  <div class="container">
    <h1>Catégories</h1>
    <div class="row">
        
        <div class="col-3">
          <img src="https://www.w3.org/html/logo/downloads/HTML5_sticker.png" class="rounded" alt="Maisons et Jardin" style="width:100%; height:auto">
        </div>
        <div class="col-3">
          <img src="https://www.w3.org/html/logo/downloads/HTML5_sticker.png" class="rounded" alt="Famille" style="width:100%; height:auto">
        </div>
         <div class="col-3">
          <img src="https://www.w3.org/html/logo/downloads/HTML5_sticker.png" class="rounded" alt="Vêtements et accessoires" style="width:100%; height:auto">
        </div>
        <div class="col-3">
          <img src="https://www.w3.org/html/logo/downloads/HTML5_sticker.png" class="rounded" alt="Loisirs et hobbys" style="width:100%; height:auto">
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