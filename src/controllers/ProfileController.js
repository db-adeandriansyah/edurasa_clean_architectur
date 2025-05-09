// import profileViews from "../views/profileViews";
// import { menuController } from "./menuController";

import { FormatTanggal } from "../utilities/FormatTanggal";
import profileViews from "../views/profil/profileViews";
import Fitur from "./Fitur";

export class ProfileController extends Fitur{
    constructor(key,setApp){
        super(key,setApp);
        this.wrapProfil = document.getElementById('formulirProfile');
        this.koleksiRombel = this.Auth.koleksiRombel;

    }
    async initProfile(){
        this.wrapProfil.innerHTML = `<img src="${this.imageLoading}" class="mx-auto mt-3">`;
        if(this.setApp.typeUser !== 'siswa'){
            const idguru = this.getValInLocal('app','idrow');
            const db = await this.callDbAkunGuru(idguru);
            const profil = await this.callDbProfilGuru(idguru);
            this.wrapProfil.innerHTML = profileViews.formulirGuru(db,profil.data[0],this.koleksiRombel,FormatTanggal);
            this.listenerSaveGuru(db,profil)
        }else{
            /** periksa apakah siswa memiliki usulan perbaikan data */
            this.wrapProfil.innerHTML = 'Untuk Profil, silakan minta guru kelasmu untuk mengedit data pribadi Ananda.'
        }
    }
    async callDbAkunGuru(id){
        const db = this.uriDbAkun;
        const akun = await this.service.getMethodController(db+'&action=profilguru&id='+id);
        
        if(akun.status){
            return akun.data.profil[0];
        }else{
            const dataawal = akun.data.profil[0].slice()
            Object.keys(dataawal).forEach(k=>dataawal[k]='');
            return dataawal;
        }
    }
    async callDbProfilGuru(idguru){
        const dbKepsek = this.uriKepsek;
        const tendik = await this.getMethodController(dbKepsek+'?action=tabeltendik');

        const test = new this.array(tendik.data).arrayObjectFromArrayMultidimensi();
        const dataprofil = test.filter(s=> s.idguru == idguru);
        const indexDataprofil = test.findIndex(s=> s.idguru==idguru);
        let result = dataprofil;

        if(dataprofil.length==0){
            result = {}
            Object.keys(test[0]).forEach(k=>result[k]='');
        }
        return {data:result, indexnya:indexDataprofil-1,allProfil:test}
    }
    listenerSaveGuru(db,profil){
        const btnSave = document.getElementById('btnSaveProfil');
        const btnShowPassword = document.getElementById('showPass');
        const eventTanggal = document.querySelectorAll('[data-event-tanggal]');
        const selectJabatan = document.getElementById('Tugas');
        const inputPoto = document.getElementById('fileAvatar');

        selectJabatan.onchange = (e)=>{
            if(['PAI','PKRIS','PKATO','PHIND','PBUDH','BSUND','PJOK'].includes(e.target.value)){
                let html = profileViews.kondisiPilihTugasJabatan(this.koleksiRombel,this.kelasampu);
                document.querySelector('.kondisipilihkelasampu').innerHTML = html;
            }else{
                document.querySelector('.kondisipilihkelasampu').innerHTML = "";

            }
        }
        eventTanggal.forEach(el=>{
            el.onchange = (e)=>{
                let idbody = el.getAttribute('data-event-tanggal');
                let bodyElemen = document.getElementById(idbody);
                let val =e.target.value;
                let fn = this.FormatTanggal(val).umur();
                let teks = fn.tahun+' Tahun, '+ fn.bulan +' Bulan.';
                bodyElemen.innerHTML = teks;

            }
        })
        btnShowPassword.onclick = (e)=>{
            let btn = e.target;
            let val = btn.nextElementSibling;
            if(val.type == 'password'){
                btn.classList.remove('bi-eye-slash');
                btn.classList.add('bi-eye');
                val.type = 'text';
            }else{
                btn.classList.remove('bi-eye');
                btn.classList.add('bi-eye-slash');
                val.type = 'password';
            }
        }
        btnSave.onclick= async()=>{
            const allProfil = document.querySelectorAll('[data-profil]');
            const allAkun = document.querySelectorAll('[data-akun]');
            const profilAsal = profil.data[0];
            let profilModif = {};
            allProfil.forEach(el=>{
                let key = el.getAttribute('data-profil');
                if(key == 'tugasjabatan'){
                    profilModif[key] =el.options[el.selectedIndex].text;

                }else{
                    profilModif[key] =el.value;
                }
            });
            let akunModif = {}
            allAkun.forEach(ak=>{
                let key = ak.getAttribute('data-akun');
                akunModif[key]=ak.value;
            });
            
            let lamaDiSekolah = this.FormatTanggal(profilModif.tmtdisekolah).umur();
            profilModif.masakerjasekolah = this.FormatTanggal(profilModif.tmtdisekolah).umur().tahun +' Tahun, '+this.FormatTanggal(profilModif.tmtdisekolah).umur().bulan+' Bulan.';//lamaDiSekolah.tahun+' Tahun, '+ lamaDiSekolah.bulan +' Bulan';
            
            if(['PNS','PPPPK'].includes(profilModif.pnsnonpns)){
                let umur = this.FormatTanggal(profilModif.tmtpns).umur();
                profilModif.MKTh = umur.tahun;
                profilModif.MKBln = umur.bulan;
            }else{
                profilModif.MKTh = lamaDiSekolah.tahun;
                profilModif.MKBln = lamaDiSekolah.bulan;
            }
            if(akunModif.gurukelas_gmp=='Guru Kelas'){  
                akunModif.kelasampu = akunModif.kelas;
                akunModif.jenjang = parseInt(akunModif.kelas);
                
                
            }else if(akunModif.gurukelas_gmp == 'Guru Mapel'){
                const checkboxKelasAmpu = Array.from(document.querySelectorAll('input[name="kelasampu"]:checked')).map(r=>r.value);
                akunModif.kelasampu = checkboxKelasAmpu.join(',');
            }
            
            const profilKirim = Object.assign({},profilAsal,profilModif);
            const akunKirim = Object.assign({},db, akunModif);
            let crudUrl = this.crud;
            let objProfil = {
                formData:JSON.stringify(profilKirim),
                // formData:profilKirim,
                byRow : (profil.indexnya+3), 
                // autoId:'no',
                //stringFormat:'["data"]',
                //filter:'{"jenjang":"6"}'
                idss:this.macro.ss_kepsek,
                tab:'tendik'
            }
            let fi = {'id':akunKirim.id}
            let objAkun = {
                formData:JSON.stringify(akunKirim),
                byRow : akunKirim.id, 
                // autoId:'no',
                //stringFormat:'["data"]',
                // filter:JSON.stringify({id:akunKirim.id}),\
                filter:JSON.stringify(fi),
                idss:this.macro.ss_user,
                tab:'user'
            };
            let arSourc = [objProfil,objAkun];
            let ofd = {
                action:'updateMultiple',
                source:JSON.stringify(arSourc)
            }
            
            let fdata = new FormData();
            Object.entries(ofd).forEach(([k,v])=>{
                fdata.append(k,v);
            })
            let panggil = await this.postMethodController(crudUrl,fdata);
            let curDa = panggil.data.data;
            let yu = curDa.filter(s=> s.info.namaTab == 'user')[0].data[0];
            //console.log(yu);
            let daloc = {
                idrow:yu.id,
                akses:yu.gurukelas_gmp,
                user:yu.guru_namalengkap,
                room:yu.kelas,
                jenjang:yu.jenjang,
                nip_guru:yu.guru_nip,
                nip_kepsek:yu.kepsek_nip,
                no_wa:yu.no_wa_user,
                idimg:yu.idpoto_potoguru,
                tekstapel: this.setApp.tapel,
                idabsenguru:yu.idabsen,
                kelasampu:yu.kelasampu,
                idsemester:this.setApp.semester
            }
            // console.log(daloc);
            this.writeLocal('app',JSON.stringify(daloc));
            
            // const param = exec+'?idss='+ss+ "&action=dataguruall";
            const param = this.uriDbAkun+ "&action=dataguruall";
            const dataGuru = await this.getMethodSilentController(param);
            //onsole.log(dataGuru.data);
            const persons = this.CollectionsEdu(dataGuru.data.result).customFilter((item)=>item.aktif == 'aktif').selectProperties(['guru_namalengkap','gurukelas_gmp','kelas','idpoto_potoguru','guru_nip']);
            const ptk = persons.data;
            this.writeLocal('ptk',JSON.stringify(ptk));
            alert('data profil telah berhasil diupdate');

        }
        inputPoto.onchange = (e)=>{
            let file = e.target.files[0];
            let imgResize = this.imageResize(Infinity,Infinity,true);
            let namafileinput = document.querySelector('[data-profil="namalengkap"]').value
            if(file){
                // imgResize.getFileDataURL(file, async (mimeType, dataURL)=>{
                let ekstnsi = file.name.split('.').pop();
                imgResize.resizeImageToDataURL(file, async (mimeType, dataURL)=>{
                    let params = {
                        action:'uploadFile',
                        folder:'POTO PROFIL EDURASA',
                        // subfolder:,
                        // namafile:namafileinput.replace(/[^\w\s.-]/g, "_"),
                        "namafile":namafileinput.replace(/[^\w\s.-]|(\.)/g, "_")+'.'+ekstnsi,
                        "base64":dataURL.replace(/^.*,/, ''),//.replace(/^.*,/, '');
                        "mimeType":mimeType,//dataURL.match(/^.*(?=;)/)[0],//
                    }

                    const respon = await this.crudSendImage(params);
                    
                    document.querySelector('[data-akun="idpoto_potoguru"]').value = respon.data.idfile;
                    let imgas = document.querySelectorAll('img');
                    imgas.forEach(img=>{
                        if(!img.classList.contains('img-thumbnail')){
                            img.src = "https://lh3.googleusercontent.com/d/"+respon.data.idfile;
                        }
                    })

                })
            }

        }
        
    }
    async crudSendImage(data){
        let fd = new FormData();
        Object.entries(data).forEach(([k,v])=>{
            fd.append(k,v);
        })
        return await this.postMethodController(this.crud,fd)
    }
}