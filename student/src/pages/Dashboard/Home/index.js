import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Divider } from '@material-ui/core';
import styles from './styles.module.css';
import DashboardMetrics from '../../../components/DashboardMetrics';
import UpcomingExamTable from '../../../components/UpcomingExamsTable';

const DashboardHome = ({ name = 'Batman' }) => {
    return (
        <Container className={styles.container}>
            <Row>
                <h1 className={styles.name}>Welcome,{name}</h1>
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
                    <UpcomingExamTable />
                </Col>
            </Row>
        </Container>
    );
};

export default DashboardHome;
