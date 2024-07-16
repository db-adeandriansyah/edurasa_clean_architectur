import { CallHttp } from "./CallHttp";

export default class BanksoalRepository extends CallHttp{
    #istrial;
    
    constructor(){
        super();
        this.initialAppKey(this.currentAppKey);
        
        this.#istrial = false;
    }
    
    set trial(x){
        this.#istrial = x;
    }
    
    get trial(){
        return this.#istrial;
    }
    get ss_kurikulum(){
        return this.appscript['ss_materi'];
    }
    ss_Absensi(jenjang){
        return this.trial?this.ssTrial:this.appscript['ss_absen_'+jenjang];
    }
    get ss_kurikulum_must_call(){
        
        return this.trial?this.ssTrial:this.ss_kurikulum;
    }
    get ss_banksoal_must_call(){
        return this.trial?this.ssTrial:this.appscript['ss_kalender'];
    }
    get ss_materi(){
        return this.trial?this.ssTrial:this.appscript['ss_materi'];
    }
    async callSiswa(){
        let p = {
            'idss':this.appscript['ss_user'],
            'tab':'datasiswa',
            'action':'read'
        }
        return await this.post(this.crud,p);
    }
    ss_nilai_jenjang(jenjang){
        return this.trial?this.ssTrial:this.appscript['ss_nilai_'+jenjang];
    }
    ss_nilai_namatab(namatab,jenjang){
        return this.trial?namatab+'_'+jenjang:namatab;
    }
    async callPropertiMultiple(ars){
        let e_param = {
            'action':'readMultipleTab',
            'source':JSON.stringify(ars),
            
        };
        return await this.post(this.crud,e_param)
    }
    async callPropertiMultipleOtherCrud(crudOther,ars){
        let e_param = {
            'action':'readMultipleTab',
            'source':JSON.stringify(ars),
            
        };
        return await this.post(crudOther,e_param)
    }
    async simpanItemSoal(arg,mode='create'){
        let idss='';
        let tab='';
        if(this.#istrial){
            idss=this.ssTrial;
            tab="banksoal";
        }else{
            idss=this.appscript['ss_kalender'];
            tab="banksoal";

        }

        let para={
            'action':mode,
            'tab':tab,
            'idss':idss,
            'formData':JSON.stringify(arg),
            'createTabEmpty':1,
            'autoId':'idbaris',
            stringFormat:JSON.stringify(["jenjang","kd","opsiA","opsiB","opsiC","opsiD"]),
        }

        if(mode == 'update'){
            para['byRow']=parseInt(arg.idbaris);
        }
        
        return await this.post(this.crud,para)
    }
    async saveImage(param){
        return this.post(this.crud,param)
    }
    async simpanDesanNaskah(par,media){
        let idss='';
        let obchange ={'html_identitas':'fileUrl', 'html_soal':'idfile'}
        if(this.#istrial){
            idss=this.ssTrial;
        }else{
            idss=this.appscript['ss_kalender'];
        }

        let para={
            action:'createIncludeMedia',
            spreadsheet:JSON.stringify({
                idss:idss,
                tab:'simpandesainsoal',
                formData:JSON.stringify(par),
                autoId:'idbaris',
                //stringFormat:'["data"]',
                //filter:'{"jenjang":"6"}',
        
                //if create:
                createTabEmpty:1, //1 (true)|| 0 = false,

            }),
            media:JSON.stringify({
                folder      :'HTML Desain Naskah',
                subfolder   :'kelas_'+media.jenjang,
                'namafile'    :'naskah_'+new Date().getTime(),
                'base64'      : media.html,
                'mimeType'    :'text/plain',
            }),
            singleTypeMedia:1, //singleTypeMedia seperti: txt, csv, 
            changeIdFormData:JSON.stringify(obchange)
        }

        
        return await this.post(this.crud,para)
    }
    async hapusSimpananDesainNaskah(arg){
        let idss='';
        let tab="simpandesainsoal";
        if(this.#istrial){
            idss=this.ssTrial;
        }else{
            idss=this.appscript['ss_kalender'];
        }

        let para={
            'action':'update',
            'tab':tab,
            'idss':idss,
            'formData':JSON.stringify(arg),
            // 'createTabEmpty':1,
            'autoId':'idbaris',
            'byRow':parseInt(arg.idbaris)
            // stringFormat:JSON.stringify(["jenjang","kd","opsiA","opsiB","opsiC","opsiD"]),
        }

        return await this.post(this.crud,para);
    }

    async simpanDataMateriKbm(par,media){
        let obchange = {'basetxt':'fileUrl', 'idmateri':'idfile'}
        let param = {
            action:'createIncludeMedia',
            spreadsheet:JSON.stringify({
                idss:this.ss_materi,
                tab:'datamateri',
                formData:JSON.stringify(par),
                autoId:'idbaris',
                stringFormat:'["crtToken"]',
                
                // filter:JSON.stringify({'hapus':''}),
        
                //if create:
                createTabEmpty:1, //1 (true)|| 0 = false,

            }),
            media:JSON.stringify({
                folder      :'Konten Materi',
                subfolder   :'Kelas '+par.idtoken,
                'namafile'    :'naskahsoal_'+new Date().getTime(),
                'base64'      : media,
                'mimeType'    :'text/plain',
            }),
            singleTypeMedia:1, //singleTypeMedia seperti: txt, csv, 
            changeIdFormData:JSON.stringify(obchange)
        } 
        return await this.post(this.crud,param)
    }

    async simpanEditMateriKbm(arg){
        
        let idss=this.ss_materi;
        let tab="datamateri";
        // if(this.#istrial){
        //     idss=this.ssTrial;
        // }else{
        //     idss=this.appscript['ss_kalender'];
        // }

        let para={
            'action':'update',
            'tab':tab,
            'idss':idss,
            'formData':JSON.stringify(arg),
            // 'createTabEmpty':1,
            'autoId':'idbaris',
            'byRow':parseInt(arg.idbaris),
            stringFormat:JSON.stringify(["crtToken"]),
        }

        return await this.post(this.crud,para);
    }
    async kirimSingleNilaiLJK(tabrespon,tabtagihan,mediaHTML,create=1){
        let idss = this.ss_nilai_jenjang(tabrespon.idtoken);
        let tagihan = tabtagihan.jenistagihan;
        let rombel = tabrespon.idkelas;
        let param = {
            // idss:'1VdqHgZ67-TqOwXe3Am-_rhpCsNG10hpmGS91rHvkN6g',
            idss: idss,
            tab:    tagihan,
            autoId:'idbaris',
            action:'kirimnilai',
            datarespon:JSON.stringify(tabrespon),
            datatabutama:JSON.stringify(tabtagihan),
            creatorupdate_respon:create, //1 = create, 0 = update;
            ideditrespon:'html_jawaban',
            media:JSON.stringify({
                folder      :'Koleksi LJK Siswa 2324',
                subfolder   : rombel,
                namafile    :'id_kbm_'+tabrespon.matericode+'_idsiswa_'+tabrespon.tokensiswa+'_'+new Date().getTime(),
                base64      : mediaHTML,
                mimeType    :'text/plain',
            })
        }
        return await this.post(this.crud,param)
    }
    async editLJKTabResponTabTagihan (tabrespon,tabtagihan){
        let source = [
            //tab respon
            {
                tab:'',
                idss:'',
                formData:'',
                byRow:''
            }
        ]
    }
    async editLJKTabResponSingle(arg){
        
        let idss = this.ss_nilai_jenjang(arg.idtoken);
        let tab="respon";
        if(this.#istrial){
            idss=this.ssTrial;
            tab="respon_"+arg.idtoken;
        }
        

        let para={
            'action':'update',
            'tab':tab,
            'idss':idss,
            'formData':JSON.stringify(arg),
            // 'createTabEmpty':1,
            'autoId':'idbaris',
            'byRow':parseInt(arg.idbaris),
            stringFormat:JSON.stringify(["crtToken"]),
        }

        return await this.post(this.crud,para);
    }
    async showTextHTML(paramUI){
        return await this.get(this.crud+paramUI);
    }

    async kirimDataMasalWithoutIndexbaris(data,properti={idss:'1VdqHgZ67-TqOwXe3Am-_rhpCsNG10hpmGS91rHvkN6g',tab:'p',refHeader:'no'}){
        // let idss = this.ss_nilai_jenjang(parseInt(data.idkelas));
        // let tab = data.jenistagihan;
        // let refHeader = 'tokensiswa';
        const {idss, tab, refHeader} = properti;

        let param = {
            idss:idss,
            tab:tab,
            key:refHeader,
            action:'createOrUpdate',
            data:JSON.stringify(data)
        }
        return await this.post(this.crud,param);
    }

    async kirimDataMasalImportKoreksian (data,kelas,tab){
        
            const idss       = this.ss_nilai_jenjang(parseInt(kelas));
            const refHeader = 'tokensiswa';
            
        
        

        let param = {
            idss:idss,
            tab:tab,
            key:refHeader,
            action:'createOrUpdate',
            data:JSON.stringify(data)
        }
        return await this.post(this.crud,param);
    }

    async postOtherMacro(crud,param){
        return await this.post(crud,param);
    }
    async saveNilaiRaporMasal (data,kelas,tab,refHeader){
        
        const idss       = this.ss_nilai_jenjang(parseInt(kelas));
        // const refHeader = 'tokensiswa';
        
    
    

    let param = {
        idss:idss,
        tab:tab,
        key:refHeader,
        action:'createOrUpdate',
        data:JSON.stringify(data)
    }
    return await this.post(this.crud,param);
    }
    async createOrUpdate (idss,data,tab,refHeader){
        
        // const idss       = this.ss_nilai_jenjang(parseInt(kelas));
        
    let param = {
        idss:idss,
        tab:tab,
        key:refHeader,
        action:'createOrUpdate',
        data:JSON.stringify(data)
    }
    return await this.post(this.crud,param);
    }

    async createOrUpdate_deskripsi_predikat(data,jenjang){
        let idss = this.ss_materi;
        let tab = 'predikat_'+jenjang;
        let refHeader = 'id';
        return await this.createOrUpdate(idss,data,tab,refHeader);
    }
    async nilai_ijazah(){
        let p = {
            'idss':this.appscript['ss_nilai_6'],
            'tab':'nilai_ijazah_6',
            'action':'read'
        }
        return await this.post(this.crud,p);
    }
    async savenilai_ijazah(data){
        let param = {
            idss:this.appscript['ss_nilai_6'],
            tab:'nilai_ijazah_6',
            key:'id',
            action:'createOrUpdate',
            data:JSON.stringify(data)
        }
        return await this.post(this.crud,param);
    }
    async editItemIjazah (data){
        
        let param = {
            idss:this.appscript['ss_nilai_6'],
            tab:'nilai_ijazah_6',
            byRow : parseInt(data.idbaris),
            action:'update',
            autoId:'idbaris',
            formData:JSON.stringify(data)
        }
        return await this.post(this.crud,param);
    }
}