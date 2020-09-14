import axios from 'axios';
export const BASE_URL = 'http://17c6c5c6fdeb.ngrok.io';

export default axios.create({
    baseURL: BASE_URL + '/rest/v1',
});
