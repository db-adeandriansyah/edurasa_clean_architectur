import "../sass/main.scss";
// import "../sass/login.scss";
import App from "../apps/Singleton.js";
import UserService from "../services/UserRepoServices.js";
import LoginController from "../controllers/LoginController.js";


const Users = new UserService(App.UserApp)
const Home = new LoginController(App);
Home.index(Users);
// Home.index(Users);