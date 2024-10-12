import { controlFiturBuatPerItemSoal } from "../banksoal/viewBankSoal";

export default class ToolbarCreateItemSoal{
    #user;
    #service;
    #jenjang;
    #controlbanksoal;
    #koleksibentuksoal;
    #taksonomibloom 

    #result;
    #callback;
    constructor(Orm){
        this.Orm            = Orm;
        this.#result        = {};
        this.#callback      = null;
        this.shortKurikulum = 'kurmer';
        this.longKurikulum  = 'Kurikulum Merdeka';
        this.maincontrol = null;
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
        return this;
    }
    service(x){
        this.#service=x;
        return this;
    }
    view(x){
        this.#controlbanksoal = x;
        return this
    }
    bentuksoal(x){
        this.#koleksibentuksoal = x;
        return this;
    }
    taksonomibloom(x){
        this.#taksonomibloom = x;
        return this;
    }
    renderHTMLTo(elemen){
        // this.#result.taksonomibloom = this.#service.data.taksonomibloom;
        // this.#result.idguru = this.#user.idUser;
        // this.#result.oleh = this.#user.namaUser;
        // this.#result.jenjang = this.#jenjang
        // this.#result.namakurikulum = 'kurmer';
        this.maincontrol = elemen;
        elemen.innerHTML = this.htmlToolbar(this.#user,this.#jenjang);
        return this;
    }

    selectorDataElement(q='data-pradesain'){
        const elemenPraDesain = document.querySelectorAll(`[${q}]`);
        this.#result['ormkurikulum'] = this.propertiKurikulum.data;
        elemenPraDesain.forEach(element=>{
            let key= element.getAttribute(q);
            
            if(element.type=='radio' && element.checked){
                this.#result[key] = element.value;
                if(key == 'bentuksoal'){   
                    this.#result['editor'] = element.getAttribute('data-editorinput');//??this.#koleksibentuksoal.filter(s=>s.bentuksoalspesifik == element.value)[0].editorinput;;
                    this.#result['bentuksoal'] = !['Essay','Isian'].includes(element.value)?element.value:'Isian';
                    this.#result['bentuksoalspesifik'] = element.value
                }

            }else if(element.type=='select-one'){
                let ruanglingkupSearch = this.propertiKurikulum.simpleFilter({'kodemapel': element.value}).data;//[0].ruanglingkup;;
                
                this.#result[key] = element.value;
                this.#result['tekskodemapel']=this.koleksimapel[element.value];
                
                if(ruanglingkupSearch.length>0){
                    this.#result['lingkupmateri']=ruanglingkupSearch[0].ruanglingkup;;
                    
                }else{
                    this.#result['lingkupmateri']=[];
                    
                }
            };

            element.onchange = (e)=>{
                this.#result[key]=element.value;
                
                if(key == 'kodemapel'){
                    let divwrap = document.getElementById('resultefekpilihmapel');
                    let html = this.#controlbanksoal.menuPilihPropertiKurikulum(this.shortKurikulum,this.propertiKurikulum.simpleFilter({'kodemapel':e.target.value}).data)
                    divwrap.innerHTML = html;
                    
                    let ruanglingkupSearch = this.propertiKurikulum.simpleFilter({'kodemapel': element.value}).data;//[0].ruanglingkup;;
                
                    this.#result[key] = element.value;
                    this.#result['tekskodemapel']=this.koleksimapel[element.value];
                    
                    if(ruanglingkupSearch.length>0){
                        this.#result['lingkupmateri']=ruanglingkupSearch[0].ruanglingkup;;
                        
                    }else{
                        this.#result['lingkupmateri']=[];
                        
                    }
                    this.selectorDataElement(q);
                }else if(key == 'bentuksoal'){
                    this.#result['editor'] = element.getAttribute('data-editorinput');//??this.#koleksibentuksoal.filter(s=>s.bentuksoalspesifik == element.value)[0].editorinput;;
                    this.#result['bentuksoal'] = !['Essay','Isian'].includes(element.value)?element.value:'Isian';
                    this.#result['bentuksoalspesifik'] = element.value

                }
                this.#callback(this.#result);

            }
        })
        return this;
    }
    selectorDataElementModal(q='data-desain'){
        const elemenDesain = document.querySelectorAll(`[${q}]`);
        this.#result['ormkurikulum'] = this.propertiKurikulum.data;
        this.#result.namakurikulum = this.shortKurikulum;
        this.#result.taksonomibloom = this.#taksonomibloom;//this.#service.data.taksonomibloom;
        this.#result.idguru = this.#user.idUser;
        this.#result.oleh = this.#user.namaUser;
        this.#result.jenjang = this.#jenjang
        elemenDesain.forEach(element=>{
            let key= element.getAttribute(q);
            if(element.type == 'radio' && element.checked){
                this.#result[key] = element.value;
                if(key == 'kd'){
                    this.#result['mapel'] = this.ormkurikulum.filter(s=> s.idbaris == element.value)[0].kodemapel;
                    this.#result['kodemapel'] = this.ormkurikulum.filter(s=> s.idbaris == element.value)[0].kodemapel;;//[0].kodemapel;
                    this.#result['tekskodemapel'] = this.ormkurikulum.filter(s=> s.idbaris == element.value)[0].kodemapel_teks;//[0].kodemapel_teks;
                    this.#result['lingkupmateri'] = this.ormkurikulum.filter(s=> s.idbaris == element.value)[0].lingkupmateri;;//[0].lingkupmateri;
                }
            };
            element.onchange = ()=>{
                
                if(element.type == 'radio' && element.checked){
                    this.#result[key] = element.value;
                    if(key == 'kd'){
                        this.#result['mapel'] = this.ormkurikulum.filter(s=> s.idbaris == element.value)[0].kodemapel;
                        this.#result['kodemapel'] = this.ormkurikulum.filter(s=> s.idbaris == element.value)[0].kodemapel;;//[0].kodemapel;
                        this.#result['tekskodemapel'] = this.ormkurikulum.filter(s=> s.idbaris == element.value)[0].kodemapel_teks;//[0].kodemapel_teks;
                        this.#result['lingkupmateri'] = this.ormkurikulum.filter(s=> s.idbaris == element.value)[0].lingkupmateri;;//[0].lingkupmateri;
                    }
                };
                this.#callback(this.#result);
            }
        });
        return this;
    }
    currentBentukSoal(bentuksoal){
        this.#result['bentuksoal'] = bentuksoal;
        this.#result['bentuksoal'] = !['Essay','Isian'].includes(bentuksoal)?bentuksoal:'Isian';
        this.#result['bentuksoalspesifik'] = bentuksoal;
        this.#result['editor'] = this.#koleksibentuksoal.filter(s=>s.bentuksoalspesifik == bentuksoal)[0].editorinput;

        return this;
    }
    runtime(callback){
        this.#callback = callback;
        return this;
    }
    static createPraDesain(data){
        const {bentuksoal,koleksibentuksoal,kurikulum,kd,paramUploadGambar,mode,user,jenjang,taksonomibloom} = data;
        let result = {};
            result['namakurikulum']         ='kurmer';
            result['mode']                  =mode;
            result['kd']                    =kd;
            result['idguru']                =user.idUser;
            result['oleh']                  =user.namaUser;
            result['jenjang']               =jenjang;
            result['ormkurikulum']          = kurikulum;
            // result['bentuksoal']            = bentuksoal;
            result['bentuksoal']            = !['Essay','Isian'].includes(bentuksoal)?bentuksoal:'Isian';
            result['bentuksoalspesifik']    = bentuksoal;
            result['taksonomibloom']    = taksonomibloom;
            result['editor']                = koleksibentuksoal.filter(s=>s.bentuksoalspesifik == bentuksoal)[0].editorinput;
            result['mapel']                 = kurikulum.filter(s=> s.idbaris == kd)[0].kodemapel;
            result['kodemapel']             = kurikulum.filter(s=> s.idbaris == kd)[0].kodemapel;;//[0].kodemapel;
            result['tekskodemapel']         = kurikulum.filter(s=> s.idbaris == kd)[0].kodemapel_teks;//[0].kodemapel_teks;
            result['lingkupmateri']         = kurikulum.filter(s=> s.idbaris == kd)[0].lingkupmateri;;//[0].lingkupmateri;
            result['paramUploadGambar']     = Object.assign({
                                                    folder      : 'GAMBAR ITEM SOAL',
                                                    subfolder   : 'gambar paste'
                                                },paramUploadGambar);
        return result;
    }
    paramUploadMedia(obj={}){
        this.#result.paramUploadGambar = Object.assign({
            folder      : 'GAMBAR ITEM SOAL',
            subfolder   : 'gambar paste'
        },obj);
        return this;
    }
    htmlToolbar(user,jenjang){
        let html = "";
        let data = {
            shortKurikulum      : this.shortKurikulum, 
            longKurikulum       : this.longKurikulum, 
            jenjang             : this.#jenjang, 
            koleksibentuksoal   : this.#koleksibentuksoal,
            isGuruMapel         : user.typeUser == 'Guru Mapel',
            mapelAjar           : user.tugasUser,
            _htmlkoleksimapel   : this.labelingSelectMapel, 
            kurikulum           : this.propertiKurikulum
        }
        html = controlFiturBuatPerItemSoal(data);
        return html
    }
    execute(){
        
        this.#result.taksonomibloom = this.#taksonomibloom;//this.#service.data.taksonomibloom;
        this.#result.idguru = this.#user.idUser;
        this.#result.oleh = this.#user.namaUser;
        this.#result.jenjang = this.#jenjang
        this.#result.namakurikulum = 'kurmer';

        this.#callback(this.#result);
    }
    executeModal(){
       
        
        this.selectorDataElementModal();
        this.#callback(this.#result);
    }
}