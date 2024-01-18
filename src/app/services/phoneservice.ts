
const phoneapi = 'https://localhost:44377/api/telefoni';
export default function GetPhones() {
     return fetch(phoneapi);
}
