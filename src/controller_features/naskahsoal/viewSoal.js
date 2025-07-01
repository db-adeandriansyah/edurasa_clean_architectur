import UrlImg from "../../controllers/UrlImg";
import { tabelDom } from "../../entries/vendor";
import { stringToDom } from "../../views/components/doms";
import { previewBentukSoal, previewBentukSoalJawaban, previewKunciJawaban, previewSoalPilihanGanda, replaceSoalToSel } from "../banksoal/viewBankSoal";
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
const viewIdentitas = (data)=>{
    let html = "";
    html+=`<div id="naskah_identitas" class="text-center"><table style="margin-left:auto;margin-right:auto;mso-para-margin-left:auto;mso-para-margin-right:auto;line-height:1rem;mso-line-height-alt:1rem; mso-line-height-rule:exactly;text-align:left !important;margin-bottom:1rem;font-family:TimesNewRoman;"><thead></thead><tbody>
                <tr>
                    <td style="padding:0 8px;border:0;vertical-align:top" contenteditable="true" spellcheck="false">Muatan Pelajaran</td>
                    <td style="width:5px;padding:0 8px;border:0;vertical-align:top">:</td>
                    <td style="padding:0 8px;border:0" contenteditable="true" spellcheck="false">${data.mapelidentitas}</td>
                </tr>
                <tr>
                    <td style="padding:0 8px;border:0" contenteditable="true" spellcheck="false">Kurikulum</td>
                    <td style="padding:0 8px;border:0">:</td>
                    <td style="padding:0 8px;border:0" contenteditable="true" spellcheck="false">${data.namakurikulum}</td>
                </tr>
                <tr>
                    <td style="padding:0 8px;border:0" contenteditable="true" spellcheck="false">Kelas</td>
                    <td style="padding:0 8px;border:0">:</td>
                    <td style="padding:0 8px;border:0" contenteditable="true" spellcheck="false">${data.kelas}</td>
                </tr>
                <tr>
                    <td style="padding:0 8px;border:0" contenteditable="true" spellcheck="false">Hari, Tanggal</td>
                    <td style="padding:0 8px;border:0">:</td>
                    <td style="padding:0 8px;border:0" contenteditable="true" spellcheck="false">${data.titimangsa}</td>
                </tr>
                <tr>
                    <td style="padding:0 8px;border:0" contenteditable="true" spellcheck="false">Waktu</td>
                    <td style="padding:0 8px;border:0">:</td>
                    <td style="padding:0 8px;border:0" contenteditable="true" spellcheck="false">${data.durasi}</td>
                </tr>
            </tbody>
        </table>
    </div>`;
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
            const mpl = srcData[0].mapel??srcData[0].kodemapel;
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
                    // if(val =='Menjodohkan'){
                    //     html+=`<tr>
                    //     <td style="width:8px;margin-bottom:0;border:0;text-align:right;padding:4px 8px;mso-padding:4px 8px;vertical-align:middle"></td>`
                    //     // ${flagnoByBentuk} s.d ${flagnoByBentuk+(jumlahKelompokSoal-1)}.</td>`;
                    //     html+=`<td 
                    //             data-noByBentuk="${flagnoByBentuk}" 
                    //             style="border:0;margin-bottom:0;padding:4px 8px;mso-padding:4px 8px;vertical-align:top" 
                    //             data-nosoal="${flagNoSoal}" 
                    //             data-bentuksoal="${val}"
                    //             data-banyakjodoh="${jumlahKelompokSoal}"
                    //         >`;
                    //         html+=`Klik bagian ini untuk menempatkan soal menjodohkan untuk mengisi nomor ${flagnoByBentuk} sampai ${flagnoByBentuk+(jumlahKelompokSoal-1)}.`
                    //     html+=`</td>`;
                    //         flagNoSoal+=jumlahKelompokSoal;
                    //         flagnoByBentuk+=jumlahKelompokSoal;
                    // }else{
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
                        data-bentuksoal="${val}" ${val=='Menjodohkan'?`data-banyakjodoh="1" `:''}
                    >`
                    
                    html+=`Klik Sekali untuk menambahkan/mengedit posisi soal ${val}<br> (index Soal: ${flagNoSoal}, No. Soal:${flagnoByBentuk} )`
                    html+=`</td>`;
                }
                html+=`</tr>`; 
                flagNoSoal++;
                flagnoByBentuk++;
            }

            
        // }
        if(data.penomoransoal){
            
            flagnoByBentuk = 1
        }

    });

    html+=`</tbody></table>`;
    return html;
}
const viewIsiNaskahSoalDraft = (data)=>{
    let Urutan = data.kerangka;
    let html = "";
    
    html+=`<table class="tempatnaskahsoal_soal" id="tabelkontendesainnaskah_dariserver" style="border-collapse:collapse;border-spacing;margin-top:0;font-family:'timesNewRoman';border:0;width:95%;font-weight:normal;margin-left:2.1rem"><tbody>`;
    
    Urutan.forEach(n=>{
        if(n.type == 'sparator'){
            html+=`<tr>`;
                html+=`<td colspan="2" contenteditable="true" spellcheck="false" style="border:0;text-align:left;padding:4px 8px;mso-padding:4px 8px;font-weight:bold;line-height:2.rem">`;
                html+=n.content;
                html+=`</td>`;
            html+=`</tr>`;

        }else{
            
            html+=`<tr>`;
                html+=`<td style="width:8px;margin-bottom:0;border:0;text-align:right;padding:4px 8px;mso-padding:4px 8px;vertical-align:top">`;
                    html+=`${n.nobybentuk}.`;
                html+=`</td>`;
                if(n.hassoal){
                    html+=n.td;
                }else{
                    html+=`<td 
                        data-noByBentuk="${n.nobybentuk}" 
                        style="border:0;margin-bottom:0;padding:4px 8px;mso-padding:4px 8px;vertical-align:top" 
                        data-nosoal="${n.nosoal}"
                        data-bentuksoal="${n.bentuksoal}"`; 
                    if(n.bentuksoal == 'Menjodohkan'){
                        html+=` data-banyakjodoh="${n.banyakjodoh}">`;
                        html+=`Klik bagian ini untuk menempatkan soal menjodohkan untuk mengisi nomor ${n.nobybentuk} sampai ${n.nobybentuk+(n.banyakjodoh-1)}.`;
                    }else if(n.bentuksoal == 'Menulis Rapih'){
                        html+=`><table style="border-collapse:collapse; border-spacing:0; width:100%;margin-top:1rem;line-height:7px">`;
                            html+=`<tr><td style="border-bottom:.5pt solid #ddd;width:100%;font-size:6px">&nbsp;</td></tr>`
                            html+=`<tr><td style="border-bottom:.5pt solid #ddd;width:100%;font-size:6px">&nbsp;</td></tr>`
                            html+=`<tr><td style="border-bottom:.5pt solid #ddd;width:100%;font-size:6px">&nbsp;</td></tr>`
                            html+=`<tr><td style="border-bottom:.5pt solid #ddd;width:100%;font-size:6px">&nbsp;</td></tr>`
                            html+=`<tr><td style="border-bottom:.5pt solid #ddd;width:100%;font-size:6px">&nbsp;</td></tr>`
                        html+=`</table>`;
                    }else{
                        html+=`>`
                        html+='KLIK DI SINI';

                    }
                    
                    html+=`</td>`;
                }

            html+=`</tr>`

        }
    })
    html+=`</tbody></table>`;
    return html;
}

const titlekisikisi = (identitas)=>{
    let html ="";
    html+=`<h3 class="text-center mb-0 tnr font14" style="mso-line-height-alt:1rem; mso-line-height-rule:exactly;">KISI-KISI ${identitas.toptitle}</h3>`;
    html+=`<h3 class="text-center mb-2 tnr font14" style="mso-line-height-alt:1rem; mso-line-height-rule:exactly;">${identitas.mapel}</h3>`;
    return html;
}
const titlekuncijawaban = (identitas)=>{
    let html ="";
    html+=`<h3 class="text-center mb-0 tnr font14" style="mso-line-height-alt:1rem; mso-line-height-rule:exactly;">KUNCI JAWABAN DAN PENSKORAN ${identitas.toptitle}</h3>`;
    html+=`<h3 class="text-center mb-2 tnr font14" style="mso-line-height-alt:1rem; mso-line-height-rule:exactly;">${identitas.mapel}</h3>`;
    return html;
}
const tabelidentitaskisi = (identitas)=>{
    let html="";
    
    html+=`<table style="border:0;border-spacing:0;width:100%;margin-bottom:2rem">`;
        html+=`<tr>`;
            html+=`<td style="width:50%;border:0;vertical-align:top">`;
            /**peroperti kisi-kisi */
                html+=`<table style="width:95%;border-collapse:collapse;border-spacing:0;font-size:12px;line-height:1;mso-line-height-alt:1rem; mso-line-height-rule:exactly;font-family:TimesNewRoman;">`;
                    html+=`<tr>`;
                        html+=`<td style="border:0;margin-bottom:0;vertical-align:top;padding:4px 8px;width:30%">Jenjang</td>`
                        html+=`<td style="border:0;vertical-align:top;width:15px">:</td>`
                        html+=`<td style="border:0;vertical-align:top">Sekolah Dasar</td>`;
                    html+=`</tr>`;
                    html+=`<tr>`;
                        html+=`<td style="border:0;margin-bottom:0;vertical-align:top;padding:4px 8px;">Tahun Pelajaran</td>`
                        html+=`<td style="border:0;vertical-align:top;">:</td>`
                        html+=`<td style="border:0;vertical-align:top">${identitas.tapel}</td>`;
                    html+=`</tr>`;
                    html+=`<tr>`;
                        html+=`<td style="border:0;margin-bottom:0;vertical-align:top;padding:4px 8px;">Kelas/Semester</td>`
                        html+=`<td style="border:0;vertical-align:top;">:</td>`
                        html+=`<td style="border:0;vertical-align:top">${identitas.kelas_semester}</td>`;
                    html+=`</tr>`;
                    html+=`<tr>`;
                        html+=`<td style="border:0;margin-bottom:0;vertical-align:top;padding:4px 8px;">Kurikulum</td>`
                        html+=`<td style="border:0;vertical-align:top;">:</td>`
                        html+=`<td style="border:0;vertical-align:top">${identitas.kurikulum=='kurmer'?'Kurikulum Merdeka':'Kurikulum 2013'}</td>`;
                    html+=`</tr>`;
                    html+=`<tr>`;
                        html+=`<td style="border:0;margin-bottom:0;vertical-align:top;padding:4px 8px;">Muatan Pelajaran</td>`
                        html+=`<td style="border:0;vertical-align:top;">:</td>`;
                        
                        html+=`<td style="border:0;vertical-align:top">${identitas.muatanpelajaran}</td>`;
                    html+=`</tr>`;
                    html+=`<tr>`;
                        html+=`<td style="border:0;margin-bottom:0;vertical-align:top;padding:4px 8px;">Penyusun</td>`
                        html+=`<td style="border:0;vertical-align:top;">:</td>`;
                        html+=`<td style="border:0;vertical-align:top">${identitas.penyusun}</td>`;
                    html+=`</tr>`;
                html+=`</table>`;
            html+=`<td>`;
            html+=`<td style="width:50%;border:0;vertical-align:top">`;
                /**properti naskah soal */
                html+=`<table style="width:95%;border-collapse:collapse;border-spacing:0;font-size:12px;line-height:1;mso-line-height-alt:1rem; mso-line-height-rule:exactly;font-family:TimesNewRoman;">`;
                    html+=`<tr>`;
                        html+=`<td style="border:0;margin-bottom:0;vertical-align:top;padding:4px 8px;width:30%">Pelaksanaan</td>`
                        html+=`<td style="border:0;vertical-align:top;width:15px">:</td>`
                        html+=`<td style="border:0;vertical-align:top" contenteditable="true">${identitas.pelaksanaan}</td>`;
                    html+=`</tr>`;
                    html+=`<tr>`;
                        html+=`<td style="border:0;margin-bottom:0;vertical-align:top;padding:4px 8px;width:30%">Alokasi Waktu</td>`
                        html+=`<td style="border:0;vertical-align:top;width:15px">:</td>`
                        html+=`<td style="border:0;vertical-align:top" contenteditable="true">${identitas.alokasiwaktu}</td>`;
                    html+=`</tr>`;
                    html+=`<tr>`;
                        html+=`<td style="border:0;margin-bottom:0;vertical-align:top;padding:4px 8px;">Jumlah Soal</td>`
                        html+=`<td style="border:0;vertical-align:top;">:</td>`;
                        html+=`<td style="border:0;vertical-align:top">${identitas.jumlahsoal}</td>`;
                    html+=`</tr>`;
                    html+=`<tr>`;
                        html+=`<td style="border:0;margin-bottom:0;vertical-align:top;padding:4px 8px;">Rincian Soal</td>`
                        html+=`<td style="border:0;vertical-align:top;">:</td>`;

                        html+=`<td style="border:0;vertical-align:top">`;
                            html+= identitas.rincianjumlahsoal;
                        html+=`</td>`;
                    html+=`</tr>`;
                html+=`</table>`;
                /**selesia */
            html+=`<td>`;
        html+=`</tr>`;
    html+=`</table>`;
    return html;
}
const tabelkisikisi = (datakonfigurasi,datasoal)=>{
    let headerTitle = [];
    let headerKey = [];
    let mode = 'kurmer'
    let html = "";
    if(datakonfigurasi.kurikulum == 'kurmer'){
        headerTitle = ['Capaian Pembelajaran','Tujuan Pembelajaran','Materi Pokok','Level Kognitif','Indikator Soal','No. Soal','Bentuk Soal','Soal','Kunci Jawaban'];
        headerKey = ['tp','atp','materi','levelkognitif','indikatorsoal','nobybentuk','bentuksoalspesifik','soal','kuncijawaban'];
    }else{
        if(datakonfigurasi.mapel.indexOf('Tema ')>-1||datakonfigurasi.mapel.indexOf('TEMA ')>-1){
            mode = 'tema';
            headerTitle = ['Mata Pelajaran','Kompetensi Dasar','Lingkup Materi','Materi Pokok','Level Kognitif','Indikator Soal','Bentuk Soal','No. Soal'];
            headerKey = ['tekskodemapel','kd','levelkognitif','indikatorsoal','bentuksoalspesifik','nobybentuk'];
        }else{
            mode = 'kurtilas';
            headerTitle = ['Kompetensi Dasar','Lingkup Materi','Materi Pokok','Level Kognitif','Indikator Soal','Bentuk Soal','No. Soal'];
            headerKey = ['tekskd','levelkognitif','indikatorsoal','bentuksoalspesifik','nobybentuk'];

        }
        
    }
        html+=`<table style="width:100%;font-size:12px;margin-left:auto;margin-right:auto;border-collapse:collapse;border-spacing:0">`;
        html+=`<thead><tr style="background-color:#ddd">`;
        headerTitle.forEach(n=>{
            html+=`<th style="text-align:center;vertical-align:middle;margin-top:0;border:.5pt solid #000;padding:4px 8px">${n}</th>`
        });
        html+=`</tr></thead>`;
            html+=`<tbody>`;
                if(mode=='kurmer'){
                    let itemsoals = datasoal[0].data;
                    itemsoals.forEach(n=>{ // mode kurmer
                        if(n.totalsoalkdcp==1){
                            let c = n.objekproperti;
                            let itemsoal = n.arraysoal[0];
                            html+=`<tr>`;
                                html+=`<td style="padding:4px 8px;border:.5pt solid #000;vertical-align:top"><b>${c.elemen}</b><br>${c.tp}</b></td>`;
                                html+=`<td style="padding:4px 8px;border:.5pt solid #000;vertical-align:top">${c.atp}</td>`;
                                html+=`<td style="padding:4px 8px;border:.5pt solid #000;vertical-align:top">${itemsoal.itemsoal.materi}</td>`;
                                html+=`<td style="padding:4px 8px;border:.5pt solid #000;vertical-align:top">${itemsoal.itemsoal.levelkognitif}</td>`;
                                html+=`<td style="padding:4px 8px;border:.5pt solid #000;vertical-align:top">${itemsoal.itemsoal.indikatorsoal}</td>`;
                                
                                if(itemsoal.bentuksoal == 'Menjodohkan'){

                                    html+=`<td style="padding:4px 8px;border:.5pt solid #000;vertical-align:top">${itemsoal.nobybentuk} - ${(parseInt(itemsoal.nobybentuk) + itemsoal.banyakjodoh - 1)}</td>`;
                                }else{
                                    html+=`<td style="padding:4px 8px;border:.5pt solid #000;vertical-align:top">${itemsoal.nobybentuk}</td>`;

                                }
                                html+=`<td style="padding:4px 8px;border:.5pt solid #000;vertical-align:top">${itemsoal.bentuksoal}</td>`;

                                if(itemsoal.bentuksoal == 'Pilihan Ganda'){
                                    html+=`<td style="padding:4px 8px;border:.5pt solid #000;vertical-align:top;">${previewSoalPilihanGanda(itemsoal.itemsoal,false)}</td>`;
                                }else{
                                    html+=`<td style="padding:4px 8px;border:.5pt solid #000;vertical-align:top;">${itemsoal.itemsoal.ilustrasi == ''?'':itemsoal.itemsoal.ilustrasi+'<br>'}${itemsoal.itemsoal.pertanyaan}</td>`;
                                }

                                if(itemsoal.bentuksoal == 'Pilihan Ganda'){
                                    html+=`<td style="padding:4px 8px;border:.5pt solid #000;;vertical-align:top;font-size:8px">${itemsoal.itemsoal.kuncijawaban}</td>`;
                                }else if(itemsoal.bentuksoal == 'PG Kompleks'){
                                    let arayPG = JSON.parse(itemsoal.itemsoal.kuncijawaban);
                                    html+=`<td style="padding:4px 8px;border:.5pt solid #000;vertical-align:top;">${arayPG.join('<br>')}</td>`;
                                }else if(itemsoal.bentuksoal == 'BenarSalah'){
                                    let arayPG = itemsoal.itemsoal.kuncijawaban=="1"?"Benar":"Salah";
                                    html+=`<td style="padding:4px 8px;border:.5pt solid #000;vertical-align:top;">${arayPG}</td>`;
                                }else{
                                    html+=`<td style="padding:4px 8px;border:.5pt solid #000;vertical-align:top;">${itemsoal.itemsoal.penskoran}</td>`;
                                }
                            html+=`</tr>`;
                            
                        }else{
                            let c = n.objekproperti;
                            html+=`<tr>`;
                            for(let i = 0 ; i < n.totalsoalkdcp ; i++){
                                if(i == 0){
                                    html+=`<td style="padding:4px 8px;border:.5pt solid #000;vertical-align:top" rowspan="${n.totalsoalkdcp}"><b>${c.elemen}</b><br>${c.tp}</b></td>`;
                                }
                                let itemsoal = n.arraysoal[i];
    
                                    // html+=`<td style="padding:4px 8px;border:.5pt solid #000;vertical-align:top"><b>${c.elemen}</b><br>${c.tp}</b></td>`;
                                    html+=`<td style="padding:4px 8px;border:.5pt solid #000;vertical-align:top">${c.atp}</td>`;
                                    html+=`<td style="padding:4px 8px;border:.5pt solid #000;vertical-align:top">${itemsoal.itemsoal.materi}</td>`;
                                    html+=`<td style="padding:4px 8px;border:.5pt solid #000;vertical-align:top">${itemsoal.itemsoal.levelkognitif}</td>`;
                                    html+=`<td style="padding:4px 8px;border:.5pt solid #000;vertical-align:top">${itemsoal.itemsoal.indikatorsoal}</td>`;
                                    if(itemsoal.bentuksoal == 'Menjodohkan'){
    
                                        html+=`<td style="padding:4px 8px;border:.5pt solid #000;vertical-align:top">${itemsoal.nobybentuk} - ${(parseInt(itemsoal.nobybentuk) + itemsoal.banyakjodoh - 1)}</td>`;
                                    }else{
                                        html+=`<td style="padding:4px 8px;border:.5pt solid #000;vertical-align:top">${itemsoal.nobybentuk}</td>`;
    
                                    }
                                    html+=`<td style="padding:4px 8px;border:.5pt solid #000;vertical-align:top">${itemsoal.bentuksoal}</td>`;
                                    // html+=`<td style="padding:4px 8px;border:.5pt solid #000;vertical-align:top;">${itemsoal.itemsoal.ilustrasi == ''?'':itemsoal.itemsoal.ilustrasi+'<br>'}${itemsoal.itemsoal.pertanyaan}</td>`;
                                    if(itemsoal.bentuksoal == 'Pilihan Ganda'){
                                        html+=`<td style="padding:4px 8px;border:.5pt solid #000;vertical-align:top;">${previewSoalPilihanGanda(itemsoal.itemsoal,false)}</td>`;
                                    }else{
                                        html+=`<td style="padding:4px 8px;border:.5pt solid #000;vertical-align:top;">${itemsoal.itemsoal.ilustrasi == ''?'':itemsoal.itemsoal.ilustrasi+'<br>'}${itemsoal.itemsoal.pertanyaan}</td>`;
                                    }
                                    if(itemsoal.bentuksoal == 'Pilihan Ganda'){
                                        html+=`<td style="padding:4px 8px;border:.5pt solid #000;;vertical-align:top;font-size:8px">${itemsoal.itemsoal.kuncijawaban}</td>`;
                                    }else if(itemsoal.bentuksoal == 'PG Kompleks'){
                                        let arayPG = JSON.parse(itemsoal.itemsoal.kuncijawaban);
                                        html+=`<td style="padding:4px 8px;border:.5pt solid #000;vertical-align:top;">${arayPG.join('<br>')}</td>`;
                                    }else if(itemsoal.bentuksoal == 'BenarSalah'){
                                        let arayPG = itemsoal.itemsoal.kuncijawaban=="1"?"Benar":"Salah";
                                        html+=`<td style="padding:4px 8px;border:.5pt solid #000;vertical-align:top;">${arayPG}</td>`;
                                    }else{
                                        html+=`<td style="padding:4px 8px;border:.5pt solid #000;vertical-align:top;">${itemsoal.itemsoal.penskoran}</td>`;
                                    }
                                    
                                if(i < n.totalsoalkdcp -1){
                                    html+=`</tr><tr>`;
                                }
                            }
                            html+=`</tr>`;
                        }
                    })
                }else{
                    
                    if(mode=='tema'){
                        
                        datasoal.forEach((d)=>{ // mode tema
                            let arraykd = d.data;
                            
                            html+=`<tr>`;
                                if(d.totalsoal == 1){
                                    html+=`<td style="padding:4px 8px;border:.5pt solid #000;vertical-align:top">${d.tekskodemapel}</td>`;
                                }else{
                                    html+=`<td style="padding:4px 8px;border:.5pt solid #000;vertical-align:top" rowspan="${d.totalsoal}">${d.tekskodemapel}</td>`;
                                }
                                
                                arraykd.forEach((k,iKd)=>{
                                    let propertikd  = k.objekproperti;
                                    let soalkd = k.arraysoal;
                                    if(k.totalsoalkdcp == 1){
                                        html+=`<td style="padding:4px 8px;border:.5pt solid #000;vertical-align:top">${propertikd.kd}. ${propertikd.indikatorkd3}</td>`;
                                    }else{
                                        html+=`<td style="padding:4px 8px;border:.5pt solid #000;vertical-align:top" rowspan="${k.totalsoalkdcp}">${propertikd.kd3}. ${propertikd.indikatorkd3}</td>`;
                                    }
                                    soalkd.forEach((so,iSo)=>{
                                        let soal = so.itemsoal;
                                        html+=`<td style="padding:4px 8px;border:.5pt solid #000;vertical-align:top">${soal.ruanglingkup}</td>`
                                        html+=`<td style="padding:4px 8px;border:.5pt solid #000;vertical-align:top">${soal.materi}</td>`
                                        html+=`<td style="padding:4px 8px;border:.5pt solid #000;vertical-align:top">${soal.levelkognitif}</td>`
                                        html+=`<td style="padding:4px 8px;border:.5pt solid #000;vertical-align:top">${soal.indikatorsoal}</td>`
                                        html+=`<td style="padding:4px 8px;border:.5pt solid #000;vertical-align:top">${soal.bentuksoalspesifik}</td>`
                                        html+=`<td style="padding:4px 8px;border:.5pt solid #000;vertical-align:top">${so.nobybentuk}</td>`

                                        if(iSo < k.totalsoalkdcp-1){
                                            html+=`</tr><tr>`
                                        }

                                    });
                                
                                    if(iKd < d.totalsoal-1){
                                        html+=`</tr><tr>`
                                    }
                                })
                                // itemsoals.forEach((n,indeks)=>{
                                //     if(n.totalsoalkdcp==1){
                                //         let c = n.objekproperti;
                                //         let itemsoal = n.arraysoal[0];
                                //         // html+=`<tr>`;
                                //             html+=`<td style="padding:4px 8px;border:.5pt solid #000;vertical-align:top">${c.kd3}. ${c.indikatorkd3}</td>`;
                                //             html+=`<td style="padding:4px 8px;border:.5pt solid #000;vertical-align:top">${itemsoal.itemsoal.ruanglingkup}</td>`;
                                //             html+=`<td style="padding:4px 8px;border:.5pt solid #000;vertical-align:top">${itemsoal.itemsoal.materi}</td>`;
                                //             html+=`<td style="padding:4px 8px;border:.5pt solid #000;vertical-align:top">${itemsoal.itemsoal.levelkognitif}</td>`;
                                //             html+=`<td style="padding:4px 8px;border:.5pt solid #000;vertical-align:top">${itemsoal.itemsoal.indikatorsoal}</td>`;
                                //             html+=`<td style="padding:4px 8px;border:.5pt solid #000;vertical-align:top">${itemsoal.bentuksoal}</td>`;
                                //             if(itemsoal.bentuksoal == 'Menjodohkan'){
                                //                 html+=`<td style="padding:4px 8px;border:.5pt solid #000;vertical-align:top">${itemsoal.nobybentuk} - ${(parseInt(itemsoal.nobybentuk) + itemsoal.banyakjodoh - 1)}</td>`;
                                //             }else{
                                //                 html+=`<td style="padding:4px 8px;border:.5pt solid #000;vertical-align:top">${itemsoal.nobybentuk}</td>`;
                                //             }
                                //     }else{
                                //         let c = n.objekproperti;
                                        
                                //         for(let i = 0 ; i < n.totalsoalkdcp ; i++){
                                //             if(i == 0){
                                //                 html+=`<td style="padding:4px 8px;border:.5pt solid #000;vertical-align:top" rowspan="${n.totalsoalkdcp}">${c.kd3}. ${c.indikatorkd3}</td>`;
                                //             }
                                //             let itemsoal = n.arraysoal[i];
                
                                //                 // html+=`<td style="padding:4px 8px;border:.5pt solid #000;vertical-align:top"><b>${c.elemen}</b><br>${c.tp}</b></td>`;
                                //                 // html+=`<td style="padding:4px 8px;border:.5pt solid #000;vertical-align:top">${c.atp}</td>`;
                                //                 html+=`<td style="padding:4px 8px;border:.5pt solid #000;vertical-align:top">${itemsoal.itemsoal.ruanglingkup}</td>`;
                                //                 html+=`<td style="padding:4px 8px;border:.5pt solid #000;vertical-align:top">${itemsoal.itemsoal.materi}</td>`;
                                //                 html+=`<td style="padding:4px 8px;border:.5pt solid #000;vertical-align:top">${itemsoal.itemsoal.levelkognitif}</td>`;
                                //                 html+=`<td style="padding:4px 8px;border:.5pt solid #000;vertical-align:top">${itemsoal.itemsoal.indikatorsoal}</td>`;
                                //                 html+=`<td style="padding:4px 8px;border:.5pt solid #000;vertical-align:top">${itemsoal.bentuksoal}</td>`;
                                //                 if(itemsoal.bentuksoal == 'Menjodohkan'){
                
                                //                     html+=`<td style="padding:4px 8px;border:.5pt solid #000;vertical-align:top">${itemsoal.nobybentuk} - ${(parseInt(itemsoal.nobybentuk) + itemsoal.banyakjodoh - 1)}</td>`;
                                //                 }else{
                                //                     html+=`<td style="padding:4px 8px;border:.5pt solid #000;vertical-align:top">${itemsoal.nobybentuk}</td>`;
                
                                //                 }
                                                
                                //             if(i < n.totalsoalkdcp -1){
                                //                 html+=`</tr><tr>`;
                                //             }
                                //         }
                                //         // html+=`</tr>`;
                                //     }
                                //     // if(indeks < n.totalsoal -1){
                                //     //     html+=`</tr><tr>`;
                                //     // }
                                // })
                            html+=`</tr>`;
                        })
                    }else{
                        let d = datasoal[0];
                        let itemsoals = d.data;
                        
                        itemsoals.forEach((n,iItemsoals)=>{
                            html+=`<tr>`;
                            if(n.totalsoalkdcp==1){
                                let c = n.objekproperti;
                                let itemsoal = n.arraysoal[0];
                                // html+=`<tr>`;
                                html+=`<td style="padding:4px 8px;border:.5pt solid #000;vertical-align:top">${c.kd3}. ${c.indikatorkd3}</td>`;
                                html+=`<td style="padding:4px 8px;border:.5pt solid #000;vertical-align:top">${itemsoal.itemsoal.materi}</td>`;
                                html+=`<td style="padding:4px 8px;border:.5pt solid #000;vertical-align:top">${itemsoal.itemsoal.levelkognitif}</td>`;
                                html+=`<td style="padding:4px 8px;border:.5pt solid #000;vertical-align:top">${itemsoal.itemsoal.indikatorsoal}</td>`;
                                
                                if(itemsoal.bentuksoal == 'Menjodohkan'){
                                    html+=`<td style="padding:4px 8px;border:.5pt solid #000;vertical-align:top">${itemsoal.nobybentuk} - ${(parseInt(itemsoal.nobybentuk) + itemsoal.banyakjodoh - 1)}</td>`;
                                }else{
                                    html+=`<td style="padding:4px 8px;border:.5pt solid #000;vertical-align:top">${itemsoal.nobybentuk}</td>`;
                                }
                                
                                html+=`<td style="padding:4px 8px;border:.5pt solid #000;vertical-align:top">${itemsoal.bentuksoal}</td>`;
                                if(itemsoal.bentuksoal == 'Pilihan Ganda'){
                                    html+=`<td style="padding:4px 8px;border:.5pt solid #000;;vertical-align:top;font-size:8px">${itemsoal.itemsoal.kuncijawaban}</td>`;
                                }else if(itemsoal.bentuksoal == 'PG Kompleks'){
                                    let arayPG = JSON.parse(itemsoal.itemsoal.kuncijawaban);
                                    html+=`<td style="padding:4px 8px;border:.5pt solid #000;vertical-align:top;">${arayPG.join('<br>')}</td>`;
                                }else if(itemsoal.bentuksoal == 'BenarSalah'){
                                    let arayPG = itemsoal.itemsoal.kuncijawaban=="1"?"Benar":"Salah";
                                    html+=`<td style="padding:4px 8px;border:.5pt solid #000;vertical-align:top;">${arayPG}</td>`;
                                }else{
                                    html+=`<td style="padding:4px 8px;border:.5pt solid #000;vertical-align:top;">${itemsoal.itemsoal.penskoran}</td>`;
                                }
                            }else{
                                let c = n.objekproperti;
                                
                                for(let i = 0 ; i < n.totalsoalkdcp ; i++){
                                    if(i == 0){
                                        html+=`<td style="padding:4px 8px;border:.5pt solid #000;vertical-align:top" rowspan="${n.totalsoalkdcp}">${c.kd3}. ${c.indikatorkd3}</td>`;
                                    }
                                    let itemsoal = n.arraysoal[i];
                                
                                    html+=`<td style="padding:4px 8px;border:.5pt solid #000;vertical-align:top">${itemsoal.itemsoal.materi}</td>`;
                                        html+=`<td style="padding:4px 8px;border:.5pt solid #000;vertical-align:top">${itemsoal.itemsoal.levelkognitif}</td>`;
                                        html+=`<td style="padding:4px 8px;border:.5pt solid #000;vertical-align:top">${itemsoal.itemsoal.indikatorsoal}</td>`;
                                        if(itemsoal.bentuksoal == 'Menjodohkan'){
        
                                            html+=`<td style="padding:4px 8px;border:.5pt solid #000;vertical-align:top">${itemsoal.nobybentuk} - ${(parseInt(itemsoal.nobybentuk) + itemsoal.banyakjodoh - 1)}</td>`;
                                        }else{
                                            html+=`<td style="padding:4px 8px;border:.5pt solid #000;vertical-align:top">${itemsoal.nobybentuk}</td>`;
        
                                        }
                                        html+=`<td style="padding:4px 8px;border:.5pt solid #000;vertical-align:top">${itemsoal.bentuksoal}</td>`;
                                        // html+=`<td style="padding:4px 8px;border:.5pt solid #000;vertical-align:top;">${itemsoal.itemsoal.ilustrasi == ''?'':itemsoal.itemsoal.ilustrasi+'<br>'}${itemsoal.itemsoal.pertanyaan}</td>`;
                                        if(itemsoal.bentuksoal == 'Pilihan Ganda'){
                                            html+=`<td style="padding:4px 8px;border:.5pt solid #000;;vertical-align:top;font-size:8px">${itemsoal.itemsoal.kuncijawaban}</td>`;
                                        }else if(itemsoal.bentuksoal == 'PG Kompleks'){
                                            let arayPG = JSON.parse(itemsoal.itemsoal.kuncijawaban);
                                            html+=`<td style="padding:4px 8px;border:.5pt solid #000;vertical-align:top;">${arayPG.join('<br>')}</td>`;
                                        }else if(itemsoal.bentuksoal == 'BenarSalah'){
                                            let arayPG = itemsoal.itemsoal.kuncijawaban=="1"?"Benar":"Salah";
                                            html+=`<td style="padding:4px 8px;border:.5pt solid #000;vertical-align:top;">${arayPG}</td>`;
                                        }else{
                                            html+=`<td style="padding:4px 8px;border:.5pt solid #000;vertical-align:top;">${itemsoal.itemsoal.penskoran}</td>`;
                                        }
                                        
                                    if(i < n.totalsoalkdcp -1){
                                        html+=`</tr><tr>`;
                                    }
                                }
                                // html+=`</tr>`;
                            }
                            html+=`</tr>`;
                        })
                    }
                }
            html+=`</tbody>`;
        html+=`</table>`;

        return html;
}
const tabelkisikisidansoal = (datakonfigurasi,datasoal)=>{
    let headerTitle = [];
    let headerKey = [];
    let mode = 'kurmer'
    let html = "";
    
    if(datakonfigurasi.kurikulum == 'kurmer'){
        headerTitle = ['Capaian Pembelajaran','Tujuan Pembelajaran','Materi Pokok','Level Kognitif','Indikator Soal','No. Soal','Bentuk Soal'];
        headerKey = ['tp','atp','materi','levelkognitif','indikatorsoal','nobybentuk','bentuksoalspesifik',];
    }else{
        if(datakonfigurasi.mapel.indexOf('Tema ')>-1||datakonfigurasi.mapel.indexOf('TEMA ')>-1){
            mode = 'tema';
            headerTitle = ['No','Mata Pelajaran','Kompetensi Dasar','Lingkup Materi','Materi Pokok','Level Kognitif','Indikator Soal','Bentuk Soal','No. Soal'];
            headerKey = ['no','tekskodemapel','tekskd','ruanglingkup','materi','levelkognitif','indikatorsoal','bentuksoalspesifik','nobybentuk'];
        }else{
            mode = 'kurtilas';
            headerTitle = ['Kompetensi Dasar','Lingkup Materi','Materi Pokok','Level Kognitif','Indikator Soal','Bentuk Soal','No. Soal'];
            headerKey = ['tekskd','ruanglingkup','materi','levelkognitif','indikatorsoal','bentuksoalspesifik','nobybentuk'];
        
            // headerTitle = ['Kompetensi Dasar','Lingkup Materi','Materi Pokok','Level Kognitif','Indikator Soal','Bentuk Soal','No. Soal'];
            // headerKey = ['tekskd','levelkognitif','indikatorsoal','bentuksoalspesifik','nobybentuk'];

        }
        
    }
        html+=`<table style="width:100%;font-size:12px;margin-left:auto;margin-right:auto;border-collapse:collapse;border-spacing:0">`;
        html+=`<thead><tr style="background-color:#ddd">`;
        headerTitle.forEach(n=>{
            html+=`<th style="text-align:center;vertical-align:middle;margin-top:0;border:.5pt solid #000;padding:4px 8px">${n}</th>`
        });
        html+=`</tr></thead>`;
            html+=`<tbody>`;
                let onlyHasSoal = datasoal.filter(s=> s.hassoal);
                onlyHasSoal.forEach((n,indeksoal)=>{
                    html+=`<tr>`;
                        //datakisikisi
                        headerKey.forEach(m=>{
                            html+=`<td style="padding:4px 8px;border:.5pt solid #000;vertical-align:top">`;
                            if(m=='no'){
                                html+=indeksoal+1;
                            }else if(m=='nobybentuk'){
                                html+=n.nobybentuk;
                            }else{
                                html+=n.itemsoal[m];
                            }

                            html+=`</td>`;
                        })
                        //previewosoal
                        html+=`</tr><tr>`
                        html+=`<td style="padding:4px 8px;border:.5pt solid #000;vertical-align:top" colspan="${headerKey.length}">`;
                            html+=previewBentukSoal(n.itemsoal,false);
                            html+=previewKunciJawaban(n.itemsoal,false);
                        html+=`</td>`;
                    html+=`</tr>`;
                })
            html+=`</tbody>`;
        html+=`</table>`;
    return html;
}
const htmlkisikisi = (identitas,datasoal,withsoal=false)=>{
    let html = '';
    html+=`<div id="print-area-modal">`;
        html+=titlekisikisi(identitas);
        html+=`<div class="table-responsive">`;
            html+=tabelidentitaskisi(identitas);
            if(withsoal){
                html+=tabelkisikisidansoal(identitas,datasoal)

            }else{
                html+=tabelkisikisi(identitas,datasoal)
            }
        html+=`</div>`;
    html+='</div>';

    
    html+=`<div class="fixed-bottom text-center mb-3">`;
        html +=`<button id="btncetaknaskah" class="btn btn-sm border-bottom border-5 border-primary border-top-0 border-start-0 border-end-0 neon-lite-top rounded-pill rounded py-0" title="Cetak"><i class="bi-printer"></i></button>`;
        html +=`<button id="btncetakword" class="btn btn-sm border-bottom border-5 border-primary border-top-0 border-start-0 border-end-0 neon-lite-top rounded-pill rounded py-0" title="Simpan ke Ms. Word"><i class="bi-file-word"></i></button>`
        html +=`<button id="btncetakpdf" class="btn btn-sm border-bottom border-5 border-primary border-top-0 border-start-0 border-end-0 neon-lite-top rounded-pill rounded py-0" title="Simpan ke pdf"><i class="bi-file-pdf"></i></button>`
    html+=`</div>`;
    return html;
}
const htmlkisikisiModal1 = (identitas,datasoal,withsoal=false)=>{
    let html = '';
    html+=`<div id="print-area-modal">`;
        html+=titlekisikisi(identitas);
        html+=`<div class="table-responsive">`;
            html+=tabelidentitaskisi(identitas);
            if(withsoal){
                html+=tabelkisikisidansoal(identitas,datasoal)

            }else{
                html+=tabelkisikisi(identitas,datasoal)
            }
        html+=`</div>`;
    html+='</div>';

    
    html+=`<div class="fixed-bottom text-center mb-3">`;
    html +=`<button id="btnback" class="btn btn-sm border-bottom border-5 border-primary border-top-0 border-start-0 border-end-0 neon-lite-top rounded-pill rounded py-0" title="Kembali"><i class="bi-arrow-return-left"></i></button>`;
        html +=`<button id="btncetaknaskah" class="btn btn-sm border-bottom border-5 border-primary border-top-0 border-start-0 border-end-0 neon-lite-top rounded-pill rounded py-0" title="Cetak"><i class="bi-printer"></i></button>`;
        html +=`<button id="btncetakword" class="btn btn-sm border-bottom border-5 border-primary border-top-0 border-start-0 border-end-0 neon-lite-top rounded-pill rounded py-0" title="Simpan ke Ms. Word"><i class="bi-file-word"></i></button>`
        html +=`<button id="btncetakpdf" class="btn btn-sm border-bottom border-5 border-primary border-top-0 border-start-0 border-end-0 neon-lite-top rounded-pill rounded py-0" title="Simpan ke pdf"><i class="bi-file-pdf"></i></button>`
    html+=`</div>`;
    return html;
}
const tabelkuncijawaban = (datasoal)=>{
    let html="";
    let onlyhassoal = datasoal.filter(s=> s.hassoal);
    let bentuksoalUniq = [... new Set(onlyhassoal.map(n=> n.bentuksoal))];
    bentuksoalUniq.forEach(n=>{
        let header = "";
        let konten = "";
        let tabel = `<table class="table my-2 table-sm table-bordered font12">`;
        let itemsoal = onlyhassoal.filter(s=> s.bentuksoal==n);
        konten=`<tbody>`;
        header=`<thead>`;
        if(n=='Pilihan Ganda'){
            header+=`<tr><th class="text-bg-secondary text-center text-uppercase" colspan="3">${n}</th></tr>`;
            header+=`<tr><th class="text-bg-secondary text-center" style="width:50px">No Soal</th><th class="text-bg-secondary text-center" style="width:50px">Kunci Jawaban</th><th class="text-bg-secondary text-center align-middle">Penskoran</th></tr>`;
            
            itemsoal.forEach((soal)=>{
                konten+=`<tr>`;
                    konten+=`<td class="text-center">${soal.nobybentuk}</td>`;
                    konten+=`<td class="text-center">${soal.itemsoal.kuncijawaban}</td>`;
                    konten+=`<td>${soal.itemsoal.penskoran}</td>`;
                konten+=`</tr>`;
            })
        }else if(n=='Benar Salah'|| n=='BenarSalah'){
            header+=`<tr><th class="text-bg-secondary text-center text-uppercase" colspan="2">${n}</th></tr>`;
            header+=`<tr><th class="text-bg-secondary text-center" style="width:50px">No Soal</th><th class="text-bg-secondary text-center align-middle">Kunci Jawaban dan Penskoran</th></tr>`
        
            itemsoal.forEach((soal)=>{
                konten+=`<tr>`;
                    konten+=`<td class="text-center">${soal.nobybentuk}</td><td>`;
                    konten+=soal.itemsoal.kuncijawaban==1?'Benar':'Salah';
                    konten+=`<hr/>`
                    konten+=`${soal.itemsoal.penskoran}</td>`;
                konten+=`</tr>`;
            })

        }else{
            header+=`<tr><th class="text-bg-secondary text-center text-uppercase" colspan="2">${n}</th></tr>`;
            header+=`<tr><th class="text-bg-secondary text-center" style="width:50px">No Soal</th><th class="text-bg-secondary text-center align-middle">Kunci Jawaban dan Penskoran</th></tr>`
        
            itemsoal.forEach((soal)=>{
                konten+=`<tr>`;
                    konten+=`<td class="text-center">${soal.nobybentuk}</td>`;
                    konten+=`<td>${soal.itemsoal.penskoran}</td>`;
                konten+=`</tr>`;
            })

        }
        header+=`</thead>`;
        konten+=`</tbody>`;

        tabel+=header;
        tabel+=konten;
        tabel+=`</table>`;

        html += tabel;
    })
    return html;
}
const htmlkuncijawaban = (identitas,datasoal)=>{
    let html = '';
    html+=`<div id="print-area-modal">`;
        html+=titlekuncijawaban(identitas);
        html+=`<div class="table-responsive">`;
            html+=tabelidentitaskisi(identitas);
            html+=tabelkuncijawaban(datasoal)
            
        html+=`</div>`;
    html+='</div>';

    
    html+=`<div class="fixed-bottom text-center mb-3">`;
        html +=`<button id="btncetaknaskah" class="btn btn-sm border-bottom border-5 border-primary border-top-0 border-start-0 border-end-0 neon-lite-top rounded-pill rounded py-0" title="Cetak"><i class="bi-printer"></i></button>`;
        html +=`<button id="btncetakword" class="btn btn-sm border-bottom border-5 border-primary border-top-0 border-start-0 border-end-0 neon-lite-top rounded-pill rounded py-0" title="Simpan ke Ms. Word"><i class="bi-file-word"></i></button>`
        html +=`<button id="btncetakpdf" class="btn btn-sm border-bottom border-5 border-primary border-top-0 border-start-0 border-end-0 neon-lite-top rounded-pill rounded py-0" title="Simpan ke pdf"><i class="bi-file-pdf"></i></button>`
    html+=`</div>`;
    return html;

}
const htmlkuncijawabanModal1 = (identitas,datasoal)=>{
    let html = '';
    html+=`<div id="print-area-modal">`;
        html+=titlekuncijawaban(identitas);
        html+=`<div class="table-responsive">`;
            html+=tabelidentitaskisi(identitas);
            html+=tabelkuncijawaban(datasoal)
            
        html+=`</div>`;
    html+='</div>';

    
    html+=`<div class="fixed-bottom text-center mb-3">`;
        html +=`<button id="btnback" class="btn btn-sm border-bottom border-5 border-primary border-top-0 border-start-0 border-end-0 neon-lite-top rounded-pill rounded py-0" title="Kembali"><i class="bi-arrow-return-left"></i></button>`;
        html +=`<button id="btncetaknaskah" class="btn btn-sm border-bottom border-5 border-primary border-top-0 border-start-0 border-end-0 neon-lite-top rounded-pill rounded py-0" title="Cetak"><i class="bi-printer"></i></button>`;
        html +=`<button id="btncetakword" class="btn btn-sm border-bottom border-5 border-primary border-top-0 border-start-0 border-end-0 neon-lite-top rounded-pill rounded py-0" title="Simpan ke Ms. Word"><i class="bi-file-word"></i></button>`
        html +=`<button id="btncetakpdf" class="btn btn-sm border-bottom border-5 border-primary border-top-0 border-start-0 border-end-0 neon-lite-top rounded-pill rounded py-0" title="Simpan ke pdf"><i class="bi-file-pdf"></i></button>`
    html+=`</div>`;
    return html;

}
const templateNaskahOffline = (dom,datahtml)=>{
    let tbody = dom.querySelector('#tabelkontendesainnaskah_dariserver > tbody');//.firstElementChild();
    let tr = tbody.querySelectorAll('tr');
    
    for(let i = 0 ; i < tr.length ; i++){
        let sel = tr[i].cells;
        let ref = datahtml[i];
        
        if(sel.length>1){
            let datareplace = {};

            datareplace.setilustrasi = ref.ilustrasi;
            
            if(ref.hasOwnProperty('tampilanpg')){
                datareplace.tampilanpg   = ref.tampilanpg
            }else{
                datareplace.tampilanpg   = 'vertical';
            }

            datareplace.nosoal = ref.nosoal;
            if(ref.itemsoal){
                sel[1].innerHTML = replaceSoalToSel(ref.itemsoal,datareplace,false);
            }
            
        }
    }
    
    let html = document.createElement('div');
    html.appendChild(dom);
    // this.Modal1.widthOrientation(false);
    // this.Modal1.settingHeder('NASKAH OFFLINE '+datadesain.juduldesain.toUpperCase());
    // this.Modal1.showBodyHtml(viewArsipNaskah.viewModal(html.innerHTML));
    // this.Modal1.show();
    // this.printableModal(datadesain.juduldesain);
    return html.innerHTML;
}
const viewSoal = {
    'tabelNilai' : viewTabelNilai,
    'petunjukUmum':viewPetunjukUmum,
    'sebarankd':tabelSebaranKD,
    'judulNaskah':viewJudulNaskah,
    'isiNaskahSoal':viewIsiNaskahSoal,
    'htmlkisikisi':htmlkisikisi,
    'viewIdentitas':viewIdentitas,
    'viewIsiNaskahSoalDraft':viewIsiNaskahSoalDraft,
    'htmlkuncijawaban':htmlkuncijawaban,
    'htmlkisikisiModal1':htmlkisikisiModal1,
    'htmlkuncijawabanModal1':htmlkuncijawabanModal1,
    'templateNaskahOffline':templateNaskahOffline
}

export default viewSoal;