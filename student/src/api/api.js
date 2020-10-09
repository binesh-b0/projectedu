import axios from 'axios';
export const BASE_URL = 'https://hsstwebapp.uc.r.appspot.com';
const DEV_URL = 'http://2ec8c8822c9b.ngrok.io';

export default axios.create({
    baseURL: DEV_URL + '/rest/v1',
});
