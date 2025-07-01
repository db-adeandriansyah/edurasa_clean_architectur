import controlbanksoal from "../../views/banksoal/controlBankSoal";

export const controlFiturBuatPerItemSoal = (data)=>{
    const { shortKurikulum, longKurikulum, jenjang, koleksibentuksoal,isGuruMapel, mapelAjar, _htmlkoleksimapel, kurikulum} = data;
    let datamenu = {
        araymenu:[
            {
                id:'tab_pilihbentuksoal',
                title_tab:'Bentuk Soal',
                body_html:controlbanksoal.menuPilihBentukSoal(koleksibentuksoal)
            },
            {
                id:"tab_pilihmapel",
                title_tab:'Mata Pelajaran',
                body_html: controlbanksoal.selectelemen(['pilihmapel','Pilih Mapel',_htmlkoleksimapel,isGuruMapel?mapelAjar:'PAI',` data-pradesain="kodemapel" ${isGuruMapel?'disabled':''}`]),
            },
            {
                id:'tab_pilihproperti',
                title_tab:'Properti Kurikulum',
                body_html:'<div id="resultefekpilihmapel">'+controlbanksoal.menuPilihPropertiKurikulum(shortKurikulum,kurikulum.simpleFilter({'kodemapel':isGuruMapel?mapelAjar:'PAI'}).data)+'</div>'
            },
            // {
            //     id:'tab_pilihmode',
            //     title_tab:'Mode',
            //     body_html:controlbanksoal.switchRadioModeCreateSoal()
            // }
        ],
        'shortKurikulum':shortKurikulum,
        'longKurikulum':longKurikulum,
        'jenjang':jenjang
    }
    return controlbanksoal.controlBuatItemSoal(datamenu);
}
export const previewSoalPilihanGanda = (data,withnumber=true,tipe='vertical')=>{
    
    let html ="";
    html+=`<ol type="1" ${withnumber?'':'style="list-style-type:none" '}class="ms-0 ps-2 ${withnumber?'border-top border-end border-bottom border-start-0':''} rounded"><li>`;
    if(data.hasOwnProperty('ilustrasi') && data.ilustrasi !==''){
        html+=data.ilustrasi;
        html+=`<br/>`;
    }
    html+=data.pertanyaan?data.pertanyaan:'<br/>';
    if(tipe=='kubik'){
        
        html +=`<table style="border:0;border-collapse:collapse;border-spacing:0;width:80%">`;
            html+=`<tr>`;
                html+=`<td style="border:0;padding:4px 8px;vertical-align:top;width:15px">A.</td><td style="border:0;padding:4px 8px;vertical-align:top">${data.opsiA}</td>`
                html+=`<td style="border:0;padding:4px 8px;vertical-align:top;width:15px">C.</td><td style="border:0;padding:4px 8px;vertical-align:top">${data.opsiC}</td>`
            html+=`</tr>`;
            html+=`<tr>`;
                html+=`<td style="border:0;padding:4px 8px;vertical-align:top;width:15px">B.</td><td style="border:0;padding:4px 8px;vertical-align:top;">${data.opsiB}</td>`
                if(data.opsiD!==""){
                    html+=`<td style="border:0;padding:4px 8px;vertical-align:top;width:15px">D.</td><td style="border:0;padding:4px 8px;vertical-align:top;">${data.opsiD}</td>`
                }else{
                    html+=`<td style="border:0;padding:4px 8px;vertical-align:top;width:15px"></td><td style="border:0"></td>`;
                }
            html+=`</tr>`;
        html+=`</table>`
    }else if(tipe=='horizontal'){
        html+=`<table style="border:0;border-collapse:collapse;border-spacing:0;width:80%">`;
            html+=`<tr>`;
                html+=`<td style="border:0;padding:4px 8px;vertical-align:top;width:15px">A.</td><td style="border:0;padding:4px 8px;vertical-align:top">${data.opsiA}</td>`
                html+=`<td style="border:0;padding:4px 8px;vertical-align:top;width:15px">B.</td><td style="border:0;padding:4px 8px;vertical-align:top">${data.opsiB}</td>`
                html+=`<td style="border:0;padding:4px 8px;vertical-align:top;width:15px">C.</td><td style="border:0;padding:4px 8px;vertical-align:top">${data.opsiC}</td>`;
                if(data.opsiD!==""){
                    html+=`<td style="border:0;padding:4px 8px;vertical-align:top;width:15px">D.</td><td style="border:0;padding:4px 8px;vertical-align:top">${data.opsiD}</td>`
                }

            html+=`</tr>`;
        html+=`</table>`

    }else{
        html+=`<ol type="A" style="margin-left:0;padding-left:1.5em;mso-para-margin-left:-1.4em;mso-padding-left-alt:1.5em;">`;
            html+=`<li style="padding-left:0.7em;mso-padding-left-alt:0.42cm">${data.opsiA?data.opsiA:''}</li>`;
            html+=`<li style="padding-left:0.7em;mso-padding-left-alt:0.42cm">${data.opsiB?data.opsiB:''}</li>`;
            html+=`<li style="padding-left:0.7em;mso-padding-left-alt:0.42cm">${data.opsiC?data.opsiC:''}</li>`;
            
            if(data.hasOwnProperty('opsiD') && data.opsiD!==""){
                html+=`<li style="padding-left:0.7em;mso-padding-left-alt:0.42cm">${data.opsiD}</li>`;
            }
        html+=`</ol></li></ol>`;

    }

    return html;
}
export const previewSoalIsian = (data,withnumber)=>{
    let html ="";
    html+=`<ol type="1" ${withnumber?'':'style="list-style-type:none" '}class="ms-0 ps-2 ${withnumber?'border-top border-end border-bottom border-start-0':''} rounded"><li>`;
    if(data.hasOwnProperty('ilustrasi') && data.ilustrasi !==''){
        html+=data.ilustrasi;
        html+=`<br/>`;
    }
    html+=data.pertanyaan?data.pertanyaan:'<br/>';
    html+=`</li></ol>`;
    return html;
}
export const previewBentukSoal = (data,withnumber=true)=>{

    if(data.bentuksoalspesifik === "Pilihan Ganda"){
        return previewSoalPilihanGanda(data,withnumber);
    }else if(data.bentuksoalspesifik == 'Isian'){
        return previewSoalIsian(data,withnumber);
    }else if(data.bentuksoalspesifik == 'Essay'){
        return previewSoalIsian(data,withnumber);
    }
    return data.pertanyaan;
}
export const previewKunciJawaban = (data)=>{
    let html='';
    if(data.bentuksoal == 'Pilihan Ganda'){
        html+=`<b>Kunci Jawaban</b>: ${data.kuncijawaban}<hr class="m-0 p-0"/>`;
        html+=`<b>Pembahasan/Penskoran</b>:<br/>`;

    }else{
        html+=`<b>Pembahasan/Penskoran</b>:<br/>`;
    }

    html+=data.penskoran;
    return html;
}
export const previewBentukSoalJawaban = (data,withnumber=true)=>{

    if(data.bentuksoalspesifik === "Pilihan Ganda"){
        return previewKunciJawaban(data,withnumber);
    }
    // else if(data.bentuksoalspesifik == 'Isian'){
    //     return previewSoalIsian(data,withnumber);
    // }else if(data.bentuksoalspesifik == 'Essay'){
    //     return previewSoalIsian(data,withnumber);
    // }
    return data.penskoran??'Belum Ada data';
}
export const propertiItemSoal = (data)=>{
    let kj = "";
    let levelkognitif = `<span class="text-warning fw-bold">Belum Terisi</span>`;
    if(data.bentuksoalspesifik == 'Pilihan Ganda'){
        kj =` <tr>
            <td class="border-bottom border-end text-end" style="width:150px">Kunci Jawaban</td>
            <td class="border-bottom text-start">${data.kuncijawaban?data.kuncijawaban:`<span class="text-warning fw-bold">Belum Terisi</span>`}</td>
        </tr>`;
    }

    
    if(data.levelkognitif){
        
        if(data.taksonomibloom){
            levelkognitif = `${data.levelkognitif} (${data.taksonomibloom})`;
        }else{
            levelkognitif = `${data.levelkognitif}`;
        }
    }
    let html = `<div class="border rounded container">
    <table class="table table-borderless font8">
        <tbody>
            <tr>
                <td class="border-bottom border-end text-end" style="width:150px">Indikator Soal</td>
                <td class="border-bottom text-start">${data.indikatorsoal?data.indikatorsoal:`<span class="text-warning fw-bold">Belum Terisi</span>`}</td>
            </tr>
            <tr>
                <td class="border-bottom border-end text-end" style="width:150px">Materi Pokok</td>
                <td class="border-bottom text-start">${data.materi?data.materi:`<span class="text-warning fw-bold">Belum Terisi</span>`}</td>
            </tr>${kj}
            <tr>
                <td class="border-bottom border-end text-end" style="width:150px">Pembahasan/Penskoran <sub>(Wajib Untuk Isian/Essay)</sub></td>
                <td class="border-bottom text-start">${data.penskoran?data.penskoran:`<span class="text-warning fw-bold">Belum Terisi</span>`}</td>
            </tr>
            <tr>
                <td class="border-bottom border-end text-end" style="width:150px">Level Kognitif</td>
                <td class="border-bottom text-start">${levelkognitif}</td>
            </tr>
            <tr>
                <td class="border-bottom border-end text-end" style="width:150px">Lingkup Materi</td>
                <td class="border-bottom text-start">${data.ruanglingkup?data.ruanglingkup:`<span class="text-warning fw-bold">Belum Terisi</span>`}</td>
            </tr>
        </tbody>
    </table>
    </div>`;
    return html;
}
// export const previewSoalPilihanGandaWithProperty = (data)=>{
export const previewSoalWithProperty = (data)=>{
    let html ="";
    html+=previewBentukSoal(data);
    html+=propertiItemSoal(data)


    return html;
}
export const canvasEditor = ()=>` <div class="min-vh-100 border border-2 p-1 bg-secondary table-responsive text-center">
    <div class="d-flex bg-secondary-subtle">
        <button data-canvasControl="addText" class="btn btn-sm border" id="addText" title="Tambahkan teks">Text</button>
        <button data-canvasControl="removeObject" class="btn btn-sm border" id="removeObject" title="Hapus">🗑</button>
        <button data-canvasControl="flipX" class="btn btn-sm border" id="flipX" title="Refleksi Horizontal">⫗</button>
        <button data-canvasControl="flipY" class="btn btn-sm border" id="flipY" title="Refleksi Vertikal">⫔</button>
        <button data-canvasControl="sendToBack" class="btn btn-sm border" id="sendToBack" title="Tumpuk Ke Belakang"><i class="bi bi-back"></i></button>
        <button data-canvasControl="sentToFront" class="btn btn-sm border" id="sendToFront" title="Tumpuk Ke Depan"><i class="bi bi-front"></i></button>
        <button data-canvasCopyPaste="copy" class="btn btn-sm border" id="copy" title="Salin"><i class="bi bi-copy"></i></button>
        <button data-canvasCopyPaste="paste" class="btn btn-sm border" id="paste" title="Tempel"><i class="bi bi-clipboard"></i></button>
        <label class="btn btn-sm border" for="uploadCanvas" title="Unggah Gambar">📷</label>
        <input type="file" class="d-none" id="uploadCanvas" accept="image/*"/>
        <button data-canvasControl="bulletCanvas" class="btn btn-sm border" id="bulletCanvas" title="tambahkan acuan garis">⚪</button>

    </div>
    <div class="mx-auto">
        <canvas id="canvaseditor"></canvas>
    </div>
    <div class="text-center p-2"><button class="btn btn-sm py-0 font12 accord-bg rounded-pill" id="selesaiDesainCanvas">Selesai Desain</button></div>
</div>`;
export const tabelResultCanvasEditor =(lingkupmateri)=>{
    
    let html="";
    html=`<table class="table table-sm font12"><tbody>`;
    html+=`<tr><td class="col-2 border-bottom border-top-0 border-end border-start-0 text-end">Jumlah Soal</td><td class="col-10 border-bottom border-top-0 border-end border-start-0"><input type="number" min="1" class="form-select form-select-sm border-0" data-soalcanvas="jumlahsoalmenjodohkan" value="5"></td></tr>`;
    html+=`<tr><td class="col-2 border-bottom border-top-0 border-end border-start-0 text-end">Pertanyaan</td><td class="col-10 border-bottom border-top-0 border-end border-start-0" data-soalcanvas="pertanyaan" title="KLIK tombol Selesai Desain untuk Melihat pertanyaan"></td></tr>`;
    html+=`<tr><td class="col-2 border-bottom border-top-0 border-end border-start-0 text-end">Indikator Soal</td><td data-soalcanvas="indikatorsoal" class="col-10 border-bottom border-top-0 border-end border-start-0" contenteditable="true" spellcheck="true"></td></tr>`;
    html+=`<tr><td class="col-2 border-bottom border-top-0 border-end border-start-0 text-end">Materi Pokok</td><td data-soalcanvas="materi" class="col-10 border-bottom border-top-0 border-end border-start-0" contenteditable="true" spellcheck="true"></td></tr>`;
    html+=`<tr><td class="col-2 border-bottom border-top-0 border-end border-start-0 text-end">Ruang Lingkup</td><td class="col-10 border-bottom border-top-0 border-end border-start-0">`;
    html+=`<select class="form-select form-select-sm border-0" data-soalcanvas="ruanglingkup"> <option value="">Belum Memilih</option>`;
    lingkupmateri.forEach(n=>{
        html+=`<option value="${n.lingkupmateri}">${n.lingkupmateri}</option>`;
    })
    
    html+=`</select></td></tr>`;
    html+=`<tr><td class="col-2 border-bottom border-top-0 border-end border-start-0 text-end">Level Kognitif</td><td class="col-10 border-bottom border-top-0 border-end border-start-0">
    <select class="form-select form-select-sm border-0" data-soalcanvas="levelkognitif"> 
    <option value="">Belum Memilih</option>
    <option value="L1">L1/LK1/Pengetahuan dan Pemahaman</option>
    <option value="L2">L2/LK2/Aplikasi</option>
    <option value="L3">L3/LK3/Penalaran</option>
</select></td></tr></tbody></table>`
    return html
}
const replaceSel_pilihanganda= (data,datareplace,withElement=true)=>{
    const {setilustrasi,tampilanpg,nosoal} = datareplace;
    let html ="";

    if(setilustrasi){
        if(data.ilustrasi!==""){
            html+=`<div title="ilustrasi">${data.ilustrasi}</div>`
        }
    }
    html+= `<div title="pertanyaan">${data.pertanyaan}</div>`;
    if(withElement){
        if(tampilanpg=='kubik'){
            html +=`<table style="border:0;border-collapse:collapse;border-spacing:0;width:80%">`;
                html+=`<tr>`;
                    html+=`<td style="border:0;padding:4px 8px;vertical-align:top;width:15px">A.</td><td style="border:0;padding:4px 8px;vertical-align:top"><input class="calc d-none" type="radio" name="soal${nosoal}" id="${nosoal}A"><label class="opsi" for="${nosoal}A">${data.opsiA}</label></td>`
                    html+=`<td style="border:0;padding:4px 8px;vertical-align:top;width:15px">C.</td><td style="border:0;padding:4px 8px;vertical-align:top"><input class="calc d-none" type="radio" name="soal${nosoal}" id="${nosoal}C"><label class="opsi" for="${nosoal}C">${data.opsiC}</label></td>`
                html+=`</tr>`;
                html+=`<tr>`;
                    html+=`<td style="border:0;padding:4px 8px;vertical-align:top;width:15px">B.</td><td style="border:0;padding:4px 8px;vertical-align:top;"><input class="calc d-none" type="radio" name="soal${nosoal}" id="${nosoal}B"><label class="opsi" for="${nosoal}B">${data.opsiB}</label></td>`
                    if(data.opsiD !== ""){
                        html+=`<td style="border:0;padding:4px 8px;vertical-align:top;width:15px">D.</td><td style="border:0;padding:4px 8px;vertical-align:top;"><input class="calc d-none" type="radio" name="soal${nosoal}" id="${nosoal}D"><label class="opsi" for="${nosoal}D">${data.opsiD}</label></td>`
                    }else{
                        html+=`<td></td><td></td>`
                    }
                html+=`</tr>`;
            html+=`</table>`
        }else if(tampilanpg == 'horizontal'){
            html+=`<table style="border:0;border-collapse:collapse;border-spacing:0;width:80%">`;
                html+=`<tr>`;
                    html+=`<td style="border:0;padding:4px 8px;vertical-align:top;width:15px">A.</td><td style="border:0;padding:4px 8px;vertical-align:top"><input class="calc d-none" type="radio" name="soal${nosoal}" id="${nosoal}A"><label class="opsi" for="${nosoal}A">${data.opsiA}</label></td>`
                    html+=`<td style="border:0;padding:4px 8px;vertical-align:top;width:15px">B.</td><td style="border:0;padding:4px 8px;vertical-align:top"><input class="calc d-none" type="radio" name="soal${nosoal}" id="${nosoal}B"><label class="opsi" for="${nosoal}B">${data.opsiB}</label></td>`
                    html+=`<td style="border:0;padding:4px 8px;vertical-align:top;width:15px">C.</td><td style="border:0;padding:4px 8px;vertical-align:top"><input class="calc d-none" type="radio" name="soal${nosoal}" id="${nosoal}C"><label class="opsi" for="${nosoal}C">${data.opsiC}</label></td>`
                    if(data.opsiD !== ""){
                        html+=`<td style="border:0;padding:4px 8px;vertical-align:top;width:15px">D.</td><td style="border:0;padding:4px 8px;vertical-align:top"><input class="calc d-none" type="radio" name="soal${nosoal}" id="${nosoal}D"><label class="opsi" for="${nosoal}D">${data.opsiD}</label></td>`
                    }
                html+=`</tr>`;
            html+=`</table>`
        }else{
            html += `<ol type="A" style="margin-left:0;padding-left:1.5em;mso-para-margin-left:-1.4em;mso-padding-left-alt:1.5em;">`;
                html+=`<li style="padding-left:0.7em;mso-padding-left-alt:0.42cm"><input class="calc d-none" type="radio" name="soal${nosoal}" id="${nosoal}A"><label class="opsi" for="${nosoal}A">${data.opsiA}</label></li>`;
                html+=`<li style="padding-left:0.7em;mso-padding-left-alt:0.42cm"><input class="calc d-none" type="radio" name="soal${nosoal}" id="${nosoal}B"><label class="opsi" for="${nosoal}B">${data.opsiB}</label></li>`;
                html+=`<li style="padding-left:0.7em;mso-padding-left-alt:0.42cm"><input class="calc d-none" type="radio" name="soal${nosoal}" id="${nosoal}C"><label class="opsi" for="${nosoal}C">${data.opsiC}</label></li>`;
                
            
                if(data.opsiD !== ""){
                    html+=`<li style="padding-left:0.7em;mso-padding-left-alt:.42cm"><input class="calc d-none" type="radio" name="soal${nosoal}" id="${nosoal}D"><label class="opsi" for="${nosoal}D">${data.opsiD}</label></li>`;
                }
            html += `</ol>`;
        }

    }else{//withoutElement;
        if(tampilanpg=='kubik'){
            html +=`<table style="border:0;border-collapse:collapse;border-spacing:0;width:80%">`;
                html+=`<tr>`;
                    html+=`<td style="border:0;padding:4px 8px;vertical-align:top;width:15px">A.</td><td style="border:0;padding:4px 8px;vertical-align:top">${data.opsiA}</td>`
                    html+=`<td style="border:0;padding:4px 8px;vertical-align:top;width:15px">C.</td><td style="border:0;padding:4px 8px;vertical-align:top">${data.opsiC}</td>`
                html+=`</tr>`;
                html+=`<tr>`;
                    html+=`<td style="border:0;padding:4px 8px;vertical-align:top;width:15px">B.</td><td style="border:0;padding:4px 8px;vertical-align:top;">${data.opsiB}</td>`
                    if(data.opsiD !== ""){
                        html+=`<td style="border:0;padding:4px 8px;vertical-align:top;width:15px">D.</td><td style="border:0;padding:4px 8px;vertical-align:top;">${data.opsiD}</td>`
                    }else{
                        html+=`<td></td><td></td>`
                    }
                html+=`</tr>`;
            html+=`</table>`
        }else if(tampilanpg == 'horizontal'){
            html+=`<table style="border:0;border-collapse:collapse;border-spacing:0;width:80%">`;
                html+=`<tr>`;
                    html+=`<td style="border:0;padding:4px 8px;vertical-align:top;width:15px">A.</td><td style="border:0;padding:4px 8px;vertical-align:top">${data.opsiA}</td>`
                    html+=`<td style="border:0;padding:4px 8px;vertical-align:top;width:15px">B.</td><td style="border:0;padding:4px 8px;vertical-align:top">${data.opsiB}</td>`
                    html+=`<td style="border:0;padding:4px 8px;vertical-align:top;width:15px">C.</td><td style="border:0;padding:4px 8px;vertical-align:top">${data.opsiC}</td>`
                    if(data.opsiD !== ""){
                        html+=`<td style="border:0;padding:4px 8px;vertical-align:top;width:15px">D.</td><td style="border:0;padding:4px 8px;vertical-align:top">${data.opsiD}</td>`
                    }
                html+=`</tr>`;
            html+=`</table>`
        }else{
            html += `<ol type="A" style="margin-left:0;padding-left:1.5em;mso-para-margin-left:-1.4em;mso-padding-left-alt:1.5em;">`;
                html+=`<li style="padding-left:0.7em;mso-padding-left-alt:0.42cm">${data.opsiA}</li>`;
                html+=`<li style="padding-left:0.7em;mso-padding-left-alt:0.42cm">${data.opsiB}</li>`;
                html+=`<li style="padding-left:0.7em;mso-padding-left-alt:0.42cm">${data.opsiC}</li>`;
                
            
                if(data.opsiD !== ""){
                    html+=`<li style="padding-left:0.7em;mso-padding-left-alt:.42cm">${data.opsiD}</li>`;
                }
            html += `</ol>`;
        }

    }
    return html;
}
const replaceSel_essayIsian = (data,datareplace,withElement)=>{
    const {setilustrasi,tampilanpg,nosoal} = datareplace;
    let html ="";

    if(setilustrasi){
        if(data.ilustrasi!==""){
            html+=`<div title="ilustrasi">${data.ilustrasi}</div>`
        }
    }
    html+=`<div id="pertanyaanessay_${nosoal}">${data.pertanyaan}</div>`;

    if(withElement){
        html+=`<div  class="d-none" id="tomboljawaban${nosoal}"> <hr> <button onclick="tombolketikjawaban('${nosoal}')">Ketik Jawaban No ${nosoal}</button> <br><br><sub>atau</sub><br><br> <button onclick="tomboluploadjawaban('${nosoal}')">Upload Media No ${nosoal}</button> <br><br><sub>Pilih Salah satu cara Kalian menjawab soal ini</sub> </div><br>`;
    }
    return html;
}
const replaceSel_pgkompleks = (data, datareplace,withElement)=>{
    const {setilustrasi,tampilanpg,nosoal} = datareplace;
    let html ="";

    if(setilustrasi){
        if(data.ilustrasi!==""){
            html+=`<div title="ilustrasi">${data.ilustrasi}</div>`
        }
    }
    html+=`<div title="pertanyaan">${data.pertanyaan}</div>`;
    let listkompleks = JSON.parse(datasoal.arraypgkomplek);
        
        listkompleks.forEach((item,indeks)=>{
            if(withElement){
                html+=`<input type="checkbox" name="pgkompleks_${data.idbaris}" id="pgkompleks_${data.idbaris}_${indeks}" value="${item}"><label for="pgkompleks_${data.idbaris}_${indeks}">${item}</label><br>`
            }else{
                html+=item;
            }

        })
    return html;
}
const replaceSel_benarsaslah = (data, datareplace,withElement)=>{
    const {setilustrasi,tampilanpg,nosoal} = datareplace;
    let html ="";

    html+=`<table style="border-collapse:collapse;border-spacing;width:100%;">`;
        html+=`<tr>`
            html+=`<td style="border:.5pt solid #ddd;padding:4px 8px">`
                if(setilustrasi){
                    if(data.ilustrasi!==""){
                        html+=`<div title="ilustrasi">${data.ilustrasi}</div>`
                    }
                }
                html+=`<div title="pertanyaan">${data.pertanyaan}</div></td>`;
            html+=`<td style="border:.5pt solid #ddd;padding:4px 8px;width:100px">
                <label><input type="radio"> Benar</label>
                <label><input type="radio"> Salah</label>
                </td>`
            html+=`</tr>`
    html+=`</table>`;
    return html;
}
const replaceSel_menulisrapih = (data, datareplace,withElement)=>{
    const {setilustrasi,tampilanpg,nosoal} = datareplace;
    let html ="";

    if(setilustrasi){
        html+=`<div title="ilustrasi">${data.ilustrasi}</div>`
    }
    html+=`<div title="pertanyaan">${data.pertanyaan}</div>`;
    html+=`<table style="border-collapse:collapse; border-spacing:0; width:100%;margin-top:1rem;line-height:7px">`;
        html+=`<tr><td style="border-bottom:.5pt solid #ddd;width:100%;font-size:6px">&nbsp;</td></tr>`
        html+=`<tr><td style="border-bottom:.5pt solid #ddd;width:100%;font-size:6px">&nbsp;</td></tr>`
        html+=`<tr><td style="border-bottom:.5pt solid #ddd;width:100%;font-size:6px">&nbsp;</td></tr>`
        html+=`<tr><td style="border-bottom:.5pt solid #ddd;width:100%;font-size:6px">&nbsp;</td></tr>`
        html+=`<tr><td style="border-bottom:.5pt solid #ddd;width:100%;font-size:6px">&nbsp;</td></tr>`
    html+=`</table>`;
}
export const replaceSoalToSel = (datasoal,datareplace,withElement=true)=>{
    
    const {bentuksoalspesifik,idbaris,ilustrasi,pertanyaan,opsiA,opsiB,opsiC,opsiD} = datasoal;
    
    
    let html = "";
    if(bentuksoalspesifik == 'Pilihan Ganda'){
        html+=replaceSel_pilihanganda(datasoal,datareplace,withElement);
    }else if(bentuksoalspesifik == 'Isian'|| bentuksoalspesifik == 'Essay'){
        html+=replaceSel_essayIsian(datasoal,datareplace,withElement);
    }else if(bentuksoalspesifik == 'PG Kompleks'){
        html+=replaceSel_pgkompleks(datasoal,datareplace,withElement);
    }else if(bentuksoalspesifik == 'Benar Salah'|| bentuksoalspesifik =='BenarSalah'){
        html+=replaceSel_benarsaslah(datasoal,datareplace,withElement)
    }else if(bentuksoalspesifik == 'Menulis Rapih'){
        html+=replaceSel_menulisrapih(datasoal, datareplace,withElement)
    }else if(bentuksoalspesifik == 'Menjodohkan'){
        html+=`<div title="pertanyaan" style="margin-bottom:0">${pertanyaan}</div>`;
    }
    return html;
}
export const tdoffline = (datasel,datasoal,datareplace,withElement=false)=>{
    let html = "";
    html+=`<td`;
    html+=`>`;
    html+=replaceSoalToSel(datasoal,datareplace,withElement);
    html+=`</td>`
    return html=""
}