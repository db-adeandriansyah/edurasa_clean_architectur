
import logo from "../img/lamaso.webp";
import barloading from "../img/barloading.gif"
import kotadepok from "../img/kotadepok.webp";
import ratujaya1 from "../img/ratujaya1.png";
// import { images } from "../assets/assetFunction";
// import { headerNavigationAuto } from "../views/header-navigation";
// import { menubar } from "./SidebarController";
import { TopHeader } from "../views/header/TopHeader";
import { Collapse, Tooltip } from "bootstrap";
import { cardMenu, radioMenu } from "../views/sidebar/cardSidebar";
import { koleksiRombel } from "./settingApp";


export default class Route{
    #User;
    #UserRoles;
    #fiturByPeran;
    #fnPermision;
    #objPermision;
    #allowedByUserTypes;
    constructor(){
        this.routes = {};
        this.#User = {};
        this.#fiturByPeran=[]
        this.#UserRoles =  'guest';
        this.#fnPermision={};
        this.#objPermision={};
        this.#allowedByUserTypes=[]
        this.checkUserType();
        this.initializeUser();
    }
    set UserApp(x){
        this.#User = x;
    }
    get UserApp(){
        return this.#User;
    }
    set UserType(x){
        this.#UserRoles = x;
    }
    get UserType(){
        return this.#UserRoles;
    }
    get isAdmin(){
        return this.#UserRoles === 'admin'
    }
    set rulesPermision(objek){
        this.#objPermision = objek;
    }
    get rulesPermision(){
        return this.#objPermision;
    }
    dataPermision(obj){
        Object.entries(obj).forEach(([k,v])=>{
            this.#User['whos_'+k] = [27, ...v];
            this.#User[k]=[27, ...v].map(n=>parseInt(n)).indexOf(parseInt(this.#User.idUser))>-1;
        })


    }
    initializeUser(){
        let sekarang = new Date();
        let bulan = sekarang.getMonth();
        let semester = bulan>5?1:2;
        let thAwal = semester==1?sekarang.getFullYear():sekarang.getFullYear()-1;
        let thAkhir =semester==1?sekarang.getFullYear()+1:sekarang.getFullYear();
        let tahunAwal = thAwal.toString();
        let tahunAkhir = thAkhir.toString();
        // let currentCode =  't_'+tahunAwal.slice(2,4)+tahunAkhir.slice(2,4)+'_s_'+semester;
        let teksTitle = ' Tapel '+ tahunAwal+'/'+tahunAkhir +' Semester ' + semester;
        this.#User =  {
                logo                        : logo,
                barloading                  : barloading,
                title                       : teksTitle,
                namaSekolah                 : 'UPTD SDN Ratujaya 1',
                alamatSekolah               : 'Jl. SMP Ratujaya No. 41',
                alamatSekolahRt             : '5',
                alamatSekolahRw             : '3',
                alamatSekolahkelurahan      : 'Ratujaya',
                alamatSekolahkecamatan      : 'Cipayung',
                alamatSekolahkota           : 'Kota Depok',
                alamatSekolahprovinsi       : 'Jawa Barat',
                alamatSekolahkodepos        : '16445',
                npsn                        : '20228914',
                nss                         : '101026604052',
                website                     : 'www.sdnratujaya1.net',
                emailSekolah                : 'databasesdnratujaya1@gmail.com',
                logoDepok                   : kotadepok,
                logoSekolah                 : ratujaya1,
                emailguru                   : 'databaseadeandriansyah@gmail.com',
                tahunAwal                   : tahunAwal,
                tahunAkhir                  : tahunAkhir,
                tapel                       : tahunAwal+'/'+tahunAkhir,
                tapelshort                  : tahunAwal.toString().slice(2)+''+tahunAkhir.toString().slice(2),
                semester                    : semester,
                koleksiRombel               : koleksiRombel,
                typeUser                    : this.hasLocal('app')?this.getValInLocal('app','akses'):'guest',
                idUser                      : this.hasLocal('app')?this.getValInLocal('app','idrow'):'Tamu',
                imgUser                     : this.hasLocal('app')?this.getValInLocal('app','idimg')==undefined?"1LSOYTPBUDEM2N0Gb3yJYA1uodQDMZhLk":`${this.getValInLocal('app','idimg')}`:"1LSOYTPBUDEM2N0Gb3yJYA1uodQDMZhLk",
                namaUser                    : this.hasLocal('app')?this.getValInLocal('app','user'):'Tamu',
                nipUser                     : this.hasLocal('app')?this.getValInLocal('app','nip_guru')==""?"":"NIP. "+this.getValInLocal('app','nip_guru'):'_',
                namaKepsek                  : this.hasLocal('app')?this.getValInLocal('app','nama_kepsek'):'Tamu',
                nipKepsek                   : this.hasLocal('app')?"NIP. "+this.getValInLocal('app','nip_kepsek'):'_',
                jabatanUser                 : this.hasLocal('app')?this.getValInLocal('app','akses'):'_',
                tugasUser                   : this.hasLocal('app')?this.getValInLocal('app','room'):'_',
                kelasAmpu                   : this.hasLocal('app')?this.getValInLocal('app','kelasampu'):'_',
                template                    : this.hasLocal('template')?this.LocalJson('template'):{ modalFooter:'accord-bg', modalHeader:'accord-bg', mainDashboard:'bg-tirai',
            }
            
        }
    }
    
    checkUserType(){
        this.#UserRoles = this.hasLocal('app')?this.getValInLocal('app','akses'):'guest';
    }
    
    normalizeRoute(route) {
        const normalizedRoute = route.replace(/\/$/, ""); // Remove trailing slash if present
        return normalizedRoute === "" ? "/" : `${normalizedRoute}`;
    }
    registerUrlPermission(route,allowedUserTypes){
        const normalizedRoute = this.normalizeRoute(route);
        this.routes[normalizedRoute] = { allowedUserTypes };
        
        this.#allowedByUserTypes = allowedUserTypes;
        this.#User.byUserType = allowedUserTypes.indexOf(this.UserType)>-1;
    }
    
    handleRoute() {
        const currentRoute = this.normalizeRoute(window.location.pathname);
        const routeDetails = this.routes[currentRoute];
        this.buildHeader(currentRoute);
    
        if (routeDetails) {
            const { allowedUserTypes } = routeDetails;
            const userType = this.UserType;
            if (this.checkUserTypeAllowed(allowedUserTypes, userType)) {

            } else {
                if(userType == 'guest'){
                    this.redirectNeedAuthorize();
                }else{
                    this.redirectToDashboard()
                }
            }
        } else {
            this.redirectToNotFoundPage();
        }
    }
    
    checkUserTypeAllowed(allowedUserTypes, userType) {
        return allowedUserTypes.includes(userType);
    }
    TopHeader(user){
        return new TopHeader(user);
    }
    buildHeader(url){
        let html = '';
        let dom = this.TopHeader(this.#User);
        if(url==='/'){
            //halaman Beranda
            if(this.#UserRoles === 'guest'){
                html = dom.homePage();
            }else{
                // html = dom.homePageHasLogin(this.#User);
                html=dom.dashboardHeaderMenu(false);
            }
            html+=dom.headerMobile(
                dom.mobile_menuProfile()+
                dom.mobile_menuDashboard()+
                dom.navMobile(
                        dom.mobile_menuHome()+
                        dom.mobile_menuBtnDashboard()+
                        dom.mobile_menuBtnProfile(this.#User.imgUser),true
                    )
                );
        }else if(url==='/login'){
            html = dom.loginPage()
            //sudah pasti Usernya adalah 'guest'
            html+=dom.headerMobile(
                dom.mobile_menuProfile()+
                dom.mobile_menuDashboard()+
                dom.navMobile(
                        dom.mobile_menuHome()+
                        dom.mobile_menuBtnDashboard()+
                        dom.mobile_menuBtnProfile(this.#User.imgUser),false
                    )
                );
        }else if(url === '/dashboard'){
            html = dom.dashboardHeaderMenu();
            //sudah pasti Usernya adalah USer yang telah login, tapi ada perbedaan dashboard profil;
            html+=dom.headerMobile(
                dom.mobile_menuProfile()+
                dom.navMobile(
                        dom.mobile_menuHome()+
                        dom.mobile_menuBtnProfile(this.#User.imgUser),false
                    ),true
                );
        }else{
            //selain halaman di atas
            html = dom.pc_menuFiturUtama(this.#User);
            html+= dom.headerMobile(
                        dom.mobile_menuProfile()+
                        dom.mobile_menuDashboard()+
                        dom.navMobile(
                            dom.mobile_menuHome()+
                            dom.mobile_menuBtnDashboard()+
                            dom.mobile_menuBtnProfile(this.#User.imgUser),false
                    )
                );
        }
    

        document.getElementById('header').innerHTML = html;
        const btnLogouts = document.querySelectorAll('.btn-logout');
        btnLogouts.forEach(btnLogout=>{
            btnLogout.onclick=()=>{
                this.clearLocalAll();
                this.redirectHomePage()
            };
        });
        let menuMobile = document.querySelectorAll('[data-target-collapse]');
        menuMobile.forEach(btn=>{
            btn.onclick = (e)=> {
                let idTarget = btn.getAttribute('data-target-collapse');
                let element = document.getElementById(idTarget);
                new Collapse(element,{parent:'#header'});
            }
        });
        const headerElemen = document.querySelector('#header');
        if(['/','/login','/dashboard'].includes(url)){
            let top = headerElemen.offsetTop + 50;
            window.onscroll = (e)=>{
                if(window.scrollY >= top){
                    headerElemen.querySelector('nav').classList.add("jacket")
                }else{
                    headerElemen.querySelector('nav').classList.remove("jacket");
                }
            }
        }else{
            let btn = document.querySelector('.btn-humberger');
            btn.onclick = (e)=>{
                let sidebar = document.getElementById('collapseWidthExample');
                new Collapse(sidebar,{toggle:true});
                let domEfected = document.getElementById('colEffected');
                
                if(domEfected.classList.contains('col-md-9')){
                    btn.innerHTML = `<span class="fs-4 fw-bolder">⇛</span>`;
                    domEfected.classList.remove('col-md-9');
                    domEfected.classList.add('col');
                }else{
                    btn.innerHTML = `<span class="fs-4 fw-bolder">☰</span>`;
                    domEfected.classList.remove('col');
                    domEfected.classList.add('col-md-9');
                }
                
            };
        }
        this.tooltipkan();
    }
    
    tooltipkan(){
        let doms = document.querySelectorAll('[data-bs-toggle="tooltip"]');
        [...doms].map(n=> new Tooltip(n))
    }
    redirectHomePage() {
        window.location.href = "/";
    }
    redirectToLoginPage() {
        window.location.href = "/login";
    }
    redirectToDashboard() {
        window.location.href = "/dashboard";
    }
    redirectNeedAuthorize(){
        window.location.href = "/";
        alert('Anda tidak diijinkan mengakses halaman sebelumnya');
    }

    // Redirect the user to the not found page
    redirectToNotFoundPage() {
        window.location.href = "/404";
    }
    init() {

        window.addEventListener("popstate", () => {
            this.handleRoute();
        });

        // Handle the initial route when the page loads
        this.handleRoute();
        
    }
    
    writeLocal (key,val){
        window.localStorage.setItem(key, window.btoa(val));
    }
    clearLocal(key){
        window.localStorage.removeItem(key);
    } 
    clearLocalAll(){
        window.localStorage.clear();
    }
    //getValueInLocalByName:
    LocalJson(nama){
        return JSON.parse(window.atob(window.localStorage.getItem(nama)));
    } 
    getValInLocal(namelocal,key){
        return this.LocalJson(namelocal)[key];
    
    }
    hasLocal(key){
        return window.localStorage.hasOwnProperty(key);
            
    }
    //sidebar;
    fiturRombel(kelasampu){
        let obj = {};
        let arraykelas = [];
        obj.title = 'Rombongan Belajar';
        let arraykelasampu = kelasampu.replace(/\s+/,'').split(',');

        for(let i = 0; i < arraykelasampu.length ; i++){
            let obkelas = {
            value:arraykelasampu[i],
            text:'Kelas '+arraykelasampu[i],
            name:'kelasampu'
            }
            arraykelas.push(obkelas)
        };
        obj.menu = arraykelas;
        return obj;
    }
    loopingMenu(arr){
        let html = "";
        html+=`<h5 class="text-muted">Menu</h5>`;
        for(let i = 0 ; i < arr.length ; i++){
            let child = "";
            let dataChild = arr[i].menu;
            let iter = i *100;
            for(let j = 0 ; j < dataChild.length ; j++){
                child += radioMenu((iter+j),dataChild[j].value,dataChild[j].text,dataChild[j].name,dataChild[j].name2);
            }
            html+=cardMenu(arr[i].title,child)
        };
        return html;
    }
    set sidebarPeran(x){
        this.#fiturByPeran = x;
    }
    get sidebarPeran(){
        return this.#fiturByPeran
    }
    menuKhususGuruKelas(title,menu){
        this.#fiturByPeran =  [{
            'title':title,
            'menu':menu
        }]
    }
    buildSidebarFitur(arr,fiturRombel=true){
        let html = "";
        let arrayKelasAmpu = this.#User.kelasAmpu.split(',');
        
        if(arrayKelasAmpu.length==1){
            if(this.#fiturByPeran.length>0){
                arr.unshift(this.#fiturByPeran[0])
            }
        }else{
            if(fiturRombel){
                arr.unshift(this.fiturRombel(this.#User.kelasAmpu))
            }
        }
        html+= this.loopingMenu(arr);
        document.querySelector('.offcanvas-body').innerHTML = html;
        const btns = document.querySelectorAll('.card-header>span');
        btns.forEach(el=>{
            el.onclick = (e)=>{
                let span = e.target;
                let div = span.closest('div');
                let sbiling = div.nextElementSibling;
                sbiling.classList.toggle('d-none');
                if(span.innerHTML == '⇓'){
                    span.innerHTML = '⇑';
                }else{
                    span.innerHTML = '⇓';
                }
            }
        });
        this.tooltipkan();
    }
    createTitle(long,short){
        document.getElementById('longTitleSidebar').innerHTML = long;
        document.getElementById('shortTitleSidebar').innerHTML = short;
    }
}