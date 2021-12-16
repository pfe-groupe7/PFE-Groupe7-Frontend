<template>
  <div v-if="token" class="wrapper wrapper--w820 mt-5">
    <div class="card card-1">
      <div class="card-heading">
        <h2 class="title mb-4 pb-3">Ajoutez votre annonce</h2>
      </div>
      <div class="card-body">
        <form
          method="POST"
          action="#"
          id="js-wizard-form"
          enctype="multipart/form-data"
          @submit.prevent="handleSubmit"
        >
          <error v-if="error" :error="error" />
          <ul class="tab-list">
            <li class="tab-list__item active">
              <button
                class="tab-list__link"
                href="#tab1"
                data-toggle="tab"
                :style="panelStyle1"
              >
                <v-stepper-content step="1">
                  <span class="step">1</span>
                  <span class="desc">Informations</span>
                </v-stepper-content>
              </button>
            </li>
            <li class="tab-list__item">
              <button
                class="tab-list__link"
                href="#tab2"
                data-toggle="tab"
                :style="panelStyle2"
              >
                <v-stepper-content step="2">
                  <span class="step">2</span>
                  <span class="desc">Détails</span>
                </v-stepper-content>
              </button>
            </li>
            <li class="tab-list__item">
              <button
                class="tab-list__link"
                href="#tab3"
                data-toggle="tab"
                :style="panelStyle3"
              >
                <v-stepper-content step="3">
                  <span class="step">3</span>
                  <span class="desc">Photos</span>
                </v-stepper-content>
              </button>
            </li>
          </ul>

          <div class="tab-content">
            <!--- main info and category-->
            <div v-if="step === 1" class="Panel-Content" id="tab1">
              <div class="form">
                <div class="row align-items-center">
                  <div class="col-4" style="margin-bottom: 30px">
                    <label
                      class="form-label"
                      style="
                        margin-left: 5px;
                        margin-bottom: 5px;
                        font-size: 19px;
                      "
                      >Titre</label
                    >
                    <input
                      class="input--style-1"
                      type="text"
                      v-model="titre"
                      placeholder="Titre de l'annonce"
                      required
                    />
                  </div>
                  <div class="col-4" style="margin-bottom: 30px">
                    <label
                      class="form-label"
                      style="
                        margin-left: 5px;
                        margin-bottom: 5px;
                        font-size: 19px;
                      "
                      >Catégorie</label
                    >
                    <select
                      value="Catégorie"
                      name="categorie"
                      id="subject"
                      class="form-style"
                      required
                      v-model="categorie"
                    >
                      <optgroup label="Maison et Jardin">
                        <option value="2">Outils</option>
                        <option value="3">Meubles</option>
                        <option value="4">Pour la maison</option>
                        <option value="5">Jardin</option>
                        <option value="6">Electroménager</option>
                      </optgroup>
                      <optgroup label="Famille">
                        <option value="8">Santé et beauté</option>
                        <option value="9">Fournitures pour animaux</option>
                        <option value="10">Puériculture et enfants</option>
                        <option value="11">Jouets et jeux</option>
                      </optgroup>
                      <optgroup label="Vêtements et accessoires">
                        <option value="13">
                          Vêtements et chaussures femmes
                        </option>
                        <option value="14">
                          Vêtements et chaussures hommes
                        </option>
                        <option value="15">Bijoux et accessoires</option>
                        <option value="16">Sacs et bagages</option>
                      </optgroup>
                      <optgroup label="Loisirs - hobbys">
                        <option value="18">Vélos</option>
                        <option value="19">Loisirs créatifs</option>
                        <option value="20">Pièces auto</option>
                        <option value="21">
                          Sports et activités d’extérieures
                        </option>
                        <option value="22">Jeux vidéo</option>
                        <option value="23">Livres, films et musique</option>
                        <option value="24">Instruments de musique</option>
                        <option value="25">
                          Antiquité et objets de collection
                        </option>
                      </optgroup>
                      <optiongroup label="Electronique">
                        <option value="27">Electronique et ordinateurs</option>
                        <option value="28">Téléphones mobiles</option>
                      </optiongroup>
                    </select>
                  </div>
                </div>
                <div class="row align-items-center">
                  <div class="col-8" style="margin-left: 100px">
                    <label
                      class="form-label"
                      style="
                        margin-left: 5px;
                        margin-bottom: 5px;
                        font-size: 19px;
                      "
                      >Description</label
                    >
                    <textarea
                      class="input--style-1"
                      type="text"
                      rows="1"
                      v-model="description"
                      placeholder="Description de l'annonce"
                      required="required"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <!--status and capmus-->
          <div v-if="step === 2" class="Panel-Content" id="tab2">
            <div class="form">
              <div class="wrapper">
                <input
                  v-model="status"
                  v-bind:value="'à vendre'"
                  type="radio"
                  name="select"
                  id="option-1"
                />
                <input
                  v-model="status"
                  v-bind:value="'à donner'"
                  type="radio"
                  name="select"
                  id="option-2"
                  checked
                />
                <label
                  for="option-1"
                  class="option option-1"
                  @click="showPrice(1)"
                >
                  <div class="dot"></div>
                  <span>A vendre</span>
                </label>

                <label
                  for="option-2"
                  @click="showPrice(0)"
                  class="option option-2"
                >
                  <div class="dot"></div>
                  <span>A donner</span>
                </label>
              </div>
              <div id="prix" class="row align-items-center" v-if="show === 1">
                <div class="col-3">
                  <input
                    class="input--style-1"
                    type="number>0"
                    v-model="prix"
                    placeholder="Prix €"
                    required="required"
                  />
                </div>
              </div>
            </div>
            <div class="form">
              <div class="row align-items-center">
                <div class="col-4">
                  <label
                    class="form-label"
                    style="margin-left: 5px; font-size: 19px"
                    >Campus</label
                  >
                  <select
                    name="campus"
                    id="subject"
                    class="form-style"
                    required
                    v-model="campus"
                    @change="showSelect($event)"
                  >
                    <option value="2">Woluwe</option>
                    <option value="1">Ixelles</option>
                    <option value="3">Louvain-La-Neuve</option>
                  </select>
                </div>
                <div class="col-4" v-if="selectedLocation === 2">
                  <label
                    class="form-label"
                    style="margin-left: 5px; font-size: 19px"
                    >Localisation</label
                  >
                  <select
                    name="campus"
                    id="subject"
                    class="form-style"
                    required="required"
                    v-model="location"
                  >
                    <option value="5">Place de l'Alma, 3</option>
                    <option value="6">Promenade de l'Alma, 59</option>
                    <option value="7">Clos Chapelle-aux-Champs, 41</option>
                    <option value="8">Clos Chapelle-aux-Champs, 43</option>
                    <option value="9">Avenue Emmanuel Mounier, 84</option>
                  </select>
                </div>
                <div class="col-4" v-if="selectedLocation === 1">
                  <label
                    class="form-label"
                    style="margin-left: 5px; font-size: 19px"
                    >Localisation</label
                  >
                  <select
                    name="campus"
                    id="subject"
                    class="form-style"
                    required="required"
                    v-model="location"
                  >
                    <option value="1">Chaussée de Wavre, 249</option>
                    <option value="2">Rue de Limauge, 14</option>
                    <option value="3">Rue d’Arlon, 3-5-11,4-6-14</option>
                    <option value="4">
                      Rue de Trèves, 84 /Rue d’Arlon, 53
                    </option>
                  </select>
                </div>
                <div class="col-4" v-if="selectedLocation === 3">
                  <label
                    class="form-label"
                    style="margin-left: 5px; font-size: 19px"
                    >Localisation</label
                  >
                  <select
                    name="campus"
                    id="subject"
                    class="form-style"
                    required="required"
                    v-model="location"
                  >
                    <option value="10">Chemin de la Bardane, 17</option>
                    <option value="11">Voie Cardijn, 10</option>
                    <option value="13">Rue du traité de Rome, 1</option>
                    <option value="12">Rue Pauline Ladeuze, 14</option>
                    <option value="14">Rue de l’Union européenne, 4</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          <!-- photos BUG HERE DO NOT CLICK-->
          <div v-if="step === 3" class="Panel-Content" id="tab3">
            <div class="row text-center" id="upload">
              <h1>Télécharger une ou plusieurs image(s)</h1>
              <div class="dropbox">
                <div class="custom-file">
                  <input
                    type="file"
                    @change="imageSelected"
                    class="custom-file-input"
                    multiple
                  />
                  <label class="custom-file-label" for="customFile"
                    >Choisir une photo ou une vidéo</label
                  >
                </div>
                <div v-for="(image, key) in imagepreview" :key="key">
                  <img
                    :src="imagepreview[key]"
                    class="figure-img img-fluid rounded"
                    :ref="'image'"
                    style="max-height: 100px"
                  />
                  {{ image.name }}
                </div>
              </div>
            </div>
          </div>

          <!-- buttons -->
          <div id="boutons">
            <div class="form-group mt-4">
              <button
                v-if="step > 1"
                @click="(step -= 1), activatePanel(step)"
                class="btn mb-2">
                <i class="fa fa-arrow-left"></i> &nbsp;Précédent
              </button>
            </div>
            <div class="form-group mt-4">
              <button
                class="btn mb-2"
                v-if="step < 3"
                @click="(step += 1), activatePanel(step)"
              >
                Suivant &nbsp;<i class="fa fa-arrow-right"></i>
              </button>
            </div>
            <div class="form-group mt-4">
              <button class="btn mb-2" v-if="step === 3" @click="submit">
                Envoyer &nbsp;<i class="fa fa-check"></i>
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
  <div v-else>Veillez vous connecter pour voir cette page</div>
</template>

<script>

let userId = localStorage.getItem("user");
let token = localStorage.getItem("token");
import{URL}from '../config'
export default {
  name: "CreateAd",
  components: {},

  data() {
    return {
      isActive: true,
      panelStyle1: {
        background: "#84A796",
      },
      panelStyle2: {
        background: "#3a5749",
      },
      panelStyle3: {
        background: "#3a5749",
      },
      token: token,
      step: 1,
      selectedLocation: 1,
      show: 0,
      uploadedFiles: [],
      uploadError: null,
      currentStatus: null,
      image: null,
      imagepreview: [],
      titre: "",
      categorie: "",
      description: "",
      status: "",
      prix: "",
      campus: "",
      location: "",
      nbrPhoto: 0,
      error: "",
    };
  },

  methods: {

   async handleSubmit() {
      fetch(URL+"ad", {
        method: "POST",
        body: JSON.stringify({
          userId: userId,
          title: this.titre,
          category: this.categorie,
          description: this.description,
          price: this.prix,
          status: this.status,
          campus: this.campus,
          location: this.location,
        }),
      })
        .then((response) => {
          if (response.ok) {
            this.UploadToImgbb();
          } else {
            window.alert(
              "Une erreur est survenue! Est ce que vous avez bien rempli la formule?"
            );
          }
        })
        .catch((error) => {
          console.log(error);

        });
    },

    async UploadToImgbb() {
      var files = document.querySelector("input[type=file]").files;

      this.nbrPhoto = files.length;
      console.log("files " + files);
      console.log("nb photos" + files.length);

      if (files) {
        for (var i = 0; i < files.length; i++) {
          const formData = new FormData();
          formData.append("image", files[i]);
          formData.set("key", "1d6b2917ce19a4d0e4fc1acb17d393ca");

          fetch("https://api.imgbb.com/1/upload", {
            method: "POST",
            body: formData,
          })
            .then((response) => {
              return response.json();
            })
            .then((data) => this.saveUrl(data));
        }
      }
    },

    async saveUrl(data) {
      console.log(data["data"]["display_url"]);
      console.log(this.nbrPhoto);
      this.nbrPhoto--;

      fetch(URL+"media", {
        method: "POST",
        body: JSON.stringify({
          url: data["data"]["display_url"],
        }),
      });

      //redirection
      if (this.nbrPhoto === 0) {
        window.alert("Votre annonce à été bien enregistrée.");
        this.$router.go("");
      }
    },

    imageSelected(e) {
      this.image = e.target.files;
      for (var i = 0; i < this.image.length; i++) {
        this.imagepreview.push(this.image[i]);
      }
      for (let i = 0; i < this.imagepreview.length; i++) {
        let reader = new FileReader();
        reader.onload = () => {
          this.$refs.image[i].src = reader.result;
        };
        reader.readAsDataURL(this.imagepreview[i]);
      }
    },

    activatePanel(stepIndex) {
      this.step = stepIndex;
      if (this.step === 1) {
        this.isActive = true;
        this.panelStyle1.background = "#84A796";
        this.panelStyle2.background = "#3a5749";
        this.panelStyle3.background = "#3a5749";
      } else if (this.step === 2) {
        this.isActive = true;
        this.panelStyle1.background = "#3a5749";
        this.panelStyle2.background = "#84A796";
        this.panelStyle3.background = "#3a5749";
      } else if (this.step === 3) {
        this.isActive = true;
        this.panelStyle1.background = "#3a5749";
        this.panelStyle2.background = "#3a5749";
        this.panelStyle3.background = "#84A796";
      }
      console.log(this.step);
    },
    showSelect(event) {
      this.selectedLocation = parseInt(event.target.value);
    },
    showPrice(showIndex) {
      this.show = showIndex;
    },
  },
  mounted() {
    this.reset();
  },
};
</script>

<style scoped src="../assets/css/createAd.css"></style>
