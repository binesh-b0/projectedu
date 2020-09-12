import axios from 'axios';

const BASE_URL="http://9c77ab7139d7.ngrok.io";
export default axios.create({
    baseURL: BASE_URL+'/rest/v1'
});
