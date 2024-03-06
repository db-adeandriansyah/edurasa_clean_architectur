
import { Controller } from "./Controller";


export class HomeController extends Controller{
    constructor(App){
        super(App);
        this.btn_loginsiswa = document.querySelector('button[type=submit]');
        this.warning_loginsiswa = document.getElementById('responseForm');
        this.slideWrap = document.getElementById('tesScroll');
        this.spanId = document.getElementById('user');
        this.myIndex = 0
    };
    index(User){
        this.userService = User;
        this.spanId.innerHTML = this.userService.authType? this.setApp.namaUser:'tidak login';
        this.loginSiswa();
        this.callDataCarousel()
    }
    
    loginSiswa(){
        
        this.btn_loginsiswa.onclick = async (e)=>{
            e.preventDefault();
            const token = document.getElementById('tokensiswa').value;
            this.userService.callWithProses()
            const authenticated = await this.userService.SiswaLogin(token);
            this.userService.stopProgressBar();
            
            console.log(authenticated);
            if(authenticated){
                window.location.href = "/dashboard";
                return;
            }
            this.warning_loginsiswa.innerHTML = `<div class="alert alert-danger mt-2 alert-dismissible fade show" role="alert" style="font-size:10px">Token Siswa Tidak dikenal<button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button></div>`;
        
        }
    }
    activatedCarousel(){;
        var i;
        var x = document.getElementsByClassName("carouselEdu");
        for (i = 0; i < x.length; i++) {
            x[i].style.display = "none";
        }
        this.myIndex++;
        if (this.myIndex > x.length) {
            this.myIndex = 1
        }
        x[this.myIndex - 1].style.display = "block";
        setTimeout(this.activatedCarousel.bind(this), 5000);
    }
    async callDataCarousel(){
        let dataguru = {};
        let html="";
        
        if(this.userService.hasLocal('ptk')){
            dataguru =this.userService.LocalJson('ptk');
        }else{
            dataguru = await this.userService.dataCarousel();
        }

        dataguru.forEach(db=>{
            html+=`<div class="my-auto w-100 position-relative carouselEdu">
                    <img src="${this.urlImg(db.idpoto_potoguru).urlImg}" class="d-block mx-auto rounded-circle object-fit-cover" height="180" width="180" alt="${db.guru_namalengkap}">
                    <div class="text-bg-secondary text-center d-none d-lg-block mx-auto">${db.guru_namalengkap}<br>${(db.kelas=='Kepala Sekolah')?'Kepala Sekolah':`${db.gurukelas_gmp} ${db.kelas}`}</div>
                </div>`;
            });
        this.slideWrap.innerHTML = html;
        this.activatedCarousel()
    }
    

}