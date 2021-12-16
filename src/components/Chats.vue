<template>
<div id="body" v-if="user">
    <div id="body"> 
  
<div id="chat-circle" class="btn btn-raised">
        <div id="chat-overlay"></div>
       
 <i class="fa fa-newspaper-o fa-2x" style='left: 23px;position: absolute;' aria-hidden="true"><span id="notif" class="badge bg-secondary" style="border-radius: 165px;left: -22px; position: absolute;background-color: red !important;top: -48px;">New</span></i>
	</div>
  
  <div class="chat-box">
    <div class="chat-box-header">
      ChatBot
      <span class="chat-box-toggle"><i class="material-icons">close</i></span>
    </div>
    <div class="chat-box-body">
      <div class="chat-box-overlay">   
      </div>
      <chat-log></chat-log><!--chat-log -->
    </div>
    <div class="chat-input">      
      <form>
        <message-input v-if="moderator"></message-input>
      </form>      
    </div>
  </div>
  
</div>
</div>
</template>

        
<script>
  import ChatLog from '@/components/ChatLog';
  import MessageInput from '@/components/MessageInput';
  import PubNubVue from 'pubnub-vue';
  import {mapGetters} from 'vuex';
import $ from 'jquery'
  function fetchHistory(store){
    PubNubVue.getInstance().history(
        
        {
          channel: 'vueChat',
          count: 6, // how many items to fetch
          stringifiedTimeToken: true, // false is the default
        },
        
        function(status, response) {
           
          const msgs = response.messages;
        //   if(this.length!=count(msgs)){
        //       active();
        //   }
          console.log(msgs);
        
          // Iterate msgs array and save each element to history
          msgs.forEach(elem => {
            store.commit('addHistory', {history: [elem]});
          })
        }
      )   
  }

  export default {
    name: 'chat-container',
    components: {
      ChatLog,
     
      MessageInput,
    },
    data() { 
        let user=this.$store.getters.user
    return {
      user:user,
      moderator:"",
        title: 'Contact-Support',
        
      };
    },
   async mounted() {
        $("#chat-circle").click(function() {
        $("#chat-circle").toggle('scale');
        $(".chat-box").toggle('scale');
        })

        $(".chat-box-toggle").click(function() {
          $("#notif").hide();
        $("#chat-circle").toggle('scale');
        $(".chat-box").toggle('scale');

            
})
      // Subscribe to PubNub
      this.$pnSubscribe({
         channels: ['vueChat'],
      });
      this.$nextTick(fetchHistory(this.$store));
       await fetch(URL+"users/" + this.user.id, {
        method: "GET",
      }).then((response) => response.json())
            .then((response) => {
              console.log(response);
              this.moderator = response[0].fields.moderator;
            })
      try{
        await fetch(URL+"categories", {
          method: "GET"
        }).then(response => response.json()).then((response)=>{
                console.log(this.user)         
                console.log("The token")
                response.forEach(e=>e.fields["id"]=e.pk);
                this.categories=response.map(e=>e=e.fields)})
                }catch (e) {
                this.error = "Une erreur est survenue!";
      }
    },
    computed: {
    ...mapGetters({
      uuid: 'getMyUuid',
    }),
  },methods:{
      active(){
          $("#notif").show(2000);
          setTimeout(()=>$("#notif").hide(),2000)
          
      }
  }    
  };
</script>

<style scoped>
h1 {
  display: table-cell;
  vertical-align: middle;
  margin: 0;
  font-size: 16px;
  font-weight: normal;
}

.chat-container {
  display: table;
  max-width: 400px;
  min-width: 300px;
  width: 25%;
  height: 500px;
  margin: auto;
  background-color: #FFFFFF;
  border: solid 1px #BFBFBF;
  border-radius: 3px;
}

.heading {
  display: table;
  width: 100%;
  height: 28px;
  text-align: center;
  background-color: #CDCDCD;
  border-radius: 3px 3px 0 0;
  -ms-user-select: none;
  user-select: none;
  background: linear-gradient(#EDEDED 0%, #CDCDCD 75%);
}

.body {
  display: block;
  width: auto;
  height: inherit;
  overflow: hidden;
}

.table {
  display: table;
  width: 100%;
  height: 100%;
}
</style>
<style scoped src="../assets/css/chat.css"></style>
