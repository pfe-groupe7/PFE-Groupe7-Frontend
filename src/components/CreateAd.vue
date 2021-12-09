<template>
  <div class="text-wizard">
      <h2 class="section-header">Ajoutez votre annonce</h2>
    <form-wizard @onComplete="onSubmit">
    <tab-content title="Informations" :selected="true">
      <div class="row">
        <div class="form-group col-6">
          <label for="fullName">Titre</label>
          <input type="text" class="form-control" placeholder="" v-model="titre" required>
        </div>
        <div class="form-group col-6">
          <label for="fullName">Catégorie</label>
          <select class="form-control" v-model="categorie" required>
          <option>Maisons et Jardin</option>
          <option>Famille</option>
          <option>Vêtements et accessoires</option>
          <option>Loisirs - hobbys</option>
          <option>Electronique</option>

        </select>
        </div>
      </div>

      <div class="form-group mt-3">
        <label for="fullName">Description</label>
        <textarea name="description" class="form-control" rows="2" placeholder="" v-model="description" required></textarea>
      </div>
    </tab-content>
    <tab-content title="About your Company">
      <div class="form-group">
        <label for="companyName">Your Company Name</label>
        <input
          type="text"
          class="form-control"
          placeholder="Enter your Company / Organization name"
          v-model="companyName"
        >
      </div>
    </tab-content>
    <tab-content title="Finishing Up">
      <div class="form-group">
        <label for="referral">From Where did you hear about us</label>
        <select class="form-control" v-model="referral">
          <option>Newspaper</option>
          <option>Online Ad</option>
          <option>Friend</option>
          <option>Other</option>
        </select>
      </div>
    </tab-content>
  </form-wizard>
</div>
</template>

<script>
import { FormWizard, TabContent } from "vue-step-wizard";
import "vue-step-wizard/dist/vue-step-wizard.css";
export default {
  name: "CreateAd",
  components: {
    FormWizard,
    TabContent
  },
  data() {
    return {
      titre: "",
      description: "",
      categorie: "",
      prix: "",
      lieux:"",
      photos:"",
    };
  }, 
  props : {
    title : {
      type: String,
    default: 'Awesome Wizard'
        }
  }
};
</script>


<style scoped src="../assets/css/createAd.css"></style>