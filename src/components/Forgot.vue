<template>
<div class="section">
      <div class="container">
      <div class="row full-height justify-content-center">
        <div class="col-12 text-center align-self-center">
          <div class="section pb-5 pt-sm-2 text-center ">
            <div class="card-3d-wrap mx-auto">
              <div class="card-3d-wrapper">
                <div class="card-front">
                  <div class="center-wrap">
                    <div class="section text-center">
                        <form @submit.prevent="handleSubmit">
                          <div v-if="message" class="alert alert-success" role="alert">
                            {{ message }}
                          </div>
                          <error v-if="error" :error="error" />
                          <h4 class="mb-4 pb-4">Mot de passe oublié</h4>
                          <div class="form-group">
                            <label class="pb-4 mt-4">Entrez votre adresse mail</label>
                            <input
                              type="email"
                              class="form-control"
                              v-model="email"
                              placeholder="Email"
                            />
                          </div>
                          <div class="form-group mt-4">
                              <input class="btn mt-4" type="submit" value="Envoyer">
                            </div>
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
</div>
</template>



<script>
import axios from "axios";
import Error from "./Error.vue";

export default {
  name: "Forgot",
  components: {
    Error,
  },
  data() {
    return {
      email: "",
      message: "",
      error: "",
    };
  },
  methods: {
    async handleSubmit() {
      try {
        await axios.post("forgot", {
          email: this.email,
        });
        this.message = "L'email a été envoyé";
        this.error = '';
      } catch (e) {
        this.error = "Une erreur est servenue!";
        this.message = '';
      }
    },
  },
};
</script>
<style scoped src="../assets/css/login.css"></style>