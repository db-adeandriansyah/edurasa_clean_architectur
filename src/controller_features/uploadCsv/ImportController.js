// import { XLSX } from "../../entries/shared";
import * as XLSX from 'xlsx/xlsx.mjs';
// import {XLSX} from "../../entries/vendor"
export class ImportController{
    constructor(inputfile,tabelTarget,datakey){
        this.inputfile = inputfile; //dom
        this.tabelTarget=tabelTarget; //dom tabel body
        this.datakey = datakey; // arrayObject
    }
    listnerinput(){
        
        const ini = this;
        let tinputexcel = this.inputfile;
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
                            reader.onload = (e)=> {
                                
                                ini.prosesImportdataRaportManual(e.target.result);
                                
                            };
                            reader.readAsBinaryString(fileUpload.files[0]);
                        } else {
                            //For IE Browser.
                            reader.onload = (e)=> {
                                var data = "";
                                var bytes = new Uint8Array(e.target.result);
                                for (var i = 0; i < bytes.byteLength; i++) {
                                    data += String.fromCharCode(bytes[i]);
                                }
                                ini.prosesImportdataRaportManual(data);
                                
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
    }
    prosesImportdataRaportManual(data){
        var workbook = XLSX.read(data, {
            type: 'binary'
        });
    
        //Fetch the name of First Sheet.
        var firstSheet = workbook.SheetNames[0];
        let kol_count = this.datakey.length;
        //Read all rows from First Sheet into an JSON array.
        var excelRows = XLSX.utils.sheet_to_row_object_array(workbook.Sheets[firstSheet]);
        let body = this.tabelTarget;
        for(let i = 0 ; i < body.rows.length ; i++){
            // console.info(excelRows);
            let sels = body.rows[i].cells;
            let fill = Object.values(excelRows[i]);
            for(let j = 0 ; j < sels.length ; j++){
                let sel = sels[j];
                let hasElemen = sel.firstElementChild;
                if(hasElemen){
                    hasElemen.value = fill[j];
                }
            }
        }
    }

}