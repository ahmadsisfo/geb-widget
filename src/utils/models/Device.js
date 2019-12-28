import cf from '@/app/config'
import fc from '@/utils/interface'
import ls from '@/utils/localStorage'

const prefix  = cf.prefix;
const api     = fc.biz4;

export default {
    getToken () {
        return api.post('/device/register', {key:""} )
    },
    
    register() {
        return api.post('/device/register', {key:""})
    },
    
    set(data) { 
        this.unset();
                //sc.changeKey(data.cid);
        ls.set(prefix+'cid' , data.cid  );
        ls.set(prefix+'key' , data.token);
        ls.set(prefix+'regdate', data.regdate ? data.regdate : Number(new Date()));
        ls.set(prefix+'granted', data.granted ? data.granted : true);
        return true;
    },
    
    unset() {        
        ls.remove(prefix+'cid');
        ls.remove(prefix+'key');
        ls.remove(prefix+'regdate');
        ls.remove(prefix+'granted');
        return true;
    },
    
    cek(){
        var reg = this.info();
        
        if(JSON.parse(reg.granted) && reg.token != null){           
            return true;
        } 
        
        window.getApp.$emit('APP_DEVICE_NOTLICENCE');
        return false;
    },
    
    isRegister(){
        var reg = this.info();
        
        if(JSON.parse(reg.granted) && reg.token != null){           
            return true;
        } 
        
        window.getApp.$emit('APP_DEVICE_NOTLICENCE');
        return false;
    },
    
    
    info() {
        return {
            cid     : ls.get(prefix+'cid'),
            token   : ls.get(prefix+'key'),
            regdate : ls.get(prefix+'regdate'),
            granted : ls.get(prefix+'granted'),        
        }
    }
}