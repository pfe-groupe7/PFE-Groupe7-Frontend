<template>
	<div class="container">
		<div class="card card-1 mt-5">
			<form>
				<div class="p-3 py-5">
					<div>
						<div class="d-flex justify-content-between align-items-center mb-3">
							<h4 class="text-right p-2">Mon profil</h4> </div>
						<div class="row mt-2">
							<div class="col-md-6">
								<label class="labels">Nom</label>
								<input type="text" v-model="nom" class="form-control" readonly/> </div>
							<div class="col-md-6">
								<label class="labels">Prénom</label>
								<input type="text" v-model="prenom" class="form-control" readonly/> </div>
						</div>
						<div class="row mt-3">
							<div class="col-md-12">
								<label class="labels">Email</label>
								<input type="text" v-model="email" class="form-control" readonly/> 
							</div>
							<div v-if="idUserConnected==idUserProfil">
								<div class="col-md-12 mt-3">
									<label class="labels">Campus</label>
									<select class="form-select"  v-model="campus" aria-label="Default select example">
										<option selected>{{ campus }}</option>
										<option value="Woluwe">Woluwe</option>
										<option value="Ixelles">Ixelles</option>
										<option value="Louvain-La-Neuve">Louvain-La-Neuve</option>
									</select>
								</div>
								<div class="row mt-3">
									<div class="col-md-6">
										<label class="labels">Mot de passe</label>
										<input id="password" type="password" class="form-control" v-model="password" /> </div>
									<div class="col-md-6">
										<label class="labels">Confirmer le mot de passe</label>
										<input type="password" v-model="confirmed_password" class="form-control" /> </div>
								</div>
								<div class="row mt-4">
									<div class="col-md-5 mt-5 text-center">
										<button v-on:click="deleteUser" class="btn btn-danger profile-button" type="button"> Supprimer mon compte </button>
									</div>
									<div class="col-md-6 mt-5 text-center">
										<button v-on:click="handleSubmit" class="btnSave" type="button">Enregistrer les modifications</button>
									</div>
								</div>
							</div>
					<div v-if="idUserConnected!=idUserProfil">		
							<div class="col-md-6 mt-3 text-center" >
								<button v-on:click="voirAnnonces" class="btn btnSave profile-button" type="button"> Voir les annonces </button>
							</div>
							<div class="col-md-6 mt-3 text-center" >
								<button v-on:click="contacterVendeur" class="btnSave" type="button"> Contacter vendeur </button>
							</div>
					
							<div class="col-md-6 mt-3 text-center" v-if="moderator">
								<button v-on:click="deleteUser" class="btn-danger" type="button"> Bannir ce vendeur </button>
							</div>
							
					</div>	
						
						</div>
						<div v-show="notif" class="row mt-3">
							<div class="col-md-6 Message Message--green">
								<div class="Message-icon"> <i class="fa fa-check"></i> </div>
								<div class="Message-body">
									<p> Votre profil a bien été modifié </p>
								</div>
							</div>
						</div>
						<div v-show="notifDel" class="row mt-3">
							<div class="col-md-6 Message Message--orange">
								<div class="Message-icon"> <i class="fa fa-exclamation"></i> </div>
								<div class="Message-body">
									<p> {{ message }} </p>
								</div>
							</div>
						</div>
					</div>
				</div>
			</form>
		</div>
	</div>
</template>
<script>
// import { mapGetters } from "vuex";
export default {
  name: "Profile",

  components: {},
  data() {
    console.log(this.$store.getters.getUserId);
    return {
      notif: false,
      notifDel: false,
      prenom: "",
      nom: "",
      email: "",
      password: "",
      campus: "",
      message: "",
      confirmed_password: "",
      user: "",
      moderator: "",
      idUserProfil:"",
	idUserConnected:"",};
  },
  async mounted() {
    // console.log(this.$store.getters.getUserId)
    this.idUserConnected = localStorage.getItem("user");
    let id = this.$route.params.id;
    this.idUserProfil = id;
    // this.user =localStorage.getItem("user");

    console.log(id);
    console.log(localStorage.getItem("user"));
    try {
      await fetch("http://localhost:8000/users/" + this.idUserConnected, {
        method: "GET",
      }).then((response) => response.json())
            .then((response) => {
              console.log(response);
              this.moderator = response[0].fields.moderator;
            })
       
        .then(async () => {
          await fetch("http://localhost:8000/users/" +id, {
            method: "GET",
          }) .then((response) => response.json())
        .then((response) => {
          console.log(response);

          this.prenom = response[0].fields.firstname;
          this.nom = response[0].fields.lastname;
          this.email = response[0].fields.email;
          this.password = response[0].fields.password;
          this.confirmed_password = response[0].fields.password;
          this.campus = response[0].campusName;console.log(this);})
            
        });
    } catch (e) {
      this.error = "Une erreur est survenue!";
    }
  },
  methods: {
	contacterVendeur(){},
voirAnnonces(){
	this.$router.push('/userAds/'+this.idUserProfil)
},
    async handleSubmit() {
      try {
        if (this.password !== this.confirmed_password) {
          this.message =
            "Les mots de passe que vous avez entrés ne sont pas identiques.";
          this.notifDel = true;
          setTimeout(() => (this.notifDel = false), 3000);
          return;
        }
        await fetch("http://localhost:8000/users/update/"+this.idUserProfil, {
          method: "PUT",
          body: JSON.stringify({
            email: this.email,
            password: this.password,
            campus: this.campus,
          }),
        }).then(() => {
          this.notif = true;

          setTimeout(() => (this.notif = false), 3000);
        });
      } catch (e) {
        this.error = "Une erreur est survenue!";
      }
    },
    async deleteUser() {
      if (
        this.$confirm(
          "Êtes-vous sûr de vouloir supprimer votre compte ?",
          "Supprimer votre compte",
          "error"
        )
      ) {
        try {
          await fetch("http://localhost:8000/users/delete/"+this.idUserProfil, {
            method: "DELETE",
            body: JSON.stringify({
              email: this.email,
            }),
          })
            .then((response) => response.json())
            .then(() => {
              this.message = "Votre compte a  été bien suprrimé ";
              this.notifDel = true;
              localStorage.removeItem("token");
              this.$store.dispatch("user", null);
              setTimeout(() => this.$router.push("/"), 2000);
            });
        } catch (e) {
          this.error = "Une erreur est survenue!";
        }
      }
    },
  },
};
</script>
<style scoped src="../assets/css/profil.css"></style>