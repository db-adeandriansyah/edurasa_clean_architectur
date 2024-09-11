export default class CreateNaskahSoal{
    constructor(){

    }
    injectClass(objekClass){
        this.devedencyClass = objekClass;
        return this;
    }
    injectViews(views){
        this.views = views;
        return this;
    }
    injectOrm(orms){
        this.Orms = orms;
        return this;
    }
    methodControllers(d){
        const {replacingImage, makeInstance,urlimg} = d;
        this.replacingImage = replacingImage;
        this.makeInstance = makeInstance;
        this.urlImg = urlimg;
        return this;
    }
    
    user(auth){
        this.Auth = auth;
        return this;
    }
    areakerja(w){
        this.workplace = w;
        return this;
    }
    modal(m){
        this.Modal = m;
        return this;
    }
    serv(s){
        this.service = s;
        return this;
    }
    kelas(d){
        this.fokusJenjang = d;
        return this;
    }
    get newbanksoal(){
        return this.banksoal;
    }
    set newbanksoal(d){
        this.banksoal =d;
    }
    get newInstancePropertiNaskah(){
        return this.instansPropnaskah;
    }
    set newInstancePropertiNaskah(x){
        this.instansPropnaskah = x;
    }
    init(pradesain){
        console.log('pradesain Create',pradesain)
        const { BuildHtmlNaskah,
                ClickableNaskah,
                ControlSoalReplacing,
                PaginationAvailableSoal,
                ReplacingSoalToSel,
                ToolbarCreateItemSoal,
                EditorCreateItemSoal,
                PropertiNaskah,
                ValidatorItemSoal,
                FormulirEditItemSoal,
                classCollectionsEdu
                } = this.devedencyClass;
        const {viewDesainNaskah,koleksiBentukSoal,controlbanksoal} = this.views;
        let {orm,banksoal,instancesPropertiNaskah} = this.Orms;
        this.newInstancePropertiNaskah = instancesPropertiNaskah;
        this.newbanksoal = banksoal;

                /**
                 * Render HTML Pradesain naskah, selnya diklik muncul data di modal
                 */
                new BuildHtmlNaskah(pradesain)
                    .author(this.Auth)
                    .renderHTMLTo(this.workplace);
                
                if(pradesain.hasOwnProperty('html')){
                    delete pradesain.html;
                }
                

                /**
                 * Addlistener tiap sel yang diklik
                 * setelah menambah listener/event tiap sel, selanjutnya instansiasi class ini
                 * akan mengupdate hasil kliknya berupa data untuk diteruskan ke event-event/listener selnjutnya
                 */
                new ClickableNaskah()
                    .init()
                    .runtime((dataklik)=>{
                        let bentuksoalBySel = dataklik.bentuksoal;
                        
                        //menampilkan UI/kontrol untuk bank soal yang disediakan sesuai sel yang diklik pada modal
                        this.Modal.widthOrientation(true);
                        this.Modal.body.classList.add('p-0');
                        this.Modal.settingHeder('Data Soal '+bentuksoalBySel);
                        this.Modal.showBodyHtml(viewDesainNaskah.modalSoal2(pradesain,bentuksoalBySel));
                        this.Modal.showHideFooter(false);

                        if(bentuksoalBySel){
                            this.Modal.show();  
                            
                            /**
                             * handle/event dari setiap pemilihan kd di modal
                             */
                            new ControlSoalReplacing(dataklik, banksoal)
                                    .handle()
                                    .runtime((dataselraplacing)=>{
                                        console.log('ketika user memilih radio, data ini yang dihasilkan:',dataselraplacing);
                                        let paramToolbarEditor = {
                                            bentuksoal:bentuksoalBySel,
                                            koleksibentuksoal:koleksiBentukSoal,
                                            kurikulum: orm.collections.data,
                                            kd: dataselraplacing.kd,
                                            paramUploadGambar:{folder:'Gambar Media Soal'},
                                            mode:dataselraplacing.mode,
                                            user:this.Auth,
                                            jenjang:this.fokusJenjang
                                        }
                                        let desainsoalbaruedit = ToolbarCreateItemSoal.createPraDesain(paramToolbarEditor);
                                        /**
                                         * meregistrasikan class untuk menampilkan pagination bank soal yang terselesksi berdasarkan
                                         * data ('dataselreplacing').
                                         * hasil dari class ini adalah: item soal yang akan ditempatkan pada sel;
                                         * item soal tersebut juga akan diteruskan untuk dapat diedit melalui class formuliredit
                                         */
                                        new PaginationAvailableSoal(dataselraplacing,banksoal)
                                            .runtime((selectedItemSoal)=>{
                                                const btnReplace = document.getElementById('terapkan_replace');
                                                const btnWithout = document.getElementById('terapkan_replacewithout');
                                                const btnEditSoal = document.getElementById('editsoalini');
                                                const btnSimpanReplace =document.getElementById('terapkan_replaceedit');
                                                const btnTab = document.getElementById('tabmodal_menu4');

                                                /**
                                                 * class berikut meregistrasikan elemen html (btnTerapkan, btnTerapkanWithout, btnEdit)
                                                 */
                                                const evntReplace = new ReplacingSoalToSel(selectedItemSoal)
                                                                    .datapradesain(pradesain)
                                                                    .auth(this.Auth)
                                                                    .noUrutNaskah(dataklik.nourut_naskah)
                                                                    .targetSel(dataklik.current_sel)
                                                                    .instancePropertiNaskah(instancesPropertiNaskah);  
                                                
                                                btnReplace.onclick = ()=>{
                                                    evntReplace.replacing(true);
                                                    evntReplace.hasElemenSebaranKd;
                                                    this.Modal.hide();
                                                };

                                                btnWithout.onclick = ()=>{
                                                    evntReplace.replacing(false);
                                                    this.Modal.hide();
                                                };

                                                /**
                                                 * meregistrasikan event edit soal yang sedang ditampilkan di modal
                                                 */
                                                btnSimpanReplace.classList.add('d-none');

                                                btnEditSoal.onclick = ()=>{
                                                    btnTab.click();

                                                    btnSimpanReplace.classList.remove('d-none');
                                                    
                                                    new FormulirEditItemSoal(selectedItemSoal)
                                                        .addService(this.service)
                                                        .addDataDesain(desainsoalbaruedit)
                                                        .addUrlImg(this.urlImg)
                                                        .addLoading(this.Auth.barloading)
                                                        .buildForm()
                                                        .fillItem()
                                                        .init()
                                                        .runtime((result)=>{
                                                            const btnTerapkan = document.getElementById('terapkan_replaceedit');
                                                            
                                                            btnTerapkan.onclick = async ()=>{
                                                                let req = new ValidatorItemSoal(result);
                                                                
                                                                btnTerapkan.classList.add('d-none');
                                                                req.init();
                                                                
                                                                if(req.validatingRequest()){
                                                                    let cek = await req.domain();
                                                                    let idbaris = cek.idbaris;
                                                                    console.log('idbaris soal edit', idbaris);
                                                                    await this.service.simpanItemSoalEdit(cek);
                                                                    btnTerapkan.classList.remove('d-none');
                                                                    banksoal = this.makeInstance(classCollectionsEdu,[this.service.data.banksoal])
                                                                                .simpleFilter({'jenjang':this.fokusJenjang})
                                                                                .setProperty('ilustrasi',(item)=>this.replacingImage(item))
                                                                                .setProperty('pertanyaan',(item)=>this.replacingImage(item))
                                                                                .setProperty('opsiA',(item)=>this.replacingImage(item))
                                                                                .setProperty('opsiB',(item)=>this.replacingImage(item))
                                                                                .setProperty('opsiC',(item)=>this.replacingImage(item))
                                                                                .setProperty('opsiD',(item)=>this.replacingImage(item))
                                                                                .setProperty('penskoran',(item)=>this.replacingImage(item))
                                                                                ;
                                                                            instancesPropertiNaskah = this.makeInstance(PropertiNaskah,[banksoal.data]);
                                                                            instancesPropertiNaskah.currentMapelOnClassRoom = this.service.data.koleksimapel;
                                                                            this.newInstancePropertiNaskah = instancesPropertiNaskah;
                                                                            this.newbanksoal = banksoal;
                                                                            
                                                                            let itemsoal = banksoal.simpleFilter({'idbaris':idbaris}).data[0];
                                                                            
                                                                            itemsoal['tampilanpg'] = 'vertical';
                    
                                                                            const evntReplace = new ReplacingSoalToSel(itemsoal)
                                                                                .datapradesain(pradesain)
                                                                                .auth(this.Auth)
                                                                                .noUrutNaskah(dataklik.nourut_naskah  )
                                                                                .targetSel(dataklik.current_sel)
                                                                                .instancePropertiNaskah(instancesPropertiNaskah);  
                    
                                                                            evntReplace.replacing(true); 
                                                                    this.Modal.hide();
                                                                }else{
                                                                    let teks = "Item soal belum siap, silakan lengkapi bagian berikut:\n";
                                                                    let datainvladi = req.arrayKeyInvalid();
                                    
                                                                    datainvladi.forEach(n=>{
                                                                        teks+=n;
                                                                        teks+="\n";
                                                                    })
                                                                    alert(teks);
                                                                }
                                                            }
                                                        });
                                                };
                                            })
                                            .listenerSelecting();
                                        
                                        /**
                                         * mereigstrasikan jenis teks editor untuk menambahkan item soal
                                         * disesuaikan jenis teks editornya (copypaste atau formulir)
                                         */
                                        new EditorCreateItemSoal()
                                            .praDesain(desainsoalbaruedit)
                                            .workplace(this.Modal.body.querySelector('#createsoalbarumodal'))
                                            .urlImg(this.urlImg)
                                            .service(this.service)
                                            .auth(this.Auth)
                                            .view(controlbanksoal)
                                            .build()
                                            .runtime((data)=>{
                                                const save = document.getElementById('simpanItemSoal');
                                                const reset = document.getElementById('resetItemSoal');
                                                
                                                save.onclick = async()=>{
                                                    save.classList.add('d-none');
                                                    let req = new ValidatorItemSoal(data);
                                                    req.init();
                                                    if(req.validatingRequest()){
                                                        let cek = await req.domain();
                                                        
                                                        await this.service.simpanItemSoal(cek);
                                                        save.classList.remove('d-none');
                                                        
                                                        banksoal = this.makeInstance(classCollectionsEdu,[this.service.data.banksoal])
                                                            .simpleFilter({'jenjang':this.fokusJenjang})
                                                            .setProperty('ilustrasi',(item)=>this.replacingImage(item))
                                                                .setProperty('pertanyaan',(item)=>this.replacingImage(item))
                                                                .setProperty('opsiA',(item)=>this.replacingImage(item))
                                                                .setProperty('opsiB',(item)=>this.replacingImage(item))
                                                                .setProperty('opsiC',(item)=>this.replacingImage(item))
                                                                .setProperty('opsiD',(item)=>this.replacingImage(item))
                                                                .setProperty('penskoran',(item)=>this.replacingImage(item))
                                                                ;
                                                        // instancesPropertiNaskah = this.makeInstance(PropertiNaskah,[banksoal.data]);
                                                        instancesPropertiNaskah = this.makeInstance(PropertiNaskah,[banksoal.data]);
                                                        instancesPropertiNaskah.currentMapelOnClassRoom = this.service.data.koleksimapel;
                                                        
                                                        this.newInstancePropertiNaskah = instancesPropertiNaskah;
                                                        this.newbanksoal = banksoal;
        
                                                        let itemsoal = banksoal.lastData;
                                                        
                                                        itemsoal['tampilanpg'] = 'vertical';

                                                        const evntReplace = new ReplacingSoalToSel(itemsoal)
                                                            .datapradesain(pradesain)
                                                            .auth(this.Auth)
                                                            .noUrutNaskah(dataklik.nourut_naskah  )
                                                            .targetSel(dataklik.current_sel)
                                                            .instancePropertiNaskah(instancesPropertiNaskah);  

                                                        evntReplace.replacing(true); 
                                                        this.Modal.hide();

                                                        data.reset();                    
                                                    }else{
                                                        save.classList.remove('d-none');
                        
                                                        let teks = "Item soal belum siap, silakan lengkapi bagian berikut:\n";
                                                        let datainvladi = req.arrayKeyInvalid();
                        
                                                        datainvladi.forEach(n=>{
                                                            teks+=n;
                                                            teks+="\n";
                                                        })
                                                        alert(teks);
                                                    }
                                                };

                                                reset.onclick = ()=>{
                                                    if(save.classList.contains('d-none')){
                                                        save.classList.remove('d-none');
                                                    };
                                                    
                                                    data.reset();
                                                    
                                                };
                                            });

                                    }).execute();
                        }
                    }); 
                
        return this;         
    }
}