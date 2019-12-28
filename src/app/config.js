//import { isAndroid } from 'mobile-device-detect'

//let baseUrl = 'http://localhost/logistic/web/';
//let baseUrl = 'http://103.41.204.222/api/web/index.php/';
let baseUrl = 'https://api.geblogistics.co.id/index.php/';


//let AndroidOrigin = st.getSettings('AndroidOrigin');

export default {   
    rest    :  baseUrl+'v1/',          
    title   :  /*st.getSettings('title')?st.getSettings('title'):*/'GEB Logistic',
    prefix  :  'geb',
    
    theme   : {
      toolbar_color : '#55D4FF',
      navbar_color  : '#0A43AE'
    },   
}
