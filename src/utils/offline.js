export default class offline {  
    allOfflinePromise(entity, params = {}){
        return new Promise((resolve) => {
            resolve(this.allOffline(entity, params));                 
        });
    } 
    
    allOffline(entity, params = {}){
        let query = window.getApp.$store.getters['entities/'+entity+'/query']();
        for(var key in params){                
            query = query.where(key, params[key]);
        }
        return query.get();
        //return window.getApp.$store.getters['entities/'+entity+'/all']();
    }
    
    oneOfflinePromise(entity, params){
        return new Promise((resolve) => {
            resolve(this.oneOffline(entity, params));                 
        })
    }
    
    oneOffline(entity, params = {}){
        if(params.id){            
            return window.getApp.$store.getters['entities/'+entity+'/find'](params.id)            
        } else {                        
            let query = window.getApp.$store.getters['entities/'+entity+'/query']();
            for(var key in params){ 
                query = query.where(key, params[key]);
            }
            return query.first();
        }        
    }

        
    createOfflineTime(entity, body){        
        window.getApp.$store.dispatch('entities/'+entity+'/fetch', body.time);
        return window.getApp.$store.dispatch('entities/'+entity+'/insert', {data : body.data}).then(()=>{
            return {status: 200, data : window.getApp.$store.getters['entities/'+entity+'/query']().last()}
        });
    }
    
    createOffline(entity, data){           
        return window.getApp.$store.dispatch('entities/'+entity+'/insert', {data : data}).then(()=>{
            return {status: 200, data : window.getApp.$store.getters['entities/'+entity+'/query']().last()}
        });
    }
    
    createOrUpdateOfflineTime(entity, body){        
        window.getApp.$store.dispatch('entities/'+entity+'/fetch', body.time);
        return window.getApp.$store.dispatch('entities/'+entity+'/insertOrUpdate', {data : body.data}).then(()=>{
            return {status: 200, data : window.getApp.$store.getters['entities/'+entity+'/query']().last()}
        });
    }
    
    createOrUpdateOffline(entity, data){          
        return window.getApp.$store.dispatch('entities/'+entity+'/insertOrUpdate', {data : data}).then(()=>{
            return {status: 200, data : window.getApp.$store.getters['entities/'+entity+'/query']().last()}
        });
    }
    
    updateOffline(entity, data){        
        return window.getApp.$store.dispatch('entities/'+entity+'/update', {where: data.id, data : data}).then(()=>{                
            return {status: 200, data : window.getApp.$store.getters['entities/'+entity+'/find'](data.id)}
        });
    }
    
    updateOfflineTime(entity, body){        
        window.getApp.$store.dispatch('entities/'+entity+'/fetch', body.time);
        return window.getApp.$store.dispatch('entities/'+entity+'/update', {where: body.data.id, data : body.data}).then(()=>{                
            return {status: 200, data : window.getApp.$store.getters['entities/'+entity+'/find'](body.data.id)}
        });
    }
    
    deleteOffline(entity, data){
        if(data.flag == 'create' || data.flag == 'notif-create' || data.flag == 'permanen'){
            return this.deleteOfflinePermanen(entity, data);
        }        
        data.flag = 'delete';
        return window.getApp.$store.dispatch('entities/'+entity+'/update', {where: data.id, data : data}).then(()=>{                
            return {status: 200, data : window.getApp.$store.getters['entities/'+entity+'/find'](data.id)}
        });
    }      
    
    deleteOfflinePermanen(entity, data){
        return window.getApp.$store.dispatch('entities/'+entity+'/delete', {where: data.id}).then(()=>{                
            return {status: 200, data : null}
        });
    }
                
    maxOffline(entity, field){        
        return window.getApp.$store.getters['entities/'+entity+'/query']().max(field);
    }
}
