import axios from 'axios';
export const BASE_URL = 'https://hsstwebapp.uc.r.appspot.com';

export default axios.create({
    baseURL: BASE_URL + '/rest/v1',
});
