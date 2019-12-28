/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
import Model    from '@/utils/models';
//import config   from '@/config'

export default class Settings extends Model { 
                
    entity  = 'settings';    
    
    vuex    =  true;
    
    add(data = {}){
        var id      = data.id ? data.id : null;
        var key     = data.key ? data.key : '';
        var value   = data.value ? data.value : '';       
        var title   = data.title ? data.title : '';
        var content = data.content ? data.content : '';
        var icon    = data.icon ? data.icon : '';
        var color   = data.color ? data.color : '';
        var time    = moment().valueOf();                       
        let setting = {id:id,title:title,content:content,icon:icon,color:color,time:time,key:key,value:value};        
        this.createOrUpdateOffline(this.entity, setting);        
        /*this.allOfflinePromise('notifications').then(res => {
            console.log(res);
        });*/                       
    }
    
    clear(id){
        this.deleteOfflinePermanen(this.entity, {id : id});        
    }
   
    value (key){
        /*for(var i in config){
            if(config[i].key == key && config[i].secure){
                return config[i].value;
            }
        }*/
        
        let data    = this.oneOffline(this.entity, {key: key});
        return data ? data.value: null;
    }
    
    key(key){
        /*for(var i in config){
            if(config[i].key == key && config[i].secure){
                return config[i];
            }
        }*/
        
        let data    = this.oneOffline(this.entity, {key: key});               
        return data ? data : null;
    }
}