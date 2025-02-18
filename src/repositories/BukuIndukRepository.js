import { MakroInduk } from "../riwayat_raport/MakroInduk";
import { CallHttp } from "./CallHttp";

export default class BukuIndukRepository  extends CallHttp{
    #idssMediaProfil
    constructor(entity,filetambahan){
        super();
        this.siswa_entity = entity;
        this.DokumenTambahan = filetambahan;
        this.initialAppKey(this.currentAppKey);
        this.makroRiwayat = MakroInduk;
        this.#idssMediaProfil = '1QC1Bt6ZqhYy5UKv_M8fUQX5LibwGBsr1nDxuHzk7LiU';
    }
    get folderSubFolder(){
        return {
            folder:'DOKUMEN PRIBADI SISWA',
            subfolder:'Nama Siswa',
        }
    }
    get idssUser(){
        return this.appscript.ss_user;
    }
    async allSiswa(){
        // const param = {
        //     idss : this.idssUser,
        //     tab : 'datasiswa',
        //     action: 'read'
        // }
        const param = [
            {idss:this.idssUser, tab:'datasiswa'},
            {idss:this.#idssMediaProfil, tab:'dokumen'},
            {idss:this.#idssMediaProfil, tab:'ijazah'},
        ]
        this.callWithProses();
        // const data = await this.post(this.crud,param);
        const data = await this.readMultipleTab(param);
        this.stopProgressBar();
        return data;
    }
    async callDbInduk(ar){
        let arCreate = [];
        ar.forEach(item=>{
            let findMakro = this.makroRiwayat.find(s=>s.tapel === item);
            if(findMakro){
                let ob = {
                    idss:findMakro.idss,
                    tab:'main'
                }
                arCreate.push(ob);

            }
        })
        this.callWithProses();
        const result =  await this.readMultipleTab(arCreate);
        this.stopProgressBar();
        return result;
    }
    async readMultipleTab(ars){
        let e_param = {
            'action':'readMultipleTab',
            'source':JSON.stringify(ars),
            
        };
        return await this.post(this.crud,e_param)
    }
    async uploadFile(params){
        let param = Object.assign({},
            {
                action:'uploadFile',
                // folder:'DOKUMEN PRIBADI SISWA',
                // subfolder:'Nama Siswa',
                ...this.folderSubFolder,
                namafile:'dokumen_upload',
                // base64:'',
                // mimeType:'',

            },params
        )

        return await this.post(this.crud,param);
    }
    async updateProfile(dataObjek){
        const entities = new this.siswa_entity(dataObjek);;
        const entity = entities.addItem('time_stamp',new Date()).sanitize().data;
        let param = {
            'idss':this.idssUser,
            'tab':'datasiswa',
            'data_resource':JSON.stringify(entity),//data_resource = (array-object)|| object; (required);
            'key':'id',
            'autoId':'id',
            'array_timestamp':JSON.stringify(['time_stamp'])
        };
        this.callWithProses();
        const result =  await this.postAuto(param);
        this.stopProgressBar();
        return result;
    }
        // const entities = new this.siswa_entity(dataObjek);;
        // const entity = entities.addItem('time_stamp',new Date()).sanitize().data;
        // let param = {
        //     'idss':this.idssUser,
        //     'tab':'datasiswa',
        //     'data_resource':JSON.stringify(entity),//data_resource = (array-object)|| object; (required);
        //     'key':'id',
        //     'autoId':'id',
        //     'array_timestamp':JSON.stringify(['time_stamp'])
        // };
        // return await this.postAuto(param);
    // }
    async createWOrUpdateithUploadMedia(mode,ss,media,obchange){
        let act = mode===0?'createIncludeMedia':'updateIncludeMedia';
        let mediaValidate = Object.assign({},this.folderSubFolder,media);
        
        let param = {
            action:act,
            spreadsheet:JSON.stringify(ss),
            media:JSON.stringify(mediaValidate),
            singleTypeMedia:0, //singleTypeMedia seperti: txt, csv, 
            changeIdFormData:JSON.stringify(obchange)
        }
        return await this.post(this.crud,param)
    }

    /**
     * 
     * @param {*} mode : 0 = createWithIncludeMedia, 1 = updateWithIncludeMedia
     * @param {*} dataObjek : dataSpreadSheet
     * @param {*} mediaObjek : dataObjek (fileReader);
     * @returns ={
                    info:{
                    namaTab:tab,
                    findTab: true,
                    countData : dataResult.length,
                    objKosong:objKosong
                    },
                    data:dataResult
                }
     */
    async updateDokumenTambahan(mode=0,dataObjek,mediaObjek){
            const data = new this.DokumenTambahan(dataObjek).sanitize().data;
            
            const ss = {
                'idss':this.#idssMediaProfil,
                'tab':'dokumen',
                'formData':JSON.stringify(data),
                'autoId':'idbaris', 
            };
            this.callWithProses();
            const result =  await this.createWOrUpdateithUploadMedia(mode,ss,mediaObjek,{'id_file':'idfile','link_unduh':'fileUrl'});
            this.stopProgressBar();
            return result;
        }
    async hapusDokumenTambahan(dataObjek){
            const data = new this.DokumenTambahan(dataObjek).sanitize().data;
            
            const param = {
                'idss':this.#idssMediaProfil,
                'tab':'dokumen',
                'data_resource':JSON.stringify(data),
                'autoId':'idbaris', 
                'key':'idbaris'
            };
            this.callWithProses();
            const result =  await this.postAuto(param);
            this.stopProgressBar();
            return result;
        }
    async updateProfileSiswaWithMainMedia(RequstSs,RequestMedia,obchange){
        const nSiswa = new this.siswa_entity(RequstSs).sanitize().data;
        const ssUser = {
            'idss': this.idssUser,
            'tab':'datasiswa',
            'formData':JSON.stringify(nSiswa),//'{"no":"1","data":"00001","data3":"01/02/2023"}',
            'autoId':'id',
            'byRow':nSiswa.id
        };
        this.callWithProses();
            const data = await this.createWOrUpdateithUploadMedia(1,ssUser,RequestMedia,obchange);
        this.stopProgressBar();
        return data;
    }
}