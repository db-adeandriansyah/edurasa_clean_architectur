import { FormatTanggal } from "../../utilities/FormatTanggal";
import { stringToDom } from "../../views/components/doms";

export default class ToolbarCreateDesainNaskah{
    #user;
    #service;
    #jenjang;
    #viewDesainNaskah;
    #koleksibentuksoal;
    #banksoal

    #result;
    #callback;
    constructor(Orm){
        this.Orm            = Orm;
        this.#result        = {};
        this.#callback      = null;
        this.shortKurikulum = 'kurmer';
        this.longKurikulum  = 'Kurikulum Merdeka';
        this.maincontrol    = null;
        this.pradesain      = { 
                                longKurikulum   : this.longKurikulum,
                                shortKurikulum  : this.shortKurikulum,
                                namakurikulum   : this.shortKurikulum,
                                ormkurikulum    : Orm.collections.data,
                                mapeltema       : [],
                                jenjang         : 1
                            };
    }
    /**
     * @return Object data Type = {'PAI':'Pendidikan Agama Islam dan Budi Pekerti', ...,}
     */
    get koleksimapel(){
        return this.Orm.koleksimapel;
    } 
    
    /**
     * @returns CollectionsEdu;
     */
    get propertiKurikulum(){
        return this.Orm.collections;
        
    } 
    get ormkurikulum(){

        return this.Orm.collections.data;
    }
    /**
     * @return ArrayObject
     */
    get labelingSelectMapel(){
        let data = [];
        // let mapelReal = this.currentMapelOnClassRoom;
        let dataAsal = this.Orm.koleksimapel;
        
        Object.entries(dataAsal).forEach(([key,value])=>{;
            let ob = {};
            ob.label = value;
            ob.value = key;
            data.push(ob);
        })
        return data;

    }

    user(x){
        this.#user = x;
        return this;
    }
    jenjang(x){
        this.#jenjang = x;
        this.pradesain.jenjang = x;
        return this;
    }
    service(x){
        this.#service=x;
        return this;
    }
    view(x){
        this.#viewDesainNaskah = x;
        return this
    }
    bentuksoal(x){
        this.#koleksibentuksoal = x;
        return this;
    }
    dbbanksoal(x){
        this.#banksoal = x;
        return this;
    }
    renderHTMLTo(elemen){
        // this.#result.taksonomibloom = this.#service.data.taksonomibloom;
        // this.#result.idguru = this.#user.idUser;
        // this.#result.oleh = this.#user.namaUser;
        // this.#result.jenjang = this.#jenjang
        // this.#result.namakurikulum = 'kurmer';
        this.maincontrol = elemen;
        elemen.innerHTML = this.htmlToolbar();
        return this;
    }
    htmlToolbar(){
        let datamenu = {
            shortKurikulum      : this.shortKurikulum, 
            longKurikulum       : this.longKurikulum, 
            jenjang             : this.#jenjang, 
            koleksiBentukSoal   : this.#koleksibentuksoal,
            isGuruMapel         : this.#user.typeUser == 'Guru Mapel',
            mapelAjar           : this.#user.tugasUser,
            koleksirombel       : this.#user.koleksiRombel,
            _htmlkoleksimapel   : this.labelingSelectMapel, 
            _htmlkoleksimapelWithTema   : this.labelingSelectMapel, 
            koleksimapel        : this.koleksimapel   ,
            kurikulum           : this.propertiKurikulum,
            'draft'             :this.showDraft()
        };
        return this.#viewDesainNaskah.toolbar(datamenu);

       
        
    }
    showDraft(){
        let data;
        if(window.localStorage.hasOwnProperty('draftnaskah_'+this.#jenjang)){
            data = JSON.parse(window.localStorage.getItem('draftnaskah_'+this.#jenjang));
        }
        return data;
    }
    registerListenerElemenPraDesain(q='data-pradesain'){
        let elemen_pradesain = document.querySelectorAll(`[${q}]`);//document.querySelectorAll('[data-pradesain]');
        let targetInput = document.querySelector('#durasi');
        let data = {};
        elemen_pradesain.forEach(n=>{
            
            n.onchange = (e)=>{
                if(n.getAttribute('data-pradesain')=='mapel'){
                    this.registerListnerPropertiKurikulum();
                }
                
                data = this.updatepradesain(q);
                targetInput.value =  FormatTanggal.durasiMenit(data.start_waktu,data.end_waktu);
                data = this.updatepradesain(q);
                this.pradesain = Object.assign(this.pradesain,data);
                this.#callback(this.pradesain);
            }
            
        });
        // this.registerListnerPropertiKurikulum();
        // document.querySelector('#selectmapel').dispatchEvent(new Event('change'));
        return this;
    }
    runtime(callback){
        this.#callback = callback;
        return this;
    }
    updatepradesain(q){
        let elemen_pradesain = document.querySelectorAll(`[${q}]`);//document.querySelectorAll('[data-pradesain]');
        let data = {};
        elemen_pradesain.forEach(n=>{
            if(n.type=='checkbox'){
                if(n.checked){
                    data[n.getAttribute('data-pradesain')] = true;
                }else{
                    data[n.getAttribute('data-pradesain')] = false;
                }
            }else if(n.type == 'radio'){
                if(n.checked){
                    data[n.getAttribute('data-pradesain')] = n.value;
                }
            }else if(n.type=='select-one'){
                data[n.getAttribute('data-pradesain')]=n.value;
                
                
                data['kodemapel'] = n.value;
                data['tekskodemapel']=this.koleksimapel[n.value];//this.banksoal.currentMapelOnClassRoom[n.value];
            }else{
                data[n.getAttribute('data-pradesain')] = n.value;

            }
        });
        return data;
    }
    registerListnerPropertiKurikulum(){
        let controlMapel = document.querySelector('#selectmapel');
        let targetView = document.querySelector('#tableKDTemplateDesain');
        let orm = this.ormkurikulum;
        let tipekurikulum = this.shortKurikulum;
        let mapelTema = [];
        if(this.#jenjang>3){
            mapelTema = ['PKN','BINDO','IPA','IPS','SBDP'];
        }else{
            mapelTema = ['PKN','BINDO','MTK','SBDP','PJOK'];

        }
        controlMapel.onchange = (e)=> {
            let filterOrm = [];
            if(tipekurikulum == 'kurmer'){
                filterOrm = orm.filter(s=> s.kodemapel == e.target.value).sort((a,b)=>a.foreignkey_elemencp - b.foreignkey_elemencp);
            }else{
                if(e.target.value.indexOf('Tema ')>-1){

                    filterOrm = orm.filter(s=>mapelTema.includes(s.mapel));
                }else{
                    filterOrm = orm.filter(s=>s.mapel == e.target.value);
                }
            }
            this.pradesain['kodemapel'] = e.target.value;
            this.pradesain['mapel'] = e.target.value;
            this.pradesain['tekskodemapel']=this.koleksimapel[e.target.value];
            this.#callback(this.pradesain);

            targetView.innerHTML = this.#viewDesainNaskah.tabelPropertiKurikulum(
                                        tipekurikulum,
                                        filterOrm,
                                        this.#banksoal,//this.banksoal.banksoalservice.data.banksoal,
                                        this.#jenjang,//this.banksoal.jenjang,
                                        this.#koleksibentuksoal,//this.banksoal.koleksiBentukSoal
                                    );
            this.registerCheckMarkKompetensi(tipekurikulum,filterOrm);
        }
        
    };
    registerCheckMarkKompetensi(tipekurikulum,orm){
        let checker = null;
        let key = 'idbaris';
        let data = [];

        if(tipekurikulum == 'kurmer'){
            checker = document.querySelectorAll('input[name="atpmodal"]')
        }else{
            key = 'baris';
            checker  = document.querySelectorAll('input[name="kd3modal"]')
        }
        
        checker.forEach((n)=>{
            if(n.checked){
                let ormItem = orm.filter(s=> s[key]== n.value);
                data.push(ormItem[0]);
            }
            
            n.onchange = (e)=>{
                if(n.checked){
                    let ormItem = orm.filter(s=> s[key]== e.target.value);
                    data.push(ormItem[0]);
                }else{
                    let indek = data.findIndex(s=>s[key]==e.target.value);
                    data.splice(indek,1);
                }
                
                this.pradesain['propertikd'] = data;
                this.#callback(this.pradesain);
            }
        })
    }
    
    registrasiListenerKerangka(){
        let jumlahsoal = document.querySelectorAll('[data-jumlahsoal]');
        let wraper = document.getElementById('kerangkanaskahpreview');
        let ar =[];
        jumlahsoal.forEach(n=>{
            let id = n.getAttribute('data-desain');
                
            if(n.value == ''| n.value == 0){
                let cekdom = wraper.querySelector(`[data-urutanbentuksoal="${id}"]`);
                let arraycekdom = Array.from(wraper.querySelectorAll('[data-urutanbentuksoal]'));
                let index = arraycekdom.indexOf(cekdom);
            
                if(cekdom){
                    cekdom.remove();
                    ar.splice(index,1);
                }
            }else{
                let cekdom = wraper.querySelector(`[data-urutanbentuksoal="${id}"]`);
                
                if(!cekdom){
                    let addingthis = stringToDom(`<div class="border p-2 fw-bolder my-2 font10 d-flex justify-content-between" draggable="true" data-urutanbentuksoal="${id}" style="cursor:move;user-select:none"><span>${id}</span><span>${n.value} soal</span></div>`)
                    wraper.appendChild(addingthis);
                    let ob = {
                        'bentuksoal':id,
                        'jumlah':n.value
                    }
                    ar.push(ob);
                    cekdom = wraper.querySelector(`[data-urutanbentuksoal="${id}"]`);
                }else{
                    cekdom = wraper.querySelector(`[data-urutanbentuksoal="${id}"]`);
                    cekdom.innerHTML = `<span>${id}</span><span>${n.value} soal</span>`;
                    let cekAr = ar.findIndex(s=>s.bentuksoal == id);
                    let ob = {
                        'bentuksoal':id,
                        'jumlah':n.value
                    }
                    ar.splice(cekAr,1,ob);

                }
            
            }
            this.pradesain['kerangka']=ar;

            n.onblur = (e)=>{
                let id = n.getAttribute('data-desain');
                
                
                if(e.target.value == ''| e.target.value == 0){
                    let cekdom = wraper.querySelector(`[data-urutanbentuksoal="${id}"]`);
                    let arraycekdom = Array.from(wraper.querySelectorAll('[data-urutanbentuksoal]'));
                    let index = arraycekdom.indexOf(cekdom);
                
                    if(cekdom){
                        cekdom.remove();
                        ar.splice(index,1);
                    }
                }else{
                    let cekdom = wraper.querySelector(`[data-urutanbentuksoal="${id}"]`);
                    
                    if(!cekdom){
                        let addingthis = stringToDom(`<div class="border p-2 fw-bolder my-2 font10 d-flex justify-content-between" draggable="true" data-urutanbentuksoal="${id}" style="cursor:move;user-select:none"><span>${id}</span><span>${e.target.value} soal</span></div>`)
                        wraper.appendChild(addingthis);
                        let ob = {
                            'bentuksoal':id,
                            'jumlah':e.target.value
                        }
                        ar.push(ob);
                        cekdom = wraper.querySelector(`[data-urutanbentuksoal="${id}"]`);
                    }else{
                        cekdom = wraper.querySelector(`[data-urutanbentuksoal="${id}"]`);
                        cekdom.innerHTML = `<span>${id}</span><span>${e.target.value} soal</span>`;
                        let cekAr = ar.findIndex(s=>s.bentuksoal == id);
                        let ob = {
                            'bentuksoal':id,
                            'jumlah':e.target.value
                        }
                        ar.splice(cekAr,1,ob);

                    }
                
                }
                
                this.pradesain['kerangka']=ar;
                this.#callback(this.pradesain);
            }
        })
        return this;
    }
    registrasiDraft(){
        const btn = document.getElementById('btndraft');
        
        if(btn){
            btn.onclick = ()=>{
                let data = JSON.parse(window.localStorage.getItem('draftnaskah_'+this.#jenjang));
                
                this.pradesain = Object.assign({},this.pradesain,data.pradesain, {html:data.html});
                
                this.fillValueOnToolBar();
                
                this.#callback(this.pradesain);
                
            }
        }
        return this;
    }
    fillValueOnToolBar(){
        const formsTool = document.querySelectorAll('[data-pradesain]');
        formsTool.forEach(n=>{
            let key = n.getAttribute('data-pradesain');

            if(n.type == 'radio' && this.pradesain[key]){
                n.checked = true;
            }else if(n.type == 'checkbox' && this.pradesain[key]){
                n.checked = true;
            }else if(n.type == 'text'){
                n.value = this.pradesain[key];
            }else if(n.type == 'select-one'){
                n.value = this.pradesain[key];
                
                let targetView = document.querySelector('#tableKDTemplateDesain');
                let filterOrm = this.ormkurikulum.filter(s=> s.kodemapel == this.pradesain[key]).sort((a,b)=>a.foreignkey_elemencp - b.foreignkey_elemencp);
            
                targetView.innerHTML = this.#viewDesainNaskah.tabelPropertiKurikulum(
                                    this.shortKurikulum,
                                    filterOrm,
                                    this.#banksoal,//this.banksoal.banksoalservice.data.banksoal,
                                    this.#jenjang,//this.banksoal.jenjang,
                                    this.#koleksibentuksoal,//this.banksoal.koleksiBentukSoal
                                );
                this.pradesain.propertikd.forEach(kd=>{
                    let rd = document.querySelector(`#radioatpmoda${kd.idbaris}`);
                    if(rd){
                        rd.checked = true;
                    }
                })
                
                this.registerCheckMarkKompetensi(this.shortKurikulum,filterOrm);

            }else if(n.type == 'datetime-local'){
                n.value = this.#viewDesainNaskah.convertToDateTimeLocalString(new Date(this.pradesain[key]));
            }else{
                n.value = this.pradesain[key];
            }
        });
        this.pradesain.kerangka.forEach(soal=>{
            let inputan = document.querySelector(`[data-desain="${soal.bentuksoal}"]`);
            if(inputan){
                inputan.value = soal.jumlah;
            }
        })
        this.registrasiListenerKerangka();
        
    }
    execute(){
        
        this.registerListnerPropertiKurikulum();
        document.getElementById('footerarea').innerHTML  = this.#viewDesainNaskah.footerButtons();
        document.querySelector('#selectmapel').dispatchEvent(new Event('change'));
    }
}