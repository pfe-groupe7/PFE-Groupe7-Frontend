<template>
  <div class="post">
    <div class="loading" v-if="loading">Chargement...</div>
    <div class="error" v-if="error">{{ error }}</div>
    <div v-for="ad in list" v-bind:key="ad.id" class="list">
      <div class="card-image">
        <div
          id="product"
          class="single-product rounded"
          :style="{ backgroundImage: 'url(' + ad.photo + ')' }"
        ></div>
      </div>
      <div class="card-content">
        <div class="media">
          <div class="media-content">
            <p class="title is-4">{{ ad.title }}</p>
          </div>
          <div>
            <button
              class="button is-small"
              :title="removeFromFavouriteLabel"
              v-show="ad.isFavourite"
              @click="removeFromFavourite(ad.id)"
            >
              <span class="icon is-small">
                <i class="fas fa-heart"></i>
              </span>
            </button>
            <button
              class="button is-small"
              :title="addToFavouriteLabel"
              v-show="!ad.isFavourite"
              @click="saveToFavorite(ad.id)"
            >
              <span class="icon is-small">
                <i class="far fa-heart"></i>
              </span>
            </button>
          </div>
        </div>
        <div class="content is-clearfix">
          <p>{{ ad.description }}</p>
          <p class="is-pulled-right">
            <span class="title is-4"
              ><strong>&euro; {{ ad.price }}</strong></span
            >
          </p>
        </div>
        <div class="card-footer btn-actions">
          <div class="card-footer-item field is-grouped">
            <div class="buttons">
              <button class="button is-text">Contactez le vendeur</button>
            </div>
          </div>
        </div>
      </div>
      <nuxt-link
        class="details"
        :to="{
          name: 'Ads',
          params: {
            id: ad.id,
            title: ad.title,
            price: ad.price,
            description: ad.description,
            location: ad.location,
          },
        }"
      >
      </nuxt-link>
    </div>
  </div>
</template>

<script>

export default {
  name: "Ads",
  components: {},
  data() {
    this.$store.dispatch("annonces", {
      title: "test",
      price: "12",
      desxcription: "test1",
      location: "Alma",
    });
    return {
      error: null,
      loading: false,
      addToCartLabel: "Add to cart",
      viewDetailsLabel: "Details",
      selected: 1,
      quantityArray: [],
      list: [],
      annonces:this.$store.getters.annonces,
    };
  },
  async mounted() {
     console.log(this.annonces)
    //   let id=this.$store.getters.getUserId;
            try {
        await fetch("http://localhost:8000/annonces/", {
          method: "GET"
        }).then(response => response.json()).then((response)=>{
           
                console.log(response)
                this.list=response(e=>e.seller_id==this.annonces.id);
        });
      } catch (e) {
        this.error = "Une erreur est survenue!";
      }
  }
};
</script>

<style >
.details {
  cursor: pointer;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
}
.button,
.select {
  z-index: 2;
}
.select {
  position: absolute;
  right: 15px;
  bottom: 35px;
}
.card-content {
  padding: 0;
}
.buttons {
  margin: 0;
}
</style>
