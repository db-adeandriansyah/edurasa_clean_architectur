import { sejarahKurikulum } from "../routes/settingApp";

export default class RiwayatModel{
    constructor(){
        this.db = [];
        this.sejarah_kurikulum = sejarahKurikulum
    }
    statusKurikulum(tapel){
        return this.sejarah_kurikulum.filter(s=>s.tapel == tapel)[0];
    }

}