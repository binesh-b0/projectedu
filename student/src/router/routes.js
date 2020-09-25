import { Home, NotFound, Signin, Signup, Verify, Register } from '../pages';
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
        path: '/register',
        exact: true,
        component: Register,

        //     meta: {
        //         [AUTH_ONLY]: true,
        //     },
    },
    {
        path: '*',
        component: NotFound,
        ignoreGlobal: true,
    },
];
