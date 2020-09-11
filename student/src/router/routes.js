import {  Home, NotFound,Signin,Signup,Verify } from '../pages';
import { AUTH_ONLY } from './types';

export default () => [
  {
    path: '/',
    exact: true,
    component: Home,

    meta: {
      [AUTH_ONLY]: true,
    },
  },
  {
    path: '/signin',
    exact: true,
    component: Signin,
  },
  {
    path: '/signup',
    exact: true,
    component: Signup,
  },
  {
    path: '/verify',
    exact: true,
    component: Verify,
  },
  {
    path: '*',
    component: NotFound,
    ignoreGlobal: true,
  },
];
