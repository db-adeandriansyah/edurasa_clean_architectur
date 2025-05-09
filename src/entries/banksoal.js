import "../sass/main.scss";
import App from "../apps/Singleton.js";
import { banksoalSidebar } from "../controller_menus/banksoalSidebar.js";
// import BanksoalRepository from "../repositories/BanksoalRepository.js";
// import BanksoalService from "../services/BanksoalService.js";
import BankSoalControllers from "../controllers/BankSoalControllers.js";
import SoalRepository from "../repositories/SoalRepository.js";
import SoalService from "../services/SoalService.js";


App.buildSidebarFitur(banksoalSidebar,false,true);

App.createTitle('Bank-Soal','Soal');
App.dataPermision({'canEdit':[2]});

// const banksoalRepo = new BanksoalRepository();
// const banksoalServ = new BanksoalService(banksoalRepo);
const repos = new SoalRepository();
const banksoalServ = new SoalService(repos);
const controller = new BankSoalControllers(App,banksoalServ);

controller.init();
controller.exec_fitur(false);

////======================== siap
// import "../sass/main.scss";
// import App from "../apps/Singleton.js";
// import { banksoalSidebar } from "../controller_menus/banksoalSidebar.js";
// import BanksoalRepository from "../repositories/BanksoalRepository.js";
// import BanksoalController from "../controllers/BanksoalController.js";
// import BanksoalService from "../services/BanksoalService.js";

// App.buildSidebarFitur(banksoalSidebar,false,true);
// App.createTitle('Bank Soal','Soal');
// App.dataPermision({'canEdit':[2]});

// const banksoalRepo = new BanksoalRepository();
// const banksoalServ = new BanksoalService(banksoalRepo);
// const controller = new BanksoalController(App,banksoalServ);

// controller.init();
// controller.exec_fitur(false);
