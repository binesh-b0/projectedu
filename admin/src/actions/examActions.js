import api from '../api/api';
import { getCredentials } from '../services/authService';

const getAllExams = () => {
    return async (dispatch) => {
        try {
            const { data } = await api.post(
                '/admin/getAdminUsers',
                {},
                {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${getCredentials()}`,
                    },
                }
            );
            dispatch({
                type: 'ADD_ALL_USERS',
                payload: data.response,
            });
        } catch (error) {
            console.log(error);
        }
    };
};


export {
    getAllExams
}