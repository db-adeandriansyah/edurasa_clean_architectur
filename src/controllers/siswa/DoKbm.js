import CountDown from "./CountDown";
import CreateLJK from "./CreateLJK";
import SkorSiswa from "./SkorSiswa";

export default class DoKbm{
    constructor(service,kbm,currentSiswa){
        this.service = service;
        this.kbm = kbm;
        this.currentSiswa = currentSiswa;
        this.result = {};
        this.jawabansiswa = {};
        this.dom  = null;
        this.elTimer = null;
        this.elButton=null;
    }
    views(view){
        this.view = view;
        return this;
    }
    queryElement(dom){
        this.dom = dom;
        this.elTimer = dom.querySelector('#kontroltimer');
        this.elButton = dom.querySelector('#kontrolselesai');
        
        return this;
    }
    urlImg(im){
        this.UrlImg = im;
        return this;
    }
    paramNilai(p){
        this.paramskor = p;
        return this;
    }
    datasoaldaridom(dbsoal){
        let tbody =  this.dom;//this.domNaskah.querySelector('#tabelkontendesainnaskah_dariserver > tbody');
        let arraysoal = [];
        let arraynaskah = [];
        let hasManual = false;
        let hasOtomatis = false;
        if(tbody){
            let tr = tbody.querySelectorAll('tr');
            for(let i =0 ; i < tr.length ; i++){
                let td =tr[i].cells;
                if(td.length>1){
                    let obj = {};
                    let sel = td[1];
                    let bentuksoal = sel.getAttribute('data-bentuksoal');
                    obj.nobybentuk = sel.getAttribute('data-nobybentuk')??false;
                    obj.bentuksoal = sel.getAttribute('data-bentuksoal')??false;
                    obj.nosoal = sel.getAttribute('data-nosoal')??false;
                    obj.hassoal = false;
                    let singleSel = {};
                        singleSel.type="konten";
                        singleSel.content = false
                        
                    if(sel.hasAttribute('data-simpanannaskahguru')){
                        let idsoal = sel.getAttribute('data-simpanannaskahguru');
                        let itemsoal = dbsoal.simpleFilter({'idbaris':idsoal}).lastData;//filter(s=>s.idbaris == idsoal)[0];
                        obj.hassoal = true;
                        obj.itemsoal = itemsoal;
                        obj.kuncijawaban = itemsoal.kuncijawaban;
                        obj.hasOpsiD = itemsoal.opsiD!=="";
                        obj.pembahasan = itemsoal.penskoran;
                        obj.pertanyaan = itemsoal.pertanyaan;
                        obj.ilustrasi = itemsoal.ilustrasi;
                        obj.nobybentuk = parseInt(sel.getAttribute('data-nobybentuk'));
                        obj.bentuksoal = sel.getAttribute('data-bentuksoal');
                        obj.nosoal = parseInt(sel.getAttribute('data-nosoal'));
                        
                        if(bentuksoal=='Menjodohkan'){
                            obj.banyakjodoh = sel.getAttribute('data-banyakjodoh');
                            obj.isManual=true;
                            hasManual=true
                        }else if(bentuksoal == 'PGKompleks'){
                            
                            obj.isManual=false;
                        }else if(bentuksoal == 'BenarSalah'){
                            obj.isManual=false;
                        }else if(bentuksoal == 'Pilihan Ganda'){
                            hasOtomatis = true;
                            obj.isManual=false;
                            if(sel.hasAttribute('data-tampilanpg')){
                                obj.tampilanpg=sel.getAttribute('data-tampilanpg');
                            }else{
                                obj.tampilanpg='vertical';
                            }
                        }else{
                            obj.isManual=true;
                            hasManual = true;
                        }
                        singleSel.content = true;
                        arraynaskah.push(Object.assign({},singleSel,obj));
                    }else{
                        arraynaskah.push(Object.assign({},singleSel,obj));
                    }
    
                    if(bentuksoal){
                        arraysoal.push(obj);
                    }
    
                }else{
                    let singleSel= {};
                    singleSel.hassoal = false;
                    singleSel.type="sparator";
                    singleSel.content = td[0].innerHTML;
                    arraynaskah.push(singleSel);
    
                }
            }
        }
        let hasOpsiD =arraynaskah.some(s=>s.hasOpsiD)

        this.naskahsoal = {
            datasoal            : arraysoal,
            soalManual          : arraysoal.filter(s=>s.isManual),
            soalOtomatis          : arraysoal.filter(s=>!s.isManual),
            datanaskah          : arraynaskah,
            opsiD               : hasOpsiD,
            hasManual           : hasManual,
            hasOtomatis         : hasOtomatis,
            idbaris             : this.kbm.idbaris,
            kuncikd             : this.kbm.kuncikd,
            idmapel             : this.kbm.idmapel,
            jenistagihan        : this.kbm.jenistagihan,
            idtgl               : this.kbm.idtgl,


            
        };
        return this;
    }
    init(){
        console.log('service',this.service, this.paramskor)
        let skor = new SkorSiswa(this.dom,this.service,this.naskahsoal.datasoal).init(this.UrlImg);
        let waktumulai = new Date();
        console.log('datasoal',this.naskahsoal)
        new CountDown(this.kbm.idtglend,this.elTimer).settingWarning(2).runtime((state)=>{
            
            if(state == 1){
                if(this.elButton.classList.contains('invisible')){
                    this.elButton.classList.remove('invisible');
                    this.elButton.classList.add('visible');
                }

            }else if(state == 2){
                if(this.elButton.classList.contains('visible')){
                    this.elButton.classList.add('invisible');
                    this.dom.innerHTML = 'Waktu habis';
                }
            }
        }).start();

        this.elButton.onclick = ()=>{
            console.log('anda ngeklik tombol selesai',this.naskahsoal, skor.TotalPg)
            let ljk = new CreateLJK(this.naskahsoal,this.currentSiswa,skor.result);
            ljk.waktumulai =waktumulai;
            ljk.waktuakhir = new Date();
            console.log(ljk)
            this.dom.innerHTML = this.view.createHtmlLjk(ljk,this.naskahsoal,ljk.proseskerjaan)
        };
    }

}