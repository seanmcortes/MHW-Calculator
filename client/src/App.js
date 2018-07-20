import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  state = {
    weapons: []
  };

  componentDidMount() {
    this.getWeapons();
  }

  getWeapons = _ => {
    fetch('http://localhost:3000/test')
      .then(response => response.json())
      .then(response => this.setState({ weapons: response.data }))
      .catch(err => console.error(err))
  }

  renderWeapons = ({name}) => <option key={name}>{name}</option>

  testChange = (event) => {
  	fetch('http://localhost:3000/test', {
  		method: 'POST',
  		headers: {
  			'Content-Type': 'application/json'
  		},
  		body: JSON.stringify({
  			class: event.target.value
  		})
  	})
  	  .then(response => response.json())
  	  .then(response => this.setState({ weapons: response.data }))
  	  .catch(err => console.error(err))
  }

  render() {
    const { weapons } = this.state;
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          <select onChange={this.testChange}>
          	<option value="1">Great Sword</option>
          	<option value="2">Long Sword</option>
          	<option value="3">Sword and Shield</option>
          </select>
          <select>
          	{weapons.map(this.renderWeapons)}
          </select>
        </p>
      </div>
    );
  }
}

export default App;
