<template>
  <section class="section-products">
    <div class="wrapper wrapper--w800">
        <div class="card card-1">
            <div class="card-heading">
                <h2 class="title mb-4 pb-3">Annonces à valider/refuser</h2>
            </div>
            <div class="card-body" >
                <form method="GET" action="#" id="js-wizard-form" @submit.prevent="handleSubmit">
                    <error v-if="error" :error="error" />

                    <div v-for="ad in list" v-bind:key="ad.id" class="annonce">
                        <div class="card-2">
                            <div class="row">
                                <b-carousel id="carousel-1" v-model="slide" controls indicators :value="0">
                                    <b-carousel-slide v-for="(photo, i) in ad.photo" v-bind:key="i">
                                        <template #img>
                                            <img class="d-block" :src="photo.url" alt="image slot" style=" margin-left: 39%; margin-top :20px;" />
                                        </template>
                                    </b-carousel-slide>
                                </b-carousel>
                                <div class="col-2">
                                    <label class="labels">Titre</label><input type="text" v-model="ad.title" class="form-control" readonly />
                                    <label class="labels">Description</label><input type="text" v-model="ad.description" class="form-control" readonly />
                                </div>
                                <div class="col-2">
                                    <label class="labels">Lieu</label><input type="text" :value="getLocation(ad.id)" class="form-control" readonly />
                                    <label class="labels">Membre</label><input type="text" :value="getUser(ad.seller)" class="form-control" readonly />

                                </div>
                                <div class="col-2">
                                    <label class="labels">Prix</label><input type="text" v-model="ad.price" class="form-control" readonly />
                                    <label class="labels">Categorie</label><input type="text" v-model="ad.category" class="form-control" readonly />
                                </div>
                            </div> 
                            <div class="row mt-4">
                        <div class="col-md-5 mt-5 text-center">
                            <button :id="ad.id" v-on:click="deleteAnnonce" class="btn btn-danger profile-button" type="button">
                                Refuser
                            </button>
                        </div>
                        <div class="col-md-6 mt-5 text-center">
                            <button :id="ad.id" v-on:click="handleSubmit" class="btnSave" type="button">
                                Valider
                            </button>
                        </div>
                    </div>
                        </div>
                     
                    </div>
                  
                    <div v-show="notif" class="row mt-3 notif" style="position: fixed; top: 8%; left: 58%">
                        <div class="col-md-6 Message Message--green">
                            <div class="Message-icon">
                                <i class="fa fa-exclamation"></i>
                            </div>
                            <div class="Message-body">
                                <p>Annonce validée</p>
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
                </form>
            </div>
        </div>
    </div>
</section>
</template>

<script>
import{URL}from '../config'
export default {
  name: "MederatorPage",
  components: {},

  data() {
    console.log(this.$store.getters.getUserId);
    return {
      list: [],
      notif: false,
      notifDel: false,
      titre: "",
      description: "",
      lieu: "",
      prix: "",
      membre: "",
      categorie: "",
      message: "",
      error: "",
      slide:"",
      ad:""
    };
  },
  async mounted() {
    console.log(this.user);
    //   let id=this.$store.getters.getUserId;
    try {
      await fetch(URL+"ads", {
        method: "GET",
      })
        .then((response) => response.json())
        .then((response) => {
          console.log(response);
          response.campus.forEach((e) => (e.fields["id"] = e.pk));
          this.campus = response.campus.map((e) => e.fields);
          console.log("1");
          response.categories.forEach((e) => (e.fields["id"] = e.pk));
          this.categories = response.categories.map((e) => (e = e.fields));
          response.locations.forEach((e) => (e.fields["id"] = e.pk));
          this.locations = response.locations.map((e) => (e = e.fields));
          response.users.forEach((e) => (e.fields["id"] = e.pk));
          this.users = response.users.map((e) => (e = e.fields));
          response.medias.forEach((e) => (e.fields["id"] = e.pk));
          this.medias = response.medias.map((e) => (e = e.fields));
          this.adsCampus = response.adsCampus.map((e) => (e = e.fields));
          response.ads.forEach((e) => (e.fields["id"] = e.pk));
          this.list = response.ads.map((e) => (e = e.fields));
          this.list.map(
            (ad) => (ad["photo"] = this.medias.filter((e) => e.ad == ad.id))
          );
          this.list.forEach(
            (e) =>
              (e["category"] = this.categories.filter(
                (i) => i.id == e.id
              )[0].categoryName)
          );
          console.log(this.list);
          this.list = this.list.filter(
            (e) => e.state == "en attente de validation"
          );
          console.log(this.list);
        });
    } catch (e) {
      this.error = "Une erreur est survenue!";
    }
  },
  methods: {
       onSlideStart(slide) {
         console.log(slide)
        this.sliding = true
      },
      onSlideEnd(slide) {
          console.log(slide)
        this.sliding = false
      },
    async handleSubmit(e) {
      try {
        console.log(e.target.id);
        await fetch(URL+"ads/update/" + e.target.id, {
          method: "PUT",
          body: JSON.stringify({
            ad_id: e.target.id,
            title: "",
            status: "",
            description: "",
            state: "publié",
          }),
        })
          .then((response) => response.json())
          .then(() => {
            this.message = "votre annonce a  été bien suprrimé ";
            this.notif = true;
            setTimeout(() => this.$router.go(this.$router.currentRoute), 2000);
          });

      } catch (e) {
        this.error = "Une erreur est survenue!";
      }
    },
    getLocation(id) {
      let idLocation = this.adsCampus.filter((e) => (e.ad = id))[0].location;

      return this.locations.filter((e) => e.id == idLocation)[0].address;
    },
    getUser(iduser) {
      return this.users.filter((e) => e.id == iduser)[0].firstname;
    },
    async deleteAnnonce(e) {
      try {
        console.log(e.target);
        await fetch(URL+"ads/update/" + e.target.id, {
          method: "PUT",
          body: JSON.stringify({
            ad_id: e.target.id,
            state: "rejeté",
          }),
        })
          .then((response) => response.json())
          .then(() => {
            this.message = "votre annonce a  été bien suprrimé ";
            this.notif = true;
            setTimeout(() => this.$router.go(this.$router.currentRoute), 2000);
          });
      } catch (e) {
        this.error = "Une erreur est survenue!";
      }
    },
  },
};
</script>

<style scoped src="../assets/css/moderateur.css"></style>
