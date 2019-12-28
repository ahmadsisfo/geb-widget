import cf from '@/app/config'
import fc from '@/utils/interface'
import st from '@/utils/cookies'

const prefix  = cf.prefix;
const api     = fc.biz4;
const expire  = {expires : 1, secure:false};

export default {    
    login(user, pass) {
        return api.post('/user/login', {
            username: user,
            password: pass
        })
    },

    create(user, email, pass, repass) {
        return api.post('/user/create', {
            username: user,
            password: pass,
            email   : email,
            retypePassword: repass,
        })
    },
    
    set(data) { 
        this.unset();        
        st.set(prefix+'cid'  ,    data.user_id, expire);
        st.set(prefix+'key'  ,    data.token, expire);
        st.set(prefix+'username', data.username, expire);
        st.set(prefix+'email' ,   data.email, expire);
        st.set(prefix+'roles' ,   data.roles, expire);
        st.set(prefix+'office_id' ,   data.office_id, expire);
        st.set(prefix+'offices' ,   data.offices, expire);
        st.set(prefix+'regdate',  Number(new Date()), expire);
        st.set(prefix+'granted',  "true" + data.token, expire);
        return true;
    },
    
    unset() {        
        st.remove(prefix+'cid');
        st.remove(prefix+'key');
        st.remove(prefix+'username');
        st.remove(prefix+'email');
        st.remove(prefix+'roles');
        st.remove(prefix+'office_id');
        st.remove(prefix+'offices');
        st.remove(prefix+'regdate');
        st.remove(prefix+'granted');
        return true;
    },
    
    isLogin(){
        var reg = this.attributes();
        if(reg.granted == "true" + reg.token){                                      
            return true;
        } 
        window.getApp.$emit('APP_LOGOUT');  
        return false;
    },
    
    attributes() {
        return {
            cid     : st.get(prefix+'cid'),
            token   : st.get(prefix+'key'),
            username: st.get(prefix+'username'),
            email   : st.get(prefix+'email'),
            office_id : st.get(prefix+'office_id'),
            offices   : st.get(prefix+'offices')?JSON.parse(st.get(prefix+'offices')):[],
            roles   : JSON.parse(st.get(prefix+'roles')),
            regdate : st.get(prefix+'regdate'),
            granted : st.get(prefix+'granted')            
        }
    },
    
    roles(){
       return this.attributes() ? this.attributes().roles : [];      
    },
}
