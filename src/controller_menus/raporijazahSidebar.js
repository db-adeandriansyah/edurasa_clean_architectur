export const raporSidebar = (arrriwayat=[])=> [
    {
        title:'Rekap Nilai Raport ',
        menu:[
        {value:'new_rekapraport_asli',text:'Asli',name:'menusidebar'},
        {value:'new_rekapraport_olahan',text:'Olahan',name:'menusidebar'},
        {value:'new_rekapraport_olahan_bandingan',text:'Perbandingan Semester lalu',name:'menusidebar'},
        {value:'new_rekapraport_asli_keterampilan',text:'Asli Keterampilan',name:'menusidebar', name2:'kurtilas'},
        {value:'new_rekapraport_olahan_keterampilan',text:'Olahan Keterampilan',name:'menusidebar',name2:'kurtilas'},
        {value:'new_rekapraport_olahan_bandingan_keterampilan',text:'Perbandingan Keterampilan',name:'menusidebar',name2:'kurtilas'},
        // {value:'KD4',text:'Olahan Keterampilan test',name:'menusidebar',name2:'kurtilas'},
        {value:'KD1',text:'KD Spiritual',name:'menusidebar', name2:'kurtilas'},
        {value:'KD2',text:'KD Sosial',name:'menusidebar',name2:'kurtilas'},
        
        ]
    },{
        title:'Deskripsi Rapor ',
        menu:[
        {value:'deskripsi_predikat',text:'Setting Predikat',name:'menusidebar'},
        {value:'deskripsi_asli',text:'Asli',name:'menusidebar'},
        {value:'deskripsi_olahan',text:'Olahan',name:'menusidebar'},
        {value:'deskripsi_asli_keterampilan',text:'Asli Keterampilan',name:'menusidebar', name2:'kurtilas'},
        {value:'deskripsi_olahan_keterampilan',text:'Olahan Keterampilan',name:'menusidebar', name2:'kurtilas'},
        
        ]
    },{
        title:'Daftar Perkembangan',
        menu:[
        {value:'tttb',text:'Tinggi/Berat Badan',name:'menusidebar'},
        {value:'kesehatan',text:'Kesehatan',name:'menusidebar'},
        {value:'ekskul',text:'Ekstrakulikuler',name:'menusidebar'},
        {value:'prestasi',text:'Prestasi',name:'menusidebar'},
        {value:'saran_saran',text:'Saran-saran',name:'menusidebar'},
        {value:'absensi',text:'Kehadiran',name:'menusidebar'},
        {value:'kenaikankelas',text:'Kenaikan Kelas',name:'menusidebar'},
        {value:'ttm_rapor',text:'Titimangsa',name:'menusidebar'},
        ]
    },{
    title:'Cetak Rapor',
    menu:[
        {value:'sampulraport',text:'Sampul Raport',name:'menusidebar'},
        {value:'cetakrapor',text:'Halaman Isi',name:'menusidebar'}
        
    ]
    },{
    title:'Ijazah',
    menu:[
        {value:'dataolahijazah',text:'Olah Ijazah',name:'menusidebar'},
        {value:'cetakijazah',text:'Cetak Ijazah',name:'menusidebar'},
        {value:'cetakskl',text:'Surat Kelulusan',name:'menusidebar'},
        
    ]
    },
    {
    title:'Riwayat Raport',
    menu: arrriwayat
    }
];