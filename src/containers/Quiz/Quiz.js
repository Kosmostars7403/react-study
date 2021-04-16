import React from 'react'
import classes from './Quiz.css'
import ActiveQuiz from '../../components/ActiveQuiz/ActiveQuiz'
import FinishedQuiz from '../../components/FinishedQuiz/FinishedQuiz'

export default class Quiz extends React.Component {
  state = {
    results: {} ,
    isFinished: false,
    activeQuestion: 0,
    answersState: null,
    quiz: [
      {
        id: 1,
        question: 'Your favorite band is ...?',
        rightAnswerId: 1,
        answers: [
          {text: 'Oasis', id:1},
          {text: 'Blur', id:2},
          {text: 'Led Zeppelin', id:3},
          {text: 'Pink Floyd', id:4}
        ]
      },
      {
        id: 2,
        question: 'In what year was the Saint-Petersburg founded?',
        rightAnswerId: 4,
        answers: [
          {text: '1700', id:1},
          {text: '1800', id:2},
          {text: '1900', id:3},
          {text: '1703', id:4}
        ]
      }
    ]
  }

  onAnswerClickHandler = (answerId) => {
    if (this.state.answersState){
      const key = Object.keys(this.state.answersState)[0]
      if ( this.state.answersState[key] === 'success') {
        return
      }
    }

    const question = this.state.quiz[this.state.activeQuestion]
    const results = this.state.results

    if (question.rightAnswerId === answerId) {
      if (!results[question.id]) {
        results[question.id] = 'success'
      }

      this.setState({
        answersState: {[answerId]: 'success'}
      })
      const timeout = window.setTimeout(() => {
        if (this.isQuizFinished()) {
          this.setState({
            isFinished: true
          })
        } else {
          this.setState({
            activeQuestion: this.state.activeQuestion + 1,
            answersState: null
          })
        }
        window.clearTimeout(timeout)
      }, 1000)
    } else {
      results[question.id] = 'fail'
      this.setState({
        answersState: {[answerId]: 'fail'},
        results
      })
    }
  }

  retryHandler = () => {
    this.setState({
      activeQuestion: 0,
      answersState: null,
      isFinished: false,
      results: {}
    })
  }

  componentDidMount() {
    console.log('QUIZ ID = ', this.props.match.params.id)
    console.log(this.props)
  }

  isQuizFinished() {
    return this.state.quiz.length === this.state.activeQuestion + 1
  }

  render() {
    return (
      <div className={classes.Quiz}>
        <div className={classes.QuizWrapper}>
          <h1>Quiz</h1>

          {
            this.state.isFinished
              ? <FinishedQuiz
                  results={this.state.results}
                  quiz={this.state.quiz}
                  onRetry={this.retryHandler}
                />
              : <ActiveQuiz
                question={this.state.quiz[this.state.activeQuestion].question}
                answers={this.state.quiz[this.state.activeQuestion].answers}
                onAnswerChoose={this.onAnswerClickHandler}
                quizLength={this.state.quiz.length}
                activeQuestion={this.state.activeQuestion + 1}
                state={this.state.answersState}
              />
          }

        </div>
      </div>
    )
  }
}
