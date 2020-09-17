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
import clearStorage from '../services/clearStorage';
const timeout = 1000;


const signin = (username, password,history,setError) => async (dispatch) => {
    dispatch({ type: USER_SIGNIN_REQUEST, payload: { username, password } });
    try {
        const { data } = await api.post('/admin/login', { username, password },{timeout});
        console.log(data,"data");
        Cookie.set('signRe', true);
        setCredentials(data.response);
        dispatch({ type: USER_SIGNIN_SUCCESS, payload: data});
        setError(null)
        try {
            history.replace('/')
        } catch (error) {
            console.log("his",error);
        }
    } catch (error) {
        const res = { ...error };
        console.log('sign req error ', res);
        if (res.response){
            Cookie.set('signRe', false);
            dispatch({
                type: USER_SIGNIN_FAIL,

            });
            setError("invalid request")
        }
        else{
            dispatch({
                type: USER_SIGNIN_FAIL,
            });
            setError("Connection timeout")
    }}
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

const resetPassword = (email,setDone,setError) => async (dispatch) => {
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
        setDone(true)
        setError(null)
    } catch (err) {
        dispatch({
            type: USER_PASSWORD_RESET_FAIL,
        }); //TODO
        setError("Password reset failed")
    }
};
const passwordResetComplete = () => (dispatch) => {
    dispatch({ type: USER_PASSWORD_RESET_COMPLETE });
};
const logout = (history) => (dispatch) => {
    dispatch({ type: USER_LOGOUT });
    removeCredentials();
    clearStorage()
    history.replace("/login")
};

export {
    signin,
    register,
    resetPassword,
    passwordResetComplete,
    logout
};
