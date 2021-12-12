import Vue from'vue'
import Vuex from 'vuex'

Vue.use(Vuex);
import Vuelidate from 'vuelidate'
import createPersistedState from 'vuex-persistedstate'
Vue.use(Vuelidate)

 const  state = {

    user:null
};

const store = new Vuex.Store({
    plugins: [createPersistedState({
        storage: window.sessionStorage,
    })],
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