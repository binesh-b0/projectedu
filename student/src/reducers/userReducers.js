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
    userInfo: {
        fullName: '',
        gender: 'M',
        dob: '2000-10-01',
        guardianName: '',
        relationToGuardian: '',
    },
    profilePic: '',
    addressInfo: {
        residence: {
            addressLine1: '',
            addressLine2: '',
            city: '',
            state: '',
            zipcode: '',
            phoneNo: '',
        },
        permanent: {
            addressLine1: '',
            addressLine2: '',
            city: '',
            state: '',
            zipcode: '',
            phoneNo: '',
        },
    },
    academics: {
        schoolName10: '',
        cgpa10: '',
        board10: '',
        location10: '',
        schoolName12: '',
        cgpa12: '',
        board12: '',
        location12: '',
    },
    degree: [
        {
            collegeName: '',
            cgpa: '',
            rollNo: '',
            degree: '',
            location: '',
        },
    ],
    certifications: [
        {
            certificationName: '',
            completionDate: '2020-12-09',
            validityDate: '2021-12-08',
            institute: '',
        },
    ],
};

const userProfileReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_PROFILE_REG_DATA:
            return {
                ...state,
                userInfo: { ...state.userInfo, ...action.payload },
            };
        case ADD_PROFILE_REG_ADDRESS_DATA:
            return {
                ...state,
                addressInfo: {
                    ...state.addressInfo,
                    permanent: {
                        ...state.addressInfo.permanent,
                        ...action.payload,
                    },
                },
            };
        case ADD_PROFILE_REG_RES_ADDRESS_DATA:
            return {
                ...state,
                addressInfo: {
                    ...state.addressInfo,
                    residence: {
                        ...state.addressInfo.residence,
                        ...action.payload,
                    },
                },
            };
        case ADD_PROFILE_REG_SCHOOL_DATA:
            return {
                ...state,
                academics: { ...state.academics, ...action.payload },
            };
        case 'ADD_PROFILE_PICTURE':
            console.log(action.payload);
            return {
                ...state,
                profilePic: action.payload,
            };
        case 'ADD_PROFILE_REG_COLLEGE_DATA':
            return {
                ...state,
                degree: { ...state.academics, ...action.payload },
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
