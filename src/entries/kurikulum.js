import "../sass/main.scss";
import App from "../apps/Singleton.js";
import { kurikulumSidebar } from "../controller_menus/kurikulumSidebar.js";


App.buildSidebarFitur(kurikulumSidebar,false,true);
App.createTitle('Kurikulum','Kurikulum');
App.dataPermision({'canEdit':[2]});
