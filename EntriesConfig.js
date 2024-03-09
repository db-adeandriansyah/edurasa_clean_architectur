const EntriePoint=  {
    'index'         :{import:'./src/entries/index.js'       ,dependOn:'app'},
    'login'         :{import:'./src/entries/login.js'       ,dependOn:'app'},
    'dashboard'     :{import:'./src/entries/dashboard.js'   ,dependOn:'app'},
    'notfound'      :{import:'./src/entries/404.js'         ,dependOn:'app'},
    'datasiswa'     :{import:'./src/entries/datasiswa.js'   ,dependOn:['app','vendor','pdf']},
    'arsipsurat'     :{import:'./src/entries/arsipsurat.js'   ,dependOn:['app','vendor','pdf']},
    'absensi'     :{import:'./src/entries/absensi.js'   ,dependOn:['app','vendor','pdf']},
    'app'           :'./src/apps/Singleton.js',//{import:'./src/apps/Singleton.js'},
    'vendor'        :'./src/entries/vendor.js',//{import:'./src/entries/vendor.js'},
    'style'         :'./src/entries/style.js' ,//{import:'./src/entries/style.js' },
    // 'helper'      rt:'./src/apps/helper.js',//  :{import:'./src/apps/helper.js'},npm 
    'pdf'           :'./src/entries/style.js',// {import:'./src/entries/style.js' }
}

//page utama;
const pagesConfig = [
    {   title:'Edurasa',
        template:'./src/templates/index.html',
        //favicon:'./src/img/lamaso.ico',
        inject:"body",
        meta: {
            'description':'Aplikasi Manajemen Berbasis Sekolah SDN Ratujaya 1',
            'theme-color': '#ffffff',
            'apple-mobile-web-app-status-bar':'#ffffff'
        },
        chunks:['style','index','app','vendor'],
        publicPath:'/'
    }, 
    {   title:'Edurasa | Login',
        template:'./src/templates/login.html',
        //favicon:'./src/img/lamaso.ico',
        filename:'/login/index.html',
        inject:"body",
        meta: {
            'description':'Aplikasi Manajemen Berbasis Sekolah SDN Ratujaya 1',
            'theme-color': '#ffffff',
            'apple-mobile-web-app-status-bar':'#ffffff'
        },
        chunks:['style','login','app','vendor'],
        publicPath:'/'
    },
    {   title:'404 | Not Found',
        template:'./src/templates/index.html',
        //favicon:'./src/img/lamaso.ico',
        filename:'/404/index.html',
        inject:"body",
        meta: {
            'description':'Aplikasi Manajemen Berbasis Sekolah SDN Ratujaya 1',
            'theme-color': '#ffffff',
            'apple-mobile-web-app-status-bar':'#ffffff'
        },
        chunks:['style','notfound','app','vendor'],
        publicPath:'/'
    },
    {
        title:'Edurasa | Dashboard',
        template:'./src/templates/dashboard.html',
        //favicon:'./src/img/lamaso.ico',
        filename:'/dashboard/index.html',
        inject:"body",
        meta: {
            'description':'Aplikasi Manajemen Berbasis Sekolah SDN Ratujaya 1',
            'theme-color': '#ffffff',
            'apple-mobile-web-app-status-bar':'#ffffff'
        },
        chunks:['style','dashboard','app','vendor'],
        publicPath:'/'
    },
    {
        title:'Edurasa | Data Siswa',
        template:'./src/templates/fitur.html',
        //favicon:'./src/img/lamaso.ico',
        filename:'/data-siswa/index.html',
        inject:"body",
        meta: {
            'description':'Aplikasi Manajemen Berbasis Sekolah SDN Ratujaya 1',
            'theme-color': '#ffffff',
            'apple-mobile-web-app-status-bar':'#ffffff'
        },
        chunks:['style','datasiswa','pdf','app','vendor'],
        publicPath:'/'
    },
    {
        title:'Edurasa | Arsip Surat',
        template:'./src/templates/fitur.html',
        //favicon:'./src/img/lamaso.ico',
        filename:'/arsip-surat/index.html',
        inject:"body",
        meta: {
            'description':'Aplikasi Manajemen Berbasis Sekolah SDN Ratujaya 1',
            'theme-color': '#ffffff',
            'apple-mobile-web-app-status-bar':'#ffffff'
        },
        chunks:['style','arsipsurat','pdf','app','vendor'],
        publicPath:'/'
    },
    {
        title:'Edurasa | Absensi Siswa',
        template:'./src/templates/fitur.html',
        //favicon:'./src/img/lamaso.ico',
        filename:'/absensi/index.html',
        inject:"body",
        meta: {
            'description':'Aplikasi Manajemen Berbasis Sekolah SDN Ratujaya 1',
            'theme-color': '#ffffff',
            'apple-mobile-web-app-status-bar':'#ffffff'
        },
        chunks:['style','absensi','pdf','app','vendor'],
        publicPath:'/'
    }
];


module.exports = {EntriePoint, pagesConfig};