const gurukelas =  [
        {value:'data_kelas',text:'Daftar Kelas', name:'menusidebar'},
        {value:'siswa_Jenjang',text:'Daftar Siswa Jenjang ini', name:'menusidebar'}
    ];

const dataSiswaSidebar = [
    {
        title:'Data Kelas',
        menu:gurukelas
    },
    {
        title:'Pencarian Data Siswa',
        menu:[
            {value:'cari_siswa',text:'Cari siswa',name:'menusidebar'},
        ]
    },
    {
        title:'Surat Keterangan',
        menu:[
            {value:'sk',text:'Surat Keterangan Aktif',name:'menusidebar'},
            {value:'sk_NISN',text:'Surat Keterangan NISN',name:'menusidebar'},
            {value:'sk_diterimasekolah',text:'Surat Keterangan Diterima Sekolah',name:'menusidebar'},
            {value:'sk_pindah',text:'Surat Keterangan Pindah',name:'menusidebar'},
        ]
    },
    {
        title:'Data Mutasi',
        menu:[
            {value:'mutasi_masuk',text:'Mutasi Masuk',name:'menusidebar'},
            {value:'mutasi_keluar',text:'Mutasi Keluar',name:'menusidebar'},
            {value:'mutasi_laporan',text:'Laporan Bulanan',name:'menusidebar'},
        ]
    },
    {
        title:'Statistik Data Siswa',
        menu:[
            {value:'statistik_umur',text:'Statistik Umur',name:'menusidebar'},
            {value:'statistik_agama',text:'Statistik Agama',name:'menusidebar'},
        ]
    },
    {
        title:'Tambah Siswa',
        menu:[
            {value:'tambah_siswa',text:'Tambah Siswa', name:'menusidebar'}
        ]
    },
];

// export default dataSiswaSidebar;
export {dataSiswaSidebar as default, gurukelas}