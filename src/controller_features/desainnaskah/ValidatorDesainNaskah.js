import NaskahSoal from "../../domains/NaskahSoal";

export default class ValidatorDesainNaskah{
    constructor(){
        this.soal = [];
        this.instansiasiNaskah = null;
        this.massageInvalid = ''
        this.isValid = false;
        this.fillData = [];
        this.emptyData = [];
    }
    get bolValid(){
        return this.isValid;
    }
    set bolValid(x){
        this.isValid = x;
    }
    pradesainNaskah(pradesain){
        this.pradesain = pradesain;
        return this;
    }
    fromDesainNaskah(instansiasinya){
        this.instansiasiNaskah = instansiasinya;
        this.soal = instansiasinya.datadom.datasoal;
        return this;
    }
    auth(a){
        this.user = a;
        return this;
    }
    createMassageInvalid(arrayInvalid){
        let teks="";
        if(arrayInvalid.length>0){
            teks+=`Template soal berikut belum ditandai item soal:\n\n`;
            arrayInvalid.forEach(t=>{
                teks+=`\t ${t.bentuksoal} = no. ${t.nobybentuk}\n`;
            })

        }
        return teks;
    }
    async domain(){
        let soalSortir = this.soal.sort((a,b)=> parseInt(a.nosoal)-parseInt(b.nosoal));
        const  NaskahSoal = await import('../../domains/NaskahSoal.js').then(m=>m.default);
        const data = new NaskahSoal({})
        data.addItem('idguru',this.user.idUser);
        data.addItem('namaguru',this.user.namaUser);
        data.addItem('juduldesain',this.pradesain.judulnaskah+' '+this.pradesain.mapel + ' ' + new Date(this.pradesain.start_waktu).toLocaleString('id-ID',{dateStyle:'full'}));
        data.addItem('mapel',this.pradesain.mapel);
        data.addItem('jenjang',this.pradesain.jenjang);
        data.addItem('kop',this.pradesain.judulnaskah);
        data.addItem('waktu2',this.pradesain.start_waktu)
        data.addItem('waktu2_end',this.pradesain.end_waktu);
        data.addItem('versiedurasa',true);
        data.addItem('kurikulum',this.pradesain.namakurikulum);
        soalSortir.forEach(n=>{
            let idsoal = n.itemsoal.idbaris;
            let key = 'no_'+n.nosoal;
            data.addItem(key,idsoal);
        })
        data.sanitize();
        return data.data
    }
    async domainSpreadsheetNaskah(data){
        const NaskahSoal = await import('../../domains/NaskahSoal.js').then(m=>m.default);
        const item = new NaskahSoal(data)
        return item.sanitize().data;
    }
    init(){
        // let soal = datanaskah.datadom.datasoal;
        let hasFalse = this.soal.filter(s=>!s.hassoal);
        
        this.isValid = hasFalse.length==0;
        this.massageInvalid = this.createMassageInvalid(hasFalse);

        return this;
    }
}