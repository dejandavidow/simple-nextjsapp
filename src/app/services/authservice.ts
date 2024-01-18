import { LoginModel } from "../models/LoginModel";

const loginroute = "https://localhost:44377/api/Auth/login";
const registerroute = "https://localhost:44377/api/Auth/register"
export default function Login(logindata:LoginModel) {
    let params = {
        headers:{'content-type':'application/json'},
        method:"POST",
        body:JSON.stringify(logindata)
    }
    return fetch(loginroute,params)
}
