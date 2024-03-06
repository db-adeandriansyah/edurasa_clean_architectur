export class SiswaServices{
    constructor(siswaRepo){
        this.action = siswaRepo;
        this.fokusSs = '';
        this.fokusTab = '';
        this.crud = ''
    }
    async showAllSiswa(){
        // if(this.action.showAllSiswa);
        // const data = this.action.showAllSiswa?? await  this.action.callAllSiswa();
        // // console.log(data);
        console.log(this.action.showAllSiswa);
        // const data = await  this.action.callAllSiswa();
        // console.log(data);
        const data = this.action.showAllSiswa.length>0?this.action.showAllSiswa:await this.action.callAllSiswa();
        console.log(data);
        this.action.showAllSiswa  = data.data;
        console.log(this.action.showAllSiswa);
        
    }

}