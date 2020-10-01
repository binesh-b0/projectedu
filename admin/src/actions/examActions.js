import api from '../api/api';
import { GET_EXAM_FAIL,GET_EXAM_SUCCESS,GET_EXAM_REQUEST,GET_ALL_EXAMS, GET_EXAM_DETAIL, GET_EXAM_INSTRUCTIONS, GET_EXAM_QUESTIONS, PUBLISH_EXAM_FAIL, PUBLISH_EXAM_REQUEST, PUBLISH_EXAM_SUCCESS } from '../constants/examConstants';
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
const getExam = (id) => {
    return async (dispatch) => {
        try {
            dispatch({type:GET_EXAM_REQUEST})

            const {data} = await api.post(
                '/admin/getExamDetails',{id},
                {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${getCredentials()}`,
                    },
                },
                {timeout:1000}
            );
            console.log(data)
            dispatch({
                type: GET_EXAM_SUCCESS,
                details:data.response.exam,
                questions:data.response.questions,
                instructions:data.response.instructions,
            });
        } catch (error) {
            console.log(error);
            dispatch({type:GET_EXAM_FAIL})

        }
    };
};

const getExamDetails=details=>({type:GET_EXAM_DETAIL,details:details})
const getExamInstructions=instructions=>({type:GET_EXAM_INSTRUCTIONS,instructions:instructions})
const getExamQuestions=questions=>({type:GET_EXAM_QUESTIONS,questions:questions})

const createExam = (details,instructions,questions)=>{
    return async (dispatch,getState) => {
        dispatch({type:PUBLISH_EXAM_REQUEST})
        try {
            console.log(getState().publishExam)
            const { data } = await api.post(
                '/admin/createExam',
                {exam:details,instructions:instructions,questions:questions},
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
    resetPublishExam,
    getExam,
}