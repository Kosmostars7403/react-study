import axios from '../../axios/axios-quiz'
import {
  FETCH_QUIZ_SUCCESS,
  FETCH_QUIZES_ERROR,
  FETCH_QUIZES_START,
  FETCH_QUIZES_SUCCESS, FINISH_QUIZ, QUIZ_NEXT_QUESTION, QUIZ_SET_STATE, RETRY_QUIZ
} from './actionTypes'

export function fetchQuizes() {
  return async dispatch => {
    dispatch(fetchQuizesStart())
    try {
      const response = await axios.get('/quizes.json')
      const quizes = []
      Object.keys(response.data).forEach((key, index) => {
        quizes.push(
          {
            id: key,
            name: index + 1,
            questions: response.data[key]
          }
        )
      })
      dispatch(fetchQuizesSuccess(quizes))
    } catch (e) {
      dispatch(fetchQuizesError(e))
    }
  }
}

export function fetchQuiz(id) {
  return async dispatch => {
    try {
      dispatch(fetchQuizesStart())
      const response = await axios.get(`/quizes/${id}.json`)
      dispatch(fetchQuizSuccess(response.data))
    } catch (e) {
      dispatch(fetchQuizesError(e))
    }
  }
}

export function fetchQuizesStart() {
  return {
    type: FETCH_QUIZES_START
  }
}

export function fetchQuizesError(e) {
  return {
    type: FETCH_QUIZES_ERROR,
    error: e
  }
}

export function fetchQuizesSuccess(quizes) {
  return {
    type: FETCH_QUIZES_SUCCESS,
    quizes
  }
}

export function fetchQuizSuccess(quiz) {
  return {
    type: FETCH_QUIZ_SUCCESS,
    quiz
  }
}

export function quizSetState(answerState, results) {
  return {
    type: QUIZ_SET_STATE,
    answerState, results
  }
}

export function finishQuiz() {
  return {
    type: FINISH_QUIZ,
    isFinished: true
  }
}

export function quizNextQuestion(questionNumber) {
  return {
    type: QUIZ_NEXT_QUESTION,
    questionNumber
  }
}

export function quizAnswerClick(answerId) {
  return (dispatch, getState) => {
    const state = getState().quiz
    if (state.answersState){
      const key = Object.keys(state.answersState)[0]
      if ( state.answersState[key] === 'success') {
        return
      }
    }

    const question = state.quiz[state.activeQuestion]
    const results = state.results

    if (question.rightAnswer === answerId) {
      if (!results[question.id]) {
        results[question.id] = 'success'
      }

      dispatch(quizSetState({[answerId]: 'success'}, results))
      const timeout = window.setTimeout(() => {
        if (isQuizFinished(state)) {
          dispatch(finishQuiz())
        } else {
          dispatch(quizNextQuestion(state.activeQuestion + 1))
        }
        window.clearTimeout(timeout)
      }, 1000)
    } else {
      results[question.id] = 'fail'
      dispatch(quizSetState({[answerId]: 'fail'}, results))
    }
  }
}

function isQuizFinished(state) {
  return state.activeQuestion + 1 === state.quiz.length
}

export function retryQuiz() {
  return {
    type: RETRY_QUIZ
  }
}
