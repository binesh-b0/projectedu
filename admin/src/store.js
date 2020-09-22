import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import Cookie from 'js-cookie';

import {
    userSigninReducer,
    userRegisterReducer,
    userUpdateReducer,
    userProfileReducer,
    userRolesReducer,
    allUsersReducer,
} from './reducers/userReducers';

import { sidebarReducer } from './reducers/layoutReducers';

const userInfo = Cookie.getJSON('userInfo') || null;

const initialState = { userSignin: { userInfo } };
const reducer = combineReducers({
    userSignin: userSigninReducer,
    userRegister: userRegisterReducer,
    userProfile: userProfileReducer,
    userUpdate: userUpdateReducer,
    userRole: userRolesReducer,
    sidebar: sidebarReducer,
    allUsers: allUsersReducer,
});
const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
    reducer,
    initialState,
    composeEnhancer(applyMiddleware(thunk))
);
export default store;
