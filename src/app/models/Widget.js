import Model  from '@/utils/models';

export default class Widget extends Model { 
    backend = '/package/';    

    calculateTarif(body, params={}, headers={}){
        return this.api.post(this.backend+'calculate-tarif', body, params, headers);
    }

    trackPackage(body,params={}, headers={}){
        return this.api.post(this.backend+'track', body, params, headers);
    }
    
    node(params={}, headers={}){
        return this.api.get('/node/view', params, headers).then(res => {          
            return res.status == 200 ? res.data : {};
        });
    }

    packages(params={}, headers={}){
        return this.api.get(this.backend+'index', params, headers).then(res => {          
            return res.status == 200 ? res.data : {};
        });
    }
    
    nodes(params={}, headers={}){
        return this.api.get('/node/index', params, headers).then(res => {          
            return res.status == 200 ? res.data : {};
        });
    }    

    products(params={}, headers={}){
        return this.api.get('/product/index', params, headers).then(res => {          
            return res.status == 200 ? res.data : {};
        });
    }

    tarifs(params={}, headers={}){
        return this.api.get('/tarif/index', params, headers).then(res => {          
            return res.status == 200 ? res.data : {};
        });
    }
}

