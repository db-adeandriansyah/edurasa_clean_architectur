import kopsuratEdurasa from "../../views/surat/kopsurat";
import viewSoal from "../naskahsoal/viewSoal";

export default class BuildHtmlNaskah{
    constructor(pradesain){
        this.pradesain = pradesain;
        this.callback = null;
        this.user = {};
    }
    author(x){
        this.user = x;
        return this;
    }
    
    renderHTMLTo(elemen){
        const {tabelnilai,petunjukumum,kerangka,kopsoal,identitassoal,judulnaskah,petunjuknilai,propertikd,penomoransoal}=this.pradesain;
        if( !kerangka ||  !propertikd) {
            // alert('Pra desain belum lengkap. Silakan lengkapi!');
            elemen.innerHTML = ""
            return;
        }
        
        let html = "";
        
        if(kopsoal) html+=this.kopNaskah(judulnaskah);
        if(identitassoal) {
            let mapel =this.pradesain.tekskodemapel;
            if(this.pradesain.mapel.indexOf('Tema ')>-1 && this.pradesain.mapel.indexOf('TEMA ')>-1){
                mapel = this.pradesain.mapel;
                mapel+=`<br>`;
                mapel+=this.pradesain.mapelTema.join(', ');
            }
            
            let elemendurasi = document.getElementById('durasi');
            let teksend = new Intl.DateTimeFormat('id-ID', {
                            hour: "numeric",
                            minute: "numeric",
                            timeZoneName: "short",
                        }).format(new Date(this.pradesain.end_waktu));
            let teks_start = new Intl.DateTimeFormat('id-ID', {
                                hour: "numeric",
                                minute: "numeric",
                                // timeZoneName: "short",
                            }).format(new Date(this.pradesain.start_waktu));
            let durasi = `${teks_start}-${teksend} (${elemendurasi.value} Menit)`;
            let dataidentitas={
                'mapelidentitas':mapel,
                'namakurikulum':this.pradesain.longKurikulum,
                'kelas':this.pradesain.kelas,
                'titimangsa':new Intl.DateTimeFormat('id-ID', {
                            dateStyle: 'full',
                        }).format(new Date(this.pradesain.start_waktu)),
                'durasi':durasi
            };

            html+=viewSoal.viewIdentitas(dataidentitas)
        };
        if(tabelnilai) html+= viewSoal.tabelNilai();
        
        let tag = 1;
        
        if(petunjukumum) {
            html+=`<ol type="A" style="margin:0;" class="tnr" id="naskah_petunjukumum" class="tnr">`
                html+=`<li value="${tag}" style="padding-left:0.7em;text-transform:uppercase;font-weight:bold">PETUNJUK UMUM`
                    html+=viewSoal.petunjukUmum(kerangka)
                html+=`</li>`
            html+=`</ol>`
            tag++; 
        };
        
        if(petunjuknilai){
            let datasebaran = {
                kelompokBentuksoal:kerangka.map(n=> n.bentuksoal),
                propertiKurikulum:propertikd,
                kurikulumbanksoal:this.pradesain.shortKurikulum
            }
            console.log('datasebaran',datasebaran);
            html+=`<ol type="A" style="margin:0;" class="tnr" id="naskah_sebarankd" class="tnr">`
                html+=`<li value="${tag}" style="padding-left:0.7em;font-weight:bold">PETUNJUK PENILAIAN`
                    html+=viewSoal.sebarankd(datasebaran)   
                html+=`</li>`
            html+=`</ol>`
            
            tag++; 
        }
        
        if(kerangka.length>0){
            html+=`<ol type="A" style="margin:0;" class="tnr">`
                html+=`<li value="${tag}" style="padding-left:0.7em;font-weight:bold">PETUNJUK KHUSUS</li>`;
            html+=`</ol>`;
            let dataisian = {
                kerangka:kerangka,
                penomoransoal:penomoransoal
            }
            if(this.pradesain.hasOwnProperty('html')){
                dataisian.kerangka = this.pradesain.html;
                html+=viewSoal.viewIsiNaskahSoalDraft(dataisian);
                // delete this.pradesain.html;
            }else{
                html+=viewSoal.isiNaskahSoal(dataisian);
            }
        }

        elemen.innerHTML = html;
        return this;
    };
    
    kopNaskah(judul){
        const logo=this.user.logoDepok,logosekolah=this.user.logoSekolah;
                let objKetSurat = {
                    judul:'PEMERINTAH DAERAH KOTA DEPOK',
                    judul2:'DINAS PENDIDIKAN',
                    namasekolah:this.user.namaSekolah,
                    alamat:'Jl. SMP Ratujaya No. 41, RT 05/RW 03, Kel. Ratujaya',
                    alamat2:'NPSN: 20228914 | Email: uptdsdnratujaya1@gmail.com, web: www.sdnratujaya1.net',
                    tapelsemester:'TAHUN PELAJARAN '+this.user.tapel,
                    judul3:judul,
                    alamat3:'kecamatan Cipayung'
                }
                let crDom = document.createElement('div');
                crDom.setAttribute('class','kops mb-3');
                crDom.innerHTML =  kopsuratEdurasa['versi3'](logo, objKetSurat,logosekolah);
                // this.workplace.appendChild(crDom);
                // this.workplace.insertBefore(crDom,this.workplace.firstChild);
                return crDom.outerHTML;
    }
    runtime(fn){
        this.callback = fn;
    }
}