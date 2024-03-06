import UrlImg from "../../controllers/UrlImg";
import { menubar } from "../../routes/SidebarController";

export class TopHeader{
    #data;
    #rute;
    constructor(data){
        this.#data = data;
        this.#rute='/'
    }
    get logo(){
        let {logo} = this.#data;
        return logo;
    }
    get title(){
        let {title}= this.#data;
        return title;
    }
    get Linklogo(){
        return `<a href="/" class="navbar-brand"><img src="${this.logo}" alt="logo lamaso edurasa" width="40" height="40" class="img-thumbnail" referrerpolicy="no-referrer"/><span class="nav-link text-white d-inline">${this.title}</span></a>`;
    }
    get route(){
        return this.#rute;
    }
    set route(x){
        this.#rute = x
    }
    header(slot){
        return `<div class="container-fluid  shadow-lg fixed-top d-none d-md-block px-0 user-select-none">${slot}</div>`;
    }
    headerFitur(slot){
        return `<div class="container-fluid shadow-lg d-none d-md-block px-0 user-select-none">${slot}</div>`;
    }
    headerMobile(slot,hidden=true){
        return `<div class="container-fluid shadow-sm fixed-bottom bg-color1 ${hidden?'d-block d-md-none':'' } scrolled overflow-y-scroll" style="max-height:75%">${slot}</div>`;
    }
    nav(slotNav){
        return `<nav class="navbar navbar-expand-sm my-0">${slotNav}</nav>`;
    }
    navFitur(slotNav){
        return `<nav class="navbar navbar-expand-sm my-0 katulistiwa shadow-lg">${slotNav}</nav>`;
    }

    navMobile(slotNav,hidden=true){
        return `<div class="d-flex justify-content-evenly py-1 ps-0 z-3 fixed-bottom ${hidden?'d-block d-md-none':'' } neon-lite-transisi scrolled">${slotNav}</div>`;
    }
    mobile_menuHome(){
        return `<a href="/" class="btn btn-sm bg-white btn-outline-danger rounded-circle fs-5"><i class="bi bi-house-fill  neon-lite-transisi scrolled text-clip"></i></a>`
    }
    mobile_menuLogin(){
        return `<a href="/login" class="btn btn-sm  fs-5 rounded-circle"><i class="bi-person-circle neon-lite-transisi scrolled text-clip"></i></a>`;
    }
    mobile_menuBtnDashboard(){
        return `<button class="btn btn-sm p-0  overflow-hidden btn-collapse" data-target-collapse="navbarToggleExternalContent2" aria-expanded="false" aria-label="Toggle navigation"> <svg xmlns="http://www.w3.org/2000/svg" width="37" height="37" fill="currentColor" class="bi bi-grid-3x3-gap-fill" viewBox="0 0 16 16"> <path d="M1 2a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2zm5 0a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V2zm5 0a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1h-2a1 1 0 0 1-1-1V2zM1 7a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V7zm5 0a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V7zm5 0a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1h-2a1 1 0 0 1-1-1V7zM1 12a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1v-2zm5 0a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1v-2zm5 0a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1h-2a1 1 0 0 1-1-1v-2z"></path> </svg> </button>`;
    }
    mobile_menuBtnProfile(id){
        return `<button class="btn btn-sm btn-outline-success fs-5 p-0 rounded-circle overflow-hidden btn-collapse" data-target-collapse="navbarToggleExternalContent" aria-expanded="false" aria-label="Toggle navigation"> <img src="${this.urlImage(id)}" class="object-fit-cover" width="37" alt="profil" height="37" referrerpolicy="no-referrer"> </button>`;
    }
    mobile_menuProfile(){
        return `<div class="mt-2 collapse" id="navbarToggleExternalContent"> <div class="bg-light p-4 mb-5 rounded"> <h5 class="text-body-emphasis h4">Konfirmasi...</h5> <span class="text-body-secondary">Anda yakin ingin keluar?</span> <button class="btn btn-danger btn-logout">Ya, saya Keluar</button> <a href="/profil" class="text-decoration-none text-end fw-bold text-dark fs-5 d-block">Edit Profile</a> </div> </div>`;
    }
    mobile_listDashboard(){
        let slot="";
        let staff = this.#data['typeUser'] == 'Staff'
        let datamenu = menubar(staff?this.#data['tugasUser']:this.#data['typeUser']);
        
        datamenu.forEach((n,index)=>{
            slot+=`<li class="nav-item d-flex justify-content-between"><a href="${n.target}" class="nav-link">${n.icon} ${n.title}</a>${n.tersedia}</li>`;
        })
        return `<ul class="navbar-nav">${slot}</ul>`;
    }
    mobile_menuDashboard(){
        return `<div class="mt-2 collapse" id="navbarToggleExternalContent2"> <div class="bg-light p-4 mb-5 rounded"> <h5 class="text-body-emphasis h4">Menu:</h5> ${this.mobile_listDashboard()} </div> </div>`;
    }
    wrapContainer(slot){
        return `<div class="container user-select-none">${slot}</div>`;
    }
    
    ulNavbar(list){
        return `<ul class="navbar-nav ms-auto">${list}</ul>`;
    }
    listNavbar(item){
        return `<li class="nav-item">${item}</li>`;
    }
    anchorLink(url,text){
        return `<a href="${url}" class="nav-link cool-link text-white">${text}</a>`;
    }
    btnControlDropdown(namaUser, imgUser){
        return `<button class="btn dropdown-toggle akun" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false"> <span class="text-white cool-link">${namaUser}</span> <img src="${this.urlImage(imgUser)}" width="30" height="30" alt="profil ${namaUser}" style="object-fit:cover" class="rounded-circle d-none d-md-inline-block" referrerpolicy="no-referrer"> </button>`;
    }
    menuStaticDropdown(isDashboard=false){
        let htmldashbord = `<li><a class="dropdown-item" href="/dashboard">Dashboard</a></li>`;
        let isDashboardHtml =  isDashboard?htmldashbord:'';
        return `<ul class="dropdown-menu dropdown-menu-end" aria-labelledby="dropdownMenuButton1" data-bs-popper="static"> <li><a class="dropdown-item" href="/profil">Profil</a></li> ${isDashboardHtml} <li><button class="btn-link dropdown-item btn-logout">Logout</button></li> </ul>`;
    }
    dropdown(btnControl,listDropdown){
        return `<div class="dropdown">${btnControl}${listDropdown}</div>`
    }
    urlImage(id){
        // return `https://lh3.googleusercontent.com/d/${id}`;
        return new UrlImg(id).urlImg;
    }
    profilNavbar(dataUser,isDashboard){
        let {namaUser, imgUser} = dataUser;
        return this.dropdown(this.btnControlDropdown(namaUser,imgUser),this.menuStaticDropdown(isDashboard));
    }
    staticMenu(){
        let html = "";
        html+=this.listNavbar(this.anchorLink('#section1','Tentang Edurasa'));
        html+=this.listNavbar(this.anchorLink('#section2','Profil Sekolah'));
        html+=this.listNavbar(this.anchorLink('#section3','PTK'));
        return html;
    }
    dashboardProfileMenu(){
        let html = '';
        html+= this.listNavbar(this.profilNavbar(this.#data,false))
        return this.ulNavbar(html);
    }
    homeSubmenu(authenticated=false,ishomepage){
        let html = "";
        if(ishomepage=='/'){
            html+=this.staticMenu();
        }
        if(authenticated){
            html+=this.listNavbar(this.profilNavbar(authenticated,ishomepage));
        }else{
            
            html+=this.listNavbar(this.anchorLink('/login','Login'));
        }
        return this.ulNavbar(html);
    }
    linkSubmenu(authenticated=false){
        let html = "";
        html+=this.staticMenu();
        if(authenticated){
            html+=this.listNavbar(this.anchorLink('/login','Login'));
        }else{
            
        }
        return this.ulNavbar(html);
    }
    isGuest(){
        return this.header(this.nav(this.wrapContainer(this.Linklogo+this.homeSubmenu())));
    }
    pc_menuHOmePage(data,url){
        return this.header(this.nav(this.wrapContainer(this.Linklogo+this.homeSubmenu(data,true,url))))
    }
    pc_menuFitur(data,url){
        return this.header(this.nav(this.wrapContainer(this.Linklogo+this.homeSubmenu(data,false,url))))
    }
    isAuthenticated(data,isHomepage){
        
        let html=""
        
        if(isHomepage=='/'){
            html =this.pc_menuHOmePage(data,isHomepage);
        }else{
            html =this.pc_menuFitur(data,isHomepage);

        }
        
        html+=this.headerMobile(
            this.mobile_menuProfile()+
            this.mobile_menuDashboard()+
            this.navMobile(
                    this.mobile_menuHome()+
                    this.mobile_menuBtnDashboard()+
                    this.mobile_menuBtnProfile(data.imgUser)
                )
            );
        return html;
    }
    loginPage(){
        let html = this.listNavbar(this.anchorLink('/','<i class="bi bi-house-fill"></i> Home'));
        let cont =  this.ulNavbar(html);
        let menu = this.header(this.nav(this.wrapContainer(this.Linklogo+cont)));
        menu +=this.headerMobile(this.navMobile(this.mobile_menuHome()));
        return menu;
    }
    homePage(guest=true){
        let html= ""
        if(guest){
            html+=this.header(this.nav(this.wrapContainer(this.Linklogo+this.homeSubmenu(false,'/'))));
            html+=this.headerMobile(this.navMobile(this.mobile_menuHome()+this.mobile_menuLogin()));
        }else{
            // html+=this.header(this.nav(this.wrapContainer(this.Linklogo+this.homeSubmenu(data))));
            html =this.pc_menuHOmePage(guest);
            html+=this.headerMobile(this.mobile_menuProfile()+this.navMobile(this.mobile_menuHome()+this.mobile_menuLogin()));
        }
            // html+=this.headerMobile( this.navMobile(this.mobile_menuProfile()+this.mobile_menuHome()+this.mobile_menuLogin())); }
        return html;
    }
    homePageHasLogin(guest){
        let html =''
            html =this.pc_menuHOmePage(guest);
            html+=this.headerMobile(this.mobile_menuProfile()+this.navMobile(this.mobile_menuHome()+this.mobile_menuLogin()));
            return html;
        
    }
    dashboardHeaderMenu(isDashboard=true){
        let html ="";
        if(isDashboard){
            html+= this.header(this.nav(this.wrapContainer(this.Linklogo+this.dashboardProfileMenu())))

        }else{
            html+=this.header(this.nav(this.wrapContainer(this.Linklogo+this.homeSubmenu(this.#data,'/'))));
            
        }
        html+=this.headerMobile(this.navMobile(this.mobile_menuHome()+this.mobile_menuLogin()));
        return html;
    }

    dashboardMenu(){
        let slot="";
        let staff = this.#data['typeUser'] == 'Staff'
        let datamenu = menubar(staff?this.#data['tugasUser']:this.#data['typeUser']);
        
        datamenu.forEach((n,index)=>{
            if(index==0)return;
            slot+=`<a href="${n.target}" class="col-4 col-md-2 gx-1 mb-5 mb-lg-3 rounded text-center menudashboard"> <div class="top-0 translate-middle-x position-absolute fw-bolder ${n.tersedia!==''?'text-success':'text-danger'} fs-4 rounded-circle border border-success" style="left:80%">${n.tersedia==''?'!':'✓'}</div> <img src="${n.background}" class="rounded-circle  object-fit-lg-cover object-fit-sm-scale ${n.tersedia==''?'opacity-50':''} neon-lite-transisi scrolled overflow-visible shadow-lg" width="80" height="80" referrerpolicy="no-referrer"> <div class="text-bg-primary menudashboard__title">${n.title}</div> </a>`;
        });

        return slot;
    }
    htmlHeader(){
        let isAuth = this.#data.typeUser !== 'guest';
        let url = this.#rute;
        let html = '';
        
        if(isAuth){
            if(url=='/dashboard'){
                html+= this.header(this.nav(this.wrapContainer(this.Linklogo+this.dashboardProfileMenu())))
                html+=this.headerMobile(this.navMobile(this.mobile_menuHome()+this.mobile_menuLogin()));
            }else{
                html+=this.header(this.nav(this.wrapContainer(this.Linklogo+this.homeSubmenu(this.#data,'/'))));
                html+=this.headerMobile(this.navMobile(this.mobile_menuHome()+this.mobile_menuLogin()));
            
            }
        }else{
            if(url=='/'){
                html+=this.header(this.nav(this.wrapContainer(this.Linklogo+this.homeSubmenu(false,'/'))));
                html+=this.headerMobile(this.navMobile(this.mobile_menuHome()+this.mobile_menuLogin()));
            }else{
                //halaman login;
                html = this.loginPage()
            }
        }
        return html
    }
    pc_menuFiturUtama(){
        let html = ""
        html+=this.headerFitur(this.navFitur(this.wrapContainer(this.Linklogo+this.homeSubmenu(this.#data,'/dashboard'))));
        return html;
    }
}
