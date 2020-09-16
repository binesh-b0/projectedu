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
    ADD_PROFILE_REG_DATA,
    ADD_PROFILE_REG_ADDRESS_DATA,
    ADD_PROFILE_REG_RES_ADDRESS_DATA,
    ADD_PROFILE_REG_SCHOOL_DATA,
    USER_UPDATE_FAIL,
    USER_PASSWORD_RESET_REQUEST,
    USER_PASSWORD_RESET_SUCCESS,
    USER_PASSWORD_RESET_COMPLETE,
    USER_PASSWORD_RESET_FAIL,
} from '../constants/userConstants';

function userSigninReducer(state = {}, action) {
    switch (action.type) {
        case USER_SIGNIN_REQUEST:
            return { loading: true, status: 0 };
        case USER_SIGNIN_SUCCESS:
            return { loading: false, };
        case USER_SIGNIN_FAIL:
            return {
                loading: false,
            };
        case USER_PASSWORD_RESET_REQUEST:
            return { ploading: true,};
        case USER_PASSWORD_RESET_SUCCESS:
            return { ploading: false, };
        case USER_PASSWORD_RESET_FAIL:
            return { ploading: false, };
        case USER_PASSWORD_RESET_COMPLETE:
            return { ploading: true, };
        case USER_LOGOUT:
            return {};
        default:
            return state;
    }
}

function userUpdateReducer(state = {}, action) {
    switch (action.type) {
        default:
            return state;
    }
}

function userRegisterReducer(state = {}, action) {
    switch (action.type) {
        default:
            return state;
    }
}

function userProfileReducer(state = {}, action) {
    switch (action.type) {
        default:
            return state;
    }
}



export {
    userSigninReducer,
    userRegisterReducer,
    userUpdateReducer,
    userProfileReducer,
};
