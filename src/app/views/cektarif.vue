<template>  
  <v-container grid-list-lg class="ma-0 pa-0">
    <v-card flat>      
      <v-card-text  class="pa-0">
        <v-form @submit.prevent="onsubmit">
          <v-layout row>
            <v-flex xs6>
              <v-autocomplete hide-no-data hide-details clearable
                v-model="fm.node_from"
                placeholder="Asal"
                :items="nodesFrom"
                item-text="name"
                item-value="id"
                aria-autocomplete="off"
                @keyup="fmFrom"
                :loading="nodesFromLoading"
                :error="!!error.node_from.length"
                :error-messages="error.node_from"
                style="width:100%"
              >
                <template v-slot:item="data">                
                  <template>
                    <v-list-item-content>
                      <v-list-item-title v-html="data.item.name"></v-list-item-title>
                      <v-list-item-subtitle>{{data.item.parent_name}}</v-list-item-subtitle>
                    </v-list-item-content>
                  </template>
                </template>
              </v-autocomplete>   
            </v-flex>
            <v-flex xs6>  
              <v-autocomplete hide-no-data hide-details clearable
                v-model="fm.node_to"
                placeholder="Tujuan"
                :items="nodesTo"
                item-text="name"
                item-value="id"
                @keyup="fmTo"
                aria-autocomplete="off"
                :loading="nodesToLoading"
                :error="!!error.node_to.length"
                :error-messages="error.node_to"
                style="width:100%"
              >
                <template v-slot:item="data">
                  <template>
                    <v-list-item-content>
                      <v-list-item-title v-html="data.item.name"></v-list-item-title>
                      <v-list-item-subtitle>{{data.item.parent_name}}</v-list-item-subtitle>
                    </v-list-item-content>
                  </template>
                </template>
              </v-autocomplete>             
            </v-flex>
            <v-flex xs12>
              <v-btn type="submit" :color="color" :loading="loading" dark>cek tarif</v-btn>
            </v-flex>
            <v-flex xs12>                            
              <v-card outlined class="my-2" v-if="loading">  
                <v-skeleton-loader               
                  ref="skeleton"                
                  type="list-item-avatar-three-line"                
                  class="mx-auto"
                ></v-skeleton-loader>
              </v-card>
              <template v-else>
                <v-card outlined class="my-2" v-if="others.length <= 0">
                  <v-list-item three-line class="px-1" >
                    <v-list-item-avatar tile size="80" class="my-1 mr-2" color="grey">                                        
                    </v-list-item-avatar>
                    <v-list-item-content>
                      <v-list-item-title class="headline mb-1">No Data Result</v-list-item-title>
                      <v-list-item-subtitle>please filter your params</v-list-item-subtitle>
                    </v-list-item-content>
                  </v-list-item>                  
                </v-card>
                <template v-else>                                                           
                  <template v-for="(oth,i) in others">                
                    <v-card class="my-1" outlined :key="i">                    
                      <v-list-item class="px-1" :set="prod = products.find(x=>x.id===oth.product_id)">
                        <v-list-item-avatar tile size="60" style="min-width:220px" class="my-1 mr-2" :color="getColor(prod.id)">                    
                          <h3 class="white--text">{{prod.name}}</h3>
                        </v-list-item-avatar>
                        <v-list-item-content class="pa-0">
                          <v-list-item-title class="title text-right mb-1 pr-3">Rp{{ (oth.price) | currency }}</v-list-item-title>
                          <v-list-item-subtitle class="caption text-right pr-3">qty : {{'1' | currency}} {{prod.satuan}}</v-list-item-subtitle>
                        </v-list-item-content>
                      </v-list-item>  
                    </v-card>
                  </template>  
                </template>
              </template> 
            </v-flex>
          </v-layout>
        </v-form>  
      </v-card-text>
    </v-card>    
  </v-container>    
</template>

<script>
import { debounce } from 'lodash'
import Model from '@/app/models/Widget'
const  model = new Model();

export default {
  props: {
    apikey:{type:String, default:null},
    color:{type:String, default:'blue'}
  },
  data : () => ({    
    fm : {node_from:null, node_to:null, product_id:1, weight:1, length:null, width:null, height:null, amount:null},
    error : {node_from:[], node_to:[], product_id:[], weight:[], length:[], width:[], height:[], amount:[]},
    nodesFrom : [], nodesFromLoading:false,
    nodesTo : [], nodesToLoading:false,
    products : [],
    loading : false,
    others : [],
  }),
  computed:{
    
  },
  watch:{
    fm : {      
      handler : debounce(function (newObj) {         
        let p = newObj.length;
        let l = newObj.width;
        let t = newObj.height;
        let vol = parseFloat(p) * parseFloat(l) * parseFloat(t) / 6000;
        //newObj.weight = Number.isNaN(vol) ? newObj.weight : Math.round(vol);
        if(!Number.isNaN(vol)){
          newObj.weight = Number.isNaN(parseFloat(newObj.weight)) ? 1 : parseFloat(newObj.weight);
          newObj.weight = parseFloat(newObj.weight) < vol? Math.round(vol) : newObj.weight;   
        }                     
      }, 400), 
      deep:true
    },
  },  
  mounted(){
    model.products({},{Authorization: "Bearer " + this.apikey}).then(res=>{this.products = res.data});    
  },
  methods: {

    fmFrom: debounce(function (e) {  
      this.nodesFromLoading = true;
      model.nodes({q:e.target.value, tarif:1}, {Authorization: "Bearer " + this.apikey}).then(res=>{
        this.nodesFrom = res.data;
        this.nodesFromLoading = false;
      })          
    }, 400),

    fmTo : debounce(function (e) {
      this.nodesToLoading = true;
      model.nodes({q:e.target.value, tarif:1}, {Authorization: "Bearer " + this.apikey}).then(res=>{
        this.nodesTo = res.data;
        this.nodesToLoading = false;
      })
    }, 400),

    onsubmit(){
      this.loading = true; this.fm.amount = null; 
      for(var i in this.error){this.error[i] = [];}
      this.others = [];
      if(this.fm.node_from && this.fm.node_to){
        model.tarifs({node_from:this.fm.node_from,node_to:this.fm.node_to},{Authorization: "Bearer " + this.apikey}).then(res=>{          
          this.others  = [];
          if(Array.isArray(res.data)){
            this.others  = res.data;
          }          
          this.loading = false;
        });
      }      
    },

    responseSubmit(res){
      this.loading = false;
      if(res.status === 200){
        Object.assign(this.fm, res.data);        
      } 
    },

    getColor(id){
      let colors = ['cyan','light-green','purple','red','yellow','blue','red','green','teal','grey','pink','blue-grey'];
      return colors[parseInt(id)-1] ? colors[parseInt(id)-1] : 'blue-grey';
    }
  },
}
</script>

<style>
.ramping td, .ramping th {
    padding: 0 5px;
}
.v-text-field > .v-input__control > .v-input__slot:before {
    border-style: none;
    border-top-style: none;
    border-right-style: none;
    border-bottom-style: none;
    border-left-style: none;
    border-width: thin 0 0 0;
    border-top-width: thin;
    border-right-width: 0px;
    border-bottom-width: 0px;
    border-left-width: 0px;
}
.v-text-field > .v-input__control > .v-input__slot:after {
    border-color: currentColor;
    border-top-color: currentcolor;
    border-right-color: currentcolor;
    border-bottom-color: currentcolor;
    border-left-color: currentcolor;
    border-style: none;
    border-top-style: none;
    border-right-style: none;
    border-bottom-style: none;
    border-left-style: none;
    border-width: thin 0 thin 0;
    border-top-width: thin;
    border-right-width: 0px;
    border-bottom-width: thin;
    border-left-width: 0px;
    -webkit-transform: scaleX(0);
    transform: scaleX(0);
}
.v-input__append-inner{
  display:none !important;
}
</style>