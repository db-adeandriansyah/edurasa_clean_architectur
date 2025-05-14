import UrlImg from "../UrlImg.js";
import view from "./htmlDashboardSiswa";


export default class ViewDashboardSiswa{
    constructor(service, currentSiswa){
        this.service=service;
        this.currentSiswa = currentSiswa;
        this.dontClose = null;

    }

    Orm(obj){
        this.dbOrm = obj;
        return this;
    }
    renderView(elemen){
        elemen.classList.remove('d-none');
        this.parent = elemen;
        return this;
    }
    stringToDom(string){
        const template= document.createElement('template');
        template.innerHTML = string;
        return template.content;
    }
    init(){
        
        const {
                Modal,
                ormDataMateri,
                ormAbsen,
                ormNilai,
                ormBankSoal,
                logosekolah,
                barloading,
                FormatTanggal,
                param,
                faseKey,
                paramnilai,
            } = this.dbOrm;
        
        this.parent.innerHTML = view.welcome({siswa:this.currentSiswa,data:this.dbOrm});
        const rombel = this.currentSiswa.nama_rombel;
        
        document.querySelectorAll('[data-aksi]').forEach(btn=>{
            if(btn.getAttribute('data-aksi')=='absen'){
                btn.onclick = ()=>{
                    Modal.show();
                    Modal.showHideFooter(false);
                    Modal.widthOrientation(false);
                    Modal.showBodyHtml(view.modalAbsen(logosekolah))
                    Modal.settingHeder('Hadir');
                    
                    const pilihAbsen = document.getElementById('pilihAbsen');
                    const cara1 = document.getElementById('grupInput');
                    const elImg = document.getElementById('img-prev');
                    const ketImg = document.getElementById('img-ket');
                    const valInput = document.getElementById('pilihpoto');
                    pilihAbsen.onchange = (e)=>{
                        Modal.settingHeder(e.target.value);
                    }
                    
                    cara1.onchange = (e)=>{
                        let files = e.target.files[0];
                        if(files){
                            this.service.repo.uploadGambarAbsen(files,{subfolder:'kelas '+rombel,namafile:this.currentSiswa.pd_nama+'_'+new Date().getTime()},async(idfile)=>{
                                
                                valInput.value = idfile;
                                elImg.src = new UrlImg(idfile).urlImg;
                                ketImg.innerHTML = "Berhasil diunggah, tunggu sebentar ....";
                                
                                /**
                                 * Time_Stamp	
                                 * id	
                                 * name	kelas	kehadiran	
                                 * fileContent	resume	action	idbaris	tokensiswa
                                 */
                                const boddy = {
                                    tokensiswa : this.currentSiswa.id,
                                    id:new FormatTanggal(new Date).idStringAbsen(),
                                    name:this.currentSiswa.pd_nama,
                                    kelas:this.currentSiswa.nama_rombel,
                                    fileContent:idfile,
                                    action:'siswaabsensiswa',
                                    resume:'namafolder',
                                    kehadiran:pilihAbsen.value,
                                    Time_Stamp:new Date()



                                }
                                
                                await this.service.siswaAbsen(param,boddy);
                                ketImg.innerHTML = "Sukses";
                                setTimeout(()=>{
                                    this.dbOrm = Object.assign(this.dbOrm,{ormAbsen:ormAbsen.parent(this.service.data[param.tabdb]).init()});
                                    this.parent.innerHTML = view.welcome({siswa:this.currentSiswa,data:this.dbOrm});
                                    Modal.hide();
                                    this.init();
                                },100)
                                
                            },{width:300,
                                length:Infinity,
                                keepSize:false,})
                        }
                    }
                }
            }else if(btn.getAttribute('data-aksi')=='kbm'){
                btn.onclick = async()=>{
                    let idkbm = btn.getAttribute('data-id');
                    let datakbm = ormDataMateri.result.simpleFilter({'idbaris':idkbm}).lastData;
                    let imgLoad = `<img src="${barloading}" alt="loading" class="img"/>`;
                    
                    Modal.show();
                    Modal.showHideFooter(true);
                    Modal.widthOrientation(false);
                    Modal.showBodyHtml(imgLoad);
                    Modal.settingHeder(this.currentSiswa.pd_nama);
                    Modal.showHideFooter(false)
                    if(process.env.NODE_ENV=='production'){
                        Modal.disabledClose()
                    }
                    // class untuk menghasilkan
                    
                    let html = await this.service.showTextHTML(datakbm.idmateri);
                    let cl= this.stringToDom(html);
                    
                    
                    Modal.showBodyHtml(view.viewSoalBySiswa(cl));
                    const DoKbm = await import('./DoKbm.js').then(m=>m.default);
                    new DoKbm(this.service,datakbm, this.currentSiswa)
                            .queryElement(Modal)
                            .views(view)
                            .datasoaldaridom(ormBankSoal.collections)
                            .urlImg(UrlImg)
                            .callFunction(async(tabrespon,tabtagihan,html,state,interval)=>{
                                clearInterval(interval);
                                
                                let imgLoad = `<img src="${barloading}" alt="loading" class="img"/>`;
                                Modal.showBodyHtml(imgLoad);
                                this.service.repo.ss_nilai_jenjang(paramnilai.idss);
                                
                                await this.service.kirimSingleNilaiLJK(tabrespon,tabtagihan,html,1,[paramnilai]);
                                ormNilai.parent(this.service.data['respon_'+parseInt(tabrespon.idkelas)]).init();
                                ormDataMateri.withOrm('datanilai',ormNilai.collections,'idbaris','matericode').statusPengerjaan();
                                this.dbOrm = Object.assign(this.dbOrm,{ormNilai:ormNilai,ormDataMateri:ormDataMateri});
                                    this.parent.innerHTML = view.welcome({siswa:this.currentSiswa,data:this.dbOrm});
                                    Modal.hide();
                                    this.init();
                                
                            })
                            .init();
                }
            
            }else if(btn.getAttribute('data-aksi')=='nilai'){
                btn.onclick = async()=>{
                    let idkbm = btn.getAttribute('data-id');
                    let datakbm = ormDataMateri.collections.simpleFilter({'idbaris':idkbm}).lastData;
                    let imgLoad = `<img src="${barloading}" alt="loading" class="img"/>`;
                    
                    Modal.show();
                    Modal.showHideFooter(false);
                    Modal.widthOrientation(true);
                    Modal.showBodyHtml(imgLoad);
                    Modal.settingHeder(this.currentSiswa.pd_nama);
                    
                    if(process.env.NODE_ENV=='production'){
                        Modal.enabledClose()
                    }
                    // class untuk menghasilkan
                    let html = await this.service.showTextHTML(datakbm.datanilai[0].html_jawaban);
                    Modal.showBodyHtml(html);
                    // const DoKbm = await import('./DoKbm.js').then(m=>m.default);
                    // new DoKbm(this.service,datakbm, this.currentSiswa).init()
                }
            
            }else{
                console.log('btnClick',btn.getAttribute('data-aksi'));
            }
        })
        

    }
}