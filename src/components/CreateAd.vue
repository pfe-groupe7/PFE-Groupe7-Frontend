<template>

 <div class="wrapper wrapper--w820">
            <div class="card card-1">
                <div class="card-heading">
                    <h2 class="title mb-4 pb-3">Ajoutez votre annonce</h2>
                </div>
                <div class="card-body">
                    <form class="wizard-container" method="POST" action="#" id="js-wizard-form">
                        <ul class="tab-list">
                            <li class="tab-list__item active">
                                <button class="tab-list__link" href="#tab1" data-toggle="tab" @click="activatePanel(1)">
                                      <v-stepper-content step="1">
                                    <span class="step">1</span>
                                    <span class="desc">Informations</span>
                                    </v-stepper-content>
                                </button>
                            </li>
                            <li class="tab-list__item" >
                                <button class="tab-list__link" href="#tab2" data-toggle="tab" @click="activatePanel(2)">
                                    <v-stepper-content step="2">

                                    <span class="step">2</span>
                                    <span class="desc">Détails</span>
                                    </v-stepper-content>
                                </button>
                            </li>
                            <li class="tab-list__item" >
                                <button class="tab-list__link" href="#tab3" data-toggle="tab" @click="activatePanel(3)">
                                    <v-stepper-content step="3">

                                    <span class="step">3</span>
                                    <span class="desc">Photos</span>
                                    </v-stepper-content>
                                </button>
                            </li>
                            
                        </ul>
                        <div class="tab-content" >
                            <div v-if="step === 1" class="Panel-Content" id="tab1" >
                                <div class="form" >
                                  <div class="row align-items-center">

                                    <div class=" col-4">
                                        <input class="input--style-1" type="text" v-model="titre" placeholder="Titre de l'annonce" required="required">
                                    </div>
                                    <div class=" col-4" style="margin-bottom: 30px;">
                                        <label class="form-label" style="margin-left: 5px;margin-bottom:5px; font-size:19px;">Catégorie</label>
                                      <select data-placeholder="Catégorie" name="categorie" id="subject" class="form-style"  required v-model="categorie">
                                        <option selected disabled>Catégorie</option>
                                        <optgroup label="Maisons et jardin">
                                          <option value="1">Outils</option>
                                          <option value="2">Meubles</option>
                                          <option value="3">Pour la maison</option>
                                          <option value="4">Jardin</option>
                                          <option value="5">Electroménager</option>
                                          </optgroup>
                                        <optgroup label="Famille">
                                          <option value="1">Santé et beauté</option>
                                          <option value="2">Fournitures pour animaux</option>
                                          <option value="3">Puériculture et enfants</option>
                                          <option value="4">Jouets et jeux</option>
                                        </optgroup>
                                        <optgroup label="Vêtements et accessoires">
                                          <option value="1">Sacs et bagages</option>
                                          <option value="2">Vêtements et chaussures femmes</option>
                                          <option value="3">Vêtements et chaussures hommes</option>
                                          <option value="4">Bijoux et accessoires</option>
                                        </optgroup>
                                        <optgroup label="Loisirs - hobbys">
                                          <option value="1">Vélos</option>
                                          <option value="2">Loisirs créatifs</option>
                                          <option value="3">Pièces auto</option>
                                          <option value="4">Sports et activités d’extérieures</option>
                                          <option value="4">Jeux vidéo</option>
                                          <option value="4">Livres, films et musique</option>
                                          <option value="4">Instruments de musique</option>
                                          <option value="4">Antiquité et objets de collection</option>
                                        </optgroup>
                                      </select>
                                    </div>
                                    </div>
                                    <div class="input-group">
                                        <textarea class="input--style-1" type="text" name="description" v-model="description" placeholder="Description de l'objet" required="required" rows="1"></textarea>
                                    </div>
                               
                            </div>
                            </div>
                            <div v-if="step === 2" class="Panel-Content" id="tab2" >
                                <div class="form" >

                                <div class="wrapper">
                                    <input type="radio" name="select" id="option-1">
                                    <input type="radio" name="select" id="option-2" checked>
                                    <label for="option-1" class="option option-1"  @click="showPrice(1)">
                                        <div class="dot"></div>
                                        <span>A vendre</span>
                                        </label>
                                    <label for="option-2" @click="showPrice(0)" class="option option-2">
                                        <div class="dot"></div>
                                        <span>A donner</span>
                                    </label>
                                </div>
                                <div id="prix" class="row align-items-center" v-if="show===1">
                                    <div class=" col-3">
                                        <input class="input--style-1" type="number" v-model="prix" placeholder="Prix" required="required" >
                                    </div>
                                </div>

                                </div>
                                <div class="form" >
                                  <div class="row align-items-center">
                                    <div class=" col-4" >
                                        <label class="form-label" style="margin-left: 5px; font-size:19px;">Campus</label>
                                            <select name="campus" id="subject" class="form-style" required="required" v-model="campus">
                                                <option value="1" @click="showSelect(1)">Woluwe</option>
                                                <option value="2" @click="showSelect(2)">Ixelles</option>
                                                <option value="3" @click="showSelect(3)">Louvain-La-Neuve</option>
                                            </select>         
                                    </div>
                                    <div class=" col-4" v-if="select===1">
                                        <label class="form-label" style="margin-left: 5px; font-size:19px;">Localisation</label>
                                            <select name="campus" id="subject" class="form-style" required="required" v-model="localisation">
                                                <option value="1" >Place de l'Alma, 3 </option>
                                                <option value="2"> Promenade de l'Alma, 59 </option>
                                                <option value="3" >Clos Chapelle-aux-Champs, 41 </option>
                                                <option value="4" >Clos Chapelle-aux-Champs, 43 </option>
                                                <option value="5">Avenue Emmanuel Mounier, 84</option>
                                            </select>         
                                    </div>
                                    <div class=" col-4" v-if="select===2">
                                        <label class="form-label" style="margin-left: 5px; font-size:19px;">Localisation</label>
                                            <select name="campus" id="subject" class="form-style" required="required" v-model="localisation">
                                                <option value="1" > Chaussée de Wavre, 249  </option>
                                                <option value="2">  Rue de Limauge, 14  </option>
                                                <option value="3" > Rue d’Arlon, 3-5-11,4-6-14 </option>
                                                <option value="4" > Rue de Trèves, 84 /Rue d’Arlon, 53  </option>
                                            </select>         
                                    </div>
                                    <div class=" col-4" v-if="select===3">
                                        <label class="form-label" style="margin-left: 5px; font-size:19px;">Localisation</label>
                                            <select name="campus" id="subject" class="form-style" required="required" v-model="localisation">
                                                <option value="1" > Chemin de la Bardane, 17 </option>
                                                <option value="2">  Voie Cardijn, 10 </option>
                                                <option value="3" > Rue du traité de Rome, 1 </option>
                                                <option value="4" > Rue Paulin Ladeuze, 14  </option>
                                                <option value="5"> Rue de l’Union européenne, 4 </option>
                                            </select>         
                                    </div>
                                </div>
                                

                            </div>
                            </div>

                            </div>

                            <div v-if="step === 3" class="Panel-Content" id="tab3" >
                                <div class="row text-center">

                                </div>

                            </div>
                        <div id="boutons">
                            <div class="form-group mt-4">
                                <button v-if="step > 1" @click="step-=1" class="btn mb-2" ><i class="fa fa-arrow-left"></i> &nbsp;Précédent</button>
                            </div>
                            <div class="form-group mt-4">
                                <button class="btn mb-2" v-if="step < 3" @click="step+=1" >Suivant &nbsp;<i class="fa fa-arrow-right"></i></button>
                            </div>
                            <div class="form-group mt-4">
                                <button class="btn mb-2" v-if="step===3" @click="submit" >Envoyer &nbsp;<i class="fa fa-check"></i></button>
                            </div>
                        </div>
                        
                    </form>
                </div>
            </div>
        </div>

</template>

<script>
export default {
    data () {
        return {
            step : 1,
            select : 0,
            show : 0
        }
    },methods : {
        activatePanel(stepIndex){
            this.step = stepIndex
        },
        showSelect(selectIndex){
            this.select = selectIndex
        },
        showPrice(showIndex){
            this.show = showIndex
        }
        
    }
    
    

}
</script>

<style scoped src="../assets/css/createAd.css"></style>

