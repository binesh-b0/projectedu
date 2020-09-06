import React, { useEffect } from 'react';
import { Route, Switch } from 'react-router-dom';
import { useSelector } from 'react-redux';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import signupPage from './pages/signupPage';
import signinPage from './pages/signinPage';
import registration from './pages/registration';

function App(props) {
    const userSignin = useSelector((state) => state.userSignin);
    const { userInfo } = userSignin;

    useEffect(() => {
        if (userInfo) {
            props.history.push('/signin');
        }
        return () => {
            //
        };
    }, [props.history, userInfo]);

    console.log(userSignin);
    return (
        <Switch>
            <Route path='/signin' component={signinPage} />
            <Route path='/register' component={registration} />
            <Route path='/' exact={true} component={signupPage} />
            <Route component={Error} />
        </Switch>
    );
}

export default App;
