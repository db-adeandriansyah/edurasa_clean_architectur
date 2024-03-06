import { CallHttp } from "../repositories/CallHttp";

const RepoCallHttp = new CallHttp();
RepoCallHttp.initialAppKey();
export class CallServices{
    constructor(){
        this.fokusSs = '';
        this.fokusTab = '';
        this.crud = RepoCallHttp.crud;

    }
    paramFormData(param){
        let fd = new FormData();
            Object.entries(param).forEach(([k,v])=>{
                fd.append(k,v);
            });
        return fd;
    }
    async post(uri,param){
        let fd = new FormData();
        Object.entries(param).forEach(([k,v])=>{
            fd.append(k,v);
        });
        const f = await fetch(uri,{body:fd,method:'post'});
        const t = await f.json();
        return t;
    }
    datasiswa(){
        this.fokusSs = RepoCallHttp.appscript['ss_user'];
        this.fokusTab ='datasiswa';

    }
}