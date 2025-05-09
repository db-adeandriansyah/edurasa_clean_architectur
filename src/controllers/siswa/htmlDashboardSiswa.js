import buttonEdu from "../../views/components/buttons";
import inputsElements from "../../views/components/input-elements";
import { cardMenu2 } from "../../views/sidebar/cardSidebar";

const headerWelcome = (data) =>{
    return `<h4 class="text-center">${data.pd_nama} (${data.nama_rombel})</h4>`;
}
const statusViewKbm  = (data)=>{
    let html="";
    if(data.statusDetikIni == 'now' && data.datanilai.length == 0){
        html+=`Silakan Kerjakan`;
    }else if(data.statusDetikIni == 'now' && data.datanilai.length > 0){
        html+=`<span class="text-success fw-bold">Sudah Selesai</span>`;
    }else if(typeof(data.statusDetikIni)=="number"){
        html+=data.statusDetikIni+' Menit lagi'
    }else{
        html+=`<span class="text-${data.statusDetikIni=='Ananda sudah mengerjakan'?'success':'danger'} fw-bold">${data.statusDetikIni}</span>`;
    }
    return html;
}
const statusAksiKbm  = (data)=>{
    let html="";
    
    if(data.statusDetikIni == 'now' && data.datanilai.length==0){
        html+= `<button class="btn btn-sm btn-success border-bottom border-start-0 border-top-0 border-end-0 border-3 rounded-pill" data-aksi="kbm" data-id="${data.idbaris}">Mulai</button>`
    }else if(data.statusDetikIni == 'now' && data.datanilai.length>0){
        html+= `<button class="btn btn-sm btn-info border-bottom border-dark border-start-0 border-top-0 border-end-0 border-3 rounded-pill" data-aksi="nilai" data-id="${data.idbaris}" data-idnilai="${data.datanilai[data.datanilai.length-1].idbaris}">Lihat Nilai</button>`;
    }else if(typeof(data.statusDetikIni)=="number"){
        // html+= `<button disabled class="btn btn-sm btn-success border-bottom border-dark border-start-0 border-top-0 border-end-0 border-3 rounded-pill" data-aksi="kbm" data-id="${data.idbaris}">Mulai</button>`;
        html+='<span class="text-warning fw-bold">Belum dimulai</span>'
    }else if(data.statusDetikIni == 'Ananda sudah mengerjakan' && data.datanilai.length>0){
        html+= `<button class="btn btn-sm btn-info border-bottom border-dark border-start-0 border-top-0 border-end-0 border-3 rounded-pill" data-aksi="nilai" data-id="${data.idbaris}" data-idnilai="${data.datanilai[data.datanilai.length-1].idbaris}">Lihat Nilai</button>`;
    }else{
        html+=`-`;
        // html+=`<span class="text-danger fw-bold">${data.statusDetikIni}</span>`;

    }
    return html;
}
const cardMateriHariIni = (data)=>{
    let html="";
    html+=`<div class="row gap-1 justify-content-center font12">`;
    
    data.forEach((d,i)=>{
        html+=`<div class="col-md-3">`
            html+=cardMenu2('Materi Ke-'+(i+1),
            `<div class="d-flex gap-1 justify-content-between font-8">
                
                <div class="text-center text-info fw-bold border-bottom">${d.idmapel}</div>
                </div><div class="d-flex gap-1 flex-column  justify-content-between font-8">
                <div class="fw-bold">Status</div>
                <div class="text-end border-bottom">${statusViewKbm(d)}</div>
            </div><div class="d-flex gap-1 flex-column  justify-content-between font-8">
                <div class="fw-bold">Mulai</div>
                <div class="text-end border-bottom">${new Date(d.idtgl).toLocaleString('id-ID',{dateStyle:'full','timeStyle':'short'})}</div>
                <div class="fw-bold">Berakhir</div>
                <div class="text-end border-bottom">${new Date(d.idtglend).toLocaleString('id-ID',{dateStyle:'full','timeStyle':'short'})}</div>
            </div><div class="d-flex gap-1 flex-column justify-content-between font-8">
                <div class="fw-bold">Tipe</div>
                <div class="text-end border-bottom">${d.jenistagihan}</div>
            </div><div class="d-flex gap-1 flex-column justify-content-between font-8">
                <div class="fw-bold">Aksi</div>
                <div class="text-end">${statusAksiKbm(d)}</div>
            </div>`
            ,false);
        html+=`</div>`;
    })

    html+=`</div>`;
    return html;
}
const viewAbsen = (data)=>{
    let html="";
    html+=`<div class="row justify-content-center">`;
        html+=`<div class="col-md-6 rounded shadow-none text-center">`;
            html+=`<img src="${data}" id="img-prev" class="img-thumbnail"/>`;
            html+=`<p id="img-ket"></p>`
            html+=inputsElements.floatingSelect('pilihAbsen','Jenis Kehadiran',[
                {
                    value:'Hadir',label:'Hadir'
                },
                {
                    value:'Ijin',label:'Ijin'
                },
                {
                    value:'Sakit',label:'Sakit'
                },
                {
                    value:'Alpa', label:'Alpa'
                }
            ],'Hadir');
        html+=`<hr class="border-bottom"/>`;
        html+=inputsElements.grupInputFile('grupInput','','Cara 1','pilihpoto','Pilih Poto','',' accept="image/*" capture="user"');
        // html+=inputsElements.grupInputFile('grupInput','','Cara 2','pilihpoto','Pilih Poto','',' accept="image/*" capture="user"');
        html+= buttonEdu.primary('data-aksi="uploadstreamer" id="uploadfile2"','Cara 2')
        
        html+=`</div>`;
    html+=`</div>`;

    return html;
}
const firstRender = (dataasal)=>{
    const {siswa,data} = dataasal;
    let html ="";
    if (data.ormKalender.currentLibur){
        html+=`Hari ini libur. Dalam rangka:`;
        html+=`<ul>`;
        data.ormKalender.currentDateDataKalender.forEach(ket=>{
            html+=`<li>${ket.keterangan}</li>`;
        })
        html+=`</ul>`;
    }else{
        //tidak libur;
        const kbmhariini = data.ormDataMateri.kbmHariIni();
        console.log('----kbm hari ini---',kbmhariini)
        if(kbmhariini.length>0){
            if(data.ormAbsen.absensiToday){
                
                html+=cardMateriHariIni(data.ormDataMateri.kbmHariIni());
            }else{
                html+=`Ada ${kbmhariini.length} materi untuk Ananda, Silakan lengkapi kehadiran Ananda di sini:`;
                // html+=`view tombol absen`;
                // html+=cardMateriHariIni(data.ormDataMateri.data);
                html+=`<div class="row gap-1 justify-content-center "><div class="col-md-4">`
                html+=cardMenu2('','<div class="text-center">'+buttonEdu.primary('data-aksi="absen"','Saya Hadir')+'</div>',false);
                html+=`</div></div>`;
                // html+=cardMateriHariIni(data.ormDataMateri.data);

            }
        }else{
            html+='<p class="text-success text-center fw-bolder">Tidak ada KBM hari ini</p>';
            // html+=cardMateriHariIni(data.ormDataMateri.data);
        }
        //hari ini ada materi, tapi ...
            // kbm belum terjadi/akan terjadi hari ini;
            // kbm sedang/sudah terjadi;
            //belum absen;
        //tidak adamateri;
    }
    return headerWelcome(siswa) + html;
}
const viewSoalBySiswa = (dom)=>{
    let html="";
    let hasIdentitas = dom.querySelector('#naskah_identitas');
    let kontenSoal = dom.querySelector('#tabelkontendesainnaskah_dariserver');
    kontenSoal.style.marginLeft=".1em"
    if(hasIdentitas){
        html+=hasIdentitas.outerHTML;
    }
    html+=`<div class="border sticky-top text-bg-secondary text-center" id="kontroltimer">TIMER</div>`
    kontenSoal.querySelectorAll('tr').forEach(el=>{
        let soalEssay = el.querySelector('td div.d-none[id*="tomboljawaban"]');
        if(soalEssay){
            let id = soalEssay.getAttribute('id');
            let tdParent = soalEssay.parentElement.getAttribute('data-bentuksoal');
            let no =id.match(/(\d+)/)[0]
            soalEssay.classList.remove('d-none');
            soalEssay.innerHTML = `<div class="border border-dark p-1 rounded bg-secondary-subtle">
            <span class="font8">Menu:</span>
            <input type="file" class="d-none" data-inputnosoal="${no}" data-targetinput="#filejawaban${no}" id="inputjawaban${no}"/><label for="inputjawaban${no}" class="btn btn-sm"><i class="bi bi-camera"></i></label>
            <button class="p-1 btn btn-sm mx-1 border-secondary d-inline-flex flex-column align-items-center font10" data-inputpecahan="${no}" data-targetinput="#filejawaban${no}" title="pecahan"><span class="border-bottom border-dark">⬚</span><span>⬚</span></button>
            <button class="p-1 btn btn-sm mx-1 border-secondary d-inline-flex flex-column align-items-center font10" data-inputakar="${no}" data-targetinput="#filejawaban${no}" title="akar kuadrat"><math><msqrt><mi>akar kuadrat</mi></msqrt></math></button>
            <button class="p-1 btn btn-sm mx-1 border-secondary d-inline-flex flex-column align-items-center font10" data-inputkubik="${no}" data-targetinput="#filejawaban${no}" title="akar kuadrat"><math><mroot><mi>akar kubik</mi><mn>3</mn></mroot></math></button>
            <div class="filejawaban border-dark border-top border-start-0 border-end-0 border-bottom-0 p-1 bg-white" id="filejawaban${no}" data-editor="${no}" data-bentuksoal="${tdParent}" contenteditable="true">Ketik Jawaban di sini</div></div>`;
            
        }
    });
    html+=kontenSoal.outerHTML;
    html+=`<div class="border sticky-bottom text-bg-success text-center p-1"><button class="btn btn-sm btn-info border-warning border-bottom rounded-pill border-2 border-start-0 border-top-0 border-end-0 visible" id="kontrolselesai">Kirim Nilai</button></div>`
    return html
}

const identitasljk = (identitas)=>{
    let html ="";
    html+=`<h3 class="text-uppercase text-center fw-bolder tnr">LEMBAR JAWABAN EDURASA SISWA</h3>`
    html+=`<table class="table table-sm lh-1 table-borderless mt-3 tnr">`;
        html+=`<tr>`;
            //kolom1;
            html+=`<td>Nama Siswa</td>`;
            html+=`<td style="width:15px">:</td>`;
            html+=`<td class="text-nowrap">${identitas.nama}</td>`;
            html+=`<td class="text-nowrap">Identitas Materi</td>`;
            html+=`<td style="width:15px">:</td>`;
            html+=`<td>${identitas.namamateri}</td>`;
        html+=`</tr>`;
        html+=`<tr>`;
            html+=`<td>Kelas</td>`;
            html+=`<td style="width:15px">:</td>`;
            html+=`<td>${identitas.kelas}</td>`;
            html+=`<td class="text-nowrap">Jenis Tagihan</td>`;
            html+=`<td style="width:15px">:</td>`;
            html+=`<td>${identitas.jenistagihan}</td>`;
        html+=`</tr>`;
        html+=`<tr>`;
            html+=`<td class="text-nowrap">Mulai Dikerjakan pada</td>`;
            html+=`<td style="width:15px">:</td>`;
            html+=`<td id="selwaktumulai">${identitas.waktumulai}</td>`;
            html+=`<td>Pelaksanaan</td>`;
            html+=`<td style="width:15px">:</td>`;
            html+=`<td >${identitas.pelaksanaan}</td>`;
        html+=`</tr>`;
        html+=`<tr>`;
            html+=`<td>Selesai dikerjakan pada</td>`;
            html+=`<td style="width:15px">:</td>`;
            html+=`<td id="hasilakhirwaktu">${identitas.waktuakhir}</td>`;
            html+=`<td class="text-nowrap">Kompetensi yang diukur</td>`;
            html+=`<td style="width:15px">:</td>`;
            html+=`<td>${identitas.kduji}</td>`;
        html+=`</tr>`;

    html+=`</table>`;
    return html;
}

const soalDanJawabanIsianSiswa = (n,data)=>{
    
    let html = "";
    let dataLJK = data;
    let refrensi_nilai = data.tabresponsiswa;
    let nilai_current_nosoal = refrensi_nilai['SKOR_'+n.nosoal];
    let nilai = nilai_current_nosoal==""?"":(nilai_current_nosoal*100);

    html+=`<b>Pertanyaan:</b><br>`
    html+=n.datasoal.ilustrasi==""?"":+n.datasoal.ilustrasi+'<br>';
    html+=n.datasoal.pertanyaan;
    let jawabanIsianSiswa = dataLJK.filter(s=>s.nosoal == n.no);
    if(jawabanIsianSiswa.length==0){
        html+=`<br><b>Jawaban Siswa:</b><br><i><b class="text-danger">Siswa tidak Menjawab nomor soal ini atau Jawaban di lembar cetak!</b></i>`;
    }else{
        html+='<br>'
        html+= jawabanIsianSiswa[0].htmljawaban;
    }
    if(mode){
        html+=`<div id="untuklj${n.nosoal}" class="koleksilj" style="border:1px solid red;padding:5px;background-color:#eeeeff" data-refrensinilai="${n.nosoal}">${nilai}</div>`
    }else{
        html+=`<div id="untuklj${n.nosoal}" class="koleksilj" style="border:1px solid red;padding:5px;background-color:#eeeeff" data-refrensinilai="${n.nosoal}">${nilai}</div>`
    }


    return html;
}
const soalManual = (bentuksoal, arraySoal,result)=>{
    let html = "";
       
    html+=`<div class="p-1 rounded shadow-lg mb-2 ljksiswa_essay">`;
        arraySoal.forEach(soal=>{
            let jawaban = result.filter(s=>s.no == soal.nosoal);
            html+=`<ol style="list-style-type:decimal" start="${soal.nosoal}">`;  
                html+=`<li>`;
                    html+=`<div class="text-bg-info container">(No. Soal Naskah: ${soal.nobybentuk})</div>`;
                    html+=`<div>`;
                        html+=`<b>Pertanyaan:</b><br>`;
                        html+=soal.ilustrasi==""?"":+soal.ilustrasi+'<br>';
                        html+=soal.pertanyaan;
                        if(jawaban.length>0){
                            html+=`<br><b>Jawaban Siswa:</b><br>`;
                            html+=jawaban[0].jawaban;

                        }else{
                            html+=`<br><b>Jawaban Siswa:</b><br><i><b class="text-danger">Siswa tidak Menjawab nomor soal ini atau Jawaban di lembar cetak!</b></i>`;
                        }
                        html+=`<div id="untuklj${soal.nosoal}" class="koleksilj" style="border:1px solid red;padding:5px;background-color:#eeeeff" data-refrensinilai="${soal.nosoal}"></div>`;

                    html+=`</div>`;
                html+=`</li>`;
            html+=`</ol>`;
        });
        
        html+=`</div>`
    return cardMenu2(bentuksoal,html,false)
}

const viewIsianPG = (soal,jawabansiswa,hasOpsiD=true)=>{
    let html="";
    html+=`<table data-tabel="Pilihan Ganda" style="border-collapse:separate;width:100%;font-size:12px;border-bottom:.5pt solid #eee" id="tabelconfigpgbantuisiljk">`;
    html+=`<thead data-selhapus="hapus">`;
        html+=`<tr>`;
            html+=`<th style="width:20px">No.</th>`;
            html+=`<th colspan="${hasOpsiD?4:3}" class="text-center">Opsi Jawaban</th>`;
        html+=`</tr>`;
    html+=`</thead>`;
    html+=`<tbody>`;

    soal.forEach(n=>{
        let opsijawab = jawabansiswa.filter(s=>s.no == n.nosoal);
        
        html+=`<tr>`;
        html+=`<td>${n.nosoal}</td>`;
        //html+=`<td>${n.nobybentuk}</td>`;
        if(opsijawab.length){
            html+=`<td class="border-bottom border-2 ${opsijawab[0].jawaban=='A'?'text-bg-info w3-green ':''}border-start-0 border-end-0 border-black rounded border-top text-center py-2 px-3">A</td>`;
            html+=`<td class="border-bottom border-2 ${opsijawab[0].jawaban=='B'?'text-bg-info w3-green ':''}border-start-0 border-end-0 border-black rounded border-top text-center py-2 px-3">B</td>`;
            html+=`<td class="border-bottom border-2 ${opsijawab[0].jawaban=='C'?'text-bg-info w3-green ':''}border-start-0 border-end-0 border-black rounded border-top text-center py-2 px-3">C</td>`;
            if(hasOpsiD){
                html+=`<td class="border-bottom border-2 ${opsijawab[0].jawaban=='D'?'text-bg-info w3-green ':''}border-start-0 border-end-0 border-black rounded border-top text-center py-2 px-3">D</td>`;

            }

        }else{
            html+=`<td class="border-bottom border-2 border-start-0 border-end-0 border-black rounded border-top text-center py-2 px-3">A</td>`;
            html+=`<td class="border-bottom border-2 border-start-0 border-end-0 border-black rounded border-top text-center py-2 px-3">B</td>`;
            html+=`<td class="border-bottom border-2 border-start-0 border-end-0 border-black rounded border-top text-center py-2 px-3">C</td>`;
            if(hasOpsiD){
                html+=`<td class="border-bottom border-2 border-start-0 border-end-0 border-black rounded border-top text-center py-2 px-3">D</td>`;

            }
        }
        html+=`</tr>`;
        
    });

        html+=`</tbody>`;
    html+=`</table>`;
    
    return cardMenu2('Pilihan Ganda',html,false);
}
const soalOtomatis = (arraySoal,result,opsiD=true)=>{
    let html ="";
    
    let soalPG = arraySoal.filter(s=>s.bentuksoal=='Pilihan Ganda');
    let soalBS = arraySoal.filter(s=>s.bentuksoal=='BenarSalah');
    let soalPGK = arraySoal.filter(s=>s.bentuksoal=='PGKompleks');
    if(soalPG.length>0) html += viewIsianPG(soalPG,result,opsiD);
    // if(soalBS.length>0) html += viewIsianPG(soalBS,result);
    // if(soalPGK.length>0) html += viewIsianPG(soalPGK,result);
    return html;
}
const totalSkorByBentuksoal = (datasoal,result)=>{
    let uniktipesoal = datasoal.soalOtomatis.map(s=> s.bentuksoal).filter((x,i,a)=>a.indexOf(x)== i);
    let unikmanual = datasoal.soalManual.map(s=> s.bentuksoal).filter((x,i,a)=>a.indexOf(x)== i);
    
    let html = ""
    uniktipesoal.forEach(bentuksoal=>{
        let soalnya = datasoal.soalOtomatis.filter(s=>s.bentuksoal == bentuksoal);
        
        let nilai = result.filter(s=>s.tipe == bentuksoal);
        let count = 0;
        soalnya.forEach(n=>{
            let kj =nilai.filter(s=>s.no == n.nosoal);//[0].jawaban;
            
            if(kj.length>0){
                if(n.kuncijawaban == kj[0].jawaban){
                    count++
                }

            }
        })
            let nilaiakhir =((count/soalnya.length)*100).toFixed(2);
            html+=`<div class="col">`;
            html+=cardMenu2(bentuksoal,nilaiakhir,false)
            html+=`</div>`;
        
    })
    
    unikmanual.forEach(bentuksoal=>{
        html+=`<div class="col">`;
        html+=cardMenu2(bentuksoal,'',false)
        html+=`</div>`;
    });
    let konten = `<div id="view_nilai_perbentuksoal">
                    <div class="row row-cols-md-4 g-2">
                        ${html}
                    </div>
                </div>`
    return cardMenu2('Nilai Bentuk Soal',konten,false)
}
const createHtmlLjk = (dataljk,datasoal,result)=>{
    const data = dataljk.dataIdentitas;
    
    let html = ""; 
    html+=`<div class="row rounded table-responsive tnr justify-content-center w3-row">`;
        html+=`<div class="col-12 l12">`;
            html+=identitasljk(data);
        html+=`</div>`;
        if(datasoal.hasManual && datasoal.hasOtomatis){
            html+=`<div class="col-md-4">`;
                html+=soalOtomatis(datasoal.soalOtomatis, result ,datasoal.opsiD)
            html+=`</div>`;
            html+=`<div class="col-md-8">`;
                let uniktipesoal = datasoal.soalManual.map(s=> s.bentuksoal).filter((x,i,a)=>a.indexOf(x)== i);
                uniktipesoal.forEach(bentuksoal=>{
                    let soalnya = datasoal.soalManual.filter(s=>s.bentuksoal == bentuksoal);
                        html+=soalManual(bentuksoal,soalnya,result)
                    
                })
                html+= totalSkorByBentuksoal(datasoal,result)
                
            html+=`</div>`;
        }else{
            if(datasoal.soalOtomatis.length>0){
                html+=`<div class="col-4">`;
                html+=soalOtomatis(datasoal.soalOtomatis, result ,datasoal.opsiD)
            }else{
                html+=`<div class="col-6">`;
                let uniktipesoal = datasoal.soalManual.map(s=> s.bentuksoal).filter((x,i,a)=>a.indexOf(x)== i);
                uniktipesoal.forEach(bentuksoal=>{
                    let soalnya = datasoal.soalManual.filter(s=>s.bentuksoal == bentuksoal);
                        html+=soalManual(bentuksoal,soalnya,result)
                    
                })
            }

            html+=`</div>`;
            html+=`<div class="col-md-6  border">`;
            html+= totalSkorByBentuksoal(datasoal,result)
                
            html+=`</div>`;

        }
    html+=`</div>`;

    return html;
}
const view = {
    welcome:firstRender,
    modalAbsen:viewAbsen,
    viewSoalBySiswa:viewSoalBySiswa,
    createHtmlLjk:createHtmlLjk
}
export default view;