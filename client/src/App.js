import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {  
	constructor(props){
		super(props);
		this.handleRadioClick = this.handleRadioClick.bind(this);
	}

	state = {
		weapons: [],
		weaponType: [],
		monsters: [],
		weaponValue: [],
		monsterValue: 'None',
		skills: {
			affinitySliding: 0,
			agitator: 0,
			attackBoost: 0,
			criticalBoost: 0,
			criticalEye: 0,
			dragonAttack: 0,
			fireAttack: 0,
			freeElem: 0,
			iceAttack: 0,
			latentPower: 0,
			maximumMight: 0,
			nonElementalBoost: 0,
			peakPerformance: 0,
			resentment: 0,
			thunderAttack: 0,
			waterAttack: 0,
			weaknessExploit: 0
		}
	};

	componentDidMount() {
		this.getWeapons();
		this.getMonsters();
		this.getWeaponType();
}

	componentDidUpdate(){
		console.log(this.state.skills);
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

	renderWeapons = ({ weapon_id, weapon_name }) => <option key={weapon_id} id={weapon_id} value={weapon_id}>{weapon_name}</option>

	renderMonsters = ({ monster_id, name }) => <option key={monster_id} id ={monster_id} value={monster_id}>{name}</option>

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
		fetch(`http://localhost:3000/weapon-select?id=` + event.target.value)
			.then(response => response.json())
			.then(response => this.setState({ weaponValue: response.data }))
			.catch(err => console.error(err))
	}

	monsterSelect = (event) => {
		this.setState({
			monsterValue: event.target.value
		})
	}

	handleRadioClick = (event) => {
		let box = document.getElementsByName(event.target.name);
		for(let [key, value] of Object.entries(this.state.skills)){
			if(key === event.target.name){
				let skills = Object.assign({}, this.state.skills);
				if(event.target.checked==true){
					for(var i = 0; i < event.target.id; i++){
						box[i].checked = true;
					}
					for(var i = (event.target.id + 1); i < box.length; i++){
						if(box[i] !== undefined)
							if(box[i].checked) box[i].checked = false;
					}
					skills[key] = event.target.value;
				}else{
					skills[key] = 0;
					for(var i = 0; i < box.length; i++){
						box[i].checked = false;
					}
				}
				this.setState({ skills: skills });
			}
		}
	}


	renderSkills =  _ => 
	<div>
		<label for="affinitySliding">Affinity Sliding</label>
		<input type="Checkbox" name="affinitySliding" value="30" id="0" onClick={this.handleRadioClick}></input>
		<label for="attackBoost">Attack Boost</label>
		<input type="Checkbox" name="attackBoost" value="3" id="0" onClick={this.handleRadioClick}></input>
		<input type="Checkbox" name="attackBoost" value="6" id="1" onClick={this.handleRadioClick}></input>
		<input type="Checkbox" name="attackBoost" value="9" id="2" onClick={this.handleRadioClick}></input>
		<input type="Checkbox" name="attackBoost" value="[12, 5]" id="3" onClick={this.handleRadioClick}></input>
		<input type="Checkbox" name="attackBoost" value="[15, 5]" id="4" onClick={this.handleRadioClick}></input>
		<input type="Checkbox" name="attackBoost" value="[18, 5]" id="5" onClick={this.handleRadioClick}></input>
		<input type="Checkbox" name="attackBoost" value="[21, 5]" id="6" onClick={this.handleRadioClick}></input>
	</div>


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
			{this.renderSkills()}
		</p>
		<MonsterData wep={weaponValue[0]} mon={monsterValue}/>
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
	fetch(`http://localhost:3000/hitzone?name=` + prop)
		.then(response => response.json())
		.then(response => this.setState({ hitzone: response.data }))
		.catch(err => console.error(err))
	}

	calcDamage = (sever, blunt, shot, fire, water, thunder, ice, dragon, stun) => {
	var weapon = this.props.wep;

	var severDamage, bluntDamage, shotDamage, stunDamage, totalDamage = 0;

	if(weapon.weapon_class == 5 || weapon.weapon_class == 6){
		var bluntDamage = Math.ceil((weapon.real_damage * (1 + 0.25 * (weapon.weapon_affinity/100))) * (blunt/100));
		totalDamage += bluntDamage;
	} else {
		var severDamage = Math.ceil((weapon.real_damage * (1 + 0.25 * (weapon.weapon_affinity/100))) * (sever/100));
		totalDamage += severDamage;
	}

	var trueElement = weapon.element_damage/10;

	switch(weapon.element_type){
		case "":
		break;
		case "Fire":
		var fireDamage = Math.ceil(trueElement * (fire/100));
		totalDamage += fireDamage;
		break;
		case "Water":
		var waterDamage = Math.ceil(trueElement * (water/100));
		totalDamage += waterDamage;
		break;
		case "Thunder":
		var thunderDamage = Math.ceil(trueElement * (thunder/100));
		totalDamage += thunderDamage;
		break;
		case "Ice":
		var iceDamage = Math.ceil(trueElement * (ice/100));
		totalDamage += iceDamage;
		break;
		case "Dragon":
		var dragonDamage = Math.ceil(trueElement * (dragon/100));
		totalDamage += dragonDamage;
		break;
	}

	if(this.props.wep == undefined){console.log("props fail!")}
	return (
		<tr>
		<td></td>
		<td>{severDamage}</td>
		<td>{bluntDamage}</td>
		<td>{shotDamage}</td>
		<td>{fireDamage}</td>
		<td>{waterDamage}</td>
		<td>{thunderDamage}</td>
		<td>{iceDamage}</td>
		<td>{dragonDamage}</td>
		<td>{stunDamage}</td>
		<td>{totalDamage}</td>
		</tr>
	)
	}
	


	renderHitZones = ({ monster_part_id, name, part, sever, blunt, shot, fire, water, thunder, ice, dragon, stun}) =>
	<tbody>
	<tr key={monster_part_id}> 
		<td key={monster_part_id + 'part'}>{part}</td>
		<td key={monster_part_id + 'sever'}>{sever}</td>
		<td key={monster_part_id + 'blunt'}>{blunt}</td>
		<td key={monster_part_id + 'shot'}>{shot}</td>
		<td key={monster_part_id + 'fire'}>{fire}</td>
		<td key={monster_part_id + 'water'}>{water}</td>
		<td key={monster_part_id + 'thunder'}>{thunder}</td>
		<td key={monster_part_id + 'ice'}>{ice}</td>
		<td key={monster_part_id + 'dragon'}>{dragon}</td>
		<td key={monster_part_id + 'stun'}>{stun}</td>
	</tr>
	{this.calcDamage(sever, blunt, shot, fire, water, thunder,  ice, dragon, stun)}
	</tbody>
	

	render(){
	const { hitzone } = this.state;
	return(
		<div>
		<table>
		<tr>
			<th>Body Part</th>
			<th>Sever</th>
			<th>Blunt</th>
			<th>Shot</th>
			<th>Fire</th>
			<th>Water</th>
			<th>Thunder</th>
			<th>Ice</th>
			<th>Dragon</th>
			<th>Stun</th>
			<th>Total</th>
		</tr>
		{hitzone.map(this.renderHitZones)}
		</table>
		
		</div>
	);
	}
}

export default App;
