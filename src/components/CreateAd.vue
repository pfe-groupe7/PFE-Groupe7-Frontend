<template>
  <div class="wrapper wrapper--w820">
    <div class="card card-1">
      <div class="card-heading">
        <h2 class="title mb-4 pb-3">Ajoutez votre annonce</h2>
      </div>
      <div class="card-body">
        <form
          class="wizard-container"
          method="POST"
          action="#"
          id="js-wizard-form"
          @submit.prevent="handleSubmit"
        >
          <error v-if="error" :error="error" />
          <ul class="tab-list">
            <li class="tab-list__item active">
              <button
                class="tab-list__link"
                href="#tab1"
                data-toggle="tab"
                @click="activatePanel(1)"
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
                @click="activatePanel(2)"
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
                @click="activatePanel(3)"
              >
                <v-stepper-content step="3">
                  <span class="step">3</span>
                  <span class="desc">Photos</span>
                </v-stepper-content>
              </button>
            </li>
          </ul>
          <div class="tab-content">
            <div v-if="step === 1" class="Panel-Content" id="tab1">
              <div class="form">
                <div class="row align-items-center">
                  <div class="col-4">
                    <input
                      class="input--style-1"
                      type="text"
                      v-model="titre"
                      placeholder="Titre de l'annonce"
                      required="required"
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
                      <optgroup label="Maisons et jardin">
                        <option value="Outils">Outils</option>
                        <option value="Meubles">Meubles</option>
                        <option value="PourLaMaison">Pour la maison</option>
                        <option value="Jardin">Jardin</option>
                        <option value="Electromenager">Electroménager</option>
                      </optgroup>
                      <optgroup label="Famille">
                        <option value="SanteEtBeaute">Santé et beauté</option>
                        <option value="FournituresPourAnimaux">
                          Fournitures pour animaux
                        </option>
                        <option value="PuericultureEtEnfants">
                          Puériculture et enfants
                        </option>
                        <option value="JouetsEtJeux">Jouets et jeux</option>
                      </optgroup>
                      <optgroup label="Vêtements et accessoires">
                        <option value="SacsEtBagages">Sacs et bagages</option>
                        <option value="VetementsEtChaussuresFemmes">
                          Vêtements et chaussures femmes
                        </option>
                        <option value="VetementsEtChaussuresHommes">
                          Vêtements et chaussures hommes
                        </option>
                        <option value="BijouxEtAccessoires">
                          Bijoux et accessoires
                        </option>
                      </optgroup>
                      <optgroup label="Loisirs - hobbys">
                        <option value="Velos">Vélos</option>
                        <option value="LoisirsCreatifs">
                          Loisirs créatifs
                        </option>
                        <option value="PiecesAuto">Pièces auto</option>
                        <option value="SportsEtActivitesExterieures">
                          Sports et activités d’extérieures
                        </option>
                        <option value="JeuxVideo">Jeux vidéo</option>
                        <option value="LivresFilmsEtMusique">
                          Livres, films et musique
                        </option>
                        <option value="InstrumentsDeMusique">
                          Instruments de musique
                        </option>
                        <option value="AntiquiteEtObjetsDeCollection">
                          Antiquité et objets de collection
                        </option>
                      </optgroup>
                    </select>
                  </div>
                </div>
                </div>
              </div>
            </div>
            <div v-if="step === 2" class="Panel-Content" id="tab2">
              <div class="form">
                <div class="wrapper">
                  <input type="radio" name="select" id="option-1" />
                  <input type="radio" name="select" id="option-2" checked />
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
                      placeholder="Prix"
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
                      required="required"
                      v-model="campus"
                    >
                      <option value="Woluwe" @click="showSelect(1)">
                        Woluwe
                      </option>
                      <option value="Ixelles" @click="showSelect(2)">
                        Ixelles
                      </option>
                      <option value="Louvain" @click="showSelect(3)">
                        Louvain-La-Neuve
                      </option>
                    </select>
                  </div>
                  <div class="col-4" v-if="select === 1">
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
                      v-model="localisation1"
                    >
                      <option value="PlaceDeAlma3">Place de l'Alma, 3</option>
                      <option value="PromenadeDeAlma59">
                        Promenade de l'Alma, 59
                      </option>
                      <option value="ClosChapelleAuxChamps41">
                        Clos Chapelle-aux-Champs, 41
                      </option>
                      <option value="ClosChapelleAuxChamps43">
                        Clos Chapelle-aux-Champs, 43
                      </option>
                      <option value="AvenueEmmanuelMounier84">
                        Avenue Emmanuel Mounier, 84
                      </option>
                    </select>
                  </div>
                  <div class="col-4" v-if="select === 2">
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
                      v-model="localisation2"
                    >
                      <option value="ChausseeDeWavre249">
                        Chaussée de Wavre, 249
                      </option>
                      <option value="RueDeLimauge14">Rue de Limauge, 14</option>
                      <option value="RueArlon">
                        Rue d’Arlon, 3-5-11,4-6-14
                      </option>
                      <option value="RueTreves">
                        Rue de Trèves, 84 /Rue d’Arlon, 53
                      </option>
                    </select>
                  </div>
                  <div class="col-4" v-if="select === 3">
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
                      v-model="localisation3"
                    >
                      <option value="CheminDeLaBardane17">
                        Chemin de la Bardane, 17
                      </option>
                      <option value="VoieCardijn10">Voie Cardijn, 10</option>
                      <option value="RueDuTraiteDeRome1">
                        Rue du traité de Rome, 1
                      </option>
                      <option value="RuePaulinLadeuze14">
                        Rue Paulin Ladeuze, 14
                      </option>
                      <option value="RueDeUnionEuropeenne4">
                        Rue de l’Union européenne, 4
                      </option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div v-if="step === 3" class="Panel-Content" id="tab3">
            <div class="row text-center">
              <h1>Upload images</h1>
              <div class="dropbox">
                <input
                  type="file"
                  :name="imageArray"
                  :disabled="isSaving"
                  @change="handleImage"
                  @click="onUpload"
                  accept="image/*"
                  class="input-file"
                  multiple
                />
                <!-- filesChange($event.target.name, $event.target.files);
                    fileCount = $event.target.files.length; -->
                <p v-if="isInitial">
                  Drag your file(s) here to begin<br />
                  or click to browse
                </p>
                <p v-if="isSaving">Uploading {{ fileCount }} files...</p>
              </div>
            </div>
          </div>
          <div id="boutons">
            <div class="form-group mt-4">
              <button v-if="step > 1" @click="step -= 1" class="btn mb-2">
                <i class="fa fa-arrow-left"></i> &nbsp;Précédent
              </button>
            </div>
            <div class="form-group mt-4">
              <button class="btn mb-2" v-if="step < 3" @click="step += 1">
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
</template>

<script>
import { upload } from "./file-upload.service";
const STATUS_INITIAL = 0,
  STATUS_SAVING = 1,
  STATUS_SUCCESS = 2,
  STATUS_FAILED = 3;
export default {
  name: "CreateAd",
  components: {},

  data() {
    return {
      step: 1,
      select: 0,
      show: 0,
      uploadedFiles: [],
      uploadError: null,
      currentStatus: null,
      uploadFieldName: "",
      imageArrau: null,
      titre: "",
      categorie: "",
      description: "",
      prix: "",
      campus: "",
      localisation1: "",
      localisation2: "",
      localisation3: "",
      error: "",
    };
  },

  computed: {
    isInitial() {
      return this.currentStatus === STATUS_INITIAL;
    },
    isSaving() {
      return this.currentStatus === STATUS_SAVING;
    },
    isSuccess() {
      return this.currentStatus === STATUS_SUCCESS;
    },
    isFailed() {
      return this.currentStatus === STATUS_FAILED;
    },
  },
  methods: {
    async handleSubmit() {
      console.log(this.imageArray);
      try {
        await fetch("http://localhost:8000/createAd", {
          method: "POST",
          body: JSON.stringify({
            titre: this.titre,
            categorie: this.categorie,
            description: this.description,
            prix: this.prix,
            campus: this.campus,
            localisation1: this.localisation1,
            localisation2: this.localisation2,
            localisation3: this.localisation3,
            uploadedFiles: this.imageArray,
            uploadFieldName: this.uploadFieldName,
          }),
        });
        this.$router.push("/");
      } catch (e) {
        this.error = "Une erreur est survenue!";
      }
    },
    handleImage(event) {
      this.imageArray = event.target.files;
      console.log(this.imageArray);
     
    },

    activatePanel(stepIndex) {
      this.step = stepIndex;
    },
    showSelect(selectIndex) {
      this.select = selectIndex;
    },
    showPrice(showIndex) {
      this.show = showIndex;
    },
    addFiles() {
      this.$refs.files.click();
    },
    submitFiles() {
      let formData = new FormData();
      for (var i = 0; i < this.files.length; i++) {
        let file = this.files[i];

        formData.append("files[" + i + "]", file);
      }
    },

    handleFilesUpload() {
      let uploadedFiles = this.$refs.files.files;
      for (var i = 0; i < uploadedFiles.length; i++) {
        this.files.push(uploadedFiles[i]);
      }
    },
    removeFile(key) {
      this.files.splice(key, 1);
    },
    reset() {
      // reset form to initial state
      this.currentStatus = STATUS_INITIAL;
      this.uploadedFiles = [];
      this.uploadError = null;
    },
    save(formData) {
      // upload data to the server
      this.currentStatus = STATUS_SAVING;

      upload(formData)
        .then((x) => {
          this.uploadedFiles = [].concat(x);
          this.currentStatus = STATUS_SUCCESS;
        })
        .catch((err) => {
          this.uploadError = err.response;
          this.currentStatus = STATUS_FAILED;
        });
    },

    filesChange(fieldName, fileList) {
      // handle file changes
      const formData = new FormData();

      if (!fileList.length) return;

      // append the files to FormData
      Array.from(Array(fileList.length).keys()).map((x) => {
        formData.append(fieldName, fileList[x], fileList[x].name);
      });

      // save it
      this.save(formData);
    },
  },
  mounted() {
    this.reset();
  },
};
</script>

<style scoped src="../assets/css/createAd.css"></style>

