/* Author: AhmadSisfo@gmail.com */
import * as Cookies from "js-cookie";
import sc from '@/utils/secure'

export default {
    set(key, value, opt = {}) {
        if(value) Cookies.set(key, sc.enc(value), opt)
    },
    
    get(key) {
        return Cookies.get(key)? sc.dec(Cookies.get(key)): null;
    },
    
    remove(key){
        Cookies.remove(key);
    }
}