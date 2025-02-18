export default function dataPenandaTanganKepsek(tahun){
    const data = [
        {   
            kode:2014,
            kepsek:'Uni Surati, S.Pd',
            nip:'19620619 198204  2 001'
        },
        {   
            kode:2015,
            kepsek:'Uni Surati, S.Pd',
            nip:'19620619 198204  2 001'
        },
        {   
            kode:2016,
            kepsek:'Uni Surati, S.Pd',
            nip:'19620619 198204  2 001'
        },
        {   
            kode:2017,
            kepsek:'Uni Surati, S.Pd',
            nip:'19620619 198204  2 001'
        },
        {   
            kode:2018,
            kepsek:'Ajun Karyuli, M.Pd',
            nip:'19640716 198610 1 007'
        },
        {   
            kode:2019,
            kepsek:'Ajun Karyuli, M.Pd',
            nip:'19640716 198610 1 007'
        },
        {   
            kode:2020,
            kepsek:'Ahmad Sadeli, M.Pd.I',
            nip:'19721129 200801 1 004'
        },
        {   
            kode:2021,
            kepsek:'Supriyanto, M.Pd',
            nip:'19720916 200604 1 007'
        },
        {   
            kode:2022,
            kepsek:'Supriyanto, M.Pd',
            nip:'19720916 200604 1 007'
        },
        {   
            kode:2023,
            kepsek:'Yoce Magdalena, S.Pd.SD',
            nip:'19730720 200003 2 005'
        },
        {   
            kode:2024,
            kepsek:'Yoce Magdalena, S.Pd.SD',
            nip:'19730720 200003 2 005'
        },
    ]
    return data.find(s=>s.kode==tahun);
}