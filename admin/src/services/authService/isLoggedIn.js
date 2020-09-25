// import { STORAGE_KEYS } from '../../constants';
import Cookie from 'js-cookie';

const isLoggedIn = () => {
    console.log("tk",Cookie.get("tk")?true:false);
    // return localStorage.getItem("tk")? true:false;
    return Cookie.get("tk") ? true:false;
};

export default isLoggedIn;
