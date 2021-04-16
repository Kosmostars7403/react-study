import classes from './Car.module.scss'

export default (props) => {
  let inputClasses = ['input']

  if (props.name !== '') {
    inputClasses.push('green')
  } else {
    inputClasses.push('red')
  }

  return (
    <div className={classes.car}>
      <h3>Car: {props.brand}</h3>
      <strong>Year: {props.year}</strong>
      {props.children}
      <button onClick={props.onChangeTitle}>CLICK</button>
      <input type="text" className={inputClasses.join(' ')} value={props.name}/>
      <button onClick={props.onChangeCar}>Change car name</button>
      <button onClick={props.onCarDelete}>Delete</button>
    </div>
  )
}
