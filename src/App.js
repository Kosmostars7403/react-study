import React, {Component} from "react";
import './App.scss';
import Car from './Car/Car'

class App extends  Component {

  state = {
    cars: [
      {brand: 'KIA', year: '2020'},
      {brand: 'MERSEDES', year: '2012'},
      {brand: 'FORD', year: '2008'},
      {brand: 'BMW', year: '2021'},
    ],
    pageTitle: 'React Study!',
    showCars: true
  }

  changeTitle = (title) => {
    this.setState({
      pageTitle: title
    })
  }

  handleInput = (event) => {
    this.setState({
      pageTitle: event.target.value
    })
  }

  toggleCars = () => this.setState({showCars: !this.state.showCars})

  changeCarName(name, index) {
    const cars = [...this.state.cars]
    cars[index].brand = name
    this.setState({cars})
  }

  delete(index) {
    const cars = [...this.state.cars]
    cars.splice(index,1)
    this.setState({cars})
  }

  render() {
    const divStyle = {
      textAlign: 'center',
    }

    let cars = null

    if (this.state.showCars) {
      cars = this.state.cars.map((car, index) => {
        return (
          <Car
            key={index}
            brand={car.brand}
            year={car.year}
            onChangeTitle={() => this.changeTitle(car.brand)}
            onChangeCar={() => this.changeCarName('pew', index)}
            onCarDelete={this.delete.bind(this, index)}
          >
            <p>pew</p>
          </Car>
        )
      })
    }

    return (
      <div style={divStyle}>
        {/*<h1>{this.state.pageTitle}</h1>*/}
        <h1>{this.props.title}</h1>
        <input onChange={this.handleInput} />
        <button onClick={this.toggleCars}>toggleCars</button>
        { cars }
      </div>
    )
  }
}


export default App;
