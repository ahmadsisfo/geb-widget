/* Author: ahmadsisfo1@gmail.com */

export default {
  init(response){
    switch(response.status){      
      case 403:
        window.getApp.$emit('showSnackbar', {
            show : true,text : response.status+' '+response.data.message, color: 'red'
        });
        //window.getApp.showToast(response.status+' '+response.data.message);            
        if(response.data.message === 'Login Required'){
          window.getApp.$emit('APP_LOGOUT');
        }else{
          window.getApp.$emit('APP_ACCESS_DENIED');
        }
        break;        
      case 401:
        window.getApp.$emit('showSnackbar', {
            show : true,text : response.status+' '+response.statusText, color: 'warning'
        });           
        //window.getApp.showToast(response.status+' '+response.statusText);
        window.getApp.$emit('APP_LOGOUT');        
        break;          
      case 500:  
        window.getApp.$emit('showSnackbar', {
            show : true,text : response.status+' '+response.data.message, color: 'warning'
        });
        //window.getApp.showToast(response.status+' '+response.data.message);
        break;
      default:
        var mode = [400,404,500];
        if(mode.includes(response.status)){
          window.getApp.$emit('showSnackbar', {
            show : true,text : response.status+' '+response.data.message, color: 'warning'
          });
          //window.getApp.showToast(response.status+' '+response.data.message);              
        } else {
          window.getApp.$emit('showSnackbar', {
            show : true,text : response.status+' '+response.statusText, color: 'warning'
          });      
          //window.getApp.showToast(response.status+' '+response.statusText);      
        }
        
        break;
    }
    
    /*var invalid = [403,401];
    if(invalid.includes(response.status)){
        
    }*/
  }
}