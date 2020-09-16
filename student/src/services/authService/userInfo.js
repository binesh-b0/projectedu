
export  const setUserInfo=(email)=>{
    localStorage.setItem("email",email)
}
export const getUserInfo=()=>{
    return {
        email:localStorage.getItem("email")
    }
}

