export class EdaToExcel{
    constructor(element,option){
        this.default = {exclude: ".w3-table-all",
                exclude_judul: true,
                exclude_ttd: true,
                name: "Table2Excel",
                sheetName: "script_adeAndriansyah",
                filename: "table2excel",
                fileext: ".xls",
                exclude_img: true,
                exclude_links: true,
                exclude_inputs: true,
                preserveColors: true,
                jumlahheader: 1,
                barisatas: 4}
        this.setting = Object.assign({},this.default,option);
        this.element = element;
        this.top = "Mime-Version: 1.0\nContent-Base: " + location.href + "\nContent-Type: Multipart/related; boundary=\"NEXT.ITEM-BOUNDARY\";type=\"text/html\"\n\n--NEXT.ITEM-BOUNDARY\nContent-Type: text/html; charset=\"utf-8\"\nContent-Location: " + location.href + "\n\n",
        // var utf8Heading = "<meta http-equiv=\"content-type\" content=\"application/vnd.ms-excel; charset=UTF-8\">";
        // /<meta http-equiv="content-type" content="application/vnd.ms-excel; charset=UTF-8">
        this.template = {
                head: `<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40"><meta http-equiv="content-type" content="application/vnd.ms-excel; charset=UTF-8"><head><!--[if gte mso 9]><xml><x:ExcelWorkbook><x:ExcelWorksheets>`,
                sheet: {
                    head: "<x:ExcelWorksheet><x:Name>",
                    tail: "</x:Name><x:WorksheetOptions><x:DisplayGridlines/></x:WorksheetOptions></x:ExcelWorksheet>"
                },
                mid: "</x:ExcelWorksheets></x:ExcelWorkbook></xml><![endif]--></head><body>",
                table: {
                    head: "<table>",
                    tail: "</table>"
                },
                foot: "</body></html>"
            },
        this.init();
    }
    // jika ingin membuat tabel yang telah diinisiasi ke dalam beberapa sheet, maka kita tangkap sebagai array;
    // e.templateRows = [];
    cekDataDom(){
        let e = this;
        let element = e.element;
        let compStyle=null;
        let tempStyle = "";
        let tempRow = "";
        for(let i = 0 ; i < element.rows.length ; i++){
            let rows = element.rows[i];
            let cekImg = rows.querySelectorAll('img');
            let h,s="";
            if(cekImg.length > 0){
                h = cekImg[0].offsetHeight;// + 50;
                //console.log(cekImg[0].offsetHeight)
                s = ` style="height:${h}px;line-hieght:${h}px;"`;
            }
            tempRow +=`<tr${s}>`;
            
            for(let j = 0 ; j <rows.cells.length ; j++){
                let cells = rows.cells[j];
                compStyle = getComputedStyle(cells);
                tempStyle ="";
                tempStyle+= `mso-number-format:'\@';`
                tempStyle+= `text-align:${compStyle.textAlign};`
                tempStyle+= `vertical-align:${compStyle.verticalAlign};`
                // tempStyle+= `word-wrap:normal;`;
                tempStyle+= `border:.5pt solid #000;`;
                if(e.setting.preserveColors){
                    tempStyle+= `background-color:${compStyle.backgroundColor};`
                    tempStyle+= `color:${compStyle.color};`
                }
                let additionalStyles = "";
                additionalStyles += cells.hasAttribute('colspan')?` colspan="${cells.getAttribute('colspan')}"`:"";
                additionalStyles += cells.hasAttribute('rowspan')?` rowspan="${cells.getAttribute('rowspan')}"`:"";
                let gmbr = cells.querySelector('img');
                if(cells.querySelector('img')!==null){
                    tempStyle+=`line-height:${gmbr.offsetHeight};`;
                }
                //keberadaan attribute:
                let finalstyle = ` style="${tempStyle}" `;
                tempRow +=`<td${finalstyle}${additionalStyles}>`;

                // let isi = cells.innerHTML.replace(/(<br>)/g,"\n\n");
                let isi ="";
                if(cells.hasChildNodes()){
                    let typeKontent = cells.firstChild.nodeName;
                    if(typeKontent=="INPUT"){
                        isi = cells.firstChild.value;
                    }else{
                        isi = cells.innerHTML.replace(/(<br>)/g,"\n\n");;
                    }
                }else{
                    isi = cells.innerHTML.replace(/(<br>)/g,"\r\n");;
                }

                tempRow +=isi;//`${cells.innerHTML}`;
                tempRow+=`</td>`;

            }
            tempRow +=`</tr>`;
        }
        return tempRow;
    }
    kayaWord(){
        let does = this.element;
        let markup = this.element;//does.cloneNode(true);
        let images = Array();
        let img = markup.querySelectorAll('img');
        for (let i = 0; i < img.length; i++) {
            let lebargambar = img[i].hasAttribute('style')?parseInt(img[i].style.width):img[i].width;
          // console.log(img[i].offsetWidth,img[i].width,lebargambar);
            let w = Math.min(lebargambar, 624);
            let h = img[i].height * (w / img[i].width);
            
            let canvas = document.createElement("CANVAS");
            canvas.width = w;
            canvas.height = h;
            let cekimg = new Image();
            let cekuri='';
            cekimg.crossOrigin="anonymous";
            cekimg.onload = function(){
                // Create canvas for converting image to data URL
                let canvas = document.createElement("CANVAS");
                canvas.width = w;
                canvas.height = h;
                
                let context = canvas.getContext('2d');

                cekimg.tainted=true;
                context.drawImage(img[i], 0, 0, w, h);
                
                    let ar = {};
                    if(cekimg.tainted){
                        ar.src = cekimg.src;
                        ar.objekok = cekimg.uri;
                      // console.log(cekimg.uri,cekimg.src);
                    }else{
                        ar.src = cekimg.src
                        var uri = cekimg.uri;
                        ar.objekok = uri;
                      // console.log(cekimg.uri,cekimg.src)
                    }
                    
                
                var i= context.getImageData(1,1,1,1);
            // if we get here, CORS is OK so set tainted=false
            
            // imgd.uri = tmpCanvas.toDataURL("image/png");//.replace("image/png", "image/octet-stream");;
                cekimg.uri = canvas.toDataURL("image/png");//.replace("image/png", "image/octet-stream");;
                cekimg.tainted=false;
                let suri = canvas.toDataURL("image/png");
              // console.log(suri)
                cekuri=ar;
                cekimg.tainted=false;
            }
            if(cekimg.complete){
              // console.log(cekimg)
                return cekimg;
            }
            // console.log(cekuri)
            img[i].setAttribute('src',img[i].src);
            img[i].setAttribute('width',w);
            img[i].setAttribute('height',h);
            
            // Save encoded image to array
            // images[i] = {
            //     type: uri.substring(uri.indexOf(":") + 1, uri.indexOf(";")),
            //     encoding: uri.substring(uri.indexOf(";") + 1, uri.indexOf(",")),
            //     // location: $(img[i]).attr("src"),
            //     location:img[i].getAttribute("src"),
            //     data: uri.substring(uri.indexOf(",") + 1)
            // };
            // // Draw image to canvas
            // let context = canvas.getContext('2d');
            // context.drawImage(img[i], 0, 0, w, h);

            //Get data URL encoding of image
            let uri = canvas.toDataURL("image/png");
            img[i].setAttribute('src',img[i].src);
            img[i].setAttribute('width',w);
            img[i].setAttribute('height',h);
            images[i] = {
                type: uri.substring(uri.indexOf(":") + 1, uri.indexOf(";")),
                encoding: uri.substring(uri.indexOf(";") + 1, uri.indexOf(",")),
                location:img[i].getAttribute("src"),
                data: uri.substring(uri.indexOf(",") + 1)
            };
        }

        // Prepare bottom of mhtml file with image data
        let mhtmlBottom = "\n";
        for (let i = 0; i < images.length; i++) {
            mhtmlBottom += "--NEXT.ITEM-BOUNDARY\n";
            mhtmlBottom += "Content-Location: " + images[i].location + "\n";
            mhtmlBottom += "Content-Type: " + images[i].type + "\n";
            mhtmlBottom += "Content-Transfer-Encoding: " + images[i].encoding + "\n\n";
            mhtmlBottom += images[i].data + "\n\n";
        }
        mhtmlBottom += "--NEXT.ITEM-BOUNDARY--";
        return mhtmlBottom;
    }
    init(){
        let format = this.top;
        format += this.template.head;
        let html = this.cekDataDom();
        // format +=this.template.sheet.head + this.default.sheetName + this.template.sheet.tail;
        format +=this.template.sheet.head + this.setting.sheetName + this.template.sheet.tail;
        format+=this.template.mid;
        format +=this.template.table.head + html + this.template.table.tail;
        const tt = this.kayaWord();
        format += tt;
        
        let link, a;
        // let blob = new Blob([format], { type: "application/vnd.ms-excel" });
        let blob = new Blob([format], { type: "application/octet-stream" });
                window.URL = window.URL || window.webkitURL;
                link = window.URL.createObjectURL(blob);
                // link = `data:application/vnd.ms-excel, ${encodeURIComponent(format)}`;
                a = document.createElement("a");
                a.download = this.setting.filename+"."+this.setting.fileext;
                a.href = link;
                document.body.appendChild(a);
                a.click();
                document.body.removeChild(a);
    }
}
export const prosesImportdataRaportManual = (data, kondisi) =>{
    var workbook = XLSX.read(data, {
        type: 'binary'
    });

    //Fetch the name of First Sheet.
    let firstSheet = workbook.SheetNames[0];
    //void firstSheet not same as this name condition;
  // console.log(firstSheet,kondisi.namatab,(firstSheet !== kondisi.namatab))
    if(firstSheet !== kondisi.namatab){
        alert('File tidak cocok untuk mengimport tabel ini! Silakan Export halaman ini, save-as dalam xlsx, kemudian import kembali.');
        return;
    }
    //Read all rows from First Sheet into an JSON array.
    let excelRows = XLSX.utils.sheet_to_row_object_array(workbook.Sheets[firstSheet]);
    
    if((parseInt(kondisi.rowShould)-1)==0){
        const tabel = document.getElementById(firstSheet);
        const head = tabel.querySelector('thead');
        const body = tabel.querySelector('tbody');
        for(let i = 0 ; i < body.rows.length; i++){
            for(let k = 0 ; k < body.rows[i].cells.length ; k++){
                body.rows[i].cells[k].innerHTML = excelRows[i][head.rows[0].cells[k].innerHTML]?excelRows[i][head.rows[0].cells[k].innerHTML]:'';
            }
        }
    }else{
        const tabel = document.getElementById(firstSheet);
        const head = tabel.querySelector('thead');
        const body = tabel.querySelector('tbody');
        for(let i = 0 ; i < body.rows.length; i++){
            let data = excelRows.filter(s => s.No == (i+1))[0];
            let keysFirst = Object.keys(excelRows[0]).filter(s => s.indexOf('_EMPTY')==-1)
            if(firstSheet == 'tabelrekapraport'){
                body.rows[i].cells[0].innerHTML = data.No;
                body.rows[i].cells[1].innerHTML = data['Nama Siswa'];
                body.rows[i].cells[2].innerHTML = data[keysFirst]?data[keysFirst]:'';
                for(let k = 3 ; k < 13 ; k++){
                    if(k==3){
                        body.rows[i].cells[k].innerHTML = data['__EMPTY']?data['__EMPTY']:'';
                    }else{
                        body.rows[i].cells[k].innerHTML = data['__EMPTY_'+(k-3)]?data['__EMPTY_'+(k-3)]:'';
                    }
                }
                body.rows[i].cells[13].innerHTML = data['Jumlah']?data['Jumlah']:'';
                body.rows[i].cells[14].innerHTML = data['Rerata']?data['Rerata']:'';
            }else{
                body.rows[i].cells[0].innerHTML = data.No;
                body.rows[i].cells[1].innerHTML = data['Nama Siswa'];
                body.rows[i].cells[2].innerHTML = data[keysFirst]?data[keysFirst]:'';
                for(let k = 3 ; k < body.rows[i].cells.length ; k++){
                    if(k==3){
                        body.rows[i].cells[k].innerHTML = data['__EMPTY']?data['__EMPTY']:'';
                    }else{
                        body.rows[i].cells[k].innerHTML = data['__EMPTY_'+(k-3)]?data['__EMPTY_'+(k-3)]:'';
                    }
                }
            }
        }
    }
}
export const importtabelmanual = (kondisi) => {
    let tinputexcel = document.getElementById("fileImportExcel");
    tinputexcel.value = "";
    tinputexcel.onchange = () => {
        var fileUpload = tinputexcel;//document.getElementById("fileUpload");
        
        //Validate whether File is valid Excel file.
        var regex = /^([a-zA-Z0-9\s_\\.\-:])+(.xls|.xlsx)$/;
        if (regex.test(fileUpload.value)) {
            if (typeof (FileReader) != "undefined") {
                var reader = new FileReader();

                //For Browsers other than IE.
                if (reader.readAsBinaryString) {
                    reader.onload = function (e) {
                        
                        prosesImportdataRaportManual(e.target.result, kondisi);
                    };
                    reader.readAsBinaryString(fileUpload.files[0]);
                } else {
                    //For IE Browser.
                    reader.onload = function (e) {
                        var data = "";
                        var bytes = new Uint8Array(e.target.result);
                        for (var i = 0; i < bytes.byteLength; i++) {
                            data += String.fromCharCode(bytes[i]);
                        }
                        prosesImportdataRaportManual(data, kondisi);
                    };
                    reader.readAsArrayBuffer(fileUpload.files[0]);
                }
            } else {
                alert("Browsernya versi jadul. Ga support.... Ganti dengan Chrome yang terupdate ya");
            }
        } else {
            alert("Importnya file Excel ya ... bukan yang lain.");
        }
    }
    tinputexcel.click();
}
