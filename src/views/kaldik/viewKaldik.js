import inputsElements from "../components/input-elements";
import rowCols from "../components/row-cols";

const nameToHex=(name)=> {
    const tempElement = document.createElement("div");
    tempElement.style.color = name;
    document.body.appendChild(tempElement);
    const computedColor = getComputedStyle(tempElement).color;
    document.body.removeChild(tempElement);

    // Mengambil nilai HEX dari nilai RGB
    const rgbMatch = computedColor.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
    if (rgbMatch) {
        const hex = "#" + parseInt(rgbMatch[1]).toString(16).padStart(2, "0") +
                          parseInt(rgbMatch[2]).toString(16).padStart(2, "0") +
                          parseInt(rgbMatch[3]).toString(16).padStart(2, "0");
        return hex;
    }

    // Mengembalikan nilai warna konvensional jika tidak dapat dikonversi
    return name;
}
export const contenModalTambahKaldik=(bulan='bulan',tahun='tahun')=>{
    

    let html="";
    html+=rowCols.rows('mt-3',
            rowCols.cols('col-md-6', inputsElements.floatingTextarea('id_keterangan','Keterangan Kalender','','data-api="keterangan"') )
            +rowCols.cols('col-md-3', inputsElements.floatingDate('id_start','Mulai Tanggal','','data-api="start_tgl"'))
            +rowCols.cols('col-md-3', inputsElements.floatingDate('id_end','Sampai Tanggal','','data-api="end_tgl"'))
            
            
        )
    html+=rowCols.rows('mb-2',
            rowCols.cols('col-md-4',
            `<div class="rounded border container">
                <div class="form-check form-check-inline">
                    <input class="form-check-input" type="radio" name="liburtidak" value="true" data-api="libur"  id="tgllibur">
                    <label class="form-check-label" for="tgllibur">Libur</label>
                </div>
                <div class="form-check form-check-inline">
                    <input class="form-check-input" type="radio" name="liburtidak" value="false" data-api="libur" id="tglliburtidak">
                    <label class="form-check-label" for="tglliburtidak">Tidak Libur</label>
                    <div class="ms-1 shadow-lg rounded ps-1 pt-1 font10">
                        <div class="form-check form-check-inline">
                            <input class="form-check-input" type="checkbox" name="tidaklibur" value="true" data-api="he" id="heId" disabled>
                            <label class="form-check-label" for="heId">Hari Efektif</label>
                        </div>
                        <div class="form-check form-check-inline">
                            <input class="form-check-input" type="checkbox" name="tidaklibur" value="true" data-api="heb" id="hebId" disabled>
                            <label class="form-check-label" for="hebId">Hari Efektif Belajar</label>
                        </div>
                    </div>
                </div>
            </div> `
                    
            )
            +
            rowCols.cols('col-md-3',`<div class="rounded border container d-flex flex-column align-items-center"><h5 class="text-center font14">Pilih Warna</h5>
            <input type="color" cl3ss="form-control form-control-color d-inline-block ms-1" id="exampleColorInput" value="#ffffff" title="Choose your color" data-api="background-color">
            <label for="exampleColorInput" class="form-label font12">Warna Background</label>
            <input type="color" class="form-control form-control-color d-inline-block ms-1" id="exampleColorInput2" value="" title="Choose your color" data-api="color">
            <label for="exampleColorInput2" class="form-label font12">Warna Huruf</label>
                <button class="btn btn-sm bg-info-subtle" id="btn_hapus_warna"><i class="bi bi-trash"></i> Hapus Warna</button></div> `
                )
            +rowCols.cols('col-md-5',
                cardKalender(bulan,tahun,`<div id="previewkalendereditable"></div>`,{card:'mb-0',header:'bg-info-subtle justify-content-between title-header'})
            )
        );
    return html;
}

export const cardKalender=(bulan="title",tahun="tahun",slot="",atribut=null)=>{
    let at = atribut?Object.assign({},{card:'',header:'justify-content-between',body:'',bodyAttr:''},atribut):{card:'',header:'justify-content-between',body:'',bodyAttr:''};
    return `
<div class="card border-0 mt-1 ${at.card}">
    <div class="card-header d-flex  ${at.header}"><span>${bulan}</span> <span>${tahun}</span></div>
    <div ${at.bodyAttr} class="card-body ${at.body} px-1 pt-0">
        ${slot}
    </div>
</div>`}

export const wrapperKalender = (slot)=>{
    return rowCols.rows('mt-5',slot);
}
export const wrapperCardKalender = (slot)=>{
    return rowCols.cols('col-4 col-md-4 px-1',slot);
}