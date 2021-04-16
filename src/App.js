import React, {Component} from "react";
import './App.scss';
import Layout from './hoc/Layout/Layout'
import Quiz from '../src/containers/Quiz/Quiz'
import {Route, Switch} from 'react-router-dom'
import QuizCreator from './containers/QuizCreator/QuizCreator'
import QuizList from './containers/QuizList/QuizList'
import Auth from './containers/Auth/Auth'


class App extends  Component {
  render() {
    return (
      <Layout>
        <Switch>
          <Route path="/auth" exact component={Auth}/>
          <Route path="/quiz-creator" exact component={QuizCreator}/>
          <Route path="/quiz/:id" exact component={Quiz}/>
          <Route path="/" exact component={QuizList}/>
        </Switch>
      </Layout>
    )
  }
}


export default App;
