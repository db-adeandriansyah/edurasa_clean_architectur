import ParameterAppScript from "./ParameterAppScript";

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
}