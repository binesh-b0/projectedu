/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Divider } from '@material-ui/core';
import styles from './styles.module.css';
import DashboardMetrics from '../../../components/DashboardMetrics';
import UpcomingExamTable from '../../../components/UpcomingExamsTable';
import { connect } from 'react-redux';
import { getUpcommingExams, getUserInfo } from '../../../actions/userActions';

const DashboardHome = ({ getExams, exams, profileInfo, getUserInfo }) => {
    useEffect(() => {
        getExams();
        getUserInfo();
    }, []);

    if (Object.keys(profileInfo).length === 0) return null;

    return (
        <Container className={styles.container}>
            <Row>
                <h1 className={styles.name}>
                    Welcome,{profileInfo.details.FullName}
                </h1>
                <Divider />
            </Row>
            <Row>
                <p className={styles.subHeadings}>Quick Overview</p>
            </Row>
            <Row>
                <Col>
                    <DashboardMetrics metrics={'Exam Completed'} value={5} />
                </Col>
                <Col className={styles.metrics}>
                    <DashboardMetrics metrics={'Pending Exams'} value={5} />
                </Col>
                <Col>
                    <DashboardMetrics metrics={'Avg.Test Score'} value={5} />
                </Col>
            </Row>
            <Row>
                {/* <p className={styles.subHeadings}>Upcoming Exams</p> */}
                <Col>
                    <UpcomingExamTable data={exams} />
                </Col>
            </Row>
        </Container>
    );
};

const mapDispatchToProps = (dispatch) => {
    return {
        getExams: (limit, offset) => dispatch(getUpcommingExams()),
        getUserInfo: () => dispatch(getUserInfo()),
    };
};

const mapStateToProps = (state) => {
    console.log(state.userProfile);
    return {
        exams: state.userProfile.upcomingExams,
        profileInfo: state.userProfile.profileInfo,
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(DashboardHome);
