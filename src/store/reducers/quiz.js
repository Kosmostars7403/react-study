import {
  FETCH_QUIZ_SUCCESS,
  FETCH_QUIZES_ERROR,
  FETCH_QUIZES_START,
  FETCH_QUIZES_SUCCESS, FINISH_QUIZ, QUIZ_NEXT_QUESTION,
  QUIZ_SET_STATE, RETRY_QUIZ
} from '../actions/actionTypes'

const initialState = {
  loading: false,
  quizes: [],
  error: '',
  results: {},
  isFinished: false,
  activeQuestion: 0,
  answersState: null,
  quiz: null,
}

export default function quizReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_QUIZES_START:
      return {
        ...state,
        loading: true
      }
    case FETCH_QUIZES_SUCCESS:
      return {
        ...state,
        loading: false,
        quizes: action.quizes
      }
    case FETCH_QUIZES_ERROR:
      return {
        ...state,
        loading: false,
        error: action.error
      }
    case FETCH_QUIZ_SUCCESS:
      return {
        ...state,
        loading: false,
        quiz: action.quiz
      }
    case QUIZ_SET_STATE:
      return {
        ...state,
        answersState: action.answerState,
        results: action.results
      }
    case FINISH_QUIZ:
      return {
        ...state,
        isFinished: action.isFinished
      }
    case QUIZ_NEXT_QUESTION:
      return {
        ...state,
        activeQuestion: action.questionNumber,
        answersState: null
      }
    case RETRY_QUIZ:
      return {
        ...state,
        activeQuestion: 0,
        answersState: null,
        isFinished: false,
        results: {}
      }
    default:
      return state
  }
}
