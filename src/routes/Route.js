export class Route{
    constructor(){

    }
    addRoute(url){
        this.route.push(url);
    }
    static get(url,callback){
        if(Route.instance){
            Route.instance = new Route()
        };
       let url3 = window.location.pathname;
        url3 = url3.replace(/index\.html/g,'')
        window.addEventListener('popstate', (url3)=>{
            window.location.location =url3;
            console.log(url3);
        })
        
        callback(url3);
    }
}