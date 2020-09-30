import React from 'react';
import styles from './dashboardmetrics.module.css';

const DashboardMetrics = ({ metrics, value }) => {
    return (
        <div className={styles.container}>
            <p className={styles.value}>{value}</p>
            <p className={styles.metrics}>{metrics}</p>
        </div>
    );
};

export default DashboardMetrics;
