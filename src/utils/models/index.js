/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
import moment from 'moment';
import fc     from '@/utils/interface';
import off    from '@/utils/offline';


export default class Model extends off {                 
        
    api     = fc.biz4;    
    backend = '*';
    entity  = '*';
    route   = '';
    vuex    = false;              
    
    constructor(){        
        super();
    }
    
    store(){
        return window.getApp.$store;
    }
    
    state(){
        return this.store().state;
    }
    
    isOnline(){
        //return true;
        return window.navigator.onLine;
    }
    
    all(params = {}){                        
        return this.vuex ? this.allOfflinePromise(this.entity, params) : this.allOnline(params);
    }    
    
    one(params = {}){
        return this.vuex ? this.oneOfflinePromise(this.entity, params) : this.oneOnline(params);   
    }
    
    create(data, params={}){
        data.flag = 'create';
        return this.vuex ? this.createOffline(this.entity, data) : this.createOnline(data, params);                 
    }       
    
    update(data, params={}){
        data.flag = data.flag == 'create' || data.flag == 'notif-create' ? 'create' : 'update';        
        return this.vuex ? this.updateOffline(this.entity, data) : this.updateOnline(data, params);                 
    }
    
    delete(data, params={}){        
        return this.vuex ? this.deleteOffline(this.entity, data) : this.deleteOnline(data, params);         
    }

    view(params = {}){
        return this.api.get(this.backend + 'view', params).then(res =>{
            return res.status === 200? res.data : {};
        })
    }
                                           
    allOnline(params = {}){
        return this.api.get(this.backend + 'index', params).then(res => {
            return res.status === 200 ? res.data : [];
        });
    }
    
    oneOnline(params = {}){
        return this.api.get(this.backend + 'findbyid', params).then(res =>{
            return res.status === 200? res.data : [];
        })
    }
    
    createOnline(data, params={}){
        return this.api.post(this.backend + 'create', data, params);
    }
    
    updateOnline(data, params={}){
        return this.api.put(this.backend + 'update', data, params);        
    }
    
    deleteOnline(data, params={}){
        return this.api.delete(this.backend + 'delete', data, params);        
    }
    
    saveNotif(id, title=null, content=null, ref=null, icon=null, color=null){         
        title   = title ? title : 'Error Detected';
        content = content ? content : '';
        icon    = icon ? icon : 'fa-refresh';
        color   = color ? color : 'red';
        var time    = moment().valueOf();                       
        let notifikasi = {id:id,title:title,content:content,icon:icon,color:color,time:time,ref:ref};        
        this.createOrUpdateOffline('notifications', notifikasi);                                      
    }
    
    clearNotif(id){
        this.deleteOfflinePermanen('notifications', {id : id});        
    }        

}