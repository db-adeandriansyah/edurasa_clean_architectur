import "../sass/main.scss";
import App from "../apps/Singleton.js";

import { kbmSidebar } from "../controller_menus/kbmSidebar.js";
import BanksoalRepository from "../repositories/BanksoalRepository.js";
import KbmService from "../services/KbmService.js";
import KbmController from "../controllers/KbmController.js";
// import { kalenderSidebar } from "../controller_menus/kalenderSidebar.js";
// import KalenderRepository from "../repositories/KalenderRepository.js";
// import KalenderService from "../services/KalenderService.js";
// import KalenderController from "../controllers/KalenderController.js";

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
App.buildSidebarFitur(kbmSidebar(arrriwayat),true,false);//,false,false);
App.createTitle('Kegiatan Belajar Mengajar','KBM');
App.dataPermision({'canEdit':[2]});


const banksoalRepo = new BanksoalRepository();
// banksoalRepo.trial = true;

const kbmServ = new KbmService(banksoalRepo);

await kbmServ.ensureLoadedRepo();

const controller = new KbmController(App,kbmServ);

controller.init();
controller.exec_fitur(true);
