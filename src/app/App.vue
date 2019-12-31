<template>
  <div class="v-application v-application--is-ltr" id="app" data-app="true">    
    <v-layout row style="margin-right:0px; margin-left:0px;">
      <v-flex xs12 v-if="cektarif"><cek-tarif :apikey="apikey" :color="color" class="mb-3" /></v-flex>
      <v-flex xs12 v-if="tracking"><track-package :apikey="apikey"  :color="color" /></v-flex>      
    </v-layout> 
  </div>
</template>

<script>
import CekTarif      from './views/cektarif'
import TrackPackage  from './views/trackpackage'

export default {
  name: 'App',
  components:{
    CekTarif, TrackPackage
  },  
  props:{
    cektarif : {type:Boolean, default:true},
    tracking : {type:Boolean, default:true},
    apikey : {type:String, default:null},
    color : {type:String, default:'blue'}
  },
  data: () => ({
    //
  }),
  created () {
    window.getApp = this;
  }
};
</script>
