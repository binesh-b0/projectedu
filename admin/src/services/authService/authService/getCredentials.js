// import { STORAGE_KEYS } from '../../constants';
import Cookie from 'js-cookie';

const getCredentials = () => {
    console.log('tk', Cookie.get('tk'));
    return Cookie.get('tk');
};

export default getCredentials;
