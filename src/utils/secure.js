/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
import Crypto from "simple-crypto-js"

var _secretKey = "some-unique-key";

var crypto = new Crypto(_secretKey);

export default {
    enc(value) {        
        return crypto.encrypt(value)
    },
    
    dec(value) {
        return crypto.decrypt(value)
    },
    
    changeKey(newKey){        
        crypto.setSecret(newKey);        
    }
}

