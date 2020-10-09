import React, { useEffect } from 'react';
import Cookie from 'js-cookie';
import styles from './style.module.css';
import SidePanel from '../../components/SidePanel';
import DashboardHome from './Home';
import UserProfile from './UserProfile';
import Header from '../../components/Header';
import { Switch, Route, Redirect, withRouter,useLocation } from "react-router-dom";

function Dashboard(props) {
    useEffect(() => {
        Cookie.set('regRe', false);
        Cookie.set('signRe', false);
        // props.history.push('/register');
    });
    return (
        <div className={styles.container}>
        <Header />
        <div className={styles.subContainer}>
            <SidePanel />
            {/* <h4 className={styles.firstDivText}>
                    Complete your profile to access your dashboard
                </h4> */}
            {/* </div> */}
            <div className={styles.secondDiv}>
            <Switch>
        <Route exact path="/home" component={DashboardHome} />
        <Route exact path="/home/profile" component={UserProfile} />
        {/* <Route path="/app/exams/details/:id" component={ExamDetails} /> */}
      </Switch>

            </div>
           
        </div>
    </div>
    );

}

export default Dashboard;
