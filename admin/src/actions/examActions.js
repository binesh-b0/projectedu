import api from '../api/api';
import { GET_ALL_EXAMS, GET_EXAM_DETAIL, GET_EXAM_INSTRUCTIONS, GET_EXAM_QUESTIONS, PUBLISH_EXAM_FAIL, PUBLISH_EXAM_REQUEST, PUBLISH_EXAM_SUCCESS } from '../constants/examConstants';
import { getCredentials } from '../services/authService';

const getAllExams = () => {
    return async (dispatch) => {
        try {
            const { data } = await api.post(
                '/admin/getAdminUsers',
                {},
                {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${getCredentials()}`,
                    },
                },
                {timeout:1000}
            );
            dispatch({
                type: GET_ALL_EXAMS,
                payload: data.response,
            });
        } catch (error) {
            console.log(error);
        }
    };
};

const getExamDetails=details=>({type:GET_EXAM_DETAIL,details:details})
const getExamInstructions=instructions=>({type:GET_EXAM_INSTRUCTIONS,instructions:instructions})
const getExamQuestions=questions=>({type:GET_EXAM_QUESTIONS,questions:questions})

const createExam = ()=>{
    return async (dispatch,getState) => {
        dispatch({type:PUBLISH_EXAM_REQUEST})
        try {
            const { data } = await api.post(
                '/admin/createExam',
                {exam:getState().details,instructions:getState().instructions,questions:getState().questions},
                {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${getCredentials()}`,
                    },
                },
                {timeout:1000}
            );
            dispatch({
                type: PUBLISH_EXAM_SUCCESS,
                payload: data.response,
            });
        } catch (error) {
            console.log(error);
            dispatch({type:PUBLISH_EXAM_FAIL})
        }
    };
}

const resetPublishExam = ()=>({type:"RESET_PUBLISH_EXAM"})

export {
    getAllExams,
    createExam,
    getExamDetails,
    getExamQuestions,
    getExamInstructions,
    resetPublishExam
}