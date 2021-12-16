<template>
<iframe width="350px" height="400px" frameborder="0" target="_parent" scrolling="no" marginheight="0" marginwidth="10" :src="srcMap"></iframe>


</template>

<script>
 import maps from './maps.js'

export default {
  name: 'Map',
  data() {
    return {
      srcMap:"",

    }
  },created(){
       this.srcMap=maps[this.$attrs.srcMap]
    
  },
  mounted() {
      
    console.log(this.$attrs.srcMap)
    console.log(this.srcMap)
  },
  
};
</script>