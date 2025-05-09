import ParameterAppScript from "./ParameterAppScript";

/**
 * Class ini berguna untuk menentukan bagian dari paramater yang dibutuhkan
 * ketika mengirimkan data ke AppScript.
 */
export default class BankSoalRequest extends ParameterAppScript{
    constructor(repo, faseKey){
        super(repo,faseKey);
    }
    item_soal(){
        return [
            this.api_taksonomibloom,
            this.api_kkmkktp,
            this.api_lingkupmateri,
            this.api_kdOrTp,
            this.api_elemencp,
            this.api_faseTPATP
        ];
    }
    desain_naskah(){
        return [...this.item_soal(),this.api_banksoal];
    }
    
    arsip_naskah(){
        return [...this.item_soal(),this.api_banksoal,this.api_datamateri,this.api_desainsimpansoal];
    }
    
    
}