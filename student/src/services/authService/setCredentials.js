import Cookies from 'js-cookie'


export default function setCredential(token,exp){
    Cookies.set('tk', token, { expires: 1,sameSite:true });
    Cookies.set('exp', exp,{ expires: 1,sameSite:true })
}