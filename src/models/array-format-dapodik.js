
const AGAMA = [
    {
        'value':'','label':'Belum Memilih'
    },
    {
    'value':'ISLAM','label':'ISLAM'
    },
    {
        'value':'KRISTEN','label':'KRISTEN'
    },
    {
        'value':'KATHOLIK','label':'KATHOLIK'
    },
    {
        'value':'HINDU','label':'HINDU'
    },
    {
        'value':'BUDHA','label':'BUDHA'
    },
    {
        'value':'KHONGHUCU','label':'KHONGHUCU'
    },
    
    ];

const GENDER = [
        {'value':"",'label':'Belum Memilih'},
        {'value':"L",'label':'Laki-laki'},
        {'value':'P','label':'Perempuan'},
    ];

const ABK=[
    {value:"",label:"Silakan Pilih"},
    {value:"TIDAK",label:"Tidak"},
    {value:"NETRA (A)",label:"Netra (A)"},
    {value:"RUNGU (B)",label:"Rungu (B)"},
    {value:"GRAHITA RINGAN (C)",label:"Grahita Ringan (C)"},
    {value:"GRAHITA SEDANG (C1)",label:"Grahita Sedang (C1)"},
    {value:"DAKSA RINGAN (D)",label:"Daksa Ringan (D)"},
    {value:"DAKSA SEDANG (D1)",label:"Daksa Sedang (D1)"},
    {value:"INDIGO (O)",label:"Indigo (O)"},
    {value:"DOWN SINDROME (P)",label:"Down Sindrome (P)"},
    {value:"AUTIS (Q)",label:"Autis (Q)"},
    {value:"LARAS (E)",label:"Laras ( E)"},
    {value:"WICARA (F)",label:"Wicara (F)"},
    {value:"TUNA GANDA (G)",label:"Tuna Ganda (G)"},
    {value:"HIPERAKTIF (H)",label:"Hiperaktif (H)"},
    {value:"CERDAS ISTIMEWA (I)",label:"Cerdas Istimewa (i)"},
    {value:"BAKAT ISTIMEWA (J)",label:"Bakat Istimewa (J)"},
    {value:"KESULITAN BELAJAR (K)",label:"Kesulitan Belajar (K)"}
];
const JENIS_TINGGAL = [
    {value:'',label:'Belum Memilih'},
    {value:'Bersama Orang Tua',label:'Bersama Orang Tua'},
    {value:'Wali',label:'Wali'},
    {value:'Kos',label:'Kos'},
    {value:'Asrama',label:'Asrama'},
    {value:'Panti Asuhan',label:'Panti Asuhan'},
    {value:'Lainnya',label:'Lainnya'},
]
const MODA_TRANSPORTASI =[
    {value:"" ,label:"Silakan Pilih"},
    {value:"Jalan Kaki",label:"Jalan Kaki"},
    {value:"Kendaraan Pribadi",label:"Kendaraan Pribadi"},
    {value:"Kendaraan Umum/Angkot/Pete-pete",label:"Kendaraan Umum/Angkot/Pete-pete"},
    {value:"Jemputan Sekolah",label:"Jemputan Sekolah"},
    {value:"Kereta Api",label:"Kereta Api"},
    {value:"Ojek",label:"Ojek"},
    {value:"Andong/Bendi/Sado/Dokar/Delman/Beca",label:"Andong/Bendi/Sado/Dokar/Delman/Beca"},
    {value:"Perahu Penyebrangan/Rakit/Getek",label:"Perahu Penyebrangan/Rakit/Getek"},
    {value:"Lainnya",label:"Lainnya"}
];
const PENDIDIKAN=[
    {value:"",label:"Silakan Pilih"},
    {value:"Tidak Sekolah",label:"Tidak Sekolah"},
    {value:"Putus SD",label:"Putus SD"},
    {value:"SD Sederajat",label:"SD Sederajat"},
    {value:"SMP Sederajat",label:"SMP Sederajat"},
    {value:"SMA Sederajat",label:"SMA Sederajat"},
    {value:"DI",label:"D1"},
    {value:"D2",label:"D2"},
    {value:"D3",label:"D3"},
    {value:"D4/S1",label:"D4/S1"},
    {value:"S2",label:"S2"},
    {value:"S3",label:"S3"},
];
const PEKERJAAN = [
    {value:"",label:"Silakan Pilih"},
    {value:"Tidak bekerja",label:"Tidak bekerja"},
    {value:"Nelayan",label:"Nelayan"},
    {value:"Petani",label:"Petani"},
    {value:"Peternak",label:"Peternak"},
    {value:"PNS/TNI/Polri",label:"PNS/TNI/Polri"},
    {value:"Karyawan Swasta",label:"Karyawan Swasta"},
    {value:"Pedagang Kecil",label:"Pedagang Kecil"},
    {value:"Pedagang Besar",label:"Pedagang Besar"},
    {value:"Wiraswasta",label:"Wiraswasta"},
    {value:"Wirausaha",label:"Wirausaha"},
    {value:"Buruh",label:"Buruh"},
    {value:"Pensiunan",label:"Pensiunan"},
    {value:"Tenaga Kerja Indonesia (TKI)",label:"Tenaga Kerja Indonesia (TKI)"},
    {value:"Tidak dapat diterapkan",label:"Tidak dapat diterapkan"},
    {value:"Meninggal Dunia",label:"Meninggal Dunia"},
    {value:"Lainnya",label:"Lainnya"}
];
const TglTypeDbSiswa = [
    'pd_tanggallahir',
    'dapo_tahunlahirayah',
    'dapo_tahunlahiribu',
    'dapo_tahunlahirwali',
    'masuk_tgl',
    'keluar_tgl',
    'keluar_tgl2',
    'pdb_tgl',
    'tahunindukdate'
  ];
  
const arLabel={
    'agama':AGAMA,
    'gender':GENDER,
    'abk':ABK,
    'jenis_tinggal':JENIS_TINGGAL,
    'moda_transportasi':MODA_TRANSPORTASI,
    'pendidikan':PENDIDIKAN,
    'pekerjaan':PEKERJAAN,
    'keyTgl':TglTypeDbSiswa

}

export default arLabel;