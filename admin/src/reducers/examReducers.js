
import {GET_ALL_EXAMS} from '../constants/examConstants';

function allExamsReducer(state = [], action) {
    switch (action.type) {
        case GET_ALL_EXAMS:
            return action.payload;
        default:
            return state;
    }
}

export {
    allExamsReducer
}