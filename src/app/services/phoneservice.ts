import {PhoneEntity } from "../models/Phone";
import { SearchModel } from "../models/SearchModel";
let jwt = localStorage.getItem("jwt");
const phoneapi = 'https://localhost:44377/api/telefoni';
const searchphonesroute = "https://localhost:44377/api/pretraga"
export function GetPhones() {
     return fetch(phoneapi);
}
export function GetPhone(id:number) {
     let params = {
          headers:{'content-type':'application/json',Authorization:`Bearer ${jwt}`},
          method:"GET",
     }
     return fetch(phoneapi+`/${id}`,params);
}
export function SearchPhones(searchparams:SearchModel) {
     let params = {
          headers:{'content-type':'application/json',Authorization:`Bearer ${jwt}`},
          method:"POST",
          body:JSON.stringify(searchparams)
     }
     return fetch(searchphonesroute,params);
}
export function PostPhone(phone:PhoneEntity)
{
     let params = {
          headers:{'content-type':'application/json',Authorization:`Bearer ${jwt}`},
          method:"POST",
          body:JSON.stringify(phone)
     }
     return fetch(phoneapi,params);
}
export function PutPhone(phone:PhoneEntity)
{
     let params = {
          headers:{'content-type':'application/json',Authorization:`Bearer ${jwt}`},
          method:"PUT",
          body:JSON.stringify(phone)
     }
     return fetch(phoneapi+`/${phone.id}`,params);
}
export function DeletePhone(id:number)
{
     let params = {
          headers:{'content-type':'application/json',Authorization:`Bearer ${jwt}`},
          method:"DELETE",
     }
     return fetch(phoneapi+`/${id}`,params);
}
