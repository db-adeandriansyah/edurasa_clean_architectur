import UrlImg from "../../controllers/UrlImg";
import { tabelDom } from "../../entries/vendor";
import { stringToDom } from "../../views/components/doms";
const viewTabelNilai=()=>{
    let blank = [{absen:'',namasiswa:'',nilai:'',parafguru:'',parafot:''}];
    let settingTabelNilai = {
        tableAtribut:{
            class:'w3-table-all font12',
            style:'margin-top:16px;mso-margin-top:16px'
        },
        db:blank,
        atributeColumn:{
            'absen':{style:'height:51px'}
        },
        headers:[
            {
                columns:[
                    {label:'No. Absen',atribute:{'style':'width:56px'}},
                    {label:'Nama Siswa'},
                    {label:'Nilai',atribute:{style:'width:86px'}},
                    {label:'Paraf Guru',atribute:{style:'width:86px'}},
                    {label:'Paraf Orang Tua',atribute:{style:'width:86px'}},
                ]
            }
        ],
        body:Object.keys(blank[0]),
    }
    let html = `<div id="naskah_tabelnilai" style="padding-left:20px;padding-right:20px;margin:2rem auto;mso-para-margin-top:0;font-family:'timesNewRoman'">`;
    html+=new tabelDom (settingTabelNilai).init(false);
    html+=`</div>`;
    return html;
}
const viewPetunjukUmum = (data)=>{
    console.log(data);
        const PilihanGanda = data.filter(s=>s.bentuksoal == 'Pilihan Ganda');
        const SoalMenjodohkan = data.filter(s=>s.bentuksoal =='Menjodohkan');
        const SoalPGKompleks = data.filter(s=>s.bentuksoal =='PG Kompleks');
        let html="";
            html+=`<ol type="1" style="margin:0 0 0 -1em;text-transform:none;font-weight:normal">`;
                html+=`<li style="padding-left:0.7em">Bacalah doa sebelum dan sesudah mengerjakan soal</li> 
                <li style="padding-left:0.7em">Kerjakan setiap soal dengan teliti dan benar</li> 
                <li style="padding-left:0.7em">Dahulukan menjawab soal yang dianggap mudah</li> 
                <li style="padding-left:0.7em;margin-bottom:0;mso-para-margin-bottom:0">Laporkan kepada pengawas jika kekeliruan cetakan soal dengan cara mengacungkan tangan</li>`; 
                if(PilihanGanda.length> 0){

                    html+=`<li style="padding-left:0.7em;mso-line-height-alt:1rem; mso-line-height-rule:exactly;">
                    Pada pilihan ganda apabila terdapat jawaban yang dianggap salah dan ingin memperbaiki berilah tanda garis dua (=) 
                        <table style="border-collapse:collapse;border-spacing:0;margin-top:0;mso-para-margin-top:0"> <tr><td style="border:0">Contoh jawaban</td><td style="border:0">:</td><td style="border:0">
                        <img src="${new UrlImg("1OsT3pcKc1JOJUyX0n5AGkY6ssKCqyr9a").urlImg}" alt="Gambar Upload" style="width:100px;height:18px"> </td> <tr><td style="border:0">Diperbaiki menjadi </td><td style="border:0">:</td><td style="border:0">
                        <img src="${new UrlImg("1UFbDEVLaPtcD3v1ehUz-K7vSQdWbXqPq").urlImg}" alt="Gambar Upload" style="width:100px;height:18px"></td> 
                    </table> 
                    </li>`;
                }
                if(SoalMenjodohkan.length>0){
                    html+=`<li style="padding-left:0.7em">`;
                        html+=`Untuk Soal Menjodohkan, tariklah sebuah garis keterhubungan dari pernyataan sebelah kanan menuju titik pernyataan sebelah kiri.`
                    html+=`</li>`;
                }
                if(SoalPGKompleks.length>0){
                    html+=`<li style="padding-left:0.7em">`;
                        html+=`Untuk Soal PG Kompleks atau pilihan jawaban lebih dari satu, berikan tanda ceklis (&checkmark;) pada pernyataan yang merupakan bagian dari jawaban pertanyaan tersebut.`
                    html+=`</li>`;
                }
            html+=`</ol>`
        return html;
}
const tabelSebaranKD = (data)=>{
    let kelompokBentukSoal = data.kelompokBentuksoal;
    let labelheader = [];
    kelompokBentukSoal.forEach(n=>{
        labelheader.push({'label':n})
    })
    let konfigTabelKurmer = {
        tableAtribut:{
            class:"w3-table-all font10 me-1",
            style:'width:90%;font-weight:normal'
            
            // style:"table-collapse:collapse;border-spacing:0;line-height:1rem;border:.5pt solid #ddd"
        },
        headers:[
            {
                columns:[
                    {label:'Elemen',atribute:{'style':'width:56px','rowspan':2}},
                    {label:'Alur Tujuan Pembelajaran',atribute:{'rowspan':2}},
                    {label:'Nomor dan Bentuk Soal',atribute:{colspan:kelompokBentukSoal.length}},
                    
                ]
            },
            {
                columns:labelheader
            }
        ],
        body:()=>{
            const srcData = data.propertiKurikulum;
            const mpl = srcData[0].mapel;
            let tr = "";
            let elemen = [ ...new Set(srcData.map(n=> n.elemen))];
            elemen.forEach((el,i)=>{
                let iel = srcData.filter(s=>s.elemen == el);
                tr+=`<tr>`;
                if(iel.length == 1){
                    tr+=`<td class="text-nowrap" style="padding:4px 8px;mso-padding:4px 8px;">${el}</td>`;
                    tr+=`<td style="padding:4px 8px;mso-padding:4px 8px;">${iel[0].atp}</td>`;
                    labelheader.forEach(lbh=>{
                        tr+=`<td  data-koleksisoal="${mpl}_${iel[0].idbaris}_${lbh.label}"></td>`;
                    })
                }else{
                    tr+=`<td rowspan="${iel.length}" style="padding:4px 8px;mso-padding:4px 8px;">${el}</td>`;
                    iel.forEach((td,ii)=>{
                        tr+=`<td style="padding:4px 8px;mso-padding:4px 8px;">${td.atp}</td>`;
                        labelheader.forEach(lbh=>{
                            tr+=`<td style="padding:4px 8px;mso-padding:4px 8px;" data-koleksisoal="${mpl}_${td.idbaris}_${lbh.label}"></td>`;
                        })
                        if(ii < iel.length -1){
                            tr+=`</tr><tr>`;
                        }
                    })
                };
                
                tr+=`</tr>`;
            });
            return stringToDom(tr);
        }
        
    }
    let konfigTabelKurtilas = {
        tableAtribut:{
            class:"w3-table-all font8 me-1",
            style:'width:90%;font-weight:normal'
        },
        headers:[
            {
                columns:[
                    {label:'Mapel',atribute:{'style':'width:56px','rowspan':2}},
                    {label:'Kompetensi Dasar',atribute:{'rowspan':2}},
                    {label:'Nomor dan Bentuk Soal',atribute:{'colspan':kelompokBentukSoal.length}},
                    
                ]
            },
            {
                columns:labelheader
            }
        ],
        body:()=>{
            const srcData = data.propertiKurikulum;
            let tr = "";
            let mapel = [ ...new Set(srcData.map(n=> n.mapel))];
            mapel.forEach((el,i)=>{
                let iel = srcData.filter(s=>s.mapel == el);
                tr+=`<tr>`;
                if(iel.length == 1){
                    tr+=`<td style="padding:4px 8px;mso-padding:4px 8px;">${el}</td>`;
                    tr+=`<td style="padding:4px 8px;mso-padding:4px 8px;">${iel[0].kd3} ${iel[0].indikatorkd3}</td>`;
                    labelheader.forEach(lbh=>{
                        tr+=`<td style="padding:4px 8px;mso-padding:4px 8px;" data-koleksisoal="${el}_${iel[0].kd3}_${lbh.label}"></td>`;
                    })
                }else{
                    tr+=`<td rowspan="${iel.length}" style="padding:4px 8px;mso-padding:4px 8px;">${el}</td>`;
                    iel.forEach((td,ii)=>{
                        tr+=`<td style="padding:4px 8px;mso-padding:4px 8px;">${td.kd3} ${td.indikatorkd3}</td>`;
                        labelheader.forEach(lbh=>{
                            tr+=`<td style="padding:4px 8px;mso-padding:4px 8px;" data-koleksisoal="${el}_${td.kd3}_${lbh.label}"></td>`;
                        })
                        if(ii < iel.length -1){
                            tr+=`</tr><tr>`;
                        }
                    })
                };
                
                tr+=`</tr>`;
            });
            return stringToDom(tr);
        }
    }
    let kf;
    if(data.kurikulumbanksoal=='kurmer'){
        kf = konfigTabelKurmer;
    }else{
        kf = konfigTabelKurtilas;
    }
    return new tabelDom(kf).init(false);
}
const viewJudulNaskah = (data)=>{
        
    let kf = {
        tableAtribut:{
            // class:'w3-table-all',
            style:'margin-left:auto;margin-right:auto;mso-para-margin-left:auto;mso-para-margin-right:auto;line-height:1rem;mso-line-height-alt:1rem; mso-line-height-rule:exactly;text-align:left !important;margin-bottom:1rem;font-family:TimesNewRoman;'
        },
        headers:[],
        body:()=>{
            let html = "";
            html+=`<tr>`;
                html+=`<td style="padding:0 8px;border:0;vertical-align:top" contenteditable="true" spellcheck="false">Muatan Pelajaran</td>`;
                html+=`<td style="width:5px;padding:0 8px;border:0;vertical-align:top">:</td>`;
                let teksmapel ='';
                if(data.mapel.indexOf('Tema ')>-1){
                    teksmapel = data.mapel+'<br>('+data.koleksiMapelDalamTema().join(', ')+')';
                }else{
                    teksmapel = data.mapelTeks;
                }
                html+=`<td style="padding:0 8px;border:0" contenteditable="true" spellcheck="false">${teksmapel}</td>`;
                html+=`</tr>`;
            html+=`<tr>`;
                html+=`<td style="padding:0 8px;border:0" contenteditable="true" spellcheck="false">Kurikulum</td>`;
                html+=`<td style="padding:0 8px;border:0">:</td>`;
                html+=`<td style="padding:0 8px;border:0" contenteditable="true" spellcheck="false">${data.kurikulum}</td>`;
            html+=`</tr>`;
            html+=`<tr>`;
                html+=`<td style="padding:0 8px;border:0" contenteditable="true" spellcheck="false">Kelas</td>`;
                html+=`<td style="padding:0 8px;border:0">:</td>`;
                html+=`<td style="padding:0 8px;border:0" contenteditable="true" spellcheck="false">${data.kelas}</td>`;
            html+=`</tr>`;  
            html+=`<tr>`;
                html+=`<td style="padding:0 8px;border:0" contenteditable="true" spellcheck="false">Hari, Tanggal</td>`;
                html+=`<td style="padding:0 8px;border:0">:</td>`;
                html+=`<td style="padding:0 8px;border:0" contenteditable="true" spellcheck="false">${data.FormatTanggal(data.start_waktu).formatFull()}</td>`;
            html+=`</tr>`; 
            html+=`<tr>`;
                html+=`<td style="padding:0 8px;border:0" contenteditable="true" spellcheck="false">Waktu</td>`;
                html+=`<td style="padding:0 8px;border:0">:</td>`;
                let awal,akhir,durasi;
                awal = data.FormatTanggal(data.start_waktu).timeShort();
                akhir = data.FormatTanggal(data.end_waktu).timeShort();
                durasi = durasiMenit(data.start_waktu, data.end_waktu);
                html+=`<td style="padding:0 8px;border:0" contenteditable="true" spellcheck="false">${awal}-${akhir} (${durasi} Menit)</td>`;
            html+=`</tr>`;  
            return stringToDom(html);
        }

    }
    return `<div id="naskah_identitas" class="text-center">${new tabelDom(kf).init(false)}</div>`;

}
const petunjukkelompoksoal = (bentuksoal)=>{
    let html="";
    if(bentuksoal == 'Pilihan Ganda'){
        html='Berilah tanda silang (X) pada huruf A, B, C, atau D di depan jawaban yang benar!'
    }else if(bentuksoal =='Isian'){
        html=`Jawab singkat pertanyaan berikut dengan tepat dan jelas!`
    }else if(bentuksoal == 'Essay'){
        html=`Essay`
    }else if(bentuksoal == 'PG Kompleks'){
        html=`Berilah tanda ceklis (&checkmark;) pada buletan yang merupakan jawaban atas pertanyaan yang diberikan. Jawaban bisa lebih dari satu!`
    }else if(bentuksoal == 'Menjodohkan'){
        html=`Tariklah sebuah garis yang merupakan pasangan antara pernyataan/ilustrasi di sebelah kiri dengan pernyataan/ilustrasi sebelah kanan!`
    }else if(bentuksoal == 'BenarSalah'){
        html=`Pilihlah jawaban 'Benar' atau 'Salah' dari pernyatan yang disajikan!`
    }else if(bentuksoal == 'Menulis Rapih'){
        html='Tulislah dalam bentuk huruf bersambung (Tulisan Elok)!'
    }else{
        html="Petunjuk tidak dikenal"
    }
    return html;
}
const viewIsiNaskahSoal = (data)=>{
    
    // let Urutan = document.querySelectorAll(`[data-urutanbentuksoal]`);
    let Urutan = data.kerangka;
    let html = "";
    html+=`<table class="tempatnaskahsoal_soal" id="tabelkontendesainnaskah_dariserver" style="border-collapse:collapse;border-spacing;margin-top:0;font-family:'timesNewRoman';border:0;width:95%;font-weight:normal;margin-left:2.1rem"><tbody>`;
    let flagNoSoal = 1;
    let flagnoByBentuk = 1;
    Urutan.forEach((soal,iBentuksoal)=>{
        let val = soal.bentuksoal;//soal.getAttribute('data-urutanbentuksoal');
        let ref = soal.jumlah;// soal.getAttribute('data-refrensiurutan');
        html+=`<tr>`;
            html+=`<td colspan="2" contenteditable="true" spellcheck="false" style="border:0;text-align:left;padding:4px 8px;mso-padding:4px 8px;font-weight:bold;line-height:2.rem">`;
                html+=`<ol type="I" style="margin:0 0 0 -0.7em">`;
                    html+=`<li value="${iBentuksoal+1}" style="padding-left:0.7em" class="fst-italic">${petunjukkelompoksoal(val)}</li>`;
                html+=`</ol>`;
            html+=`</td>`;
        html+=`</tr>`;
        let jumlahKelompokSoal =parseInt(ref);// parseInt(kerangka[ref]);
        if(val =='Menjodohkan'){
            html+=`<tr>
            <td style="width:8px;margin-bottom:0;border:0;text-align:right;padding:4px 8px;mso-padding:4px 8px;vertical-align:middle">
            ${flagnoByBentuk} s.d ${flagnoByBentuk+(jumlahKelompokSoal-1)}.</td>`;
            html+=`<td 
                    data-noByBentuk="${flagnoByBentuk}" 
                    style="border:0;margin-bottom:0;padding:4px 8px;mso-padding:4px 8px;vertical-align:top" 
                    data-nosoal="${flagNoSoal}" 
                    data-bentuksoal="${val}"
                    data-banyakjodoh="${jumlahKelompokSoal}"
                >`;
                html+=`Klik bagian ini untuk menempatkan soal menjodohkan untuk mengisi nomor ${flagnoByBentuk} sampai ${flagnoByBentuk+(jumlahKelompokSoal-1)}.`
            html+=`</td>`;
                flagNoSoal+=jumlahKelompokSoal;
                flagnoByBentuk+=jumlahKelompokSoal;
        }else{
            for(let i = 0 ; i < jumlahKelompokSoal ; i++){
                if(val=='Menulis Rapih'){
                    html+=`<tr>
                    <td style="width:8px;margin-bottom:0;border:0;text-align:right;padding:4px 8px;mso-padding:4px 8px;vertical-align:top">
                    ${flagnoByBentuk}.</td>`;
                    html+=`<td 
                    data-noByBentuk="${flagnoByBentuk}" 
                    style="border:0;margin-bottom:0;padding:4px 8px;mso-padding:4px 8px;vertical-align:top" 
                    data-nosoal="${flagNoSoal}" 
                    data-bentuksoal="${val}"
                >`;
                        html+=`<table style="border-collapse:collapse; border-spacing:0; width:100%;margin-top:1rem;line-height:7px">`;
                            html+=`<tr><td style="border-bottom:.5pt solid #ddd;width:100%;font-size:6px">&nbsp;</td></tr>`
                            html+=`<tr><td style="border-bottom:.5pt solid #ddd;width:100%;font-size:6px">&nbsp;</td></tr>`
                            html+=`<tr><td style="border-bottom:.5pt solid #ddd;width:100%;font-size:6px">&nbsp;</td></tr>`
                            html+=`<tr><td style="border-bottom:.5pt solid #ddd;width:100%;font-size:6px">&nbsp;</td></tr>`
                            html+=`<tr><td style="border-bottom:.5pt solid #ddd;width:100%;font-size:6px">&nbsp;</td></tr>`
                        html+=`</table>`;
                    html+=`</td>`;
                }else{
                    
                    html+=`<tr>
                    <td style="width:8px;margin-bottom:0;border:0;text-align:right;padding:4px 8px;mso-padding:4px 8px;vertical-align:top">
                    ${flagnoByBentuk}.</td>`;
                    html+=`<td 
                        data-noByBentuk="${flagnoByBentuk}" 
                        style="border:0;margin-bottom:0;padding:4px 8px;mso-padding:4px 8px;vertical-align:top" 
                        data-nosoal="${flagNoSoal}" 
                        data-bentuksoal="${val}"
                    >`
                    
                    html+=`Klik Sekali untuk menambahkan/mengedit posisi soal ${val}<br> (index Soal: ${flagNoSoal}, No. Soal:${flagnoByBentuk} )`
                    html+=`</td>`;
                }
                html+=`</tr>`; 
                flagNoSoal++;
                flagnoByBentuk++;
            }

            
        }
        if(data.penomoransoal){
            
            flagnoByBentuk = 1
        }

    });

    html+=`</tbody></table>`;
    return html;
}
const viewSoal = {
    'tabelNilai' : viewTabelNilai,
    'petunjukUmum':viewPetunjukUmum,
    'sebarankd':tabelSebaranKD,
    'judulNaskah':viewJudulNaskah,
    'isiNaskahSoal':viewIsiNaskahSoal
}
export default viewSoal;