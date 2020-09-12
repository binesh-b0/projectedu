import axios from 'axios';

export default axios.create({
    baseURL: 'http://9c77ab7139d7.ngrok.io/rest/v1',
});

export const BASE_URL = 'http://9c77ab7139d7.ngrok.io';
