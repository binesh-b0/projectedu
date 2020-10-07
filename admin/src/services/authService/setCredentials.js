
import Cookies from 'js-cookie'
export default function setCredential(token){
    // localStorage.setItem("tk",token)
    Cookies.set('tk', token,{ expires: 1,sameSite:true })
}