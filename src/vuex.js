import Vue from'vue'
import Vuex from 'vuex'

Vue.use(Vuex);
import Vuelidate from 'vuelidate'
Vue.use(Vuelidate)

 const  state = {

    user:null
};

const store = new Vuex.Store({
    state,
    getters:{
        user:(state)=>{
            return state.user;
        },
        getUserId:(state)=>{
            return state.user.id;
        }
    },
    actions:{
        user(context ,user){
            context.commit('user',user);
        
        }
    },
    mutations:{
        user(state ,user){
            state.user =user;
        }
    }

});

export default store;