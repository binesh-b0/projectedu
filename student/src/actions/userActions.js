import Axios from 'axios';
import Cookie from 'js-cookie';
import api from '../api/api';
import { getCredentials } from '../services/authService';
import { BASE_URL } from '../api/api';

import {
    USER_SIGNIN_REQUEST,
    USER_SIGNIN_SUCCESS,
    USER_SIGNIN_FAIL,
    USER_REGISTER_REQUEST,
    USER_REGISTER_SUCCESS,
    ADD_PROFILE_REG_DATA,
    ADD_PROFILE_REG_ADDRESS_DATA,
    ADD_PROFILE_REG_RES_ADDRESS_DATA,
    ADD_PROFILE_REG_SCHOOL_DATA,
    USER_VERFIY_RESEND,
    USER_REGISTER_FAIL,
    USER_PASSWORD_RESET_REQUEST,
    USER_PASSWORD_RESET_SUCCESS,
    USER_PASSWORD_RESET_FAIL,
    USER_PASSWORD_RESET_COMPLETE,
    USER_LOGOUT,
    USER_UPDATE_REQUEST,
    USER_UPDATE_SUCCESS,
    USER_UPDATE_FAIL,
} from '../constants/userConstants';
import { setCredentials, removeCredentials } from '../services/authService';

const submitUserData = () => async (dispatch, getState) => {
    console.log(getState());
    try {
        const url = BASE_URL + '/rest/v1/addStudentInfo';
        const formData = new FormData();
        const {
            userInfo,
            addressInfo,
            academics,
            degree,
            certifications,
            profilePic,
            certificationPic,
        } = new getState().userProfile;
        console.log('The data is ', certifications);
        console.log('addressInfo is ', JSON.stringify(addressInfo));
        formData.append('userInfo', JSON.stringify(userInfo));
        formData.append('addressInfo', JSON.stringify(addressInfo));
        formData.append('academics', JSON.stringify(academics));
        formData.append('degree', Object.values(degree));
        formData.append('certifications', Object.values(certifications));
        formData.append('certifications', certificationPic);
        formData.append('profilePic', profilePic);

        console.log(Object.values(degree));

        const config = {
            method: 'POST',
            url,
            data: formData,
            headers: {
                Authorization: `Bearer ${getCredentials()}`,
                'Content-Type': 'multipart/form-data',
                Accept: 'application/json',
            },
        };

        console.log('the request ' + formData.get('userInfo'));
        console.log(config);
        const response = await Axios(config);
        console.log('The response is ' + JSON.stringify(response.data));
    } catch (error) {
        console.log(error);
        console.log(error.response);
    }
};

const update = ({ userId, name, email, password }) => async (
    dispatch,
    getState
) => {
    const {
        userSignin: { userInfo },
    } = getState();
    dispatch({
        type: USER_UPDATE_REQUEST,
        payload: { userId, name, email, password },
    });
    try {
        const { data } = await Axios.put(
            '/api/users/' + userId,
            { name, email, password },
            {
                headers: {
                    Authorization: 'Bearer ' + userInfo.token,
                },
            }
        );
        dispatch({ type: USER_UPDATE_SUCCESS, payload: data });
        // Cookie.set('userInfo', JSON.stringify(data));
    } catch (error) {
        dispatch({ type: USER_UPDATE_FAIL, payload: error.message });
    }
};

const signin = (email, password) => async (dispatch) => {
    dispatch({ type: USER_SIGNIN_REQUEST, payload: { email, password } });
    try {
        const { data } = await api.post('/login/email', { email, password });
        console.log(data);
        Cookie.set('signRe', true);
        setCredentials(data.response);
        dispatch({ type: USER_SIGNIN_SUCCESS, payload: data, status: 200 });
    } catch (error) {
        Cookie.set('signRe', false);
        const res = { ...error };
        console.log('sign req error ', res);
        if (res.response)
            dispatch({
                type: USER_SIGNIN_FAIL,
                payload: res.response.data,
                status: res.response.status,
            });
        else
            dispatch({
                type: USER_REGISTER_FAIL,
                payload: 'Not found',
                status: 404,
            });
    }
};

const register = (email, password) => async (dispatch) => {
    dispatch({ type: USER_REGISTER_REQUEST, payload: { email, password } });
    try {
        const data = await api.post(
            '/signup/email',
            { email, password },
            {
                headers: {
                    'Content-Type': 'application/json',
                },
            }
        );
        console.log('register req', data);
        console.log('st', data.status);
        if (data.status === 200) {
            Cookie.set('regRe', true);
            dispatch({
                type: USER_REGISTER_SUCCESS,
                payload: { email },
                status: 200,
            });
        } //TODO
        // Cookie.set('userInfo', JSON.stringify(data));
    } catch (error) {
        const res = { ...error };
        Cookie.set('regRe', false);
        console.log('reg req error ', res);
        if (res.response)
            dispatch({
                type: USER_REGISTER_FAIL,
                payload: res.response.data,
                status: res.response.status,
            });
        else
            dispatch({
                type: USER_REGISTER_FAIL,
                payload: 'Not found',
                status: 404,
            });
    }
};

const resendEmail = (email) => async (dispatch) => {
    console.log('resend verification', email);
    dispatch({ type: USER_VERFIY_RESEND, payload: { email } });
    try {
        const data = await api.post(
            '/resendVerification',
            { email },
            {
                headers: {
                    'Content-Type': 'application/json',
                },
            }
        );
        dispatch({ type: USER_REGISTER_SUCCESS, payload: { email } }); //TODO
    } catch (err) {
        dispatch({
            type: USER_REGISTER_FAIL,
            payload: err.message,
            status: 511,
        }); //TODO
    }
};
const resetPassword = (email) => async (dispatch) => {
    console.log('reset password', email);
    dispatch({ type: USER_PASSWORD_RESET_REQUEST });
    try {
        const data = await api.post(
            '/forgotPassword',
            { email },
            {
                headers: {
                    'Content-Type': 'application/json',
                },
            }
        );
        dispatch({ type: USER_PASSWORD_RESET_SUCCESS }); //TODO
    } catch (err) {
        dispatch({
            type: USER_PASSWORD_RESET_FAIL,
            payload: 'Email not found',
            pstatus: 511,
        }); //TODO
    }
};
const passwordResetComplete = () => (dispatch) => {
    dispatch({ type: USER_PASSWORD_RESET_COMPLETE });
};
const logout = () => (dispatch) => {
    dispatch({ type: USER_LOGOUT });
    removeCredentials();
};

const changeProfileRegInfo = (data) => {
    return {
        type: ADD_PROFILE_REG_DATA,
        payload: data,
    };
};

const changeProfileRegAddressInfo = (typ, data) => {
    console.log(typ);
    return {
        type:
            typ === 'perm'
                ? ADD_PROFILE_REG_ADDRESS_DATA
                : ADD_PROFILE_REG_RES_ADDRESS_DATA,
        payload: data,
    };
};

const changeProfileSchoolInfo = (data) => {
    console.log(data);
    return {
        type: ADD_PROFILE_REG_SCHOOL_DATA,
        payload: data,
    };
};

const changeProfilePicture = (data) => {
    console.log('Called');
    return {
        type: 'ADD_PROFILE_PICTURE',
        payload: data,
    };
};

const addDegreeDetails = (data) => {
    return {
        type: 'ADD_PROFILE_REG_COLLEGE_DATA',
        payload: data,
    };
};

const addCertificateDetails = (data) => {
    return {
        type: 'ADD_PROFILE_REG_CERTIFICATE_DATA',
        payload: data,
    };
};

const addCertificatePicture = (data) => {
    console.log(data);
    return {
        type: 'ADD_PROFILE_DEGREE_CERTIFICATE',
        payload: data,
    };
};

const removeCertificateDetail = (data) => {
    return {
        type: 'REMOVE_REG_CERTIFICATE_DATA',
        payload: data,
    };
};

const removeDegreeDetail = (data) => {
    return {
        type: 'REMOVE_REG_COLLEGE_DATA',
        payload: data,
    };
};

export {
    signin,
    register,
    logout,
    update,
    resendEmail,
    changeProfileRegInfo,
    changeProfileRegAddressInfo,
    changeProfileSchoolInfo,
    submitUserData,
    changeProfilePicture,
    addDegreeDetails,
    addCertificateDetails,
    addCertificatePicture,
    resetPassword,
    passwordResetComplete,
    removeDegreeDetail,
    removeCertificateDetail,
};
