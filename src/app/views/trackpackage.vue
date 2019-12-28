<template>  
  <v-container grid-list-lg class="ma-0 pa-0">
    <v-card flat>            
      <v-card-text class="pa-0">
        <v-autocomplete outlined hide-no-data clearable rounded hide-details
          v-model="package_id"
          label="Package"
          :items="packages"
          item-text="code"
          item-value="code"
          @keyup="packageSearch"
          :loading="packageLoading"
          style="width:300px"
          class="mx-auto mb-4"
        >
          <template v-slot:item="data">
            <template v-if="typeof data.item !== 'object'">
              <v-list-item-content v-text="data.item"></v-list-item-content>
            </template>
            <template v-else>
              <v-list-item-content>
                <v-list-item-title v-html="data.item.code"></v-list-item-title>
                <v-list-item-subtitle><small>{{data.item.nodeFrom.name}} - {{data.item.nodeTo.name}}</small></v-list-item-subtitle>
              </v-list-item-content>
            </template>
          </template>
        </v-autocomplete>
        <template v-if="package_id && packages.find(x=>x.code==package_id)">        
          <v-card                                                
            outlined
            :set="s = packages.find(x=>x.code==package_id)"
          >
            <v-layout row>
              <v-flex xs12 md12>
                  <v-list-item three-line>
                  <v-list-item-avatar tile size="80" :color="getColor(s.product_id)">
                    <span class="white--text headline">{{s.product ? s.product.name :''}}</span>
                  </v-list-item-avatar>
                  
                  <v-list-item-content>
                    <div class="overline mb-1">{{s.code}} <br/> <v-chip small :color="s.status==1?'green':'orange'">{{s.status ==1?'delivered':'proses'}}</v-chip> </div>                    
                    <v-list-item-title class="headline mb-1">{{s.cnsg_name}}</v-list-item-title>
                    <v-list-item-subtitle class="caption">{{s.nodeFrom ? s.nodeFrom.name :''}} - {{s.nodeTo ? s.nodeTo.name: ''}}</v-list-item-subtitle>
                  </v-list-item-content>                             
                </v-list-item>        
              </v-flex>              
            </v-layout>                
          </v-card>                   
          <v-timeline dense style="margin-bottom:-16px; " :set="sampai = false">
            <v-timeline-item
              class="pb-2"
              v-for="(track, i) in tracking.tracks"
              :key="i"
              :color="'green'"
              small
            >
              <template v-slot:opposite>
                <!--<span :class="`headline font-weight-bold ${year.color}--text`">
                  {{$moment(track.end_time?track.end_time*1000:track.begin_time*1000)}}
                </span>-->
              </template>
              <div class="py-1" :set="sampai = track.proses == 5 ? true : false">
                <h3 :class="`sub-title font-weight-light mb-1 green--text`">
                  {{$moment(track.end_time?track.end_time*1000:track.begin_time*1000).format('ddd, DD MMM YYYY HH:mm')}}
                </h3>
                <div>
                  <span>{{ track.text }}</span>
                  <span v-if="track.office"><strong> {{track.office}}, </strong></span>
                  <span v-if="track.node"><strong> {{track.node}},  </strong></span>
                  <span v-if="track.place"><strong> {{track.place}}  </strong></span>
                </div>
              </div>
            </v-timeline-item>
            <v-timeline-item
              v-if="!sampai"
              class="pb-2"
              :color="'blue-grey'"
              small
            >
              <div class="py-5">
                <h2>soon...</h2>
              </div>
            </v-timeline-item>
          </v-timeline>              
        </template>
        <v-card v-else class="mx-auto" max-width="444" outlined> 
          <v-list-item three-line>
            <v-list-item-avatar tile size="80" color="grey">                    
            </v-list-item-avatar>
            <v-list-item-content>
              <v-list-item-title class="headline mb-1">No Package Selected</v-list-item-title>
              <v-list-item-subtitle>please search your package first</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>  
        </v-card>             
      </v-card-text>
      <v-card-text v-if="loading"  class="pa-0">
         <v-skeleton-loader
          ref="skeleton"
          type="list-item-avatar-three-line"
          class="mx-auto"
        ></v-skeleton-loader>
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
    apikey:{type:String, default:null}
  },
  data : () => ({  
    packages : [], packageLoading: false,
    package_id : null,
    tracking : {}, 
    center : {lat:-1.796497, lng:119.640654},
    place : null, loading : false,
  }),
  computed:{
    
  },
  watch:{
    package_id(newId){                  
      this.tracking = {};   
      if(newId){      
        this.loading = true;  
        model.trackPackage({resi:newId},{}, {Authorization: "Bearer " + this.apikey}).then(res=>{
          if(res.status === 200){
            Object.assign(this.tracking, res.data);
            this.packages.push(res.data.package);
            if(Array.isArray(this.tracking.tracks)){
              this.tracking.tracks.forEach(track=>{
                if(track.lat && track.lng){
                  this.place = {lat:parseFloat(track.lat), lng:parseFloat(track.lng)}                  
                }
              });
            }
          }
          this.loading = false;
        });
      }
    },
  },  
  mounted(){
    
  },
  methods: {

    packageSearch: debounce(function (e) { 
      this.packageLoading = true;     
      model.packages({q:e.target.value,expand:'nodeFrom,nodeTo,product',tracking:1}, {Authorization: "Bearer " + this.apikey}).then(res=>{
        this.packages = res.data;        
        if(this.packages[0] && this.packages[0].code === e.target.value){
          this.package_id = this.packages[0].code;                            
        }
        this.packageLoading = false;
      })
    }, 400),

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

.tb-normal{
  border-collapse: collapse;
}
.tb-normal td, .tb-normal th {
  border: 1px solid #ddd;
  padding: 4px 6px;
}
</style>