<template>
<div class="row">
  <div class="col-2" >
      <div class="categorie pb-2 mb-2">
        <select @change="filter()" v-model="byCategory" name="categorie" id="subject" class="btn2 dropdown-toggle"  required value="Catégorie">
          <option selected >{{byCategory}}</option>
          <option  v-for="category in categories"  v-bind:key="category.pk" :value="category.categoryName">{{category.categoryName}}</option>
        </select>
      </div>
      <div class="radioButton">
        <div class="form-check">
          <input class="form-check-input" type="radio" id="radio" @change="filter"  name="fav_language" value="à donner"  v-model="state">
          <label class="form-check-label" for="defaultCheck1">
          A donner
          </label>
        </div>
        <div class="form-check">
        <input class="form-check-input" type="radio" id="radio" @change="filter"  name="fav_language" value="à vendre"  v-model="state">
          <label class="form-check-label" for="defaultCheck1">
          A vendre
          </label>
        </div>
      </div>

      <div class="prixCursor">
        <label for="customRange2"   class="form-label">Prix</label>
        <input type="range" @change="filter"  class="form-range" min="0" v-model="byPrice" max="5000" step="10"  id="customRange2">
        <p class="">{{byPrice}}</p>
      </div>
      
      <select name="campus" id="subject" @change="filter"  class="btn2" required="required"  v-model="byCampus">
          <option selected >{{byCampus}}</option>
          <option value="2" >Woluwe</option>
          <option value="1" >Ixelles</option>
          <option value="3" >Louvain-La-Neuve</option>
      </select> 
  </div>  
  <div class="col-10">
    <div class="triControl">
      <div class="triText">Trier par</div>
      <div class="selectPrix"><select class="mp-Select-input">
        <option @click="sortASC()">Prix bas à élevé </option>
        <option @click="sortDESC()">Prix élevé à bas</option>
        </select>
      </div>
    </div>

    <div class="row">
      <div class="error" v-if="error">{{ error }}</div>
      <div class="card col-3" id="annonce" v-for="ad in filterdList" v-bind:key="ad.id" >
        <div class="card-image">
          <div id="product" class="single-product rounded">
            <img class="d-block w-100 rounded" :src="getMedia(ad.id)">
          </div>
        </div>
        <div class="card-content">
          <div class="media">
            <div class="media-content">
              <p class="title">{{ ad.title }}</p>
            </div>
            <div>
            
            </div>
          </div>
          <div class="content is-clearfix">
            <p>{{ ad.description }}</p>
            <p class="is-pulled-right">
              <span class="prix"
                ><strong>{{ ad.price }} &euro; </strong></span
              >
            </p>
          </div>
          <div class="card-footer btn-actions">
            <div v-if="token"  class="card-footer-item">
                <a class="btn" :href="'/detailAd/'+ad.id">Voir détail</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div> 
</div>

</template>

<script>
// import $ from 'jquery'
let userId = localStorage.getItem('user')
let token = localStorage.getItem('token')

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
      userId : userId,
      error: null,
      token:token,
      byCampus:"Campus",
      loading: false,
      addToCartLabel: "Add to cart",
      viewDetailsLabel: "Details",
      byPrice:"100",
      byCategory:"Toutes les catégories",
      state:"à vendre",
      list: [],
      annonces:this.$store.getters.annonces,
      categories:[],
      campus:[],
      medias:[],
      adsCampus:[],
      filterdList:[],

    };
  },created(){
    
   },
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

<style scoped src="../assets/css/ads.css"></style>

