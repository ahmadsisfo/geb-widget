import Model  from '@/utils/models';

export default class Widget extends Model { 
    backend = '/widget/';        

    trackPackage(body,params={}, headers={}){
        return this.api.post(this.backend+'track', body, params, headers);
    }
    
    node(params={}, headers={}){
        return this.api.get('/node/view', params, headers).then(res => {          
            return res.status == 200 ? res.data : {};
        });
    }

    packages(params={}, headers={}){
        return this.api.get('/package/index', params, headers).then(res => {          
            return res.status == 200 ? res.data : {};
        });
    }
    
    nodes(params={}, headers={}){
        return this.api.get(this.backend+'nodes', params, headers).then(res => {          
            return res.status == 200 ? res.data : {};
        });
    }        

    tarifs(params={}, headers={}){
        return this.api.get(this.backend+'tarifs', params, headers).then(res => {          
            return res.status == 200 ? res.data : {};
        });
    }

    products(){
        return this.api.get(this.backend+'products').then(res => {          
            return res.status == 200 ? res.data : {};
        });
    }
}

