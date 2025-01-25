/**
 * Service ini melayani persediaan data yang dibutuhkan oleh controller: RiwayatController
 * mengembalikan data-data yang dibutuhkan RiwayatController. 
 * Data yang dibutuhkan controller adalah data yang akan dibungkus oleh html di RiwayatController
 * Service ini berisi sekumpulan perintah-perintah
 */
export default class RiwayatService{
    constructor(repoFitur,mainService){
        this.repo = repoFitur;
        this.service = mainService
        // this.currentKey = currentKey, 
        // this.targetKey = targetKey,
        // this.currentRombel = currentRombel
    }
    definisiTargetKey(){
        const kodetapel = this.repo.targetKey.split('_')[1];
        const semester = this.repo.targetKey.split('_')[3];
        return {
            kode: kodetapel,
            semester : semester
        }
    }

    get findMakroInduk(){
        return this.repo.findMakroInduk();
    }
    
    async showRekapRaport(){
        let result ={};
        //definisikan appi;
        let siswaSesuaiSaatIni = [];
        let siswaSesuaiSaatIni_notFound= [];
        let siswaSaatIni_notFound_diTapelTarget = [];
        

        //cekreiwayat = 
        let riwayat = this.findMakroInduk;
        let targetRombel = riwayat.target.rombel;
        let keteranganFitur = `<b class="text-success">Rekap Raport </b>pada Tahun pelajaran ${riwayat.target.tapel} semester ${riwayat.target.semester}, siswa ${this.repo.currentRombel} Anda TIDAK ADA/Belum menjadi siswa`;
        
        // nama dbInduk yang disimpan diService
        let namaDbIndukService = 'induk_'+riwayat.target.kode_tapel+'_'+riwayat.target.semester;

        // service data yang telah tersimpan:
        let stateData = this.service.data;

        //pengecekan apakah telah disimpan atau belum; 
        // mengemnbalikan data Array dari Db jika ditemukan, dan undefined jika tidak ditemukan,
        let isExistData = Object.keys(stateData).find(s=>s===namaDbIndukService);
        
        //cek lokal :
        const lokalDbSiswa = JSON.parse(window.localStorage.getItem('dbSiswa'));
        const siswaCurrentRombel = lokalDbSiswa.filter(s=>s.aktif==='aktif' && s.nama_rombel===this.repo.currentRombel);
        const ids_siswaCurrentRombel = siswaCurrentRombel.map(n=>(n.id).toString());
        
        
        if(riwayat.next){
            keteranganFitur = `<b class="text-success">Rekap Raport </b>pada Tahun pelajaran ${riwayat.target.tapel} semester ${riwayat.target.semester}, siswa ${this.repo.currentRombel} Anda adalah siswa kelas ${riwayat.target.rombel} (kurikulum ${riwayat.target.kurikulum})`;
        }
        //panggil api, jika tidak ditemukan
        if(isExistData){
            siswaSesuaiSaatIni = stateData[namaDbIndukService].filter(s=>ids_siswaCurrentRombel.includes((s.tokensiswa).toString()));
            siswaSesuaiSaatIni_notFound = stateData[namaDbIndukService].filter(s=>!ids_siswaCurrentRombel.includes((s.tokensiswa).toString()) && s.rombel === targetRombel);
            let idDitemukan_siswaSesuaiSaatIni = siswaSesuaiSaatIni.map(n=>(n.tokensiswa).toString());
            siswaSaatIni_notFound_diTapelTarget = siswaCurrentRombel.filter(s=>!idDitemukan_siswaSesuaiSaatIni.includes((s.id).toString()));
            
        }else{
            const api =  await this.repo.panggilDbIndukCurrent();
    
            if(api.info.findTab){ 
                this.service.data[namaDbIndukService]= api.data;
                siswaSesuaiSaatIni = api.data.filter(s=>ids_siswaCurrentRombel.includes((s.tokensiswa).toString()));
                siswaSesuaiSaatIni_notFound = api.data.filter(s=>!ids_siswaCurrentRombel.includes((s.tokensiswa).toString()) && s.rombel === targetRombel);
                let idDitemukan_siswaSesuaiSaatIni = siswaSesuaiSaatIni.map(n=>(n.tokensiswa).toString());
                siswaSaatIni_notFound_diTapelTarget = siswaCurrentRombel.filter(s=>!idDitemukan_siswaSesuaiSaatIni.includes((s.id).toString()));
            }
        }
        // result.page = htmlPage;
        result.siswaCurrentRombel                   = siswaCurrentRombel;
        result.riwayat                              = riwayat;
        result.fitur                                = keteranganFitur;
        result.siswaSesuaiSaatIni                   = siswaSesuaiSaatIni.map(n=>({...n, profil:lokalDbSiswa.find(s=>s.id == n.tokensiswa)}));
        result.siswaSesuaiSaatIni_notFound          = siswaSesuaiSaatIni_notFound.map(n=>({...n, profil:lokalDbSiswa.find(s=>s.id == n.tokensiswa)}));
        result.siswaSaatIni_notFound_diTapelTarget  = siswaSaatIni_notFound_diTapelTarget.map(n=>({...n, profil:lokalDbSiswa.find(s=>s.id == n.tokensiswa)}));;
        // result.targetTapel = riwayat.target.tapel
        return result

    }
    async showInduk(){
        let result ={};
        //definisikan appi;
        let siswaSesuaiSaatIni = [];
        let siswaSesuaiSaatIni_1 = [];
        let siswaSesuaiSaatIni_2 = [];
        let siswaSesuaiSaatIni_notFound= [];
        let siswaSaatIni_notFound_diTapelTarget = [];
        

        //cekreiwayat = 
        let riwayat = this.findMakroInduk;
        let targetRombel = riwayat.target.rombel;
        let keteranganFitur = `<b class="text-success">Rekap Raport </b>pada Tahun pelajaran ${riwayat.target.tapel} semester ${riwayat.target.semester}, siswa ${this.repo.currentRombel} Anda TIDAK ADA/Belum menjadi siswa`;
        
        // nama dbInduk fokus yang diklik di sidebar;
        let namaDbIndukService = 'induk_'+riwayat.target.kode_tapel+'_'+riwayat.target.semester;

        // dbInduk yang dibutuhkan:
        let arrDbIdssInduk = [
            {
                key: 'induk_'+riwayat.target.kode_tapel+'_1',
                idss: riwayat.target.idss,
                tab : 'main',
                filter: JSON.stringify({'semester':'1'})
            },
            {
                key: 'induk_'+riwayat.target.kode_tapel+'_2',
                idss: riwayat.target.idss,
                tab : 'main',
                filter: JSON.stringify({'semester':'2'})
            }
        ];
        let keyNeed = arrDbIdssInduk.map(m=>m.key);


        // service data yang telah tersimpan:
        let stateData = this.service.data;

        //pengecekan apakah telah disimpan atau belum; 
        // mengemnbalikan data Array dari Db jika ditemukan, dan array kosong =[] jika tidak ditemukan,
        // tapi yang pasti ini bakal ada isinya, meski itu satu data;
        let isExistData = Object.keys(stateData).filter(s=>keyNeed.includes(s));
        let needKeyFounded = arrDbIdssInduk.find(s=>isExistData.includes(s.key));
        
        //cek yang belum dipanggil
        let isNotExistData = arrDbIdssInduk.find(s=>!isExistData.includes(s.key));

        //cek lokal :
        const lokalDbSiswa = JSON.parse(window.localStorage.getItem('dbSiswa'));
        const siswaCurrentRombel = lokalDbSiswa.filter(s=>s.aktif==='aktif' && s.nama_rombel===this.repo.currentRombel);
        const ids_siswaCurrentRombel = siswaCurrentRombel.map(n=>(n.id).toString());
        
        
        if(riwayat.next){
            keteranganFitur = `<b class="text-success">Rekap Raport </b>pada Tahun pelajaran ${riwayat.target.tapel} semester ${riwayat.target.semester}, siswa ${this.repo.currentRombel} Anda adalah siswa kelas ${riwayat.target.rombel} (kurikulum ${riwayat.target.kurikulum})`;
        }
        //panggil api, jika tidak ditemukan
        if(isNotExistData){
            
            const api =  await this.repo.panggilDbInduk(isNotExistData);
    
            if(api.info.findTab){ 
                this.service.data[isNotExistData.key]= api.data;
                const merging = this.service.data[needKeyFounded.key].concat(api.data);
                this.service.data['induk_'+riwayat.target.kode_tapel+'_all'] = merging
                siswaSesuaiSaatIni = merging.filter(s=>ids_siswaCurrentRombel.includes((s.tokensiswa).toString()));
                siswaSesuaiSaatIni_1 = siswaSesuaiSaatIni.filter(s=>s.semester == 1);
                siswaSesuaiSaatIni_2 = siswaSesuaiSaatIni.filter(s=>s.semester == 2);
                siswaSesuaiSaatIni_notFound = merging.filter(s=>!ids_siswaCurrentRombel.includes((s.tokensiswa).toString()) && s.rombel === targetRombel);
                let idDitemukan_siswaSesuaiSaatIni = siswaSesuaiSaatIni.map(n=>(n.tokensiswa).toString());
                siswaSaatIni_notFound_diTapelTarget = siswaCurrentRombel.filter(s=>!idDitemukan_siswaSesuaiSaatIni.includes((s.id).toString()));

            }
            
        }else{
            console.log('this.service.data', this.service.data);
            console.log('this.service.data_induk',  this.service.data['induk_'+riwayat.target.kode_tapel+'_all']);
            const merging = this.service.data['induk_'+riwayat.target.kode_tapel+'_all'];
            console.log('merging', merging);
            if(merging){
                siswaSesuaiSaatIni = merging.filter(s=>ids_siswaCurrentRombel.includes((s.tokensiswa).toString()));
                
                siswaSesuaiSaatIni_1 = siswaSesuaiSaatIni.filter(s=>s.semester == 1);
                siswaSesuaiSaatIni_2 = siswaSesuaiSaatIni.filter(s=>s.semester == 2);
                siswaSesuaiSaatIni_notFound = merging.filter(s=>!ids_siswaCurrentRombel.includes((s.tokensiswa).toString()) && s.rombel === targetRombel);
                let idDitemukan_siswaSesuaiSaatIni = siswaSesuaiSaatIni.map(n=>(n.tokensiswa).toString());
                siswaSaatIni_notFound_diTapelTarget = siswaCurrentRombel.filter(s=>!idDitemukan_siswaSesuaiSaatIni.includes((s.id).toString()));

            }

        }
        
        // result.page = htmlPage;
        result.siswaCurrentRombel                   = siswaCurrentRombel;
        result.riwayat                              = riwayat;
        result.fitur                                = keteranganFitur;
        result.siswaSesuaiSaatIni                   = siswaSesuaiSaatIni.map(n=>({...n, profil:lokalDbSiswa.find(s=>s.id == n.tokensiswa)}));
        result.siswaSesuaiSaatIni_1                   = siswaSesuaiSaatIni_1.map(n=>({...n, profil:lokalDbSiswa.find(s=>s.id == n.tokensiswa)}));
        result.siswaSesuaiSaatIni_2                   = siswaSesuaiSaatIni_2.map(n=>({...n, profil:lokalDbSiswa.find(s=>s.id == n.tokensiswa)}));
        result.siswaSesuaiSaatIni_notFound          = siswaSesuaiSaatIni_notFound.map(n=>({...n, profil:lokalDbSiswa.find(s=>s.id == n.tokensiswa)}));
        result.siswaSaatIni_notFound_diTapelTarget  = siswaSaatIni_notFound_diTapelTarget.map(n=>({...n, profil:lokalDbSiswa.find(s=>s.id == n.tokensiswa)}));;
        // result.targetTapel = riwayat.target.tapel
        return result

    }
}