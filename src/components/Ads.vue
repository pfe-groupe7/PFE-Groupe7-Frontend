<template>
  <div>
    <div class="card-image">
      <figure class="image is-4by3">
        <img src="https://bulma.io/images/placeholders/1280x960.png" alt="Placeholder image">
      </figure>
    </div>
    <div class="card-content">
      <div class="media">
        <div class="media-content">
          <p class="title is-4">{{ ad.title }}</p>
        </div>
        <div>
          <button class="button is-small" :title="removeFromFavouriteLabel" v-show="ad.isFavourite" @click="removeFromFavourite(ad.id)">
            <span class="icon is-small">
              <i class="fas fa-heart"></i>
            </span>
          </button>
          <button class="button is-small" :title="addToFavouriteLabel" v-show="!ad.isFavourite" @click="saveToFavorite(ad.id)">
            <span class="icon is-small">
              <i class="far fa-heart"></i>
            </span>
          </button>
        </div>
      </div>
      <div class="content is-clearfix">
        <p>{{ ad.description }}</p>
        <p class="is-pulled-right">
          <span class="title is-4"><strong>&euro; {{ ad.price }}</strong></span>
        </p>
      </div>
      <div class="card-footer btn-actions">
        <div class="card-footer-item field is-grouped">
          <div class="buttons">
            <button class="button is-text" >Contactez le vendeur</button>
          </div>
          
        </div>
      </div>
    </div>
    <nuxt-link
      class="details"
      :to="{
        name: 'product_detail-id',
        params: {
          id: ad.id,
          title: ad.title,
          price: ad.price,
          description: ad.description,
          location: ad.location
        }
      }"
    >
    </nuxt-link>
  </div>
</template>

<script>
export default {
  name: 'products',
  props: ['product'],
  data () {
    return {
      addToCartLabel: 'Add to cart',
      viewDetailsLabel: 'Details',
      selected: 1,
      quantityArray: []
    }
  },
  mounted () {
    for (let i = 1; i <= 20; i++) {
      this.quantityArray.push(i);
    }
    if (this.$props.product.quantity > 1) {
      this.selected = this.$props.product.quantity;
    }
  },
  computed: {
    isUserLogged () {
      return this.$store.getters.isUserLoggedIn;
    }
  },
  methods: {
   
    saveToFavorite (id) {
      let isUserLogged = this.$store.state.userInfo.isLoggedIn;
      if (isUserLogged) {
        this.$store.commit('addToFavourite', id);
      } else {
        this.$store.commit('showLoginModal', true);
      }
    },
    removeFromFavourite (id) {
      this.$store.commit('removeFromFavourite', id);
    },
    onSelectQuantity (id) {
      let data = {
        id: id,
        quantity: this.selected
      }
      this.$store.commit('quantity', data);
    }
  }
}
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
