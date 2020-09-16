import axios from 'axios';
export const BASE_URL = 'http://be8804ac1c08.ngrok.io';


export default axios.create({
    baseURL: BASE_URL+'/rest/v1'
});

