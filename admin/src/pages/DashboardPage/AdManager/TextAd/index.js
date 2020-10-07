import React from 'react';
import { Grid, Button, makeStyles } from '@material-ui/core';
import AddTextAdComponent from '../../../../components/AddTextAdComponent';
import AdStudentTable from '../../../../components/tables/AdStudentTable';

export default function TextAd(props) {

    const useStyle = makeStyles({
        button: {
            padding: 14
        }
    });

    const styleClasses = useStyle();

    return (
        <div>
            <Grid
            className={styleClasses.button}
                container
                direction="row"
                justify="flex-end"
            >
                <Button
                    variant='contained'
                    color='primary'
                    size='small'
                >
                    Upload
                </Button>
            </Grid>
            <AddTextAdComponent />
            <AdStudentTable />
        </div>
    );
}   