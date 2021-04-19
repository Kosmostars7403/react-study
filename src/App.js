import React, {Component} from "react";
import './App.scss';
import Layout from './hoc/Layout/Layout'
import Quiz from '../src/containers/Quiz/Quiz'
import {Route, Switch, Redirect, withRouter} from 'react-router-dom'
import QuizCreator from './containers/QuizCreator/QuizCreator'
import QuizList from './containers/QuizList/QuizList'
import Auth from './containers/Auth/Auth'
import {connect} from 'react-redux'
import Logout from './components/Logout/Logout'
import {autoLogin} from './store/actions/auth'


class App extends  Component {

  componentDidMount() {
    this.props.autologin()
  }

  render() {
    let routes = (
      <Switch>
        <Route path="/auth" exact component={Auth}/>
        <Route path="/quiz/:id" exact component={Quiz}/>
        <Route path="/" exact component={QuizList}/>
        <Redirect to={'/'} />
      </Switch>
    )

    if (this.props.isAuthenticated) {
      routes = (
        <Switch>
          <Route path="/quiz-creator" exact component={QuizCreator}/>
          <Route path="/quiz/:id" exact component={Quiz}/>
          <Route path="/logout" exact component={Logout}/>
          <Route path="/" exact component={QuizList}/>
          <Redirect to={'/'} />
        </Switch>
      )
    }

    return (
      <Layout>
        { routes }
      </Layout>
    )
  }
}

function mapStateToProps(state) {
  return {
    isAuthenticated: !!state.auth.token
  }
}

function mapDispatchToProps(dispatch) {
  return {
    autologin: () => dispatch(autoLogin())
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App))
