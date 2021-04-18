import React, {Component} from 'react'
import classes from './QuizCreator.css'
import Input from '../../components/UI/Input/Input'
import Button from '../../components/UI/Button/Button'
import {createControl, validate} from '../../formFramework/formFramework'
import axios from '../../axios/axios-quiz'
import Select from '../../components/UI/Select/Select'

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

function validateForm(formControls) {
  let isFormValid = true

  Object.keys(formControls).forEach(control => {
    isFormValid = formControls[control].valid && isFormValid
  })

  return isFormValid
}

export default class QuizCreator extends Component {

  state = {
    quiz: [],
    isFormValid: false,
    formControls: createFormControls(),
    rightAnswer: 1
  }

  submitHandler = event => {
    event.preventDefault()

  }

  addQuestionHandler = event => {
    event.preventDefault()

    const quiz = this.state.quiz.concat()
    const index = quiz.length + 1

    const {question, option1, option2, option3, option4} = this.state.formControls
    const questionItem = {
      question: question.value,
      id: index,
      rightAnswer: this.state.rightAnswer,
      answers: [
        {text: option1.value, id: option1.id},
        {text: option2.value, id: option2.id},
        {text: option3.value, id: option3.id},
        {text: option4.value, id: option4.id},
      ]
    }

    quiz.push(questionItem)

    this.setState({
      quiz,
      isFormValid: false,
      formControls: createFormControls(),
      rightAnswer: 1
    })
  }

  createQuestionHandler = async event => {
    event.preventDefault()

    try {
      await axios.post('/quizes.json', this.state.quiz)
      this.setState({
        quiz: [],
        isFormValid: false,
        formControls: createFormControls(),
        rightAnswer: 1
      })
    } catch (e) {
      console.log(e)
    }

  }

  onChangeHandler = (value, controlName) => {
    const formControls = {...this.state.formControls}
    const control = {...formControls[controlName]}

    control.touched = true
    control.value = value
    control.valid = validate(value, control.validation)

    formControls[controlName] = control

    this.setState({
      formControls,
      isFormValid: validateForm(formControls)
    })

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

  selectChangeHandler = event => {
    this.setState({
      rightAnswer: +event.target.value
    })
  }

  render() {
    return (
      <div className={classes.QuizCreator}>
        <div>
          <h1>Create a Quiz</h1>
          <form onSubmit={this.submitHandler}>
            { this.renderControls() }

            <Select
              label="Choose the right answer."
              value={this.state.rightAnswer}
              onChange={this.selectChangeHandler}
              options={[
                {name: '1', value: 1},
                {name: '2', value: 2},
                {name: '3', value: 3},
                {name: '4', value: 4}
              ]}
            />

            <Button
              type="primary"
              onClick={this.addQuestionHandler}
              disabled={!this.state.isFormValid}
            >
              Add question
            </Button>

            <Button
              type="success"
              onClick={this.createQuestionHandler}
              disabled={this.state.quiz.length === 0}
            >
              Create quiz
            </Button>
          </form>
        </div>
      </div>
      )
    }
}
