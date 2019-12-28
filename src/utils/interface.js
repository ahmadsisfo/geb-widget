/* Author: ahmadsisfo1@gmail.com */
import axios   from 'axios'
import tc      from '@/utils/thencatch'
import st      from '@/utils/localStorage'
import co      from '@/utils/cookies'
import config  from '@/app/config'

let client =  axios.create({baseURL: config.rest, withCredentials: false,
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',        
    }
});        

export const api = {
    post : function(r, body = {}, params = {}, header = {}){ 
        let headers = {Authorization: "Bearer " + this.key()};        
        if(config.android && config.android.status){
            headers = {...{AndroidOrigin : config.android.origin}, ...headers};
        }            
        Object.assign(headers, header); 
        
        const configuration = {
            params : params,
            headers: headers                
        };            
        return tc(client.post(r, body, configuration));
    },

    put : function(r, body = {}, params = {}, header = {}){                                   
        let headers = {Authorization: "Bearer " + this.key()};        
        if(config.android && config.android.status){
            headers = {...{AndroidOrigin : config.android.origin}, ...headers};
        }            
        Object.assign(headers, header); 
        
        const configuration = {
            params : params,
            headers: headers                
        };            
        return tc(client.put(r, body, configuration));
    },
    
    get : function(r, params = {}, header = {}){
        let headers = { Authorization: "Bearer " + this.key() };
        if(config.android && config.android.status){
            headers = {...{AndroidOrigin : config.android.origin}, ...headers};
        }  
        Object.assign(headers, header);        

        const configuration = {
            params : params,
            headers: headers
        };
        return tc(client.get(r, configuration));
    },

    delete : function(r, params = {}, header={}){
        let headers = { Authorization: "Bearer " + this.key()};
        if(config.android && config.android.status){
            headers = {...{AndroidOrigin : config.android.origin}, ...headers};
        }  
        Object.assign(headers, header);

        const configuration = {
            params : params,
            headers: headers
        };
        return tc(client.delete(r, configuration));
    },
    
    key : function(){
        var key = '';            
        if(co.get(config.prefix + 'key') !== null){
            key = co.get(config.prefix + 'key');
        } else if(st.get(config.prefix + 'key') !== null) {
            key = st.get(config.prefix + 'key');
        }            
        return key;
    },       

    setter : function(r){
        return {
            endpoint : config.rest + r,
            headers  : {Authorization: "Bearer " + this.key()}
        }
    },
}

export default {    
    biz4 : api
}
