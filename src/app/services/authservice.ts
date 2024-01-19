import { LoginModel } from "../models/LoginModel";
import { RegisterModel } from "../models/RegisterModel";

const loginroute = "https://localhost:44377/api/Auth/login";
const registerroute = "https://localhost:44377/api/Auth/register"
export function Login(logindata:LoginModel) {
    let params = {
        headers:{'content-type':'application/json'},
        method:"POST",
        body:JSON.stringify(logindata)
    }
    return fetch(loginroute,params)
}
export function Register(registerdata:RegisterModel) {
    let params = {
        headers:{'content-type':'application/json'},
        method:"POST",
        body:JSON.stringify(registerdata)
    }
    return fetch(registerroute,params)
}
