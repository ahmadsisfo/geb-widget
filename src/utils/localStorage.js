/* Author: AhmadSisfo@gmail.com */
import sc from '@/utils/secure'

export default {
    set(key, value) {
        if(value) window.localStorage.setItem(key, sc.enc(value));
    },
    
    get(key) {
        return window.localStorage.getItem(key)? sc.dec(window.localStorage.getItem(key)):null;
    },
    
    remove(key){
        window.localStorage.removeItem(key);
    },

    getSettings(key = null){
        let vuex = JSON.parse(this.get('vuex')); let data = {};
        if(vuex && vuex.entities && vuex.entities.settings && (data = vuex.entities.settings.data)){
            for(var i in data){
                if(data[i].key === key){return data[i].value;}
            }
        }
        return null;        
    }
}