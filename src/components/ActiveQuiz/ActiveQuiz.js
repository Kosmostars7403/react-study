import React from 'react'
import classes from './ActiveQuiz.css'
import AnswersList from './AnswersList/AnswersList'


const ActiveQuiz = props => (
  <div className={classes.ActiveQuiz}>
    <p className={classes.Question}>
      <span>
        <strong>{props.activeQuestion}</strong>&nbsp;
        {props.question}
      </span>

      <small>{props.activeQuestion} из {props.quizLength}</small>
    </p>
    <AnswersList
      state={props.state}
      answers={props.answers}
      onAnswerChoose={props.onAnswerChoose}
    />
  </div>
)

export default ActiveQuiz
