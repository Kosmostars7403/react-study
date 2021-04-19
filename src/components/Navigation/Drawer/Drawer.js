import React from 'react'
import classes from './Drawer.css'
import Backdrop from '../../UI/Backdrop/Backdrop'
import {NavLink} from 'react-router-dom'


class Drawer extends React.Component {

  renderLinks(links) {
    return links.map((link, index) => {
      return (
        <li key={index}>
          <NavLink
            to={link.to}
            exact={link.exact}
            activeClassName={classes.active}
            onClick={this.props.onClose}
          >
            {link.label}
          </NavLink>
        </li>
      )
    })
  }
  render() {
    const cls = [classes.Drawer]

    if (!this.props.isOpen) {
      cls.push(classes.close)
    }

    const links = [
      {to: '/', label: 'Список', exact: true},
    ]

    if (this.props.isAuthenticated) {
      links.push(
        {to: '/quiz-creator', label: 'Создать тест', exact: false},
        {to: '/logout', label: 'Выйти', exact: false}
      )
    } else {
      links.push(
        {to: '/auth', label: 'Авторизация', exact: false},
      )
    }

    return (
      <>
        <nav className={cls.join(' ')}>
          <ul>
            {this.renderLinks(links)}
          </ul>
        </nav>
        {
          this.props.isOpen
            ? <Backdrop
              onBackdropClick={this.props.onClose}
            />
            : null
        }
      </>
    )
  }
}

export default Drawer
