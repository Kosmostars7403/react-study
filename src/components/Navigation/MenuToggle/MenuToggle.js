import classes from './MenuToggle.css'
import React from 'react'

const MenuToggle = props => {
  const cls = [
    classes.MenuToggle,
    'fa',
    props.isOpen ? 'fa-times ' + classes.open : 'fa-bars'
  ]


  return (
    <i
      className={cls.join(' ')}
      onClick={props.onToggle}
    />
  )
}

export default MenuToggle
