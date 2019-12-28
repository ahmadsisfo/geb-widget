/* Author: ahmadsisfo1@gmail.com */
import tcerror from '@/utils/thencatcherror'

export default(axios) => {
    return axios
        .then((response) => {
            return response;// Success
        })
        .catch((error) => {
            // Error
            if (error.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                //console.log(error.response.data);
                //console.log(error.response.status);                                
                console.log('catch1',error.response);
                tcerror.init(error.response);
                return error.response;
            } else if (error.request) {
                // The request was made but no response was received
                // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
                // http.ClientRequest in node.js
                console.log('catch2', error.request);
                window.getApp.$emit('showSnackbar', {
                    show : true,
                    text : '(error.request) is an instance of XMLHttpRequest in the browser and an instance of',
                    color: 'red'
                });
                //window.getApp.showToast('(error.request) is an instance of XMLHttpRequest in the browser and an instance of');              
                return error.request;
            } else {
                // Something happened in setting up the request that triggered an Error
                console.log('catch3', error.message);
                //window.getApp.showToast('(error.request) is an instance of XMLHttpRequest in the browser and an instance of');
                window.getApp.$emit('showSnackbar', {
                    show : true,
                    text : '(error.request) is an instance of XMLHttpRequest in the browser and an instance of',
                    color: 'red'
                });
                return error.message;
            }
            //console.log('catch4', error.config);
            //return error.config;
        });    
}