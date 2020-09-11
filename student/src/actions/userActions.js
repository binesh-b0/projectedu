import Axios from 'axios';
import Cookie from 'js-cookie';
import api from '../api/api';


import {
  USER_SIGNIN_REQUEST, USER_SIGNIN_SUCCESS,
  USER_SIGNIN_FAIL, USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,USER_VERFIY_RESEND, USER_REGISTER_FAIL, USER_LOGOUT, USER_UPDATE_REQUEST, USER_UPDATE_SUCCESS, USER_UPDATE_FAIL
} from "../constants/userConstants";
import { setCredentials,removeCredentials } from "../services/authService";

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
    dispatch({ type: USER_UPDATE_SUCCESS, payload: data });
    // Cookie.set('userInfo', JSON.stringify(data));
  } catch (error) {
    dispatch({ type: USER_UPDATE_FAIL, payload: error.message });
  }
}

const signin = (email, password) => async (dispatch) => {
  dispatch({ type: USER_SIGNIN_REQUEST, payload: { email, password } });
  try {
    const { data } = await api.post("/login/email", { email, password });
    Cookie.set("signRe",true);
    setCredentials(data.response)
    dispatch({ type: USER_SIGNIN_SUCCESS, payload: data,status:200 });
  } catch (error) {
    Cookie.set("signRe",false);
    const res = {...error}
    console.log("sign req error ", res);
    if(res.response)
    dispatch({ type: USER_SIGNIN_FAIL, payload: res.response.data,status:res.response.status });
    else dispatch({ type: USER_REGISTER_FAIL, payload: "Not found",status:404 })

  }
}

const register = (email, password) => async (dispatch) => {
  dispatch({ type: USER_REGISTER_REQUEST, payload: { email, password } });
  try {
    const data = await api.post("/signup/email", { email, password }, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
    console.log("register req",data);
    console.log("st",data.status);
    if(data.status===200){
    Cookie.set("regRe",true);
    dispatch({ type: USER_REGISTER_SUCCESS, payload: {email},status: 200 });} //TODO
    // Cookie.set('userInfo', JSON.stringify(data));
  } catch (error) {
    const res = {...error}
    Cookie.set("regRe",false);
    console.log("reg req error ", res);
    if(res.response)
    dispatch({ type: USER_REGISTER_FAIL, payload: res.response.data,status:res.response.status });
    else dispatch({ type: USER_REGISTER_FAIL, payload: "Not found",status:404 })
  }
}

const resendEmail=(email) =>async(dispatch) =>{
  console.log("resend verification",email);
  dispatch({type:USER_VERFIY_RESEND,payload:{email}});
  try{
    const data = await api.post("/resendVerification",{email},{
      headers:{
        'Content-Type':'application/json'
      }
    });
    dispatch({ type: USER_REGISTER_SUCCESS, payload: {email} }); //TODO

  }
  catch(err){
    dispatch({ type: USER_REGISTER_FAIL, payload: err.message,status:511 }); //TODO

  }
}

const logout = () => (dispatch) => {
  // Cookie.remove("userInfo");
  dispatch({ type: USER_LOGOUT })
  removeCredentials();
}
export { signin, register, logout, update,resendEmail };
