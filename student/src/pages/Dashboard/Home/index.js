/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { Divider } from "@material-ui/core";
import styles from "./styles.module.css";
import DashboardMetrics from "../../../components/DashboardMetrics";
import UpcomingExamTable from "../../../components/UpcomingExamsTable";
import Adview from "../../../components/Adview";
import { connect } from "react-redux";
import { getUpcommingExams, getUserInfo } from "../../../actions/userActions";
import api from "../../../api/api";
import { getCredentials } from "../../../services/authService";

const DashboardHome = ({ getExams, exams, profileInfo, getUserInfo }) => {
  useEffect(() => {
    getExams();
    getUserInfo();
    getAds();
  }, []);
  const [item, setItem] = useState([])
  const getAds = async () => {
    try {
      const { data } = await api.post(
        "/getTextAd",
        {},
        {
          headers: {
            Authorization: `Bearer ${getCredentials()}`,
            "Content-Type": "application/json",
          },
        }
      );
      setItem(data.response.adZone1[data.response.adZone1.length -1])
    } catch (err) {}
  };

  if (Object.keys(profileInfo).length === 0) return null;

  return (
    <Container className={styles.container}>
      <Row>
        <h1 className={styles.name}>Welcome,{profileInfo.details.FullName}</h1>
        <Divider />
      </Row>
      <Row>
        <p className={styles.subHeadings}>Quick Overview</p>
      </Row>
      <Row>
        <Col>
          <DashboardMetrics metrics={"Exam Completed"} value={5} />
        </Col>
        <Col className={styles.metrics}>
          <DashboardMetrics metrics={"Pending Exams"} value={5} />
        </Col>
        <Col>
          <DashboardMetrics metrics={"Avg.Test Score"} value={5} />
        </Col>
      </Row>
      <Row>
        {/* <p className={styles.subHeadings}>Upcoming Exams</p> */}
        <Col>
        {item && (

          <Adview
            // item={{
            //   company: "TCS Karappakom Chennai",
            //   designation: "Junior PHP deeveloper",
            //   exp: "0-2 years",
            //   domain: "IT",
            //   phone: "134651231",
            //   email: "test@email.com",
            //   skills: "PHP,Web development",
            // }}
            item={item}
            style={{ marginTop: "16px" }}
          />
        )}
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

export default connect(mapStateToProps, mapDispatchToProps)(DashboardHome);
