import dataPenandaTanganKepsek from "../controller_features/bukuinduk/PenandatanganIjazah";
import { CollectionsEdu } from "../models/CollectionsEdu";

export default class BukuIndukService{
    #dbData;
    #collectionsInduk;
    #collectionKleper;
    #collectionsIjazahAngkatan
    constructor(repo){
        this.repo = repo;
        this.#dbData = {};
        this.#collectionsInduk = [];
        this.#collectionKleper = [];
        this.#collectionsIjazahAngkatan = [];
        
    }
    get db(){
        return this.#dbData
    }
    set db(x){
        this.#dbData = x;
    }
    get ormKlapper(){
        return this.#collectionKleper;
    }
    get ormInduk(){
        return this.#collectionsInduk;
    }
    get dataIjazahAngkatan(){
        return this.#collectionsIjazahAngkatan;
    }
    async siswa(){
        if(!this.#dbData['siswa']){
            const apiSiswa = await this.repo.allSiswa();
            apiSiswa.forEach(item=>{
                if(item.info.findTab){
                    if(item.info.namaTab==='datasiswa'){
                        window.localStorage.setItem('dbSiswa',JSON.stringify(item.data));
                        this.#dbData['siswa']= item.data;
                        this.#dbData['siswa_entity']= item.info.objKosong;  

                    }else{
                        this.#dbData[item.info.namaTab] = item.data;
                        this.#dbData[item.info.namaTab+'_entity']= item.info.objKosong;  
                        
                    }
                }

            })
            
        }
        return this.#dbData['siswa']??[];
    }
    async init(){
        await this.siswa();
        let entity= new this.repo.siswa_entity();
        
        this.#collectionsInduk = new CollectionsEdu(this.#dbData.siswa.slice())
                            // .selectProperties(entity.protected)
                            .addProperty('awalanInduk',(item)=>{
                                if(item.nis){
                                    return item.nis.toString().slice(0,4);
                                }else{
                                    return false
                                }
                            })
                            .addProperty('tahunpelajaran',(item)=>item.awalanInduk?'20'+item.awalanInduk.slice(0,2)+'/20'+item.awalanInduk.slice(2,4):'')
                            .uniqueByProperty('awalanInduk')
                            .addProperty('inValidInduk',item=>['1213','1314'].includes(item.awalanInduk))
                            .addProperty('datainduk',item => new CollectionsEdu(this.#dbData.siswa)
                                                        .selectProperties(['awalanInduk','tahunpelajaran','inValidInduk',...entity.protected])
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
                                                                //jika siswa keluar di semester 1, maka dia punya data semester 1&2 pada tapel sebelumnya
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
                                                                    let profil = {nis:item.nis,nisn:item.nisn,id:item.id};;
                                                                    let findKurikulum = this.repo.makroRiwayat.find(s=>s.tapel == awalanInduk);
                                                                    ob.kodetapel = awalanInduk;
                                                                    ob.tapel = thAwalCopy+'/'+thAkhirCopy;
                                                                    ob.rombel = rombelakhir;
                                                                    ob.kurikulum = findKurikulum?.['kelas_'+parseInt(rombelakhir)+'_kurikulum']||'';
                                                                    ob.rapor_semester1 = {profil, ...nilaiSemester1, nama:item.pd_nama };
                                                                    ob.rapor_semester2 = {profil, ...nilaiSemester2, nama:item.pd_nama };
                                                                    ob.semester = semesterCopy;
                                                                    
                                                                    koleksi.push(ob);
                                                                    
                                                                    thAwalCopy++;
                                                                    thAkhirCopy++;
                                                                    awalanInduk+=101;
                                                                    /**
                                                                     * 
                                                                     */
                                                                    // if(thAkhirCopy === akhirTahun && akhirSemester ===1  ){
                                                                    //     semesterCopy = [1];
                                                                    // }else{
                                                                    //     semesterCopy = [1,2];
                                                                    // }
                                                                    semesterCopy = [1,2];
                                                                }
                                                                while(thAwalCopy<akhirTahun);
                                                                return koleksi;
                                                            }else{
                                                                return [];
                                                            }
                                                        })
                                                        .addProperty('dokumen',item=> this.db.dokumen.filter(s=>s.tokensiswa == item.id))
                                                        .selectProperties([...entity.protected,'lastDigit','founded','riwayatRapor','dokumen','awalanInduk','tapelInduk','inValidInduk'])
                                                        // .selectPropertiesExcept(['indukurut','datainduk','nisGanda','dataLulusan','dataKlaperAngkatan'])
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
                            .addProperty('klaperAngkatan',item=>{
                                return new CollectionsEdu(item.datainduk)
                                        .selectProperties(entity.protected)
                                        .addProperty('abjad',itemklaper=>itemklaper.pd_nama[0])
                                        .uniqueByProperty('abjad')
                                        .addProperty('dataKlaperAngkatan',itemKlaper=>{
                                            // return itemKlaper.abjad;
                                            // return item.datainduk.filter(s=>s.pd_nama[0] ===itemKlaper.abjad)??[];
                                            return new CollectionsEdu(item.datainduk)
                                                .addProperty('abjad',idk=>idk.pd_nama[0])
                                                .simpleFilter({'abjad':itemKlaper.abjad})
                                                .sortByProperty('pd_nama','asc')
                                                // .selectPropertiesExcept(['dataKlaper','indukurut','datainduk','dataLulusan'])
                                                .selectProperties([...entity.protected,'abjad'])
                                                .data
                                        })
                                        .selectProperties(['abjad','dataKlaperAngkatan'])
                                        .sortByProperty('abjad','asc')
                                        .data;
                                        
                            })
                            .addProperty('tapelInduk',item=>item.indukurut.map(n=>n.riwayatRapor?.map(m=>m.kodetapel)).flat().filter(s=>s).filter((x,i,a)=>a.indexOf(x)===i))
                            .selectProperties(['awalanInduk','inValidInduk','tahunpelajaran','tapelInduk','klaperAngkatan','datainduk','nisGanda','indukurut'])
                            .sortByProperty('awalanInduk','desc')
                            .data;
            this.#collectionsIjazahAngkatan = new CollectionsEdu(this.#dbData.siswa.slice())
                    .addProperty('tahunLulus',item=>item.aktif ==='lulus' && item.keluar_tgl !==""?new Date(item.keluar_tgl).getFullYear():false)
                    .addProperty('tanggalLulus',item=>item.aktif ==='lulus' && item.keluar_tgl !==""?item.keluar_tgl:false)
                    .addProperty('tapelLulus',item=>item.tahunLulus?'20'+(item.tahunLulus - 1).toString().slice(2,4)+'/20'+item.tahunLulus.toString().slice(2,4):false)
                    .addProperty('kodeTapelLulus',item=>item.tahunLulus? (item.tahunLulus - 1).toString().slice(2,4)+''+item.tahunLulus.toString().slice(2,4):false)
                    .addProperty('kurikulum',item=> this.repo.makroRiwayat.find(s=>s.tapel == item.kodeTapelLulus)?.['kelas_6_kurikulum']||'')
                    .addProperty('mapel',item=> this.repo.makroRiwayat.find(s=>s.tapel == item.kodeTapelLulus)?.['kelas_6_mapel']||[])
                    .customFilter(item=>item.tahunLulus)
                    .uniqueByProperty('tahunLulus')
                    .addProperty('dataLulusan',item=>new CollectionsEdu(this.#dbData.siswa.slice())
                                                        .simpleFilter({'tahunLulus':item.tahunLulus})
                                                        .addProperty('nilaiijazah',item=>this.db.ijazah.find(s=>s.token == item.id)??this.db.ijazah_entity)
                                                        .addProperty('dokumen',item=> this.db.dokumen.filter(s=>s.tokensiswa == item.id))
                                                        .selectPropertiesExcept(['dataInduk','tapelInduk','klaperAngkatan','indukUrut'])
                                                        .data
                    )
                    .addProperty('kepsek',item=>dataPenandaTanganKepsek(item.tahunLulus))
                    .selectProperties(['tahunLulus','kepsek','tanggalLulus','tapelLulus','kurikulum','mapel','dataLulusan'])
                    .sortByProperty('tahunLulus','asc')
                    .data;
            
        return this;
    }
    createKlapper(){
        let entity= new this.repo.siswa_entity();
        this.#collectionKleper = new CollectionsEdu(this.#dbData.siswa.slice())
                                .exceptFilter({'pd_nama':''})
                                .addProperty('abjad',item=>item.pd_nama[0])
                                .uniqueByProperty('abjad')
                                .addProperty('dataKlapper',item=> new CollectionsEdu(this.#dbData.siswa)
                                                    .simpleFilter({'abjad':item.abjad})
                                                    .sortByProperty('pd_nama','asc')
                                                    // .selectPropertiesExcept(['dataKlaper','indukurut','datainduk','dataLulusan'])
                                                    .selectProperties([...entity.protected,'abjad','lastDigit','founded','riwayatRapor','dokumen'])
                                                    .data
                                ).selectProperties(['abjad','dataKlapper'])
                                .sortByProperty('abjad','asc')
                                .data;
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
    
    /**
     * 
     * @param {*} file 
     * @param {*} properti 
     * @returns {idfile:string}
     */
    async uploadFile(file,properti){
        
            let extension = file.name.split('.').pop();
            let r = new Promise((resolve,reject)=>{
                let fr = new FileReader();
                fr.onload = (evt)=>resolve(evt.target.result);
                fr.onerror =(er)=>reject(er)
                fr.readAsDataURL(file);
            }).then(result=>{
                
                let base64 = result.replace(/^.*,/, '');
                let mimeType = result.match(/^.*(?=;)/)[0];
                let param = Object.assign({},{
                    base64:base64,
                    mimeType:mimeType
                },properti)
                param.namafile = properti.namafile +'.'+extension;
                return this.repo.uploadFile(param);
            });
            
            return await r;//

        
    }

    /**
     * 
     * @param {*} objek 
     * @void
     */
    async updateProfilSiswa(objek){
        if(objek.id === ""){
            objek.id = this.#dbData.siswa.length+2;
        } 
        const data = await this.repo.updateProfile(objek);
        if(data.info.findTab){
            window.localStorage.setItem('dbSiswa',JSON.stringify(data.data));
            this.#dbData['siswa']= data.data;
            this.#dbData['siswa_entity']= data.info.objKosong;  
            await this.init();
        }
    }
    async updateDokumenTambahanSiswa(file,dataObjek,folder){
        const api =  new Promise((resolve,reject)=>{
            let fr = new FileReader();
            fr.onload = (ev)=>resolve(ev.target.result);
            fr.onerror = er =>reject(er)
            fr.readAsDataURL(file);

        }).then(result=>{
            
            let base64 = result.replace(/^.*,/, '');
            let mimeType = result.match(/^.*(?=;)/)[0];
            
            let objekgambar = {
                base64: base64,
                mimeType:mimeType,
                ...folder
            }
            
            
            return this.repo.updateDokumenTambahan(0,dataObjek,objekgambar);

        });
        
        const data =  await api;
        // const data = await this.repo.updateDokumenTambahan(mode=0,dataObjek,media);
        if(data.info.findTab){
            this.#dbData['dokumen']= data.data;
            this.#dbData['dokumen_entity']= data.info.objKosong;  
            await this.init();
        }
    }
    async hapusDokumenTambahan(dataObjek){
        const data = await this.repo.hapusDokumenTambahan(dataObjek);
        if(data.info.findTab){
            this.#dbData['dokumen']= data.data;
            this.#dbData['dokumen_entity']= data.info.objKosong;  
            await this.init();
        }
    }

    /**
     * 
     * @param {*} ss {
     * idss:<string>
        tab:'<string>namaTab',
        formData:<JSONStringify(<string>)>// contoh'{"no":"1","data":"00001","data3":"01/02/2023"}',
        //autoId:'no',
        //stringFormat:'["data"]',
        //filter:'{"jenjang":"6"}',

        //if create:
        createTabEmpty:1, //1 (true)|| 0 = false,
        }
     * @param {*} media {
            folder:'folder',
            subfolder:'subfolder',
            namafile:'',
            base64:'',
            mimeType:'',
        }
     * @param {*} obchange {
        dok_akte||dok_kk || dok_kip: idfile
        }
     */
    async updateProfileSiswaWithMainMedia(siswa,file,obchange){
        let extension = file.name.split('.').pop();
        
        let r = new Promise((resolve,reject)=>{
                let fr = new FileReader();
                fr.onload = (evt)=>resolve(evt.target.result);
                fr.onerror =(er)=>reject(er)
                fr.readAsDataURL(file);
            }).then(result=>{
                
                let base64 = result.replace(/^.*,/, '');
                let mimeType = result.match(/^.*(?=;)/)[0];
                
                let param = Object.assign(this.repo.folderSubFolder,{
                    base64:base64,
                    mimeType:mimeType,
                    namafile:Object.keys(obchange)[0] +' '+siswa.pd_nama+'_'+new Date().getTime()+'.'+extension,
                    subfolder:siswa.pd_nama
                    
                },);
                return this.repo.updateProfileSiswaWithMainMedia(siswa,param,obchange)
            });
        
        // return await r;//
        const data = await r;//this.repo.updateProfileSiswaWithMainMedia(ss,file,obchange);
        if(data.info.findTab){
            window.localStorage.setItem('dbSiswa',JSON.stringify(data.data));
            this.#dbData['siswa']= data.data;
            this.#dbData['siswa_entity']= data.info.objKosong;  
            await this.init();
        }
    }
}