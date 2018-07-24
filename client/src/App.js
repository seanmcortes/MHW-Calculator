import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  state = {
    weapons: [],
    weaponType: [],
    monsters: [],
    weaponValue: 'None',
    monsterValue: 'None'
  };

  componentDidMount() {
    this.getWeapons();
    this.getMonsters();
    this.getWeaponType();
  }

  getWeapons = _ => {
    fetch('http://localhost:3000/weapon')
      .then(response => response.json())
      .then(response => this.setState({ weapons: response.data }))
      .catch(err => console.error(err))
  }

  getWeaponType = _ => {
    fetch('http://localhost:3000/weapon-type')
      .then(response => response.json())
      .then(response => this.setState({ weaponType: response.data }))
      .catch(err => console.error(err))
  }

  getMonsters = _ => {
    fetch('http://localhost:3000/monster')
      .then(response => response.json())
      .then(response => this.setState({ monsters: response.data }))
      .catch(err => console.error(err))
  }

  renderWeapons = ({ weapon_id, weapon_name }) => <option key={weapon_id} id={weapon_id}>{weapon_name}</option>

  renderMonsters = ({ monster_id, name }) => <option key={monster_id} id ={monster_id}>{name}</option>

  renderWeaponType = ({ weapon_list_id, name }) => <option key={weapon_list_id} id={weapon_list_id}>{name}</option>

  weaponTypeSelect = (event) => {
  	fetch('http://localhost:3000/weapon', {
  		method: 'POST',
  		headers: {
  			'Content-Type': 'application/json'
  		},
  		body: JSON.stringify({
  			class: event.target.value,
  		})
  	})
  	  .then(response => response.json())
  	  .then(response => this.setState({ weapons: response.data }))
  	  .catch(err => console.error(err))
  }

  weaponSelect = (event) => {
  	this.setState({
  		weaponValue: event.target.value
  	})
  }

  monsterSelect = (event) => {
    this.setState({
      monsterValue: event.target.value
    })
  }

  render() {
    const { weapons } = this.state;
    const { monsters } = this.state;
    const { weaponValue } = this.state;
    const { monsterValue } = this.state;
    const { weaponType } = this.state;
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          <select onChange={this.weaponTypeSelect}>
          	<option value="0">All</option>
          	{weaponType.map(this.renderWeaponType)}
          </select>
          <select onChange={this.weaponSelect}>
            <option value="None">None</option>
          	{weapons.map(this.renderWeapons)}
          </select>
          <select onChange={this.monsterSelect}>
            <option value="None">None</option>
            {monsters.map(this.renderMonsters)}
          </select>
        </p>
        <MonsterData wep={weaponValue} mon={monsterValue}/>
      </div>
    );
  }
}


class MonsterData extends Component {
  state={
    hitzone: []
  }

  componentDidUpdate(prevProps){
    if(this.props.wep !== prevProps.wep || this.props.mon !== prevProps.mon){
      this.getHitZones(this.props.mon)
    }

  }

  getHitZones = (prop) => {
    fetch('http://localhost:3000/hitzone', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: prop
      })
    })
    .then(response => response.json())
    .then(response => this.setState({ hitzone: response.data }))
    .catch(err => console.error(err))
  }

  renderHitZones = ({ monster_id, name, part, sever, blunt, shot, fire, water, thunder, ice, dragon, stun}) =>
    <tr key={monster_id}> 
      <td key={monster_id + 'part'}>{part}</td>
      <td key={monster_id + 'sever'}>{sever}</td>
      <td key={monster_id + 'blunt'}>{blunt}</td>
      <td key={monster_id + 'shot'}>{shot}</td>
      <td key={monster_id + 'fire'}>{fire}</td>
      <td key={monster_id + 'water'}>{water}</td>
      <td key={monster_id + 'thunder'}>{thunder}</td>
      <td key={monster_id + 'ice'}>{ice}</td>
      <td key={monster_id + 'dragon'}>{dragon}</td>
      <td key={monster_id + 'stun'}>{stun}</td>
    </tr>
  

  render(){
    const { hitzone } = this.state;
    return(
	  <div>
	    <p>{this.props.wep} </p>
	    <p>{this.props.mon}</p>
      <table>
        <tbody>
          {hitzone.map(this.renderHitZones)}
        </tbody>
      </table>
      
	  </div>
    );
  }
}

export default App;
