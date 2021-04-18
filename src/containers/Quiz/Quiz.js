import React from 'react'
import classes from './Quiz.css'
import ActiveQuiz from '../../components/ActiveQuiz/ActiveQuiz'
import FinishedQuiz from '../../components/FinishedQuiz/FinishedQuiz'
import Loader from '../../components/UI/Loader/Loader'
import {connect} from 'react-redux'
import {fetchQuiz, quizAnswerClick, retryQuiz} from '../../store/actions/quiz'

class Quiz extends React.Component {
  componentDidMount() {
    this.props.fetchQuiz(this.props.match.params.id)
  }

  componentWillUnmount() {
    this.props.retryQuiz()
  }

  render() {
    return (
      <div className={classes.Quiz}>
        <div className={classes.QuizWrapper}>
          <h1>Quiz</h1>

          {
            this.props.loading || !this.props.quiz
              ? <Loader/>
              : this.props.isFinished
                  ? <FinishedQuiz
                    results={this.props.results}
                    quiz={this.props.quiz}
                    onRetry={this.props.retryQuiz}
                  />
                  : <ActiveQuiz
                    question={this.props.quiz[this.props.activeQuestion].question}
                    answers={this.props.quiz[this.props.activeQuestion].answers}
                    onAnswerChoose={this.props.quizAnswerClick}
                    quizLength={this.props.quiz.length}
                    activeQuestion={this.props.activeQuestion + 1}
                    state={this.props.answersState}
                  />
          }

        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    results: state.quiz.results,
    isFinished: state.quiz.isFinished,
    activeQuestion: state.quiz.activeQuestion,
    answersState: state.quiz.answersState,
    quiz: state.quiz.quiz,
    loading: state.quiz.loading
  }
}

function mapDispatchToProps(dispatch) {
  return {
    fetchQuiz: (id) => dispatch(fetchQuiz(id)),
    quizAnswerClick: answerId => dispatch(quizAnswerClick(answerId)),
    retryQuiz: () => dispatch(retryQuiz())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Quiz)
