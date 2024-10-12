export default class SkorSiswa{
    constructor(domljk,service,dbsoal){
        this.domljk = domljk;
        this.dbsoal = dbsoal;
        this.service =service;
        this._totalPg = 0;
        this._totalIsian = 0;
        this._start = new Date();
        this.result = [];
        this.jawaban = {}
        this.UrlImg = null;
    }
    /**
     * @returns HTMLCollections
     */
    get selSoalPG(){
        return this.domljk.querySelectorAll('[data-bentuksoal="Pilihan Ganda"]');
    }
    init(urlImg){
        this.UrlImg = urlImg;
        
        let elemenPg = this.domljk.querySelectorAll('.calc');
        let elemenDiv = this.domljk.querySelectorAll('[data-editor]')
        let elemenCamera = this.domljk.querySelectorAll('[data-inputnosoal]')
        let elemenPecahan = this.domljk.querySelectorAll('[data-inputpecahan]')
        let elemenAkar = this.domljk.querySelectorAll('[data-inputakar]')
        let elemenAkarkubik = this.domljk.querySelectorAll('[data-inputkubik]')
        this.calculate(elemenPg,'Pilihan Ganda','input')
        this.calculate(elemenCamera,'Isian','input')
        this.calculate(elemenDiv,'Isian','div')
        this.calculate(elemenPecahan,'Pecahan','div')
        this.calculate(elemenAkar,'Akar','div')
        this.calculate(elemenAkarkubik,'Kubik','div')
        return this;
    }
    calculate(elementsoal,tipe,tipedom){
        elementsoal.forEach(element => {
            if(tipedom == 'input'){
                
                if(element.type == 'radio'){
                    element.onchange = (e)=>{
                        if(element.checked){
                            let id = element.getAttribute('id');
                            let abjad = id.match(/(\D)/)[0];
                            let no = id.match(/(\d+)/)[0];
                            let ob = {
                                no: parseInt(no),
                                jawaban:abjad,
                                tipe:tipe,
                                isManual:false,

                            }
                            if(this.result.filter(s=> s.no == no).length==0){
                                this.result.push(ob);
                            }else{
                                this.result.splice(this.result.findIndex(n=>n.no == no),1,ob);
                            }
                            this.result.sort((a,b)=>a.no - b.no)
                        }
                    }
    
                }else if(element.type == 'file'){
                    element.onchange = ()=>{
                        
                        let files = element.files[0];
                        let q = element.getAttribute('data-targetinput');
                        let no = element.getAttribute('data-inputnosoal');
                        let target = document.querySelector(q)
                        if(files){
                            this.service.repo.uploadGambarAbsen(files,{folder:'Media Siswa',subfolder:'img ',namafile:'_'+new Date().getTime()},async(idfile)=>{

                                let div = document.createElement('div');
                                div.setAttribute('class','embed-responsive embed-responsive-4by3');
                                let ifram = document.createElement('iframe');
                                ifram.setAttribute('class','embed-responsive-item');
                                ifram.src = 'https://drive.google.com/file/d/'+idfile+'/preview';
                                div.appendChild(ifram);
                                target.appendChild(div);
                                let tipesoal = target.getAttribute('data-bentuksoal');
                                let ob = {
                                    no: parseInt(no),
                                    jawaban:target.innerHTML,
                                    tipe:tipesoal,
                                    isManual:true,
    
                                }
                                if(this.result.filter(s=> s.no == no).length==0){
                                    this.result.push(ob);
                                }else{
                                    this.result.splice(this.result.findIndex(n=>n.no == no),1,ob);
                                }
                                this.result.sort((a,b)=>a.no - b.no);
                                /**
                                 * Time_Stamp	
                                 * id	
                                 * name	kelas	kehadiran	
                                 * fileContent	resume	action	idbaris	tokensiswa
                                 */
                                
                            },{width:300,
                                length:Infinity,
                                keepSize:false,})
                        }

                    }
                }

            }else{
                if(tipe == 'Isian'){
                    element.oninput = (e)=>{
                        let no = element.getAttribute('data-editor');
                        let bentuksoal = element.getAttribute('data-bentuksoal');
                        let ob = {
                            no: parseInt(no),
                            jawaban:e.target.innerHTML,
                            tipe:bentuksoal,
                            isManual:true
                        }
                        if(this.result.filter(s=> s.no == no).length==0){
                            this.result.push(ob);
                        }else{
                            this.result.splice(this.result.findIndex(n=>n.no == no),1,ob);
                        }
                        this.result.sort((a,b)=>a.no - b.no);
                        
                    }
                }else if(tipe=='Pecahan'){
                    element.onclick = () =>{
                        let prom = prompt('masukan angka pecahan, misal 1 per 2. Ketikkan 1/2 di sini:','1/2');
                        let q = element.getAttribute('data-targetinput');
                        let no= element.getAttribute('data-inputpecahan')
                        let target = document.querySelector(q);
                        let teks = prom;
                        let arr = teks.split('/');
                        if(arr.length == 2){
                            let img = new Image();
                            let sr = `https://chart.apis.google.com/chart?cht=tx&chl=%7B%5Cfrac%20%7B${encodeURIComponent(arr[0])}%7D%20%7B${encodeURIComponent(arr[1])}%7D%7D`;
                            // sr = new UrlImg(sr).convertUrlToLatexLatest()
                            img.src =  new this.UrlImg(sr).convertUrlToLatexLatest()
                            img.style.verticalAlign='middle';
                            img.alt = `pecahan ${arr[0]}/${arr[1]}`;   
                            target.appendChild(img);
                            let tipesoal = target.getAttribute('data-bentuksoal');
                                let ob = {
                                    no: parseInt(no),
                                    jawaban:target.innerHTML,
                                    tipe:tipesoal,
                                    isManual:true,
    
                                }
                                if(this.result.filter(s=> s.no == no).length==0){
                                    this.result.push(ob);
                                }else{
                                    this.result.splice(this.result.findIndex(n=>n.no == no),1,ob);
                                }
                                this.result.sort((a,b)=>a.no - b.no);
                        }
                    }
                }else if(tipe=='Akar'){
                    element.onclick = () =>{
                        let teks = prompt('masukan angka untuk akar kuadrat','');
                        let q = element.getAttribute('data-targetinput');
                        let no= element.getAttribute('data-inputakar')
                        let target = document.querySelector(q);
                        let img = new Image();
                    let sr = `https://chart.apis.google.com/chart?cht=tx&chl=%7B%5Csqrt%20%7B${encodeURIComponent(teks)}%7D`;
                    img.src =  new this.UrlImg(sr).convertUrlToLatexLatest()
                        img.style.verticalAlign='middle';
                        img.alt = `akar kuadrat ${teks}`;
                        target.appendChild(img);
                        let tipesoal = target.getAttribute('data-bentuksoal');
                            let ob = {
                                no: parseInt(no),
                                jawaban:target.innerHTML,
                                tipe:tipesoal,
                                isManual:true,

                            }
                            if(this.result.filter(s=> s.no == no).length==0){
                                this.result.push(ob);
                            }else{
                                this.result.splice(this.result.findIndex(n=>n.no == no),1,ob);
                            }
                            this.result.sort((a,b)=>a.no - b.no);
                        
                    }
                }else if(tipe=='Kubik'){
                    element.onclick = () =>{
                        let teks= prompt('masukan angka untuk akar kuadrat','');
                        let q = element.getAttribute('data-targetinput');
                        let no= element.getAttribute('data-inputkubik')
                        let target = document.querySelector(q);
                        let img = new Image();
                        
                        let sr = `https://chart.apis.google.com/chart?cht=tx&chl=%7B%5Csqrt%5B3%5D%20%7B${encodeURIComponent(teks)}%7D`;
                        img.src =  new this.UrlImg(sr).convertUrlToLatexLatest();
                        img.style.verticalAlign='middle';
                        img.alt = `akar kubik ${teks}`;
                        target.appendChild(img);
                        let tipesoal = target.getAttribute('data-bentuksoal');
                            let ob = {
                                no: parseInt(no),
                                jawaban:target.innerHTML,
                                tipe:tipesoal,
                                isManual:true,

                            }
                            if(this.result.filter(s=> s.no == no).length==0){
                                this.result.push(ob);
                            }else{
                                this.result.splice(this.result.findIndex(n=>n.no == no),1,ob);
                            }
                            this.result.sort((a,b)=>a.no - b.no);
                        
                    }
                }
            }

        });
        return this;
    }
    get TotalPg(){
        let ressultSoalOtomatis = this.result.filter(s=>!s.isManual);
        let isResultHasManual = ressultSoalOtomatis.length>0;
        let skor = 0;
        if(isResultHasManual){
            skor = ressultSoalOtomatis.map(n=>{
                    let jawaban = this.dbsoal.filter(s=>s.nosoal == n.no)[0].kuncijawaban;
                    if(n.jawaban == jawaban){
                        return 1
                    }else{
                        return 0
                    }
                }).reduce((a,b)=>a+b)
        }
        return skor;//.map(n=>n.jawaban == 'A'?1:0)
    }
}