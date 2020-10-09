import axios from 'axios';
export const BASE_URL = 'https://hsstwebapp.uc.r.appspot.com';
const DEV_URL = 'http://ef536af0ccd0.ngrok.io';

export default axios.create({
    baseURL: DEV_URL + '/rest/v1',
});
