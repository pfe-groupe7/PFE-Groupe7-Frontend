<template>
<div class="row">
  <div class="col-2" >
      <div class="categorie pb-2 mb-2">
        <select @change="filter()" v-model="byCategory" name="categorie" id="subject" class="btn2 dropdown-toggle"  required value="Catégorie">
          <option selected >{{byCategory}}</option>
          <option>Toutes les catégories</option>
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
      
      <select name="campus" id="subject" @change="filter"  class="btn2" required="required"  v-model="byCampus">
          <option selected >{{byCampus}}</option>
          <option>Tous les Campus</option>
          <option value="Woluwe" >Woluwe</option>
          <option value="Ixelles" >Ixelles</option>
          <option value="Louvain-La-Neuve" >Louvain-La-Neuve</option>
      </select> 
  </div>  
  <div class="col-10">
    <div class="triControl">
      <div class="triText">Trier par</div>
      <div class="selectPrix"><select @change="sort" class="mp-Select-input">
        <option vaule="1">Prix bas à élevé </option>
        <option vaule="2">Prix élevé à bas</option>
        </select>
      </div>
    </div>

    <div class="row">
      <div class="error" v-if="error">{{ error }}</div>
      <div class="card col-3" id="annonce" v-for="ad in filterdList" v-bind:key="ad.id" >
        <div class="card-image">
          <div class="single-product rounded">
            <a>
            <img class=" d-block w-100" :src="getMedia(ad.id)">
            </a>
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
            <p class="description">{{ ad.description }}</p>
            <p class="is-pulled-right">
              <span class="prix"
                ><strong>{{ ad.price }} &euro; </strong></span
              >
            </p>
          </div>
          <div class="card-footer btn-actions">
            <div v-if="token"  class="card-footer-item">
                <a class="btn" :href="'/detailAd/'+ad.id">Voir détails</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div> 
</div>

</template>

<script>
import{URL}from '../config'
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
      byCampus:"Tous les Campus",
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
      byTitle:""

    };
  },created(){
    console.log(this.$route.params)
   
   },
  async mounted() {
     console.log(this.annonces)
     
    //   let id=this.$store.getters.getUserId;
            try {
        await fetch(URL+"ads", {
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
                console.log( this.list)
                this.list.forEach(e=>e['category']=this.categories.filter(i=>i.id==e.category)[0].categoryName)

                 console.log(this.medias)
                 console.log(response)
                 this.filterdList=this.list
                
                 this.filterdList= this.filterdList.filter(e=>e.state.includes("validé"))
                
                  if(this.$route.params.cat){
                      console.log(this.categories)
                      this.byCategory=this.categories.filter(e=>e.id==this.$route.params.cat)[0].categoryName
                      console.log(this.byCategory)
                      this.filter()
                    }
                     if(this.$route.params.title){
                      console.log(this.categories)
                      this.byTitle=this.$route.params.title
                      // this.byTitle=this.categories.filter(e=>e.id==this.$route.params.cat)[0].categoryName
                      this.filterdList= this.list.filter(e=>e.title.toUpperCase().includes( this.byTitle.toUpperCase()))
                    }
                 
                // this.list=response(e=>e.seller_id==this.annonces.id);
        });
      } catch (e) {
        // this.error = "Une erreur est survenue!";
      }
  },methods:{
    filter(){
    
    let filterdList=this.list;
    if(this.byCampus!="Tous les Campus"){
      filterdList=[];
      let listCampus=this.adsCampus.filter(e=>e.campus==(this.campus.filter(i=>i.campusName==this.byCampus)[0].id))
     
      listCampus.forEach(element => {
      filterdList.push(this.list.filter(e=>e.id==element.ad)[0])
    });
    }
    
     
    if(this.byCategory=="Toutes les catégories"&&this.byCampus!="Tous les Campus"){

       filterdList=filterdList.filter(e=>(e.status==this.state)&&(this.byPrice>=e.price));
    }
   
    else if(this.byCategory=="Toutes les catégories"&&this.byCampus=="Tous les Campus"){
      
       filterdList=filterdList.filter(e=>(e.status==this.state)&&(this.byPrice>=e.price));

    }
    else if(this.byCategory!="Toutes les catégories"&&this.byCampus=="Tous les Campus"){
          let idCategoryParent=this.categories.filter(e=>e.categoryName==this.byCategory)[0].id
          let  listCategoryEnfants=this.categories.filter(e=>e.parent==idCategoryParent)
          listCategoryEnfants=listCategoryEnfants.map(e=>e.categoryName)
          filterdList=filterdList.filter(e=>((e.category==this.byCategory)||listCategoryEnfants.includes(e.category))&&(e.status==this.state)&&(this.byPrice>=e.price));
    }
    else
    {
         
            filterdList=filterdList.filter(e=>(e.category==this.byCategory)&&(e.status==this.state)&&(this.byPrice>=e.price));

    }

   this.filterdList=filterdList
   this.filterdList= this.filterdList.filter(e=>e.state.includes("val"))
  },
    getMedia(adId){
      return this.medias.filter(e=>e.ad==adId)[0] ? this.medias.filter(e=>e.ad==adId)[0].url: "testici"   
  },
  sort(e){

    if(e.target.value=="Prix élevé à bas")
      this.filterdList=this.filterdList.sort(function(a, b){return b.price-a.price}); 
    else
   this.filterdList=this.filterdList.sort(function(a, b){return a.price-b.price});
  }
  
  }
};
</script>

<style scoped src="../assets/css/ads.css"></style>

