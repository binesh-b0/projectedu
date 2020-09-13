import React, { useState, useRef } from 'react';
import styles from './style.module.css';
import { makeStyles } from '@material-ui/core';
import { connect } from 'react-redux';
import Certificate from '../../../components/Certificate';
import Button from '../../../components/CTAButton';

const FourthRoute = () => {
    const [certificates, setCertificates] = useState([{ id: 1 }]);
    const [expanded, setExpanded] = useState(false);

    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
        console.log(expanded);
    };

    const addMoreCertificates = () => {
        const len = certificates.length + 1;
        setCertificates([...certificates, { id: len }]);
    };

    const removeCertificate = () => {
        if (certificates.length >= 2) {
            setCertificates(certificates.slice(0, -1));
        }
    };

    return (
        <div className={styles.container}>
            {certificates.map((certificate) => {
                return (
                    <Certificate
                        expanded={expanded}
                        id={certificate.id}
                        onChange={(id) => handleChange(id)}
                    />
                );
            })}
            <div className={styles.btnDiv}>
                <Button
                    heading='Add more certificates'
                    style={styles.btn}
                    onPress={() => addMoreCertificates()}
                />
                <Button
                    heading='Remove last certificate'
                    style={styles.btn}
                    onPress={() => removeCertificate()}
                />
            </div>
        </div>
    );
};

const mapDispatchToProps = (disptch) => {
    return {
        onChange: (data) => {
            disptch();
        },
    };
};

const mapStateToProps = (state) => {
    return {};
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(FourthRoute);
