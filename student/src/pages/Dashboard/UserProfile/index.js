import React from 'react';
import { Row, Col, Container } from 'react-bootstrap';
import styles from './styles.module.css';
import UserProfileTextField from '../../../components/UserProfileTextField';
import Button from '../../../components/CTAButton';

const UserProfile = () => {
    return (
        <Container>
            <Row>
                <Col className={styles.card}>
                    <Row className={styles.userImageIdContainer}>
                        <Col>
                            <img
                                src={require('../../../assets/images/user.svg')}
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
                        value='Shawn Mendis'
                        label='Full Name'
                    />
                    <UserProfileTextField value='23-10-2020' label='DOB' />
                    <UserProfileTextField value='Male' label='Gender' />
                    <UserProfileTextField
                        value='Mendis Peter'
                        label='Gurdians Name'
                    />
                    <UserProfileTextField
                        value='Father'
                        label='Relationship With Guradian'
                    />
                    <UserProfileTextField
                        value='No:25 Ocean Drive, Johanson'
                        label='Address Line 1'
                    />
                    <UserProfileTextField
                        value='Lincoln Layout'
                        label='Address Line 2'
                    />
                    <UserProfileTextField value='Bengaluru' label='City/Town' />
                    <UserProfileTextField value='Karnataka' label='State' />
                    <UserProfileTextField value='688801' label='Zip Code' />
                    <UserProfileTextField
                        value='9895693382'
                        label='Phone Number'
                    />
                </Col>
                <div style={{ width: 32 }} />
                <Col className={styles.card}>
                    <UserProfileTextField
                        value='Vidyanikethan HSS'
                        label='10th School Name'
                    />
                    <UserProfileTextField value='85%' label='CGPA/Percentage' />
                    <UserProfileTextField value='State Board' label='Board' />
                    <UserProfileTextField value='Bengaluru' label='Location' />
                    <UserProfileTextField
                        value='Holy Trinity Public School'
                        label='12th School Name'
                    />
                    <UserProfileTextField value='89%' label='CGPA/Percentage' />
                    <UserProfileTextField value='CBSE' label='Board' />
                    <UserProfileTextField value='Bengaluru' label='Location' />
                    <UserProfileTextField
                        value='National Institute of Technology'
                        label='College Name'
                    />
                    <UserProfileTextField value='8.9' label='CGPA/Percentage' />
                    <UserProfileTextField value='Trichy' label='Board' />
                    <UserProfileTextField value='07' label='Location' />
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

export default UserProfile;
