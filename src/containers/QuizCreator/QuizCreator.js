import React, {Component} from 'react'
import classes from './QuizCreator.css'
import Input from '../../components/UI/Input/Input'
import Button from '../../components/UI/Button/Button'
import {createControl} from '../../formFramework/formFramework'

function createOptionControl(number) {
  return createControl({
    id: number,
    label: `Option ${number}`,
    errorMessage: 'Option can\'t be empty'
  }, {required: true})
}

function createFormControls() {
  return {
    question: createControl({
      label: 'Enter a question',
      errorMessage: 'Question can\'t be empty'
    }, {required: true}),
    option1: createOptionControl(1),
    option2: createOptionControl(2),
    option3: createOptionControl(3),
    option4: createOptionControl(4),
  }
}

export default class QuizCreator extends Component {

  state = {
    quiz: [],
    formControls: createFormControls()
  }

  submitHandler = event => {
    event.preventDefault()

  }

  addQuestionHandler = () => {

  }

  createQuestionHandler = () => {

  }

  onChangeHandler = (value, controlName) => {

  }

  renderControls() {
    return Object.keys(this.state.formControls)
      .map((controlName, index) => {
        const control = this.state.formControls[controlName]
        return (
          <React.Fragment key={index}>
            <Input
              label={control.label}
              value={control.value}
              valid={control.valid}
              shouldValidate={!!control.validation}
              touched={control.touched}
              errorMessage={control.errorMessage}
              onChange={event => this.onChangeHandler(event.target.value, controlName)}
            />
            {
              index === 0
                ? <hr/>
                : null
            }
          </React.Fragment>
        )
      })
  }

  render() {
    return (
      <div className={classes.QuizCreator}>
        <div>
          <h1>Create a Quiz</h1>
          <form onSubmit={this.submitHandler}>
            { this.renderControls() }

            <select></select>

            <Button
              type="primary"
              onClick={this.addQuestionHandler}
            >
              Add question
            </Button>

            <Button
              type="success"
              onClick={this.createQuestionHandler}
            >
              Create quiz
            </Button>
          </form>
        </div>
      </div>
      )
    }
}
