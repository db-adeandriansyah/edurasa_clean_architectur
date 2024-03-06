import UserRepositories from "../repositories/UserRepositories";
//import utilities:
// import { CollectionsEdu } from "../models/CollectionsEdu";
// import FormatTanggal from "../utilities/FormatTanggal";

import arLabel from "../models/array-format-dapodik";
import { CollectionsEdu,FormatTanggal } from "../entries/vendor";



export default class SiswaRepoService extends UserRepositories{
    #db;
    #typeTglDbSiswa;
    #ptkAlltime;
    constructor(app){
        super(app);
        this.#db = [];
        this.arLabel = arLabel;
        this.#typeTglDbSiswa = []
        this.#ptkAlltime = [];
        // this.ensureLoadeRepo();
    }
    get ptkAll(){
        return this.#ptkAlltime;
    }
    async ensureLoadeRepo(){
        if(this.hasLocal('dbSiswa')){
            if(window.localStorage.getItem('dbSiswa')!=='undefined'){
                this.#db = JSON.parse(window.localStorage.getItem('dbSiswa'));
            }else{
                let response = await this.callSiswa();
                window.localStorage.setItem('dbSiswa',JSON.stringify(response.data));
                this.#db = response.data;
            }
            
        }else{
            
            let response = await this.callSiswa();
            window.localStorage.setItem('dbSiswa',JSON.stringify(response.data));
            this.#db = response.data;
        }
        if(!this.hasLocal('ptkAlltime')){
            let response = await this.riwayatPtk();
            this.writeLocal('ptkAlltime',JSON.stringify(response.data));
            this.#ptkAlltime = response.data;
            
        }else{
            this.#ptkAlltime = this.LocalJson('ptkAlltime');
        }
        
        this.#typeTglDbSiswa = [
            'pd_tanggallahir',
            'dapo_tahunlahirayah',
            'dapo_tahunlahiribu',
            'dapo_tahunlahirwali',
            'masuk_tgl',
            'keluar_tgl',
            'keluar_tgl2',
            'pdb_tgl',
            'time_stamp',
            'tahunindukdate'
        ]
    }
    refreshDbSiswa(x){
        window.localStorage.setItem('dbSiswa',JSON.stringify(x))
        this.#db = x;
    }
    set dbSiswa(x){
        this.#db = x;
    }
    get dbSiswa(){
        return this.#db;
    }
    get TglTypeDbSiswa(){
        return this.#typeTglDbSiswa;
    }
    get allSiswa(){
        return this.#db;
    }
    get koleksiTapelBukuInduk(){
        return new CollectionsEdu(this.#db)
        .customFilter((item)=> item.nis !="")
        .addProperty('awalanInduk',(item)=>{
            return '20'+item.nis.toString().slice(0,2)+'/20'+item.nis.toString().slice(2,4)
        })
        .selectProperties(['awalanInduk'])
        .uniqueByProperty('awalanInduk')
        .sortByProperty('awalanInduk','desc').data;
    }
    
    showSiswaAnggotaJenjang(rombel,sorterBy){
        
        let reslut =  new CollectionsEdu(this.#db)
            .simpleFilter({aktif:'aktif',jenjang:parseInt(rombel)})
            .selectProperties(['id','nis','nisn','pd_nama','pd_agama','pd_jk','pd_tl','pd_tanggallahir','nama_rombel','nik','nokk'])
            .setProperty('pd_tanggallahir',(item)=> new FormatTanggal(item).formatMedium())
            .setProperty('pd_jk',(item)=>item=="L"?"Laki-laki":"Perempuan")
            .sortByProperty(sorterBy,'asc')
            .addProperty('buttons',(item)=>[
                { 
                    label: '<i class="bi-pencil"></i>', 
                    id: item.id, 
                    aksi:'detail', 
                    class:'btn-sm border-0 btn-rounded-pill py-0 text-bg-info mx-1' 
                },
            ]).data;
        return reslut;
    }
    
    showSiswaAnggotaRombel(rombel,sorterBy){
        
        let reslut =  new CollectionsEdu(this.#db)
            .simpleFilter({aktif:'aktif',nama_rombel:rombel})
            .selectProperties(['id','nis','nisn','pd_nama','pd_agama','pd_jk','pd_tl','pd_tanggallahir'])
            .setProperty('pd_tanggallahir',(item)=> new FormatTanggal(item).formatMedium())
            .setProperty('pd_jk',(item)=>item=="L"?"Laki-laki":"Perempuan")
            .sortByProperty(sorterBy,'asc')
            .addProperty('buttons',(item)=>[
                { 
                    label: '<i class="bi-pencil"></i>', 
                    id: item.id, 
                    aksi:'detail', 
                    class:'btn-sm border-0 btn-rounded-pill py-0 text-bg-info mx-1' 
                },
            ]).data;
        return reslut;
    }
    
    showSiswaAnggotaKelas(rombel,sorterBy,jenjang=false){
        let kelasRombel = jenjang?parseInt(rombel):rombel;
        let reslut =  new CollectionsEdu(this.#db)
            .simpleFilter({aktif:'aktif',jenjang:parseInt(rombel)})
            .selectProperties(['id','nis','nisn','pd_nama','pd_agama','pd_jk','pd_tl','pd_tanggallahir','nama_rombel','nik','nokk'])
            .setProperty('pd_tanggallahir',(item)=> new FormatTanggal(item).formatMedium())
            .setProperty('pd_jk',(item)=>item=="L"?"Laki-laki":"Perempuan")
            .sortByProperty(sorterBy,'asc')
            .addProperty('buttons',(item)=>[
                { 
                    label: '<i class="bi-pencil"></i>', 
                    id: item.id, 
                    aksi:'detail', 
                    class:'btn-sm border-0 btn-rounded-pill py-0 text-bg-info mx-1' 
                },
            ]).data;
        return reslut;
    }
    objekKeyKosongDbSiswa(){
        let objekkosong = {};
            let dataawal = this.#db[0];
            Object.entries(dataawal).forEach(([k,v])=>{
                objekkosong[k]='';
            });
            return objekkosong;
    }
    showFormatDetailSiswaInModal(id,view){
        let data = this.#db.filter(s=> s.id == id);
        let result = '<h1 class="text-center">Halaman Gagal diload</h1>'
        if(data.length>0){
            result = view(data[0],this.arLabel,FormatTanggal);
        }else{
            let objekkosong = {};
            let dataawal = this.#db[0];
            Object.entries(dataawal).forEach(([k,v])=>{
                if(k!==""){
                    objekkosong[k]='';
                }
            })
            result = view(objekkosong,this.arLabel,FormatTanggal);
        }
        
        return result;
    }

    findSiswaById(id){
        
        return this.#db.filter(s=> s.id == id)[0]
    }

    saveDokumenPribadiSiswa(files,propertiImageController,callback,options={}){
        let propertiImage = Object.assign({
            folder:'DOKUMEN PRIBADI SISWA'
        },propertiImageController);
        this.uploadGambar(files,propertiImage,callback,options={})
    }
    validateSiswa (dataawal){
        let objekvalidate = {};
        // let dataawal = this.LocalJson('propertisiswa');
        Object.entries(dataawal).forEach(([k,v])=>{
            if(k!==""){
                objekvalidate[k]=v;
            }
        });
        return objekvalidate;
    }
    async updateSingleDataSiswa(request){
        let datavalid = this.validateSiswa(request)
        this.callWithProses();
        const response =  await this.saveUpdateSiswa(datavalid);
        this.stopProgressBar();
        return response;
    }
    async addSingleDataSiswa(request){
        this.callWithProses();
        const response =  await this.saveAddSiswa(request);
        this.stopProgressBar();
        return response;
    }
    filterDataByBetweenDate(startDate, endDate, data) {
        const filteredData = data.filter(item => {
            const itemStartDate = new Date(item.masuk_tgl).getTime();
            const itemEndDate = new Date(item.keluar_tgl).getTime();
            const startTimestamp = new Date(startDate).getTime();
            const endTimestamp = new Date(endDate).getTime();
        
            return (startTimestamp >= itemStartDate && startTimestamp <= itemEndDate) ||
                (endTimestamp >= itemStartDate && endTimestamp <= itemEndDate) ||
                (itemStartDate >= startTimestamp && itemStartDate <= endTimestamp) ||
                (itemEndDate >= startTimestamp && itemEndDate <= endTimestamp);
        });
        
        return filteredData;
    }
    siswaByBetweenCheckinCheckout(data,refStartDate, refEndDate){
        return data.filter(s=>{
            let checkIn     = s.masuk_tgl ==""?0:parseInt(new FormatTanggal(s.masuk_tgl).stringYYYYMMDD());
            let checkOut    = s.keluar_tgl ==""?parseInt(new FormatTanggal(new Date()).stringYYYYMMDD())+1:parseInt(new FormatTanggal(s.keluar_tgl).stringYYYYMMDD());

            let r1    = parseInt(new FormatTanggal(refStartDate).stringYYYYMMDD()); //R1
            let r2      = parseInt(new FormatTanggal(refEndDate).stringYYYYMMDD());//R2
            return  (checkIn < r1 && checkOut == r1)||
                    (checkIn < r1 && checkOut >= r2)||
                    (checkIn >=r1 && checkIn <= r2 && checkOut >= r2) ||
                    (checkIn >=r1 && checkIn <= r2 && checkOut <= r2) 
        })
    }
    
    siswaUntilDate(data,refStartDate){
        
        return data.filter(s=>{
            let checkIn     = s.masuk_tgl ==""?0:parseInt(new FormatTanggal(s.masuk_tgl).stringYYYYMMDD());
            let checkOut    = s.keluar_tgl ==""?parseInt(new FormatTanggal(new Date()).stringYYYYMMDD())+1000000:parseInt(new FormatTanggal(s.keluar_tgl).stringYYYYMMDD());
            let r1    = parseInt(new FormatTanggal(refStartDate).stringYYYYMMDD());
            return (checkIn <= r1 && checkOut >r1)
        })
    }
    
    siswaCheckin(data,refStartDate, refEndDate){
        
        return data.filter(s=>{
            let checkIn     = s.masuk_tgl ==""?0:parseInt(new FormatTanggal(s.masuk_tgl).stringYYYYMMDD());
            let chekOut    = s.keluar_tgl ==""?parseInt(new FormatTanggal(new Date()).stringYYYYMMDD())+1000000:parseInt(new FormatTanggal(s.keluar_tgl).stringYYYYMMDD());

            let r1    = parseInt(new FormatTanggal(refStartDate).stringYYYYMMDD()); //R1
            let r2      = parseInt(new FormatTanggal(refEndDate).stringYYYYMMDD());//R2
            return (checkIn >=r1 && checkIn <=r2)
        })
    }
    siswaCheckOut(data,refStartDate, refEndDate){
        return data.filter(s=>{
            let checkIn     = s.masuk_tgl ==""?0:parseInt(new FormatTanggal(s.masuk_tgl).stringYYYYMMDD());
            let chekOut    = s.keluar_tgl ==""?parseInt(new FormatTanggal(new Date()).stringYYYYMMDD())+1000000:parseInt(new FormatTanggal(s.keluar_tgl).stringYYYYMMDD());

            let r1    = parseInt(new FormatTanggal(refStartDate).stringYYYYMMDD()); //R1
            let r2      = parseInt(new FormatTanggal(refEndDate).stringYYYYMMDD());//R2
            // return checkIn <= refStart && checkOut > refEnd;
            return (chekOut >=r1 && chekOut <=r2)
        })
    }
    
    

}