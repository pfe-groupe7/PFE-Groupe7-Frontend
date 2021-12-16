<template>
    <section class="section-products" >
      <div class="header">
          <h2 style="font-size:40px;">Mes annonces</h2>
      </div>
		<div class="container" style="max-height: 600px; display: flex;">

            <div v-for="ad in list"  v-bind:key="ad.pk" class="list">
              <div  class="col-md-5 col-lg-1 col-xxl-3 offset-2">                        
                <div  id="product" class="single-product rounded border ">
                    <a :href="'/detailAd/'+ad.pk" style="   width: 200px;position: absolute; height: 175px !important;"></a>
                        <img  class="center rounded" :src="ad.photo.url" style="width: 296px;height: 298px;">
                        <div class="part-1">
                            <span  v-if="ad.fields.state=='refusée' " class="rejected rounded">{{ad.fields.state}}</span>
                            <span  v-else-if="ad.fields.state=='clôturée' " class="closed rounded">{{ad.fields.state}}</span>
                            <span  v-else-if="ad.fields.state=='en attente de validation' " class="pending rounded">{{ad.fields.state}}</span>
                            <span  v-else-if="ad.fields.state=='validée'" class="valid rounded">{{ad.fields.state}}</span>
                            <ul >
                                <li ><a  :id="ad.pk" v-on:click="deleteAd"><i :id="ad.pk" class="bi bi-trash"></i></a></li>    									
                            </ul>		
                        </div>
                      <div class="titre">
                                <h3 class="product-title">{{ad.fields.title}}</h3>
                        </div> 
                </div>
              </div>
          </div>    
        </div>    
        <div v-show="notif"  class="row mt-3 notif">
          <div class="col-md-6 Message Message--green">
              <div class="Message-icon">
                <i class="fa fa-exclamation"></i>
              </div>
              <div class="Message-body">
                <p>{{message}} </p>
              </div>
          </div>
      </div>
</section>

</template>
<style  src="../assets/css/myads.css"></style>
<script>
export default {
  name: "Profile",

  components: {},
   data() {  
    //   this.$store.dispatch("user",  {
    //   "nom": "Arto",
    //   "prenom": "Hellas",
    //   "id": 1,
    //   "compus": "test",
    //   "email": "a@gamil.com"
    // });
    return {
      list:[],
      user:this.$store.getters.user,
      message:"",
      notif:false

    }
  }, async mounted() {
    if(this.$route.params.id)
    this.user=this.$route.params.id;
    else
    this.user=this.user.id;
     console.log(this.user)
    //   let id=this.$store.getters.getUserId;
            try {
        await fetch("http://localhost:8000/ads", {
          method: "GET"
        }).then(response => response.json()).then((response)=>{
          console.log(response)
          console.log(this.user)
          let ads=response.ads
          this.medias= response.medias.map(e=>e=e.fields);
          this.list=ads.filter(e=>e.fields.seller==this.user);
          this.list.map(ad=>ad['photo']=this.medias.filter(e=>e.ad==ad.pk)[0])
          console.log(this.list)
                
        });
      } catch (e) {
        this.error = "Une erreur est survenue!";
      }
        },
  methods: {
    async deleteAd(e)
    {
      console.log(this.list)
        try {
        await fetch("http://localhost:8000/ads/delete/"+e.target.id, {
          method: "GET"
        }).then(response => response.json()).then(()=>{
            this.message = "Votre annonce a bien été supprimée";
            this.notif=true;
           setTimeout(() => this.$router.go(),2000);
            
        });
        
      } catch (e) {
        this.error = "Une erreur est survenue!";
      }
    }
  },
};

</script>
