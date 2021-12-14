<template>
<div>
  <div style="margin-top:18%;width: 27%;float: left;">
      <div class="form-check">
 <select @change="filter()" v-model="byCategory" name="categorie" id="subject" class=" btn mt-1 nav-link dropdown-toggle"  required value="Tous">
          <option  >Tous</option>
          <option  v-for="category in categories"  v-bind:key="category.pk" :value="category.categoryName">{{category.categoryName}}</option>
      </select>
      </div>
<label for="customRange2"   class="form-label">Price</label>
<input type="range" @change="filter"  class="form-range" min="0" v-model="byPrice" max="5000" step="10"  id="customRange2">
  <p>{{byPrice}}</p>
  <div class="form-check">
  <input type="radio" id="css" @change="filter"  name="fav_language" value="à donner"  v-model="state">
  <label class="form-check-label" for="defaultCheck1">
   à donner
  </label>
</div>
    <div class="form-check">
<input type="radio" id="css" @change="filter"  name="fav_language" value="à vendre"  v-model="state">
  <label class="form-check-label" for="defaultCheck1">
   à vendre
  </label>
</div>
<a @click="sortASC()">
<i class="fa fa-sort-asc fa-3x" aria-hidden="true"></i></a>
<a @click="sortDESC()">
<i  class="fa fa-sort-desc fa-3x" aria-hidden="true"></i></a>
<select name="campus" id="subject" @change="filter"  class="form-style"  v-model="byCampus" required value="Tous" >
      <!-- <option selected >{{byCampus}}</option> -->
      <option  >Tous</option>
      <option value="2" >Woluwe</option>
      <option value="1" >Ixelles</option>
      <option value="3" >Louvain-La-Neuve</option>
</select> 
  </div>  
    

  <div class="post" style="overflow-y: scroll;width: 72%;height: 600px;    float: right;">
    <div class="loading" v-if="loading">Chargement...</div>
    <div class="error" v-if="error">{{ error }}</div>
    <div v-for="ad in filterdList" v-bind:key="ad.id" class="list">
      <div class="card-image">
        <div
          id="product"
          class="single-product rounded"
        ><img  id="product"
          class="single-product rounded" :src="getMedia(ad.id)"/></div>
      </div>
      <div class="card-content">
        <div class="media">
          <div class="media-content">
            <p class="title is-4">{{ ad.title }}</p>
          </div>
          <div>
            <!-- <button
              class="button is-small"
              :title="removeFromFavouriteLabel"
              v-show="ad.isFavourite"
              @click="removeFromFavourite(ad.id)"
            >
              <span class="icon is-small">
                <i class="fas fa-heart"></i>
              </span>
            </button> -->
            <!-- <button
              class="button is-small"
              :title="addToFavouriteLabel"
              v-show="!ad.isFavourite"
              @click="saveToFavorite(ad.id)"
            >
              <span class="icon is-small">
                <i class="far fa-heart"></i>
              </span>
            </button> -->
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
      <!-- <nuxt-link
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
      </nuxt-link> -->
    </div>
  </div>
  
  </div>
</template>

<script>
// import $ from 'jquery'
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
      byCampus:"Tous",
      loading: false,
      addToCartLabel: "Add to cart",
      viewDetailsLabel: "Details",
      byPrice:"100",
      byCategory:"Tous",
      state:"à vendre",
      list: [],
      annonces:this.$store.getters.annonces,
      categories:[],
      campus:[],
      medias:[],
      adsCampus:[],
      filterdList:[],
      bytitle:""

    };
  },created(){
    ()=>console.log("created")
  } ,
  async mounted() {
     console.log(this.annonces)
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
               
                // this.list=response(e=>e.seller_id==this.annonces.id);
        }).then(()=>{
              console.log(this.$route.params)
              if(this.$route.params.title||this.$route.params.cat){
              this.byCategory=this.$route.params.cat!="Catégorie" ?this.$route.params.cat :"Tous"
              this.bytitle=this.$route.params.title
              console.log(this.bytitle+""+this.byCategory)
              this.filterdList=this.list
              console.log(this.filterdList)
              if(this.byCategory!="Tous")
              this.filterdList=this.filterdList.filter(e=>((e.category==this.categories.filter(i=>i.id==this.byCategory)[0].categoryName)));
              console.log(this.filterdList)
              if(this.bytitle!="Tous")
              this.filterdList=this.filterdList.filter(e=>(e.title.toUpperCase().includes(this.bytitle.toUpperCase())));
              console.log(this.filterdList)
    }
        });
      } catch (e) {
        this.error = "Une erreur est survenue!";
      }
  },methods:{
    filter(){
    console.log(this.byPrice +"  " +this.byCategory+" "+this.state+" "+this.byCampus)
    let filterdList=this.list;
    if(this.byCampus!="Tous"){
      filterdList=[];
      let listCampus=this.adsCampus.filter(e=>e.campus==this.byCampus)
      // console.log(listCampus)
      listCampus.forEach(element => {
      filterdList.push(this.list.filter(e=>e.id==element.ad)[0])
    });
    }
    
    // console.log(filterdList)
    if(this.byCategory=="Tous"&&this.byCampus!="Tous")
     filterdList=filterdList.filter(e=>(e.status==this.state)&&(this.byPrice>=e.price));
    else if(this.byCategory=="Tous"&&this.byCampus=="Tous")
    filterdList=filterdList.filter(e=>(e.status==this.state)&&(this.byPrice>=e.price));
    else if(this.byCategory!="Tous"&&this.byCampus=="Tous")
    filterdList=filterdList.filter(e=>(e.category==this.byCategory)&&(e.status==this.state)&&(this.byPrice>=e.price));
    else
      filterdList=filterdList.filter(e=>(e.category==this.byCategory)&&(e.status==this.state)&&(this.byPrice>=e.price)&&(this.byCampus>=e.campus));
  //  console.log(this.campus)
  //  console.log(this.adsCampus)
   this.filterdList=filterdList
  },
    getMedia(adId){
      return this.medias.filter(e=>e.ad==adId)[0] ? this.medias.filter(e=>e.ad==adId)[0].url: "testici"   
  },
  sortASC(){
    this.filterdList=this.filterdList.sort(function(a, b){return a.price-b.price});
  },sortDESC(){

    this.filterdList=this.filterdList.sort(function(a, b){return b.price-a.price});
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
  width: 90%;
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
