
const SuratFeatures = await import("../controller_features/surat/SuratFeatures").then(module=>  module.default  );
import Fitur from "./Fitur";
export default class DataSiswaController extends Fitur{
    #judulHalaman;
    constructor(app,service){
        super(app);
        this.siswaService = service;
        
        this.#judulHalaman = '';//html
        this.controlRombel();
    }

    settingHeaderPage(){
        let lastTitle = `<h4 class="text-center mb-3">Semester ${this.setApp.semester} Tahun Pelajaran ${this.setApp.tapel}</h4>`;
        this.#judulHalaman = '';
        
        for(let i = 0 ; i < arguments.length-1; i++){
            this.#judulHalaman +=`<h3 class="text-center mb-0">${arguments[i]}</h3>`;
        }
        
        if(arguments[arguments.length-1]==true){
            this.#judulHalaman+= lastTitle;
        }
        // return this.#judulHalaman;
    }
    
    async fitur(devedency){
        // const {DataKelas, view, tabel,modal,bodyModal,TableProperties,myArray,DataMutasi,serviceSurat,ControlSuratFeatures} = {...devedency};
        const {DataKelas, view, tabel,modal,TableProperties,myArray,DataMutasi,serviceSurat} = {...devedency};
        
        this.dev['view'] = view;
        // this.dev['viewModal'] = bodyModal;
        this.dev['myArray'] = myArray;
        this.dev['serviceSurat'] = serviceSurat;
        // this.dev['ClassControlSuratFeatures'] = ControlSuratFeatures;
        
        this.dev.tabel = tabel;
        this.dev.TableProperties = TableProperties;
        this.dev.Modal = this.makeInstance(modal,['#modalAuto',{'backdrop':'static','keyboard':false}]);
        this.dev.Modal2 = this.makeInstance(modal,['#modalAuto2',{'backdrop':'static','keyboard':false},{
            'printLandscapeDom' : this.printLandscapeDom, // paramaeter (dom)
            'printPortraitDom'  : this.printPortraitDom, //parameter (dom)
            'wordLandscapeDom'  : this.wordLandscapeDom,// parameterL(title="edurasa",dom)
            'wordPortraitDom'   : this.wordPortraitDom, //parameter (title,dom);
            'pdfLandscapeDom'   : this.pdfLandscapeDom,
            'pdfPortraitDom'    : this.pdfPortraitDom,
            'excelDom'          : this.excelDom// parameter(dom,queryTabel,title='Export Excel')
        }]);
        
        // ;
                
        this.dev.DataKelas = this.makeInstance(DataKelas,[
            this.siswaService,
            this.dev.Modal,
            
        ]);
        this.dev.DataMutasi = DataMutasi;
        
        await serviceSurat.callDbAllSurat();
        this.dev.SuratFitur =  new SuratFeatures(
            serviceSurat,//this.service,
            this.dev.Modal,//this.Modal,
            this.dev.Modal2,//this.Modal1,
            // tabelDom,
            this.Auth,
            this.App.LocalJson('ptk'),
            this.siswaService.ptkAll,
            JSON.parse(window.localStorage.getItem('dbSiswa')),
            this.fokusRombel
            // serviceSurat,
            // this.dev.Modal,
            // this.dev.Modal2,
            // // tabel,
            // this.Auth,
            // this.App.LocalJson('ptk'),
            // this.siswaService.ptkAll,
            // this.siswaService.allSiswa.filter(s=>s.aktif == 'aktif'),// && s.nama_rombel == this.fokusRombel)
            // this.fokusRombel
        )
        
    }
    
    data_kelas(){
        
        this.settingHeaderPage(`Daftar Siswa Kelas ${this.fokusRombel}`,true);
        ;
        this.maincontrol.innerHTML = this.dev.view.sorter();
        this.dev.DataKelas.headingHTML = this.#judulHalaman;
        this.dev.DataKelas.run(this.fokusRombel,'showRombel');
    }
    
    siswa_Jenjang(){
        this.settingHeaderPage(`Daftar Siswa Kelas ${parseInt(this.fokusRombel)}`,true);
        ;
        this.maincontrol.innerHTML = this.dev.view.sorter();
        this.dev.DataKelas.headingHTML =this.#judulHalaman;
        this.dev.DataKelas.run(this.fokusRombel,'showJenjang');
    }
    
    cari_siswa(){
        ;
        this.maincontrol.innerHTML = this.dev.view.menucari(this.setApp.koleksiRombel,this.siswaService.arLabel.agama, this.siswaService.arLabel.pekerjaan);
        this.workplace.innerHTML ="";
        this.dev.DataKelas.checkboxKriteriaPencarian(this.App.LocalJson('ptk'),this.setApp);
    }
    mutasi_masuk(){
        this.maincontrol.innerHTML = this.dev.view.menumutasi(this.siswaService.koleksiTapelBukuInduk);
        this.workplace.innerHTML ="";
        this.dev.DataKelas.eventSelectMutasi('masuk');
    }
    mutasi_keluar(){
        this.maincontrol.innerHTML = this.dev.view.menumutasi(this.siswaService.koleksiTapelBukuInduk);
        this.workplace.innerHTML ="";
        this.dev.DataKelas.eventSelectMutasi('keluar');
    }
    mutasi_laporan(){
                let y = new Date().getFullYear();
        let m0 = (new Date().getMonth()+1).toString().padStart(2,'0');
        const opsi = this.koleksiBulanAplikasi;
        
        this.maincontrol.innerHTML = this.dev.view.koleksiBulan(
                'Pilih Bulan',
                opsi,
                'Silakan pilih bulan tertentu untuk melihat data mutasi di bulan yang Anda pilih',
                'pilihBulanMutasi',
                y+'-'+m0+'-01'
                );
                //siswaServices,createTabel,TabelProperties,view
        const mutasi =  this.makeInstance(this.dev.DataMutasi,[
            this.siswaService,
            this.dev.tabel,
            this.dev.TableProperties,
            this.dev.view
        ]);
        mutasi.init(this.fokusRombel, this.setApp.tapel);
    }
    tambah_siswa(){
        
        this.ttdControl.selectedIndex=0;
        this.workplace.innerHTML = this.dev.view.tambahsiswa(this.fokusRombel,false);
        this.dev.DataKelas.registeredNewSiswa(()=>{
            // this.data_kelas();
            this.menus[0].checked = true;
            this.menus[0].dispatchEvent(new Event('click'));
        })
        
    }
    statistik_umur(){
        this.settingHeaderPage(`Rekapitulasi Umur Siswa`,this.setApp.namaSekolah,'Per '+new Date().toLocaleString('id-ID',{dateStyle:'long'}),false);
        this.dev.DataKelas.headingHTML = this.#judulHalaman;
        this.dev.DataKelas.umurStatistik(this.setApp.koleksiRombel);

    }
    statistik_agama(){
        this.settingHeaderPage(`Rekapitulasi Agama Siswa`,this.setApp.namaSekolah,true);
        this.dev.DataKelas.headingHTML = this.#judulHalaman;
        this.dev.DataKelas.agamaStatistik(this.setApp.koleksiRombel);
    }

    async sk(){
        this.dev.Modal.init('Detail Siswa',"Ini Body Modal","Selanjutnya",false);
        this.maincontrol.innerHTML = this.dev.view.controlSuratKeterangan({value:"Surat Keterangan Aktif",target:'target_siswa',text:"Surat Keterangan Aktif"});
        // this.dev.SuratFitur.fokusrombel = this.fokusRombel;
        // await this.dev.serviceSurat.callSuratKeluar()
        // this.dev.SuratFitur.initInheritance('suratkeluar');
        // this.dev.SuratFitur.fokusmenu = this.dev.SuratFitur.showSuratKeluar;
        this.settingHeaderPage('Daftar Surat Keterangan Aktif',false);
        this.dev.SuratFitur.htmlJudul = this.#judulHalaman;
        this.dev.SuratFitur.showSuratKeteranganAktif();
        // this.listenerFilter_suratKeluar('showSuratKeteranganAktif');
        this.btnSuratKeluar();
    }
    
    async sk_NISN(){
        this.dev.Modal.init('Detail Siswa',"Ini Body Modal","Selanjutnya",false);
        this.maincontrol.innerHTML = this.dev.view.controlSuratKeterangan({value:"Surat Keterangan NISN",target:'target_siswa',text:"Surat Keterangan NISN"});
        
        this.dev.SuratFitur.fokusrombel = this.fokusRombel;
        // await this.dev.serviceSurat.callSuratKeluar();
        // this.dev.SuratFitur.initInheritance('suratkeluar');
        // this.dev.SuratFitur.fokusmenu = this.dev.SuratFitur.showSuratKeluar;
        this.settingHeaderPage('Daftar Surat Keterangan NISN',false);
        this.dev.SuratFitur.htmlJudul = this.#judulHalaman;
        this.dev.SuratFitur.showSuratKeteranganNISN();
        this.btnSuratKeluar();
    }
    btnSuratKeluar(){
        let btn = document.getElementById('btnshow-suratkeluar');
        let btnCreate = document.getElementById('btncreate_suratketerangan');
        btn.onclick =()=>this.dev.SuratFitur.showSuratKeluar(20);
        
        btnCreate.onclick =(e)=>{
            let atr = btnCreate.getAttribute('data-create');
            if(atr == 'Surat Keterangan Aktif'){
                this.dev.SuratFitur.createSurat('showSuratKeteranganAktif',20);

            }else if(atr = 'Surat Keterangan NISN'){
                this.dev.SuratFitur.createSurat('showSuratKeteranganNISN',20);

            }
        };
    }
}