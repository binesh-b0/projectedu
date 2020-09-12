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
    ADD_PROFILE_REG_DATA,
    USER_VERFIY_RESEND,
    USER_UPDATE_FAIL,
    ADD_PROFILE_REG_ADDRESS_DATA,
    ADD_PROFILE_REG_RES_ADDRESS_DATA,
    ADD_PROFILE_REG_SCHOOL_DATA,
} from '../constants/userConstants';

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

const initialState = {
    fullName: 'Eldho',
    gender: 'M',
    dob: '',
    guardianName: '',
    relationToGuardian: '',
    addressInfo: {
        res: {
            addressLine1: '',
            addressLine2: '',
            city: '',
            state: '',
            zipcode: '',
            phoneNo: '',
        },
        perm: {
            addressLine1: '',
            addressLine2: '',
            city: '',
            state: '',
            zipcode: '',
            phoneNo: '',
        },
    },
    academics: {
        schoolName10: 'test',
        cgpa10: '9',
        board10: 'test',
        location10: 'test',
        schoolName12: 'test',
        cgpa12: '9',
        board12: 'test',
        location12: 'test',
    },
};

const userProfileReducer = (state = initialState, action) => {
    console.log(action);
    switch (action.type) {
        case ADD_PROFILE_REG_DATA:
            return { ...state, ...action.payload };
        case ADD_PROFILE_REG_ADDRESS_DATA:
            return {
                ...state,
                addressInfo: {
                    ...state.addressInfo,
                    perm: { ...state.addressInfo.perm, ...action.payload },
                },
            };
        case ADD_PROFILE_REG_RES_ADDRESS_DATA:
            return {
                ...state,
                addressInfo: {
                    ...state.addressInfo,
                    res: { ...state.addressInfo.res, ...action.payload },
                },
            };
        case ADD_PROFILE_REG_SCHOOL_DATA:
            return {
                ...state,
                academics: { ...state.academics, ...action.payload },
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
