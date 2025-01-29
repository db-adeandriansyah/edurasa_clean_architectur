import { CollectionsEdu } from "../models/CollectionsEdu";

export default class BukuIndukService{
    #dbData;
    #collectionsInduk;
    constructor(repo){
        this.repo = repo;
        this.#dbData = {};
        this.#collectionsInduk = []
    }
    get db(){
        return this.#dbData
    }
    set db(x){
        this.#dbData = x;
    }
    get ormInduk(){
        return this.#collectionsInduk;
    }
    async siswa(){
        if(!this.#dbData['siswa']){
            const apiSiswa = await this.repo.allSiswa();
            
            window.localStorage.setItem('dbSiswa',JSON.stringify(apiSiswa.data));
            this.#dbData['siswa']= apiSiswa.data;
            this.#dbData['siswa_entity']= apiSiswa.info.objKosong;  
            
        }
        return this.#dbData['siswa']??[];
    }
    async init(){
        await this.siswa();
        
        this.#collectionsInduk = new CollectionsEdu(this.#dbData.siswa.slice())
                            .addProperty('awalanInduk',(item)=>{
                                if(item.nis){
                                    return item.nis.toString().slice(0,4);
                                }else{
                                    return false
                                }
                            })
                            .uniqueByProperty('awalanInduk')
                            .addProperty('inValidInduk',item=>['1213','1314'].includes(item.awalanInduk))
                            .addProperty('datainduk',item => new CollectionsEdu(this.#dbData.siswa)
                                                        .simpleFilter({'awalanInduk':item.awalanInduk})
                                                        .exceptFilter({'pd_nama':''})
                                                        .addProperty('lastDigit',item=>{
                                                            if(item.awalanInduk){
                                                                return parseInt(item.nis.toString().slice(6,9));
                                                            }
                                                            return 0;
                                                        })
                                                        .addProperty('founded',true)
                                                        .addProperty('riwayatRapor',item=>{
                                                            let hasMasukTgl = item.masuk_tgl!=="";
                                                            if(hasMasukTgl){
                                                                let koleksi = [];
                                                                
                                                                let date = new Date(item.masuk_tgl);
                                                                let semester = date.getMonth()>5?1:2;
                                                                let thAwal = semester===1?date.getFullYear():date.getFullYear()-1;
                                                                let thAkhir = semester===1?date.getFullYear()+1:date.getFullYear();
                                                                let akhirDate = item.keluar_tgl===""?new Date():new Date(item.keluar_tgl);
                                                                let akhirSemester = akhirDate.getMonth()>5?1:2;
                                                                let akhirTahun = akhirDate.getFullYear();
                                                                let thAwalCopy = thAwal;
                                                                let thAkhirCopy = thAkhir;
                                                                let semesterCopy = semester===2?[2]:[1,2];
                                                                let awalanInduk = parseInt(thAwal.toString().slice(2,4)+thAkhir.toString().slice(2,4));
                                                                
                                                                do{
                                                                    let ob = {};
                                                                    let rombelakhir = this.#dbData['induk_'+awalanInduk]?.find(s=>s.tokensiswa==item.id && s.semester==1)?.rombel||"";
                                                                    let nilaiSemester1 = this.#dbData['induk_'+awalanInduk]?.find(s=>s.tokensiswa==item.id && s.semester==1)||this.#dbData['blangko_induk_'+awalanInduk];
                                                                    let nilaiSemester2 = this.#dbData['induk_'+awalanInduk]?.find(s=>s.tokensiswa==item.id && s.semester ==2)||this.#dbData['blangko_induk_'+awalanInduk];
                                                                    let profil = {nis:item.nis,nisn:item.nisn};;
                                                                    let findKurikulum = this.repo.makroRiwayat.find(s=>s.tapel == awalanInduk);
                                                                    ob.kodetapel = awalanInduk;
                                                                    ob.tapel = thAwalCopy+'/'+thAkhirCopy;
                                                                    ob.rombel = rombelakhir;
                                                                    ob.kurikulum = findKurikulum?.['kelas_'+parseInt(rombelakhir)+'_kurikulum']||'';
                                                                    ob.rapor_semester1 = {profil, ...nilaiSemester1};
                                                                    ob.rapor_semester2 = {profil, ...nilaiSemester2};
                                                                    ob.semester = semesterCopy;
                                                                    
                                                                    koleksi.push(ob);
                                                                    
                                                                    thAwalCopy++;
                                                                    thAkhirCopy++;
                                                                    awalanInduk+=101;
                                                                    if(thAkhirCopy === akhirTahun && akhirSemester ===1){
                                                                        semesterCopy = [1];

                                                                    }else{
                                                                        semesterCopy = [1,2];

                                                                    }
                                                                }
                                                                while(thAwalCopy<akhirTahun);
                                                                return koleksi;
                                                            }else{
                                                                return [];
                                                            }
                                                        })
                                                        .selectPropertiesExcept(['indukurut','datainduk'])
                                                        .data)
                            .addProperty('nisGanda',item=>{
                                const nisnya = item.datainduk.filter((obj,index)=>item.datainduk.findIndex(s=>s.nis === obj.nis)!==index).map(n=>n.nis.toString());
                                let result =[];
                                if(nisnya.length>0){
                                    let ob = {};
                                    nisnya.filter((itemNiso,a)=>nisnya.findIndex(fin=>fin === itemNiso)==a).forEach(itemNis => {
                                        ob.nis = itemNis;
                                        ob.data = item.datainduk.filter(s=>s.nis == itemNis);
                                        if(result.findIndex(f=>f.nis===itemNis)===-1){
                                            result.push(ob);
                                        }
                                    });
                                }
                                return result;
                            })
                            .addProperty('indukurut',item=>{
                                if(item.inValidInduk){
                                    return item.datainduk;
                                }else{
                                    let nomer = 1;
                                    let ampe =Math.max(...item.datainduk.map(n=>n.lastDigit));
                                    let data = [];
                                    while(nomer<=ampe){
                                        let stringnomber = nomer.toString().padStart(3,0);
                                        let shadowNoInduk = item.awalanInduk+'0X'+stringnomber;
                                        let findData = item.datainduk.filter(s=>s.lastDigit == nomer);
                                        if(findData.length===0){
                                            data.push({...this.#dbData['siswa_entity'],nis:shadowNoInduk, founded:false,});
                                        }else if(findData.length === 1){
                                            let salinan = Object.assign({},findData[0]);
                                            delete salinan.datainduk;
                                            delete salinan.indukurut;
                                            data.push(salinan);
                                        }else{
                                            findData.forEach(itemFind=>{
                                                let salinan = Object.assign({},itemFind);
                                                delete salinan.datainduk;
                                                delete salinan.indukurut;
                                                data.push(salinan);
                                            })
                                        }
                                        nomer++;
                                    }
                                    return new CollectionsEdu(data).removeProperty('datainduk').removeProperty('indukurut').data;
                                }
                            })
                            .addProperty('tapelInduk',item=>item.indukurut.map(n=>n.riwayatRapor?.map(m=>m.kodetapel)).flat().filter(s=>s).filter((x,i,a)=>a.indexOf(x)===i))
                            .selectProperties(['awalanInduk','inValidInduk','tapelInduk','datainduk','nisGanda','indukurut'])
                            .sortByProperty('awalanInduk','desc')
                            .data;
                            
        return this;

    }
    async raportInduk(IndukArray){
        const keyDb = Object.keys(this.db);
        const mustCall = IndukArray.map(n=>'induk_'+n);
        //cek apakah dbSudahDipanggil;
        const hasCall = keyDb.filter(s=>mustCall.includes(s) && s.indexOf('induk_')>-1);
        const mustCallApi = mustCall.filter(s=>!hasCall.includes(s));
        const arrayCallApi = mustCallApi.map(n=>parseInt(n.replace('induk_','')));
        
        if(arrayCallApi.length>0){
            const result = await this.repo.callDbInduk(arrayCallApi);
            result.forEach((item,index)=>{
                if(item.info.findTab){
                    this.#dbData[mustCallApi[index]] = item.data;
                    this.#dbData['blangko_'+mustCallApi[index]] = item.info.objKosong;
                }
            });
            this.init();
        }

    }
}