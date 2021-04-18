import {CREATE_QUIZ_QUESTION, FINISH_QUIZ_CREATION, RESET_QUIZ_CREATION} from './actionTypes'
import axios from '../../axios/axios-quiz'

export function createQuizQuestion(question) {
  return {
    type: CREATE_QUIZ_QUESTION,
    question
  }
}

export function resetQuizCreation() {
  return {
    type: RESET_QUIZ_CREATION,
  }
}

export function finishQuizCreation() {
  return async (dispatch, getState) => {
    const state = getState()
    try {
      await axios.post('/quizes.json', state.create.quiz)
      dispatch(resetQuizCreation())
    } catch (e) {

    }
  }
}
