import {
  GET_ALL_EXAMS,
    GET_EXAM_DETAIL,
    GET_EXAM_INSTRUCTIONS,
    GET_EXAM_QUESTIONS,
  PUBLISH_EXAM_FAIL,
  PUBLISH_EXAM_REQUEST,
  PUBLISH_EXAM_SUCCESS,
} from "../constants/examConstants";

const details={
    title:"",
    startDate:"",
    endDate:"",
    startTime:"",
    endTime:"",
    duration:20,
}
const instructions=[
    "Culpa exercitation veniam elit do eu anim officia pariatur dolore minim.",
     "Adipisicing nulla culpa voluptate amet et dolore." ,
    "Eiusmod proident reprehenderit quis consequat sit elit labore.",
     "Culpa excepteur qui sit cupidatat." ,
     "In excepteur officia laborum labore laborum exercitation.",
    "Adipisicing eiusmod adipisicing eu eu fugiat ex commodo sunt laborum quis deserunt dolor nisi duis.",
  ]

function allExamsReducer(state = [], action) {
  switch (action.type) {
    case GET_ALL_EXAMS:
      return action.payload;
    default:
      return state;
  }
}
function publishExamReducer(state = {details:details,instructions:instructions,questions:[]}, action) {
  switch (action.type) {
    case PUBLISH_EXAM_REQUEST:
      return {loading:true,questions:action.questions,instructions:action.instructions,details:action.details};
    case PUBLISH_EXAM_SUCCESS:
      return {...state,loading:false,status:action.payload};
    case PUBLISH_EXAM_FAIL:
      return {...state,loading:false,status:action.payload};
    case GET_EXAM_DETAIL:
        return {...state,details:action.details}
    case GET_EXAM_INSTRUCTIONS:
        return {...state,instructions:action.instructions}
    case GET_EXAM_QUESTIONS:
        return {...state,questions:action.questions}   
    case "RESET_PUBLISH_EXAM":
        return {details:details,instructions:instructions,questions:[]}
    default:
      return state;
  }
}

export { allExamsReducer,publishExamReducer };
