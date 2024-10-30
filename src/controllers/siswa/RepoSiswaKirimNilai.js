export default class RepoSiswaKirimNilai{
    constructor(ljk,paramNilai){
        this.kbm = ljk.naskah;
        this.ljk = ljk.proseskerjaan;
        this.siswa = ljk.siswa;
        this.identitas = ljk.dataIdentitas;
        this.param = paramNilai;
        //
        this.htmlljk = '';
    }
    htmlLjk(html){
        this.htmlljk = html;
        return this;
    }
    creatNilaiKd(){
        let ob = {};
        let kuncikd_string = this.kbm.kuncikd;
        let idbaris_kbm = this.kbm.idbaris;
        
        let prefix = idbaris_kbm+'_'+this.kbm.jenistagihan+'_'+this.kbm.crtToken;
        let arraySoalOtomatis =this.kbm.soalOtomatis.map(n=> n.nosoal);
        let kuncikd = JSON.parse(kuncikd_string);
        let key_kuncikd = Object.keys(kuncikd);
        let objTab = {};
        objTab.jenistagihan = this.kbm.jenistagihan;
        objTab.tokensiswa = this.identitas.idsiswa;
        objTab.namasiswa = this.identitas.nama; 
        objTab.idkelas = this.identitas.kelas; 
        key_kuncikd.forEach((key)=>{
            let itemkd = key;
            let keyTab = prefix+'_'+key;
            let nosoal_kuncikd =kuncikd[key];
            let count = 0;
            let arrayKunci = [];
            let arrayJawaban = [];
            
            nosoal_kuncikd.forEach(nosoal=>{
                let jawabankunci = this.kbm.datasoal.filter(s=>s.nosoal==nosoal);
                let jawabansiswa = this.ljk.filter(s=>s.no==nosoal);
                if(arraySoalOtomatis.includes(nosoal) && jawabansiswa.length>0){
                    if(jawabankunci[jawabankunci.length-1].kuncijawaban==jawabansiswa[jawabansiswa.length-1].jawaban) count ++;
                }   
                
                if(jawabansiswa.length>0){
                    let t = jawabankunci[jawabankunci.length-1].kuncijawaban;
                    let w =jawabansiswa[jawabansiswa.length-1].jawaban

                    arrayKunci.push(t);
                    arrayJawaban.push(w);

                    if(w == t){
                        count++;
                    }
                }
            });

            
            
            // ob['keykd'] = itemkd;
            // ob['keykunci'] = arrayKunci;
            // ob['jawabansiswa'] = arrayJawaban;
            // ob['skor'] = count;
            // ob['detailskor'] = arrayBenarsalah;
            ob[itemkd] = ((count/nosoal_kuncikd.length)*100).toFixed(2);
            objTab[keyTab]= ((count/nosoal_kuncikd.length)*100).toFixed(2);
        })
        return {tabrepson:ob,tabtagihan:objTab};
    }
    crtToken(n){
        let date = new Date(n)
        let d = date.getDate();
        let m = (date.getMonth()+1).toString().padStart(2,'0');
        let y = date.getFullYear();
        return d+""+m+""+y;
    }
    output(){
        let obkd = this.creatNilaiKd()
        let ob = this.isiTabRespon(obkd.tabrepson);
        let filterPG = this.ljk.filter(s=> s.tipe=='Pilihan Ganda');
        let filterNonPG = this.ljk.filter(s=> s.tipe !=='Pilihan Ganda');
        
        let arrayisi = this.ljk.map(n=>({['SKOR_'+n.no]:''})).reduce((a,b)=>({...a,...b}));
        
            
        
        if(filterPG.length>0){
            let pg = filterPG.map(n=>({['PG_'+n.no]:n.jawaban})).reduce((a,b)=>({...a,...b}));
            
            arrayisi = Object.assign({},arrayisi,pg)
        
        }
        
        let arraypg = filterPG.map(n=>n.jawaban == this.kbm.datasoal.filter(ss=>ss.nosoal==n.no)[0].kuncijawaban?1:0)
        let nilaipg = arraypg.length>0?arraypg.reduce((a,b)=>a+b):'';
        let skorpg = ((nilaipg/this.ljk.filter(s=>s.tipe=='Pilihan Ganda').length)*100).toFixed(2);
        let result =  {tabrepson:Object.assign({},ob,arrayisi,{nilaiPG:skorpg}),tabtagihan:obkd.tabtagihan};;

        return result;
    }
    isiTabRespon(obkd){
        return {
            Time_Stamp:new Date(),
            idkelas:this.identitas.kelas,
            idmapel:this.identitas.namamateri,
            crtToken:this.crtToken(this.kbm.idtgl),
            jenistagihan:this.identitas.jenistagihan,
            kodeunik:this.identitas.jenistagihan+"_"+this.crtToken(this.kbm.idtgl),
            namasiswa:this.identitas.nama,
            nilaikd:JSON.stringify(obkd),
            html_jawaban:"",
            emailguru:'databaseadeandriansyah@gmail.com',
            tokensiswa:this.identitas.idsiswa,
            //PG_1:"",PG_2:"",PG_3:"",PG_4:"",PG_5:"",PG_6:"",PG_7:"",PG_8:"",PG_9:"",PG_10:"",PG_11:"",PG_12:"",PG_13:"",PG_14:"",PG_15:"",PG_16:"",PG_17:"",PG_18:"",PG_19:"",PG_20:"",PG_21:"",PG_22:"",PG_23:"",PG_24:"",PG_25:"",PG_26:"",PG_27:"",PG_28:"",PG_29:"",PG_30:"",PG_31:"",PG_32:"",PG_33:"",PG_34:"",PG_35:"",PG_36:"",PG_37:"",PG_38:"",PG_39:"",PG_40:"",PG_41:"",PG_42:"",PG_43:"",PG_44:"",PG_45:"",PG_46:"",PG_47:"",PG_48:"",PG_49:"",PG_50:"",SKOR_1:"",SKOR_2:"",SKOR_3:"",SKOR_4:"",SKOR_5:"",SKOR_6:"",SKOR_7:"",SKOR_8:"",SKOR_9:"",SKOR_10:"",SKOR_11:"",SKOR_12:"",SKOR_13:"",SKOR_14:"",SKOR_15:"",SKOR_16:"",SKOR_17:"",SKOR_18:"",SKOR_19:"",SKOR_20:"",SKOR_21:"",SKOR_22:"",SKOR_23:"",SKOR_24:"",SKOR_25:"",SKOR_26:"",SKOR_27:"",SKOR_28:"",SKOR_29:"",SKOR_30:"",SKOR_31:"",SKOR_32:"",SKOR_33:"",SKOR_34:"",SKOR_35:"",SKOR_36:"",SKOR_37:"",SKOR_38:"",SKOR_39:"",SKOR_40:"",SKOR_41:"",SKOR_42:"",SKOR_43:"",SKOR_44:"",SKOR_45:"",SKOR_46:"",SKOR_47:"",SKOR_48:"",SKOR_49:"",SKOR_50:"",
            action:"siswakirimnilai",
            idtoken:this.identitas.idsiswa,
            idsekolah:"UPTD SDN Ratujaya 1",
            nilaiPG:"",
            idbaris:"",
            nilaiEssay:"",
            matericode:this.identitas.kbmid,
            html_buktifisik:"",
            waktumulai:''
        }
    }
}