import React,{useState,useEffect} from 'react'
import SimpleLoading from '../../../../components/loading/SimpleLoading'
import api from '../../../../api/api'
import {getCredentials} from '../../../../services/authService'
import ExamDetailsMenu from '../../../../components/menu/ExamDetailsMenu'
import { makeStyles } from '@material-ui/core/styles';
import {Chip, Grid} from '@material-ui/core';
import Details from './Details'
import Instructions from './Instructions'
import Questions from './Questions'
import {getExam} from '../../../../actions/examActions'
import { useDispatch, useSelector } from "react-redux";

const useStyles = makeStyles((theme) => ({
    menuContainer:{
        display:" flex",
        alignItems:"center",
        justifyContent:"center"
    }
 
  }));
export default function ExamDetails(props) {
    const classes = useStyles();
 
    const [edit, setEdit] = useState(false)
    const exam = useSelector((state) => state.exam);
    const { loading,details,instructions,questions} = exam;
const [progress, setProgress] = useState(false)
    const dispatch = useDispatch();
    const [status,setStatus] =  useState()

    // const getExam=async ()=>{
    //     try {
    //         const {data} = await api.post(
    //             '/admin/getExamDetails',{id:props.match.params.id},
    //             {
    //                 headers: {
    //                     'Content-Type': 'application/json',
    //                     Authorization: `Bearer ${getCredentials()}`,
    //                 },
    //             },
    //             {timeout:1000}
    //         );
    //         console.log("det",data.response)
    //         const {exam} = data.response
    //         console.log(exam)
    //         setDetails({id:1})
    //         setLoading(false)
    //         console.log("asd",details,loading)
    //     } catch (error) {
    //         console.log(error);
    //     }
    // }

    useEffect(() => {
        dispatch(getExam(props.match.params.id))
    }, [])
    useEffect(() => {
        setStatus(details.status)
    }, [loading])
    const disableExam=async (id)=>{
        try {
            const { data } = await api.post(
                '/admin/toggleExamStatus',{examId:id},
                {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${getCredentials()}`,
                    },
                },
                {timeout:1000}
            );
            dispatch(getExam(props.match.params.id))
            // setProgress(false)
        } catch (error) {
            console.log(error);
        }
    }
    const editExam=async ()=>{
        try {
            const { data } = await api.post(
                '/admin/editExam',{details:data.details},
                {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${getCredentials()}`,
                    },
                },
                {timeout:1000}
            );
        } catch (error) {
            console.log(error);
        }
    }
    const onEditClicked =()=>{
        setEdit(!edit)
    }
    const onDeleteClicked =()=>{

    }
    const onDisableClicked =()=>{
        // setProgress(true)
        disableExam(props.match.params.id)
        // dispatch(getExam(props.match.params.id))

    }
    const onEdit = async (values,mode)=>{
        switch(mode){
            case "details":
                editExam(values)
                dispatch(getExam(props.match.params.id))
                setEdit(false)
                break;
                
            case "instructions":
                setEdit(false)
                break;
                
            case "questions":
                setEdit(false)
                break;
                
        }
    }

    if(loading && !progress ){ console.log("d",!!details);return (<SimpleLoading />)}
    else
    return (
        <div>
            <div className={classes.menuContainer}>
                <ExamDetailsMenu onEditClicked={onEditClicked} onDeleteClicked={onDeleteClicked}
                onDisableClicked={onDisableClicked}  disabled={details.Status==='active'}/>
            </div>
            {details.Status&&(<Chip size="small" label={details.Status} color={details.Status==="active"?'primary':"secondary"} />)}
            <Details details={details} edit={edit} onEdit={onEdit}/>
            <Instructions edit={false} onEdit={onEdit} instructions={instructions} />
            <Questions questions={questions} />
        </div>
    )
}
