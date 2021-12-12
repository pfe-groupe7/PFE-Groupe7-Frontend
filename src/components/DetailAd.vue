<template>

 <div class="wrapper wrapper--w820">
            <div class="card card-1">
                <div class="card-heading">
                    <h2 class="title mb-4 pb-3">Details de l'Annonce</h2>
                </div>
                <div class="card-body">
                    <form class="wizard-container" method="POST" action="#" id="js-wizard-form">
                        <ul class="tab-list">
                            <li class="tab-list__item">
                                <a class="tab-list__link" href="#tab2" data-toggle="tab">
                                    <span class="step">1</span>
                                    <span class="desc">Détails</span>
                                </a>
                            </li>
                            
                        </ul>
                        <div class="tab-content">
                            <div class="tab-pane active" id="tab1">
                                <div class="form">
                                  <div class="row align-items-center">

                                    <div class=" col-4">
                                        <input class="input--style-1" type="text" name="username" placeholder="Titre de l'annonce" required="required">
                                    </div>
                                    <div class=" col-3">
                                      <select name="subject" id="subject" class="form-style"  required="required">
                                        <option value="" disabled selected>Catégorie</option>
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
                                        <textarea class="input--style-1" type="text" name="username" placeholder="Description de l'objet" required="required" rows="1"></textarea>
                                    </div>
                                  <div class="form-group mt-4">
                                    
                                    <a class="btn mb-2" href="#">Suivant &nbsp;<i class="fa fa-arrow-right"></i></a>
                                </div>
                                </div>
                            </div>
                            <div class="tab-pane" id="tab2">
                                <div class="form">
                                    <div class="input-group">
                                        <input class="input--style-1" type="email" name="email" placeholder="ex: example@email.com" required="required">
                                        <a class="btn--next" href="#">Suivant</a>
                                    </div>
                                </div>
                            </div>
                            
                            <div class="tab-pane" id="tab4">
                                <div class="form">
                                    <div class="input-group">
                                        <input class="input--style-1" type="password" name="re_password" placeholder="Password" required="required">
                                        <a class="btn--next" href="#">Confirmer</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
                        </div>

</template>



<style scoped src="../assets/css/createAd.css"></style>

