<template>
    <section class="section-products" >
		<div class="container" style="max-height: 600px;">
				<div class="row justify-content-center text-center">
						<div class="col-md-8 col-lg-6">
								<div class="header">
										<h2>Mes annonces</h2>
								</div>
                
						</div>
				</div>
                <div v-for="ad in list"  v-bind:key="ad.pk" class="list">
                           
                            <!-- Single Product -->
                            <div  class="col-md-5 col-lg-1 col-xxl-3">
                             

                             
                                    <div  id="product" class="single-product rounded" :style="{ backgroundImage : 'url(' + ad.photo[0].fields.url + ')' }">
                                     
                                            <div class="part-1">
                                                <span  v-if="ad.state=='rejetée' " class="rejected rounded">{{ad.fields.state}}</span>
                                                <span  v-else-if="ad.fields.state=='clôturée' " class="closed rounded">{{ad.fields.state}}</span>
                                                <span  v-else-if="ad.fields.state=='en attente de validation' " class="pending rounded">{{ad.fields.state}}</span>
                                                <span  v-else-if="ad.fields.state=='publiée'" class="valid rounded">{{ad.fields.state}}</span>
                                                <a :href="'ads/'+ad.fields.pk" style=" left: -18px;   width: 241px;position: absolute; height: 175px !important;"></a>
                                                    <ul >
                                                            <li ><a  :id="ad.pk" v-on:click="deleteAd"><i :id="ad.pk" class="bi bi-trash"></i></a></li>    									
                                                    </ul>		

                                            </div>
                                          <div class="">
                                                    <h3 class="product-title">{{ad.fields.title}}</h3>
                                            </div> 
                                    </div>
                            </div>
                                           
                    <!-- </div> -->
                </div>    
        </div>    
        <div v-show="notif"  class="row mt-3 notif" style="position: fixed; top: 8%; left: 58%;">
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
<style scoped src="../assets/css/myads.css"></style>
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
     console.log(this.user)
    //   let id=this.$store.getters.getUserId;
            try {
        await fetch("http://localhost:8000/ads", {
          method: "GET"
        }).then(response => response.json()).then((response)=>{
          let ads=response.ads
          this.medias= response
          this.list=ads.filter(e=>e.fields.seller==this.user.id);
          this.list.map(ad=>ad['photo']=this.medias[`${ad.pk}`])
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
            this.message = "votre annonce a  été bien suprrimé ";
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