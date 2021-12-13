<template>
  <section class="section-products">
    <div class="wrapper wrapper--w820 mt-5">
      <div class="card card-1">
        <div class="card-heading">
          <h2 class="title mb-4 pb-3">Annonces à accepter/réfuser</h2>
        </div>
        <div class="card-body">
          <form
            method="GET"
            action="#"
            id="js-wizard-form"
            @submit.prevent="handleSubmit"
          >
            <error v-if="error" :error="error" />
            <ul class="tab-list">
              <div v-for="ad in list" v-bind:key="ad.id" class="list">
                <div class="col-md-5 col-lg-1 col-xxl-3">
                  <div
                    id="product"
                    class="single-product rounded"
                    :style="{ backgroundImage: 'url(' + ad.photo + ')' }"
                  >
                    <div class="row mt-2">
                      <div class="col-md-6">
                        <label class="labels">Titre</label
                        ><input
                          type="text"
                          v-model="titre"
                          class="form-control"
                          readonly
                        />
                      </div>
                      <div class="col-md-6">
                        <label class="labels">Description</label
                        ><input
                          type="text"
                          v-model="description"
                          class="form-control"
                          readonly
                        />
                      </div>
                      <div class="col-md-6">
                        <label class="labels">Lieu</label
                        ><input
                          type="text"
                          v-model="lieu"
                          class="form-control"
                          readonly
                        />
                      </div>
                      <div class="col-md-6">
                        <label class="labels">Membre</label
                        ><input
                          type="text"
                          v-model="membre"
                          class="form-control"
                          readonly
                        />
                      </div>
                      <div class="col-md-6">
                        <label class="labels">Prix</label
                        ><input
                          type="text"
                          v-model="prix"
                          class="form-control"
                          readonly
                        />
                      </div>
                      <div class="col-md-6">
                        <label class="labels">Categorie</label
                        ><input
                          type="text"
                          v-model="categorie"
                          class="form-control"
                          readonly
                        />
                      </div>
                    </div>
                  </div>
                  <div class="row mt-4">
                    <div class="col-md-5 mt-5 text-center">
                      <button
                        v-on:click="deleteAnnonce"
                        class="btn btn-danger profile-button"
                        type="button"
                      >
                        Refuser
                      </button>
                    </div>
                    <div class="col-md-6 mt-5 text-center">
                      <button
                        v-on:click="handleSubmit"
                        class="btnSave"
                        type="button"
                      >
                        Accepter
                      </button>
                    </div>
                  </div>
                  <div
                    v-show="notif"
                    class="row mt-3 notif"
                    style="position: fixed; top: 8%; left: 58%"
                  >
                    <div class="col-md-6 Message Message--green">
                      <div class="Message-icon">
                        <i class="fa fa-exclamation"></i>
                      </div>
                      <div class="Message-body">
                        <p>Annonce bien acceptée</p>
                      </div>
                    </div>
                  </div>
                  <div v-show="notifDel" class="row mt-3">
                    <div class="col-md-6 Message Message--orange">
                      <div class="Message-icon">
                        <i class="fa fa-exclamation"></i>
                      </div>
                      <div class="Message-body">
                        <p>{{ message }}</p>
                      </div>
                    </div>
                  </div>
                </div>

                <!-- </div> -->
              </div>
            </ul>
          </form>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: "MederatorPage",
  components: {},

  data() {
    console.log(this.$store.getters.getUserId);
    return {
      list:[],
      notif: false,
      notifDel: false,
      titre: "",
      description: "",
      lieu: "",
      prix:"",
      membre:"",
      categorie: "",
      message: "",
    };
  },
  async mounted() {
     console.log(this.user)
    //   let id=this.$store.getters.getUserId;
            try {
        await fetch("http://localhost:8000/ads/", {
          method: "GET"
        }).then(response => response.json()).then((response)=>{
           
                console.log(response)
                this.list=response.filter(e=>e.state!="publié");
        });
      } catch (e) {
        this.error = "Une erreur est survenue!";
      }
        },
  methods: {
    async handleSubmit(e) {
      try {
        await fetch("http://localhost:8000/ads/edit", {
          method: "POST",
          body: JSON.stringify({
            ad_id:e.target.id,
            state:"publié"
          }),
        }).then(response => response.json()).then(()=>{
            this.message = "votre annonce a  été bien suprrimé ";
            this.notif=true;
           setTimeout(() => this.$router.go(this.$router.currentRoute),2000);
            
        });
        
      } catch (e) {
        this.error = "Une erreur est survenue!";
      }
    },
    async deleteAnnonce(e)
    {
        try {
        await fetch("http://localhost:8000/ads/edit", {
          method: "POST",
          body: JSON.stringify({
            ad_id:e.target.id,
            state:"rejeté"
            
          }),
        }).then(response => response.json()).then(()=>{
            this.message = "votre annonce a  été bien suprrimé ";
            this.notif=true;
           setTimeout(() => this.$router.go(this.$router.currentRoute),2000);
            
        });
        
      } catch (e) {
        this.error = "Une erreur est survenue!";
      }

    },
  },
};
</script>

<style scoped src="../assets/css/createAd.css"></style>

