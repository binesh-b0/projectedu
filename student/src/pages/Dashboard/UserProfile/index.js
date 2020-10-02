/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { Row, Col, Container } from 'react-bootstrap';
import styles from './styles.module.css';
import UserProfileTextField from '../../../components/UserProfileTextField';
import Button from '../../../components/CTAButton';
import { connect } from 'react-redux';
import { getUserInfo } from '../../../actions/userActions';

const UserProfile = ({ getUserInfo, profileInfo }) => {
    useEffect(() => {
        getUserInfo();
    }, []);

    const {
        details,
        degrees,
        certifications,
        address,
        academics,
    } = profileInfo;

    const [picture, setPicture] = useState(
        require('../../../assets/images/user.svg')
    );

    useEffect(() => {
        if (Object.keys(profileInfo).length !== 0) {
            setPicture(details.ProfilePic);
        }
    }, [profileInfo]);

    if (Object.keys(profileInfo).length === 0) return null;

    return (
        <Container>
            <Row>
                <Col className={styles.card}>
                    <Row className={styles.userImageIdContainer}>
                        <Col>
                            <img
                                src={picture}
                                width='100'
                                height='100'
                                alt='User profile '
                            />
                        </Col>
                        <Col className={styles.userImageContainer}>
                            <p className={styles.idStyle}>ID : 1001</p>
                        </Col>
                    </Row>
                    <UserProfileTextField
                        value={details.FullName}
                        label='Full Name'
                    />
                    <UserProfileTextField value={details.Dob} label='DOB' />
                    <UserProfileTextField
                        value={details.Gender}
                        label='Gender'
                    />
                    <UserProfileTextField
                        value={details.GuardianName}
                        label='Gurdians Name'
                    />
                    <UserProfileTextField
                        value={details.RelationToGuardian}
                        label='Relationship With Guradian'
                    />
                    <UserProfileTextField
                        value={address[0].AddressLine1}
                        label='Address Line 1'
                    />
                    <UserProfileTextField
                        value={address[0].AddressLine2}
                        label='Address Line 2'
                    />
                    <UserProfileTextField
                        value={address[0].City}
                        label='City/Town'
                    />
                    <UserProfileTextField
                        value={address[0].State}
                        label='State'
                    />
                    <UserProfileTextField
                        value={address[0].Zipcode}
                        label='Zip Code'
                    />
                    <UserProfileTextField
                        value={address[0].PhoneNo}
                        label='Phone Number'
                    />
                </Col>
                <div style={{ width: 32 }} />
                <Col className={styles.card}>
                    <UserProfileTextField
                        value={academics.SchoolName10}
                        label='10th School Name'
                    />
                    <UserProfileTextField
                        value={academics.Cgpa10}
                        label='CGPA/Percentage'
                    />
                    <UserProfileTextField
                        value={academics.Board10}
                        label='Board'
                    />
                    <UserProfileTextField
                        value={academics.Location10}
                        label='Location'
                    />
                    <UserProfileTextField
                        value={academics.SchoolName12}
                        label='12th School Name'
                    />
                    <UserProfileTextField
                        value={academics.Cgpa12}
                        label='CGPA/Percentage'
                    />
                    <UserProfileTextField
                        value={academics.Board10}
                        label='Board'
                    />
                    <UserProfileTextField
                        value={academics.Location12}
                        label='Location'
                    />
                    <UserProfileTextField
                        value={degrees[0].CollegeName}
                        label='College Name'
                    />
                    <UserProfileTextField
                        value={degrees[0].Cgpa}
                        label='CGPA/Percentage'
                    />
                    <UserProfileTextField
                        value={degrees[0].Degree}
                        label='Degree'
                    />
                    <UserProfileTextField
                        value={degrees[0].Location}
                        label='Location'
                    />
                    <UserProfileTextField
                        value='Hello'
                        label='Interview Attended'
                    />
                    <Row>
                        <Col>
                            <Button
                                heading='Interview Details'
                                style={styles.interviewButton}
                            />
                        </Col>
                        <Col>
                            <Button heading='Print Profile Details' />
                        </Col>
                    </Row>
                </Col>
            </Row>
        </Container>
    );
};

const mapDispatchToProps = (dispatch) => {
    return {
        getUserInfo: () => dispatch(getUserInfo()),
    };
};

const mapStateToProps = (state) => {
    console.log('The state value is ', state.userProfile.profileInfo);
    return {
        profileInfo: state.userProfile.profileInfo,
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(UserProfile);
