// import { CallServices } from "../services/CallServices";









// const app = new CallServices();
// app.datasiswa();

// import { UserRepositoriServices } from "../services/UserRepositoriServices";
// const entity = new UserRepositoriServices();
// const data = await entity.SiswaAktif();
// console.log(data);
import { User } from "../Models/User"
const entity = new User();
const data = await entity.SiswaAktif();
console.log(data);
