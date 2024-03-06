import "../sass/main.scss";
// import "../sass/login.scss";
import App from "../apps/Singleton.js";
import Dashboard from "../controllers/Dashboard.js";
import UserService from "../services/UserRepoServices.js";

const UserServices = new UserService(App.UserApp);
const Home = new Dashboard(App,UserServices);
