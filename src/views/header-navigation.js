const pcNavigation = (arg,slot,targetLink)=>{
return `<div class="container-fluid  shadow-lg fixed-top d-none d-md-block px-0">
    <nav class="navbar navbar-expand-sm my-0">
        <div class="container">
            <a href="${targetLink}" class="navbar-brand">
                <img src="${arg.logo}" alt="logo lamaso edurasa" width="40" height="40" class="img-thumbnail"/>
                <span class="nav-link text-white d-inline">Tapel ${arg.tapel} Semester ${arg.semester}</span>
            </a>
            ${slot}
        </div>
    </nav>
</div>`;
}

const  pcItemMenus = (slot)=>{
return `<div class="navbar-collapse collapse">
            <ul class="navbar-nav ms-auto">
                <li class="nav-item ">
                    <a href="#section1" class="nav-link cool-link text-white ">Tentang Edurasa</a>
                </li>
                <li>
                    <a href="#section2" class="nav-link cool-link text-white ">Profil Sekolah</a>
                </li>
                <li>
                    <a href="#section3" class="nav-link cool-link text-white ">PTK</a>
                </li>
                <li>
                    ${slot}
                </li>
            </ul>
        </div>`  
}
export const pcItemProfile = (namaUser,imgUser)=>{
    return `
    <div class="dropdown"> 
            <button class="btn dropdown-toggle akun" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                <span class="text-white cool-link">${namaUser}</span>
                <img src="${imgUser.replace('https://drive.google.com/uc?export=view&id=','https://lh3.googleusercontent.com/d/')}" width="30" height="30" alt="profil ${namaUser}" style="object-fit:cover" class="rounded-circle d-none d-md-inline-block">
            </button> 
            <ul class="dropdown-menu dropdown-menu-end" aria-labelledby="dropdownMenuButton1"> 
                <li><a class="dropdown-item" href="/profil">Profil</a></li> 
                <li><a class="dropdown-item" href="/dashboard">Dashboard</a></li> 
                <li><button class="btn-link dropdown-item btn-logout">Logout</button></li>
                <li></li>
            </ul> 
        </div> `
}
const pcItemProfileDashboard = (namaUser,imgUser)=>{
    return `
    <div class="dropdown"> 
            <button class="btn dropdown-toggle akun" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                <span class="text-white cool-link">${namaUser}</span>
                <img src="${imgUser.replace('https://drive.google.com/uc?export=view&id=','https://lh3.googleusercontent.com/d/')}" width="30" height="30" alt="profil ${namaUser}"  style="object-fit:cover" class="rounded-circle d-none d-md-inline-block"/>
            </button> 
            <ul class="dropdown-menu dropdown-menu-end" aria-labelledby="dropdownMenuButton1"> 
                <li><a class="dropdown-item" href="/profil">Profil</a></li> 
                <li><button class="btn-link dropdown-item btn-logout">Logout</button></li>
            </ul> 
        </div> `
}

const mobileNavigation =(imgUser)=>{
return `<div class="container-fluid fixed-bottom shadow-sm d-block neon-lite-transisi scrolled d-md-none overflow-scroll" style="max-height:75%">
<div class="collapse show mt-2" id="navbarToggleExternalContent">
    <div class="bg-light p-4 mb-5 rounded">
        <h5 class="text-body-emphasis h4">Konfirmasi...</h5>
        <span class="text-body-secondary">Anda yakin ingin keluar?</span>
        <button class="btn btn-danger btn-logout">Ya, saya Keluar</button>
        <a href="/profil">Edit Profil</a>
    </div>
</div>
<div class="collapse show mt-2" id="navbarToggleExternalContent2">
    <div class="bg-light p-4 mb-5 rounded">
        <div class="vh-100">test</div>
        <h5 class="text-body-emphasis h4">Konfirmasi...12</h5>
        <span class="text-body-secondary">Anda yakin ingin keluar?</span>
        <div class="vh-100">test</div>
        <button class="btn btn-danger btn-logout">Ya, saya Keluar</button>
    </div>
</div>
<div class="d-flex justify-content-evenly py-1 ps-0 z-3 fixed-bottom neon-lite-transisi scrolled">
    <a href="/" class="btn btn-sm btn-outline-danger rounded-circle fs-5"><i class="bi bi-house-fill"></i></a>
    
    <button class="btn btn-sm btn-outline-success fs-5 p-0 rounded-circle overflow-hidden btn-collapse" data-target-collapse="navbarToggleExternalContent" aria-expanded="false" aria-label="Toggle navigation">
        <img src="${imgUser.replace('https://drive.google.com/uc?export=view&id=','https://lh3.googleusercontent.com/d/')}" class="object-fit-cover" width="37" alt="profil"  alt="edurasa logo" height="37">
    </button>
</div>
</div>`
}
const mobileNavigationGuest = (url)=>{
    return`<div class="container-fluid shadow-sm fixed-bottom d-block bg-color1 d-md-none">
    <div class="d-flex justify-content-evenly py-1 ps-0">
        <a href="/" class="btn btn-sm ${url=='home'?'bg-white btn-outline-danger':''} rounded-circle fs-5"><i class="bi bi-house-fill  neon-lite-transisi scrolled text-clip"></i></a>
        <a href="/login" class="btn btn-sm ${url=='login'?'bg-white btn-outline-light':''} fs-5 rounded-circle"><i class="bi-person-circle neon-lite-transisi scrolled text-clip"></i></a>
    </div>
</div>`
}
const mobileNavigationFitur =(imgUser,menus=[])=>{
    console.log(menus)
    let addMenu = "<h3>Menu Navigasi:</h3>";
    addMenu+=`<ul class="navbar-nav"><li class="nav-item"><a class="nav-link " href="${menus[0].target}">${menus[0].icon} ${menus[0].title}</a></li>`
    for(let i = 1 ; i <menus.length ; i++){
        addMenu+= '<li class="nav-item d-flex justify-content-between"><a class="nav-link" href="'+menus[i].target + '">'+menus[i].icon+' '+menus[i].title+'</a>'+menus[i].tersedia+'</li>'

    }
    addMenu+=`</ul>`
return `<div class="container-fluid fixed-bottom shadow-sm d-block neon-lite-transisi scrolled d-md-none overflow-scroll" style="max-height:75%">
<div class="collapse mt-2" id="navbarToggleExternalContent">
    <div class="bg-light p-4 mb-5 rounded">
        <h5 class="text-body-emphasis h4">Konfirmasi...</h5>
        <span class="text-body-secondary">Anda yakin ingin keluar?</span>
        
        <button class="btn btn-danger btn-logout">Ya, saya Keluar</button>
        <a href="/profil" class="text-decoration-none text-end fw-bold text-dark fs-5 d-block">Edit Profile</a>
        
    </div>
</div>
<div class="collapse mt-2" id="navbarToggleExternalContent2">
    <div class="bg-light pt-2 px-4 mb-5 rounded">
        ${addMenu}
    </div>
</div>
<div class="d-flex justify-content-evenly py-1 ps-0 z-3 fixed-bottom neon-lite-transisi scrolled">
    <a href="/" class="btn btn-sm btn-outline-danger rounded-circle fs-5"><i class="bi bi-house-fill"></i></a>
    
    <button class="btn btn-sm p-0  overflow-hidden btn-collapse" data-target-collapse="navbarToggleExternalContent2" aria-expanded="false" aria-label="Toggle navigation">
        <svg xmlns="http://www.w3.org/2000/svg" width="37" height="37" fill="currentColor" class="bi bi-grid-3x3-gap-fill" viewBox="0 0 16 16">
        <path d="M1 2a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2zm5 0a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V2zm5 0a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1h-2a1 1 0 0 1-1-1V2zM1 7a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V7zm5 0a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V7zm5 0a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1h-2a1 1 0 0 1-1-1V7zM1 12a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1v-2zm5 0a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1v-2zm5 0a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1h-2a1 1 0 0 1-1-1v-2z"/>
        </svg>
    </button>
    <button class="btn btn-sm btn-outline-success fs-5 p-0 rounded-circle overflow-hidden btn-collapse" data-target-collapse="navbarToggleExternalContent" aria-expanded="false" aria-label="Toggle navigation">
        <img src="${imgUser.replace('https://drive.google.com/uc?export=view&id=','https://lh3.googleusercontent.com/d/')}" class="object-fit-cover" width="37" alt="profil"  alt="edurasa logo" height="37">
    </button>
</div>
</div>`
}

export function headerNavigationAuto(path,data,menu=[]){
    let html = "";
    let defaultArgumen = {
        logo        :'',
        tapel       :'',
        semester    :'',
        typeUser    :'guest',
        namaUser    :'',
        imgUser     :''
    }
    
    let argumen = Object.assign({},defaultArgumen,data);
    
    /**PC */
    let urlHome = `<a href="/" class="nav-link cool-link text-white ">Beranda</a>`;
    let urlGuest = `<a href="/login" class="nav-link cool-link text-white ">Login</a>`;
    let urlHasLogin = pcItemProfile(argumen.namaUser, argumen.imgUser);
    let profileDashbord = pcItemProfileDashboard(argumen.namaUser, argumen.imgUser);
    let mobileDashbord =mobileNavigation(argumen.imgUser);
    let menuBeranda = "";
    let menuLogin = "";
    let menuBeforeLogin = `<a class="navbar-nav ms-auto nav-link" href="/"><i class="b bi-house-fill "></i> Home</a>`;
    let menuhasLogin = `<a class="navbar-nav ms-auto nav-link" href="/"><i class="b bi-house-fill "></i> Home</a>`;
    let menuHomeMobile = "";
    if(argumen.typeUser == 'guest'){
        menuBeranda+=pcItemMenus(urlGuest);
        menuLogin +=pcItemMenus(urlHome);
        
        // menuHomeMobile +=mobileNavigationGuest(argumen.imgUser);
    }else{
        menuBeranda+=pcItemMenus(urlHasLogin);
        // menuHomeMobile +=mobileNavigationFitur(argumen.imgUser);
    }
    
    /**Mobile */

    if(path == "/"){
        html+=pcNavigation(argumen,menuBeranda,'/');
        html+= argumen.typeUser=="guest"? mobileNavigationGuest('home'):mobileNavigationFitur(argumen.imgUser,menu);;
    }else if(path == '/login'){
        // html+=pcNavigation(argumen.logo,menuLogin,'/');
        html+=pcNavigation(argumen,menuBeforeLogin,'/');
        html+=mobileNavigationGuest('login');
    }else if(path=='/dashboard'){
        html+=pcNavigation(argumen,profileDashbord,'/');
        // html+=mobileNavigation(argumen.imgUser,menu);
        html+=mobileNavigationFitur(argumen.imgUser,menu)
    }else{
        html+=pcNavigation(argumen,pcItemProfile(argumen.namaUser,argumen.imgUser),'/');
        html+=mobileNavigationFitur(argumen.imgUser,menu);
    }
    
    return html;

}