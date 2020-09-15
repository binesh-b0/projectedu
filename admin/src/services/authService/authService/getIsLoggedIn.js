// import { STORAGE_KEYS } from '../../constants';
import Cookie from 'js-cookie';

const getIsLoggedIn = () => {
    console.log("tk",Cookie.get("tk"));
    return true;
};

export default getIsLoggedIn;
