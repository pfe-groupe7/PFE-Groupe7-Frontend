<template>
    <div class="container rounded bg-white mt-5 mb-5">
    <div class="row">
        <div class="col-md-3 border-right">
            <div class="d-flex flex-column align-items-center text-center p-3 py-5"><img class="rounded-circle mt-5" width="150px" src="https://thumbs.dreamstime.com/b/default-avatar-profile-icon-vector-social-media-user-portrait-176256935.jpg"></div>
        </div>
        <div class="col-md-5 border">
            <form>
            <div class="p-3 py-5">
                <div class="d-flex  justify-content-between align-items-center mb-3">
                    <h4 class="text-right border rounded p-2">Mon Profil</h4>
                </div>
                <div class="row mt-2">
                    <div class="col-md-6"><label class="labels">Nom</label><input type="text" v-model="nom" class="form-control"   readonly></div>
                    <div class="col-md-6"><label class="labels">Prénom</label><input type="text" v-model="prenom" class="form-control"  readonly ></div>
                </div>
                <div class="row mt-3">
                    <div class="col-md-12"><label class="labels">Email</label><input type="text" v-model="email" class="form-control"   readonly></div>
                    <div class="col-md-12"><label class="labels">Compus</label>
                        <select class="form-select" aria-label="Default select example">
                        <option selected>{{campus}}</option>
                        <option value="1">Woluwe</option>
                        <option value="2">Ixelles</option>
                        <option value="3">Louvain-La-Neuve</option>
                        </select>     
                    </div>
                </div>
                <div class="row mt-3">
                    <div class="col-md-6 "><label class="labels">Mot de passe</label><input id="password" type="password"  class="form-control"   v-model="password"></div>
                    <div class="col-md-6"><label class="labels">Retaper le Mot de passe</label><input type="password" v-model="confirmed_password"  class="form-control" ></div>
                </div>
                <div class="row mt-5">
                <div class="col-md-6 mt-5 text-center"><button v-on:click="deleteUser" class="btn btn-danger profile-button" type="button">Supprimer mon compte</button></div>
                <div class="col-md-6 mt-5 text-center"><button v-on:click="handleSubmit" class="btn btn-primary profile-button" type="button">Enregistrer</button></div>
                </div>
                <div v-show="notif" class="row mt-3">
                    <div class="col-md-6 Message Message--green">
                        <div class="Message-icon">
                            <i class="fa fa-check"></i>
                        </div>
                        <div class="Message-body">
                            <p>votre porfil été bien modifié</p>
                        </div>
                    </div>
                </div>
                 <div v-show="notifDel" class="row mt-3">
                    <div class="col-md-6 Message Message--orange">
                            <div class="Message-icon">
                            <i class="fa fa-exclamation"></i>
                            </div>
                            <div class="Message-body">
                            <p>{{message}} </p>
                            </div>

                        </div>
                </div>
            </div>
            </form>
        </div>
       
    </div>
</div>
</template>
<script>
export default {
  name: "Profile",

  components: {},
   data() {  
       this.$store.dispatch("user",  {
      "nom": "Arto",
      "prenom": "Hellas",
      "id": 1,
      "compus": "test",
      "email": "a@gamil.com"
    });
       console.log(this.$store.getters.getUserId)
    return {
      notif:false,
      notifDel:false,
      prenom: "",
      nom: "",
      email:"",
      password: "",
      campus: "",
      message:"",
      confirmed_password:""
    }
  },  async mounted() {
      let id=this.$store.getters.getUserId;
            try {
        await fetch("http://localhost:8000/users/"+id, {
          method: "GET"
        }).then(response => response.json()).then((response)=>{
            
      this.prenom= response.prenom;
      this.nom= response.nom;
      this.email=response.email;
      this.password= response.password;
      this.confirmed_password=response.password;
      this.campus=response.compus;
   
        });
      } catch (e) {
        this.error = "Une erreur est survenue!";
      }
        },
  methods: {
    async handleSubmit() {
      try {
          if(this.password!==this.confirmed_password){
              this.message='Les mots de passe que vous avez entrés ne sont pas identiques.'
              this.notifDel=true;
              setTimeout(() => this.notifDel = false, 3000);
              return;
          }
        await fetch("http://localhost:8000/profile", {
          method: "POST",
          body: JSON.stringify({
            email:this.email,
            password: this.password,
            compus: this.compus,
          }),
        }).then(()=>{
             this.notif = true;
             
        setTimeout(() => this.notif = false, 3000);
        });
       
      } catch (e) {
        this.error = "Une erreur est survenue!";
      }
    },
    async deleteUser()
    {
         try {
        await fetch("http://localhost:8000/users/delete", {
          method: "POST",
          body: JSON.stringify({
            email:this.email
            
          }),
        }).then(response => response.json()).then(()=>{
            this.message = "votre compte a  été bien suprrimé ";
            this.notifDel=true;
            localStorage.removeItem('token');
            this.$store.dispatch('user',null);
            setTimeout(() => this.$router.push("/"),2000);
            
        });
        
      } catch (e) {
        this.error = "Une erreur est survenue!";
      }
    }
  },
};

</script>
<style scoped src="../assets/css/profil.css"></style>