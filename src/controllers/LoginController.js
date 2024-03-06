import { Controller } from "./Controller";

export default class LoginController extends Controller{
    constructor(App){
        super(App);
        this.btn = document.querySelector('button[type="submit"]');
        
    }
    
    index(service){
        this.btn.onclick= async()=>{
            let auth = await service.loginPtk(document.getElementById('username').value,document.getElementById('password').value);
            
            if(auth){
                window.location.href = "/dashboard";
                return;
            }
            document.getElementById('responseForm').innerHTML = `<div class="alert alert-danger mt-2 alert-dismissible fade show" role="alert" style="font-size:10px">${service.responMessage.status}<button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button></div>`;
        };
        document.getElementById('showPass').onclick = (e)=>{
            if(e.target.className.indexOf('bi-eye-slash')>-1){
                e.target.classList.remove('bi-eye-slash');
                e.target.classList.add('bi-eye');
                document.getElementById('password').setAttribute('type','text');
            }else{
                e.target.classList.remove('bi-eye');
                e.target.classList.add('bi-eye-slash');
                document.getElementById('password').setAttribute('type','password');
            }
        };
    }

}