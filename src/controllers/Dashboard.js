export default class Dashboard{
    constructor(app,userService){
        this.app = app;
        this.userService = userService;
        this.headerCheck();
        this.mustHaveApp()
    }
    
    mustHaveApp(){
        
        if(!this.app.hasLocal('ptk')){
            this.userService.ptk();
        }
        
        this.userService.allSiswa()
        // if(!this.app.hasLocal('dbSiswa')){
        // }
    }
    headerCheck(){
        let dom = this.app.TopHeader(this.app.UserApp).dashboardMenu();;
        document.getElementById('datamenuuser').innerHTML = dom;
        
    }
}