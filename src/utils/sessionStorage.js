/* Author: AhmadSisfo@gmail.com */

export default {
    set(key, value) {
        if(value) window.sessionStorage.setItem(key, value);
    },
    
    get(key) {
        return window.sessionStorage.getItem(key);
    },
    
    remove(key){
        window.sessionStorage.removeItem(key);
    }
}