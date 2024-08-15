import "../sass/main.scss";
import App from "../apps/Singleton.js";
import { banksoalSidebar } from "../controller_menus/banksoalSidebar.js";
// import BanksoalRepository from "../repositories/BanksoalRepository.js";
// import BanksoalService from "../services/BanksoalService.js";
// import BankSoalControllers from "../controllers/BankSoalControllers.js";
// import SoalRepository from "../repositories/SoalRepository.js";
import SoalService from "../services/SoalService.js";
// import SoalDomain from "../domains/SoalDomain.js";
import NewControllerBankSoal from "../controllers/NewControllerBankSoal.js";
import  { ModalConfig, TableProperties } from /* webpackPrefetch: true */  "./vendor.js";
import mapelkdcp_kurikulum from "../models/mapel.js";
import RepoBankSoal from "../repositories/newRepoBankSoal.js";
import BankSoalRequest from "../request/BankSoalRequest.js";
import OrmKurikulumSoal from "../controller_features/banksoal/OrmKurikulumSoal.js";


App.buildSidebarFitur(banksoalSidebar,false,true);

App.createTitle('Bank-Soal','Soal');
App.dataPermision({'canEdit':[2]});

/**
 * Entitas / domainnya dulu;
 * format single berasal dari domain
 */
// const domainSoal = new SoalDomain({});


// const banksoalRepo = new BanksoalRepository();
// const banksoalServ = new BanksoalService(banksoalRepo);
// const repos = new SoalRepository();
const repos = new RepoBankSoal();
const banksoalServ = new SoalService(repos);
// const controller = new BankSoalControllers(App,banksoalServ);
const controller = new NewControllerBankSoal(App,banksoalServ);

controller.init(
    {
        'ModalConfig'           : ModalConfig,
        'TableProperties'       : TableProperties,
        'mapelkdcp_kurikulum'   : mapelkdcp_kurikulum,
        'ParameterAppScript'    : BankSoalRequest,
        'ormKurikulumSoal'      : OrmKurikulumSoal,
    });


controller.exec_fitur(false);
