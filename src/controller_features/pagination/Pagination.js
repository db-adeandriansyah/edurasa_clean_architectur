export default class Pagination{
    constructor(data){
        this.data = data;
        this.dataPerPage = [];
        this.view = null;
        this.workplace = null;
    }
    init(option){
        const settingDefault = {
            showPerPage:5,
        };
        const objekDefault = Object.assign({},settingDefault,option);
    }
}