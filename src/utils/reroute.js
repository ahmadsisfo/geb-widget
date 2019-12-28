/* Author: ahmadsisfo1@gmail.com */
import config from '@/config'

export default (Menu, apps=null) => {
  let routes = [];  
  apps = apps ? apps : config.apps;
  Menu.forEach((item)=>{
    //if(item.items && item.visible){
    if(item.items){    
      item.items.forEach(data=>{
        //if(data.visible){
          let name = item.group ? item.group : '';
          name = data.name ? name ? name+'/'+data.name: data.name : name;                
          name = data.path ? data.path : name;          
          routes.push({
            name  : name,
            path  : data.path ? data.path : '/'+name,
            meta  : data.meta?data.meta:{breadcrumb:true},
            title : data.title,
            redirect : data.redirect ? data.redirect : null,
            component:() => data.component ? data.component : import('@/apps/'+apps+'/views/'+name)
          }); 
        //}
      });
    } else {        
      //if(item.visible){
        routes.push({
          name  : item.name? item.name : null,
          path  : item.path ? item.path : '/'+item.name,
          meta  : item.meta?item.meta:{breadcrumb:true},
          title : item.title,
          redirect : item.redirect ? item.redirect : null,
          component: item.component ? item.component : () => import('@/apps/'+apps+'/views/'+item.name)
        }); 
      //} 
    }
  });
  return routes;
}
