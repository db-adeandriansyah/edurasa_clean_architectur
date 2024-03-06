const kopSurat = (logo,identitas) =>{
    let html =`<div class="row border-bottom border-5 border-dark pb-2 my-3">
        <div class="col-2 d-flex justify-content-end align-items-center">
            <img src="${logo}" alt="logo kota Depok" width="100">
        </div>
        <div class="col-10 text-center tnr">
            <h3 class="mb-0 fw-bold">${identitas.judul}</h3>
            <h3 class="mb-0 fw-bold">${identitas.judul2}</h3>
            <h2 class="mb-0 tnr-bold fw-bolder text-uppercase" style="letter-spacing:5px">${identitas.namasekolah}</h2>
            <p class="my-0 fs-6">Alamat: ${identitas.alamat}</p>
            <p class="my-0 fs-6">${identitas.alamat2}
            </p>
        </div>
    </div>`;
    return html;
};
const KopSuratlogo = (logo,identitas,logosekolah)=>{
    let html=`<table  id="naskah_kop" style="border-collapse:collapse;border-spacing:0;width:100%;font-family:'timesNewRoman';margin-top:2rem">`;
    html+=`<tr>`;
        html+=`<td style="text-align:center;vertical-align:middle;border-top:0;border-left:0;border-right:0;border-bottom:10px double #000"><img src="${logo}" alt="logo kota depok" height="125" width="100"></td>`
        html+=`<td style="text-align:center;vertical-align:middle;width:80%;border-top:0;border-left:0;border-right:0;border-bottom:10px double #000">`;
        html+=`<h3 style="text-align:center;font-weight:bold;margin-bottom:0" contenteditable="true" spellcheck="false">${identitas.judul}</h3> 
        <h3 style="text-align:center;font-weight:bold;margin-bottom:0" contenteditable="true" spellcheck="false">${identitas.judul2}</h3> 
        <h2 style="text-align:center;font-weight:bold;margin-bottom:0;text-transform:uppercase;letter-spacing:5px" contenteditable="true" spellcheck="false">${identitas.namasekolah}</h2> 
        <p style="text-align:center;margin-bottom:0;font-size:12px" contenteditable="true" spellcheck="false">${identitas.alamat}</p> 
        <p style="text-align:center;margin-bottom:0;font-size:12px" contenteditable="true" spellcheck="false">${identitas.alamat2}</p>`
        html+=`</td>`;
        html+=`<td style="text-align:center;vertical-align:middle;border-bottom:10px double #000;border-top:0;border-left:0;border-right:0;"><img src="${logosekolah}" alt="logo kota depok" height="125" width="120"></td>`
    html+=`</tr>`;
    html+=`</table>`;
    return html;
}

const htmlKopNaskah = (logo,identitas,logosekolah)=>{
    let html=`<table  id="naskah_kop" style="border-collapse:collapse;border-spacing:0;width:100%;text-transform: uppercase;font-family:'timesNewRoman';margin-top:2rem">`;
    html+=`<tr>`;
        html+=`<td style="text-align:center;vertical-align:middle;border-top:0;border-left:0;border-right:0;border-bottom:10px double #000"><img src="${logo}" alt="logo kota depok" height="125" width="100"></td>`
        html+=`<td style="text-align:center;vertical-align:middle;width:80%;border-top:0;border-left:0;border-right:0;border-bottom:10px double #000">`;
        html+=`<h3 style="text-align:center;font-weight:bold;margin-bottom:0" contenteditable="true" spellcheck="false">${identitas.judul3}</h3> 
        <h4 style="text-align:center;font-weight:bold;margin-bottom:0;letter-spacing:5px" contenteditable="true" spellcheck="false">${identitas.namasekolah}</h4> 
        <h4 style="text-align:center;font-weight:bold;margin-bottom:0" contenteditable="true" spellcheck="false">${identitas.alamat3}</h4> 
        <h4 style="text-align:center;font-weight:bold;margin-bottom:0" contenteditable="true" spellcheck="false">${identitas.tapelsemester}</h4>`
        html+=`</td>`;
        html+=`<td style="text-align:center;vertical-align:middle;border-bottom:10px double #000;border-top:0;border-left:0;border-right:0;"><img src="${logosekolah}" alt="logo kota depok" height="125" width="120"></td>`
    html+=`</tr>`;
    html+=`</table>`;
    return html;
}
const kopsuratEdurasa={
    'versi1':kopSurat,
    'versi2':KopSuratlogo,
    'versi3':htmlKopNaskah,
}
export default kopsuratEdurasa;