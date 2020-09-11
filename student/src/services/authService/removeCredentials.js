import Cookies from 'js-cookie'


export default function setCredential(){
    Cookies.remove('tk');
    Cookies.remove('exp')
}