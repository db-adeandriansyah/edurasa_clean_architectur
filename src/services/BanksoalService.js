import ImageResizer from "../utilities/ImageResizer";

export default class BanksoalService{
    #db;
    constructor(repo){
        this.repo = repo;
        this.#db = {};
    }
    
    get data(){
        return this.#db;
    };

    isExist(key){
        return this.#db.hasOwnProperty(key);
    }
    async callPropertiMultiple(arrayTab){
        this.repo.callWithProses(); 

        const respon = await this.repo.callPropertiMultiple(arrayTab);
        respon.forEach(n=>{
            this.#db = Object.assign(this.#db, {[n.info.namaTab]:n.data,['blangko_'+n.info.namaTab]:n.info.objKosong});
        });
        
        this.repo.stopProgressBar();
    }
    async simpanItemSoal(body){
        this.repo.callWithProses();
        let n = await this.repo.simpanItemSoal(body,'create');
        
        this.#db = Object.assign(this.#db, {[n.info.namaTab]:n.data,['blangko_'+n.info.namaTab]:n.info.objKosong});
        this.repo.stopProgressBar();
    }
    async simpanItemSoalEdit(body){
        this.repo.callWithProses();
        let n = await this.repo.simpanItemSoal(body,'update');
        
        this.#db = Object.assign(this.#db, {[n.info.namaTab]:n.data,['blangko_'+n.info.namaTab]:n.info.objKosong});
        this.repo.stopProgressBar();
    }
    async convertSizeImageSoal(file){
        
        // let imgResize = new ImageResizer(150,Infinity,false);
        let imgResize = new ImageResizer(Infinity,Infinity,true);
        let src =  await imgResize.resizeImageToDataURLCallback(file);
        
        // return imgResize.resizeImageToDataURL(file, async (mimeType, dataURL)=>{ 
        //     console.log(dataURL);
        //     data =  await dataURL;
        //     return  dataURL;
            // let src = dataURL;//"https://lh3.googleusercontent.com/d/"+respon.data.idfile;
            let params = {
                action:'uploadFile',
                folder:'GAMBAR MENJODOHKAN',
                // subfolder:,
                // namafile:namafileinput.replace(/[^\w\s.-]/g, "_"),
                "namafile":'gambarmenjodohkan'+new Date().getTime()+'.png',
                "base64":src.replace(/^.*,/, ''),//.replace(/^.*,/, '');
                "mimeType":src.match(/^.*(?=;)/)[0],//dataURL.match(/^.*(?=;)/)[0],//
            }
            return params;
        // });
        // return data;
    }
    async uplaodedImageTextEditorFromFile(file){
        let param = await this.paramApiconvertSizeImage(file,Infinity,Infinity,true,'Gambar Soal','gambarsoal');
        return await this.simpanImage(param);
    }
    async paramApiconvertSizeImage(file,maxWidth,maxHeight,keepOriginalSize,targetFolder,namaFile){
        
        // let imgResize = new ImageResizer(150,Infinity,false);
        let imgResize = new ImageResizer(maxWidth,maxHeight,keepOriginalSize);
        let src =  await imgResize.resizeImageToDataURLCallback(file);
        
        // return imgResize.resizeImageToDataURL(file, async (mimeType, dataURL)=>{ 
        //     console.log(dataURL);
        //     data =  await dataURL;
        //     return  dataURL;
            // let src = dataURL;//"https://lh3.googleusercontent.com/d/"+respon.data.idfile;
            let params = {
                action:'uploadFile',
                folder:targetFolder,
                // subfolder:,
                // namafile:namafileinput.replace(/[^\w\s.-]/g, "_"),
                "namafile":namaFile+_+new Date().getTime()+'.png',
                "base64":src.replace(/^.*,/, ''),//.replace(/^.*,/, '');
                "mimeType":src.match(/^.*(?=;)/)[0],//dataURL.match(/^.*(?=;)/)[0],//
            }
            return params;
        // });
        // return data;
    }
    async simpanImage(par){
        this.repo.callWithProses();
        const res = await this.repo.saveImage(par);
        this.repo.stopProgressBar();
        return res;
    }

    /**
     * 
     * @param {*} par // argumen untuk diisi di spreadsheet
     * {data}
     * @param {*} media //argumen yang berisi html dan jenjang
     * example:
     * data ={
     *  html:string,
     * jenjang:number
     * }
     * @param {*} obchange // argumen array-object yang digunakan untuk mengubah/replace
     * {'html_identitas':'fileUrl', 'html_soal':'idfile'}
     * 
     */
    async simpanDesanNaskah(par,media){
        this.repo.callWithProses();
        let n = await this.repo.simpanDesanNaskah(par,media)
        console.log('test simpanDesainNaskah',n);
        this.#db = Object.assign(this.#db, {[n.info.namaTab]:n.data,['blangko_'+n.info.namaTab]:n.info.objKosong});
        this.repo.stopProgressBar();
    }
    async simpanDataMateriKbm(par,media){
        this.repo.callWithProses();
        let n = await this.repo.simpanDataMateriKbm(par,media)
        console.log('test simpanDesainMateriKBM',n);
        this.#db = Object.assign(this.#db, {[n.info.namaTab]:n.data,['blangko_'+n.info.namaTab]:n.info.objKosong});
        this.repo.stopProgressBar();
    }
    async showTextHTML(idmateri){
        this.repo.callWithProses();
        let paramUI = '?action=readTxt&idmateri='+idmateri;
        let n = await this.repo.showTextHTML(paramUI);
        this.repo.stopProgressBar();
        return n
    }
    async hapusSimpananDesainNaskah(param){
        this.repo.callWithProses();
        let n = await this.repo.hapusSimpananDesainNaskah(param);
        console.log('hapus',n);
        this.#db = Object.assign(this.#db, {[n.info.namaTab]:n.data,['blangko_'+n.info.namaTab]:n.info.objKosong});
        this.repo.stopProgressBar();
    }
    async simpanEditMateriKbm(param){
        this.repo.callWithProses();
        let n = await this.repo.simpanEditMateriKbm(param);
        
        this.#db = Object.assign(this.#db, {[n.info.namaTab]:n.data,['blangko_'+n.info.namaTab]:n.info.objKosong});
        this.repo.stopProgressBar();
    }
    
}