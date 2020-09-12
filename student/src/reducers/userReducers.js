import {
  USER_SIGNIN_REQUEST,
  USER_SIGNIN_SUCCESS,
  USER_SIGNIN_FAIL,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_REGISTER_FAIL,
  USER_LOGOUT,
  USER_UPDATE_REQUEST,
  USER_UPDATE_SUCCESS,
  ADD_PROFILE_DATA,
  USER_VERFIY_RESEND,
  USER_UPDATE_FAIL, USER_PASSWORD_RESET_REQUEST, USER_PASSWORD_RESET_SUCCESS,USER_PASSWORD_RESET_COMPLETE, USER_PASSWORD_RESET_FAIL
} from "../constants/userConstants";

function userSigninReducer(state = {}, action) {
  switch (action.type) {
    case USER_SIGNIN_REQUEST:
      return { loading: true, status: 0 };
    case USER_SIGNIN_SUCCESS:
      return { loading: false, userInfo: action.payload, status: 200 };
    case USER_SIGNIN_FAIL:
      return {
        loading: false,
        error: action.payload,
        status: action.status,
      };
    case USER_PASSWORD_RESET_REQUEST:
      return { ploading: true, pstatus: 0 };
    case USER_PASSWORD_RESET_SUCCESS:
      return { ploading: false, pstatus: 200 };
    case USER_PASSWORD_RESET_FAIL:
      return { ploading: false, pstatus: 400 };
    case USER_PASSWORD_RESET_COMPLETE:
        return {ploading: true, pstatus: 0}
    case USER_LOGOUT:
      return {};
    default:
      return state;
  }
}

function userUpdateReducer(state = {}, action) {
  switch (action.type) {
    case USER_UPDATE_REQUEST:
      return { loading: true, status: 0 };
    case USER_UPDATE_SUCCESS:
      return { loading: false, userInfo: action.payload, status: 200 };
    case USER_UPDATE_FAIL:
      return {
        loading: false,
        error: action.payload,
        status: action.status,
      };
    default:
      return state;
  }
}

function userRegisterReducer(state = {}, action) {
  switch (action.type) {
    case USER_REGISTER_REQUEST:
    case USER_VERFIY_RESEND:
      return { loading: true, userInfo: action.payload, status: 0 };
    case USER_REGISTER_SUCCESS:
      return {
        loading: false,
        userInfo: action.payload,
        status: action.status,
      };
    case USER_REGISTER_FAIL:
      return {
        loading: false,
        error: action.payload,
        status: action.status,
      };
    default:
      return state;
  }
}

const userProfileReducer = (state = {}, action) => {
  switch (action.type) {
    case ADD_PROFILE_DATA:
      return {
        ...state,
        userInfo: { ...state.userInfo, ...action.payload },
      };

    default:
      return state;
  }
};

export {
  userSigninReducer,
  userRegisterReducer,
  userUpdateReducer,
  userProfileReducer,
};
