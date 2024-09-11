import { replaceSoalToSel } from "../banksoal/viewBankSoal";

/**
 * @info Fungsi untuk menempatkan item soal ke sel Naskah Soal
 */
export default class ReplacingSoalToSel{
    constructor(itemsoal){
        this.itemsoal = itemsoal
        this.hasElemenSebaranKd = false;
        this.cekNoUrutNaskah =1
    }
    datapradesain(datadesain){
        this.pradesain = datadesain;
        this.hasElemenSebaranKd = datadesain.petunjuknilai;
        return this;
    }
    noUrutNaskah(x){
        this.cekNoUrutNaskah =x;
        return this;
    }
    targetSel(x){
        this.domTarget = x;
        return this;
    }
    instancePropertiNaskah(x){
        this.PropertiNaskahSoal = x;
        return this;
    }
    replacing(ilustrasi=true){
        const selectedItemSoal = this.itemsoal;
        let datareplace = {};

        datareplace.setilustrasi = ilustrasi;
        datareplace.tampilanpg  = selectedItemSoal.tampilanpg;
        datareplace.nosoal = this.cekNoUrutNaskah;
        
        this.domTarget.innerHTML = replaceSoalToSel(selectedItemSoal,datareplace);
        this.domTarget.setAttribute('data-simpanannaskahguru',selectedItemSoal.idbaris);
        this.domTarget.setAttribute('data-ilustrasi',true);

        if(selectedItemSoal.bentuksoalspesifik == 'Pilihan Ganda'){
            this.domTarget.setAttribute('class','calcnosoal');
            this.domTarget.setAttribute('data-tampilanpg',selectedItemSoal.tampilanpg);
        }else if(selectedItemSoal.bentuksoalspesifik == 'Isian'){
            this.domTarget.setAttribute('class','soalessay');
            this.domTarget.setAttribute('id','essay'+this.cekNoUrutNaskah);
        }else if(selectedItemSoal.bentuksoalspesifik == 'Essay'){
            this.domTarget.setAttribute('class','soalessay');
            this.domTarget.setAttribute('id','essay'+this.cekNoUrutNaskah);
        }else if(selectedItemSoal.bentuksoalspesifik == 'Menjodohkan'){
            // this.domTarget.setAttribute('data-banyakjodoh',selectedItemSoal.jumlahsoalmenjodohkan);
            this.domTarget.setAttribute('data-banyakjodoh','1');

        }

        if(this.hasElemenSebaranKd){
            this.eventKlikReplacingItemSoal();
        }
    }
    auth(user){
        this.user = user;
        return this
    }
    eventKlikReplacingItemSoal(){
        
        let propsNaskah = this.PropertiNaskahSoal;//new this.PropertiNaskahSoal(this.ormbanksoal.data);
        // let propsNaskah = new PropertiNaskahSoal(this.banksoal.banksoalservice.data.banksoal);
        let propKisikisi = propsNaskah.desainFromPraDesain(this.pradesain,this.user).datakisikisi();
        let kisikisi = propKisikisi.generate;
        
        kisikisi.forEach(n=>{
            let key = n.kodemapel;
            let mapel_kd = key;
            let mapingKd =[];
                if(n.kurikulum == 'kurmer'){
                    mapingKd  = n.data.map(n=>Object.assign({},{kd:n.objekproperti.idbaris,soal:n.arraysoal}));
                    
                }else{
                    mapingKd  = n.data.map(n=>Object.assign({},{kd:n.objekproperti.kd3,soal:n.arraysoal}));
                } 
                mapingKd.forEach(k=>{
                    let soal = k.soal;
                    let maping_jenistagihan = soal.map(j=>j.bentuksoal);
                    let addkd = k.kd;
                    maping_jenistagihan.forEach(l=>{
                        let mapell_kd_2 = mapel_kd+'_'+addkd+'_'+l;
                        let arraynosoal = soal.filter(s=>s.bentuksoal == l).map(soals=>parseInt(soals.nobybentuk)).sort();
                        
                        document.querySelector(`[data-koleksisoal="${mapell_kd_2}"]`).innerHTML = arraynosoal.join(',')
                        

                    })
                })
        });
        

    }
}