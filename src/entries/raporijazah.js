import "../sass/main.scss";
import App from "../apps/Singleton.js";

import { raporSidebar } from "../controller_menus/raporijazahSidebar.js";
import BanksoalRepository from "../repositories/BanksoalRepository.js";
import KbmService from "../services/KbmService.js";
import RaporIjazahController from "../controllers/RaporIjazahController.js";

const apisidebar = App.RiwayatApi;
const appCurrent = apisidebar.filter(s=>s.api != App.key).sort((a,b)=>b.tapel.localeCompare(a.tapel));
let arrriwayat = [];
    appCurrent.forEach(n=>{
        let ob={};
        ob.value = 't_'+n.tapel+'_s_'+n.semester;
        ob.text= n.label+' Semester '+n.semester;
        ob.name='menusidebar';
        arrriwayat.push(ob);

    })
App.buildSidebarFitur(raporSidebar(arrriwayat),true,false);//,false,false);
App.createTitle('Pengolahan Rapor','Rapor');
App.dataPermision({'canEdit':[2]});


const banksoalRepo = new BanksoalRepository();
// banksoalRepo.trial = true;

const kbmServ = new KbmService(banksoalRepo);

await kbmServ.ensureLoadedRepo();

const controller = new RaporIjazahController(App,kbmServ);
// controller.controlApi = arrriwayat;
controller.init();
controller.exec_fitur(true);
