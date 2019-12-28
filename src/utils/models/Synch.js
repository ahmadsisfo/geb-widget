/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
import Notif      from '@/utils/models/Notif';

const notif = new Notif();

export default {   
    done   : true,   
    status : 'checking',    
        
    init(){
        //this.start();
        //this.refreshNotif();         
    },                 
    
    start(){
        var context = this;
        window.setInterval(function(){
            if(context.done){
                context.done = false;                       
                context.done   = true;
                context.status = 'up to date';
            }
        }, 3000);
    },
    
    async refreshNotif(){
        window.setInterval(function(){
            notif.refresh();
        }, 3000)        
    }
}