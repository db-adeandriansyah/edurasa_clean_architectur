import controlbanksoal from "../../views/banksoal/controlBankSoal";

const tabelPilihBentukSoal = (datasoal)=>{

}
export const controlFiturBuatPerItemSoal = (data)=>{
    const { shortKurikulum, longKurikulum, jenjang, koleksibentuksoal,koleksimapel, isGuruMapel, mapelAjar, _htmlkoleksimapel, kurikulum} = data;
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
                body_html:controlbanksoal.menuPilihPropertiKurikulum(shortKurikulum,kurikulum.simpleFilter({'kodemapel':isGuruMapel?mapelAjar:'PAI'}).data)
            },
            {
                id:'tab_pilihmode',
                title_tab:'Mode',
                body_html:controlbanksoal.switchRadioModeCreateSoal()
            }
        ],
        'shortKurikulum':shortKurikulum,
        'longKurikulum':longKurikulum,
        'jenjang':jenjang
    }
    return controlbanksoal.controlBuatItemSoal(datamenu);
}
export const previewSoalPilihanGanda = (data)=>{
    
    let html ="";
    html+=`<ol type="1" class="ms-0 ps-2 border-top border-end border-bottom border-start-0 rounded"><li>`;
    if(data.hasOwnProperty('ilustrasi') && data.ilustrasi !==''){
        html+=data.ilustrasi;
        html+=`<br/>`;
    }
    html+=data.pertanyaan?data.pertanyaan:'<br/>';
    html+=`<ol type="A" style="margin-left:0;padding-left:1.5em;mso-para-margin-left:-1.4em;mso-padding-left-alt:1.5em;">`;
        html+=`<li style="padding-left:0.7em;mso-padding-left-alt:0.42cm">${data.opsiA?data.opsiA:''}</li>`;
        html+=`<li style="padding-left:0.7em;mso-padding-left-alt:0.42cm">${data.opsiB?data.opsiB:''}</li>`;
        html+=`<li style="padding-left:0.7em;mso-padding-left-alt:0.42cm">${data.opsiC?data.opsiC:''}</li>`;
        
        if(data.hasOwnProperty('opsiD') && data.opsiD!==""){
            html+=`<li style="padding-left:0.7em;mso-padding-left-alt:0.42cm">${data.opsiD}</li>`;
        }
    html+=`</ol></li></ol>`;

    return html;
}
export const previewSoalIsian = (data)=>{
    let html ="";
    html+=`<ol type="1" class="ms-0 ps-2 border-top border-end border-bottom border-start-0 rounded"><li>`;
    if(data.hasOwnProperty('ilustrasi') && data.ilustrasi !==''){
        html+=data.ilustrasi;
        html+=`<br/>`;
    }
    html+=data.pertanyaan?data.pertanyaan:'<br/>';
    html+=`</li></ol>`;
    return html;
}
export const previewBentukSoal = (data)=>{

    if(data.bentuksoalspesifik === "Pilihan Ganda"){
        return previewSoalPilihanGanda(data);
    }else if(data.bentuksoalspesifik == 'Isian'){
        return previewSoalIsian(data);
    }else if(data.bentuksoalspesifik == 'Essay'){
        return previewSoalIsian(data);
    }
    return 'Belum ada data'
}
const propertiItemSoal = (data)=>{
    let kj = "";
    let levelkognitif = `<span class="text-warning fw-bold">Belum Terisi</span>`;
    if(data.bentuksoalspesifik == 'Pilihan Ganda'){
        kj =` <tr>
            <td class="border-bottom border-end text-end" style="width:150px">Kunci Jawaban</td>
            <td class="border-bottom text-start">${data.kuncijawaban?data.kuncijawaban:`<span class="text-warning fw-bold">Belum Terisi</span>`}</td>
        </tr>`;
    }
    // if(data.levelkognitif && data.levelkognitif.levelkognitif){
    //     levelkognitif = `${data.levelkognitif.levelkognitif} (${data.levelkognitif.levelkognitif_definisi})`;
    // }
    if(data.levelkognitif){
        levelkognitif = `${data.levelkognitif} (${data.taksonomibloom})`;
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