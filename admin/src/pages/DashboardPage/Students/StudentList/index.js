import React,{useState} from 'react';
import StudentTable from '../../../../components/tables/StudentTable';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import StudentListMenu from '../../../../components/menu/StudentListMenu'
const useStyles = makeStyles((theme) => ({
    btn: {},
    btnContainer: {
        display: 'flex',
        justifyContent: 'space-between',
    },
}));
export default function ExamList(props) {
    const classes = useStyles();
    const goToMail = ()=>{
        props.history.push('/app/students/mail')
    }
    return (
        <div>
            <div className={classes.btnContainer}>
            <div></div>
                <StudentListMenu goToMail={goToMail} />
                <Button
                    className={classes.btn}
                    disableElevation
                    onClick={() => props.history.push('/app/exams/add')}
                    variant='contained'
                    color='primary'
                    size='small'
                >
                    Create
                </Button>
            </div>
            <StudentTable history={props.history} setSelected={props.setSelected}/>
        </div>
    );
}
