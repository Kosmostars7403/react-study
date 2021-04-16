import React from 'react'
import classes from './AnswersList.css'
import AnswerItem from './AnswerItem/AnswerItem'

const AnswersList = props => {
  return (
    <ul className={classes.AnswerList}>
      {props.answers.map((answer, index) => {
        return (
          <AnswerItem
            key={index}
            state={props.state ? props.state[answer.id] : null}
            answer={answer}
            onAnswerChoose={props.onAnswerChoose}
          />
        )
      })}
    </ul>
  )
}

export default AnswersList
