import "../sass/main.scss";
import App from "../apps/Singleton.js";
import { banksoalSidebar } from "../controller_menus/banksoalSidebar.js";
import SoalService from "../services/SoalService.js";
import NewControllerBankSoal from "../controllers/NewControllerBankSoal.js";
import  { CollectionsEdu, ModalConfig, TableProperties } from /* webpackPrefetch: true */  "./vendor.js";
import mapelkdcp_kurikulum from "../models/mapel.js";

import BankSoalRequest from "../request/BankSoalRequest.js";
import SoalRepository from "../repositories/SoalRepository.js";
import {  EditorCreateItemSoal, ToolbarCreateItemSoal, ValidatorItemSoal } from "./vendorsoal.js";
// import { ToolbarCreateDesainNaskah, BuildHtmlNaskah, ClickableNaskah, ControlSoalReplacing, PaginationAvailableSoal, ReplacingSoalToSel, ValidatorDesainNaskah    } from './desainnaskah.js'


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
const repos = new SoalRepository();
//  const repos = new RepoBankSoal();
const banksoalServ = new SoalService(repos);
// const controller = new BankSoalControllers(App,banksoalServ);
const controller = new NewControllerBankSoal(App,banksoalServ);

controller.init(
    {
        'ModalConfig'           : ModalConfig,
        'TableProperties'       : TableProperties,
        'mapelkdcp_kurikulum'   : mapelkdcp_kurikulum,
        'ParameterAppScript'    : BankSoalRequest,
        'CollectionsEdu'        : CollectionsEdu,
        // 'OrmKurikulumSoal'      : OrmKurikulumSoal,    
        'ToolbarCreateItemSoal' : ToolbarCreateItemSoal,   
        
        'ValidatorItemSoal'     : ValidatorItemSoal ,  
        'EditorCreateItemSoal'  : EditorCreateItemSoal ,   
        
        // "ToolbarCreateDesainNaskah" : ToolbarCreateDesainNaskah,
        // "BuildHtmlNaskah"           : BuildHtmlNaskah          ,
        // "ClickableNaskah"           : ClickableNaskah          ,
        // "ControlSoalReplacing"      : ControlSoalReplacing     ,
        // "PaginationAvailableSoal"   : PaginationAvailableSoal  ,
        // "ReplacingSoalToSel"        : ReplacingSoalToSel       ,
        // "ValidatorDesainNaskah"     : ValidatorDesainNaskah    

        //
    });


controller.exec_fitur(false);
