/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
import Model  from '@/utils/models';

export default class Notif extends Model { 
                
    entity  = 'notifications';    
    
    vuex    =  true;
    
    add(id, title=null, content=null, ref=null, icon=null, color=null){         
        title   = title ? title : 'Error Detected';
        content = content ? content : '';
        icon    = icon ? icon : 'fa-refresh';
        color   = color ? color : 'red';
        var time    = moment().valueOf();                       
        let notifikasi = {id:id,title:title,content:content,icon:icon,color:color,time:time,ref:ref};        
        this.createOrUpdateOffline('notifications', notifikasi);        
        /*this.allOfflinePromise('notifications').then(res => {
            console.log(res);
        });*/                       
    }
    
    clear(id){
        this.deleteOfflinePermanen('notifications', {id : id});        
    }    
    
    refresh(){
        var except = ['notif','notif-create'];
        this.all().then(data => {
            data.forEach(item => {                
                if(item.ref != null){
                    let refArr = item.ref.id;                            
                    let change = false;
                    
                    for(var i = refArr.length - 1; i >= 0; i--) {
                        let single = this.oneOffline(item.ref.db, {id : refArr[i]});
                        if(single === null){                            
                            refArr.splice(i, 1);                            
                            change = true;
                        } else {
                            if(!this.inArray(single.flag, except)){                                                            
                                //console.log(single);
                                refArr.splice(i, 1);
                                change = true;
                            }
                        }
                        
                    }                                        
                    
                    if(change){
                        if(refArr.length == 0){
                            this.clear(item.id);
                        } else {
                            item.ref.id = refArr;
                            this.createOrUpdateOffline('notifications', item); 
                        }
                    }
                }
            }); 
        });
    }
}