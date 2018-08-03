import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Hitzone from './components/Hitzone';
import Calculator from './components/Calculator'

import { Button, Form, FormGroup, Label, FormText, Input, InputGroup, Collapse, Card, CardBody, Row, Col, Container} from 'reactstrap';

// import SelectSearch from 'react-select-search'

class App extends Component {  
	constructor(props){
		super(props);
		this.handleRadioClick = this.handleSkillBoxClick.bind(this);
		this.toggle = this.toggle.bind(this);
	}

	toggle() {
		this.setState({ collapse: !this.state.collapse });
	}

	state = {
		collapse: false,
		weapons: [],
		weaponType: [],
		monsters: [],
		weaponValue: {
	      weapon_id: 0,
	      weapon_name: '',
	      bloat_damage: 0,
	      real_damage: 0,
	      element_damage: 0,
	      element_type: '',
	      weapon_affinity: 0,
	      weapon_class: 0,
    	},
    weaponSharpness: [0, 0],
		monsterValue: [],
		skills: {
	      affinitySliding: ['',0],
	      agitator: ['','0-0'],
	      attackBoost: ['','0-0'],
	      criticalBoost: ['',0],
	      criticalElement: ['',0],
	      criticalEye: ['',0],
	      dragonAttack: ['','0-1'],
	      fireAttack: ['','0-1'],
	      fortify: ['',0],
	      freeElem: ['',0],
	      heroics: ['',0],
	      iceAttack: ['','0-1'],
	      latentPower: ['',0],
	      maximumMight: ['',0],
	      nonElementalBoost: ['',0],
	      peakPerformance: ['',0],
	      resentment: ['',0],
	      thunderAttack: ['','0-1'],
	      waterAttack: ['','0-1'],
	      weaknessExploit: ['',0]
    	}
	};

	componentDidMount() {
		this.getWeapons();
		this.getMonsters();
		this.getWeaponType();
  }

	componentDidUpdate(){
	}

  /*
    Render methods--
    WeaponType: populate weapon type dropdown from query from `weapon_list`
    Weapons: populate weapon dropdown with weapon names from `weapon` based on weapon type selection
    Monsters: query from `monster_list`
    Skills: render skills. No query, pure DOM.
  */
  renderWeaponType = ({ weapon_list_id, name }) => <option key={weapon_list_id} id={weapon_list_id}>{name}</option>
  
  renderWeapons = ({ weapon_id, weapon_name }) => <option key={weapon_id} id={weapon_id} value={weapon_id}>{weapon_name}</option>
  
  renderMonsters = ({ monster_id, name }) => <option key={monster_id} id ={monster_id} value={monster_id}>{name}</option>
  
  renderSkills =  _ =>
  <Container fluid id="skills-container">
  	<Row>
  		<Col xs="4">
        <InputGroup>
          <Label>Affinity Sliding</Label>
          <Input type="checkbox" name="affinitySliding" value="30" id="0" onChange={this.handleSkillBoxClick}></Input>
        </InputGroup>
  		</Col>
  		<Col xs="4">
        <InputGroup>
            <Label style={{ fontSize: '10px' }}>Agitator {this.state.skills.agitator[0]}</Label>
            <Input type="checkbox" name="agitator" value="4-3" id="0" onChange={this.handleSkillBoxClick}></Input>
            <Input type="checkbox" name="agitator" value="8-6" id="1" onChange={this.handleSkillBoxClick}></Input>
            <Input type="checkbox" name="agitator" value="12-9" id="2" onChange={this.handleSkillBoxClick}></Input>
            <Input type="checkbox" name="agitator" value="16-12" id="3" onChange={this.handleSkillBoxClick}></Input>
            <Input type="checkbox" name="agitator" value="20-15" id="4" onChange={this.handleSkillBoxClick}></Input>
        </InputGroup>
  		</Col>
  		<Col xs="4">
        <InputGroup>
          <Label style={{ fontSize: '10px' }}>Attack Boost {this.state.skills.attackBoost[0]}</Label>
          <Input type="checkbox" name="attackBoost" value="3-0" id="0" onChange={this.handleSkillBoxClick}></Input>
          <Input type="checkbox" name="attackBoost" value="6-0" id="1" onChange={this.handleSkillBoxClick}></Input>
          <Input type="checkbox" name="attackBoost" value="9-0" id="2" onChange={this.handleSkillBoxClick}></Input>
          <Input type="checkbox" name="attackBoost" value="12-5" id="3" onChange={this.handleSkillBoxClick}></Input>
          <Input type="checkbox" name="attackBoost" value="15-5" id="4" onChange={this.handleSkillBoxClick}></Input>
          <Input type="checkbox" name="attackBoost" value="18-5" id="5" onChange={this.handleSkillBoxClick}></Input>
          <Input type="checkbox" name="attackBoost" value="21-5" id="6" onChange={this.handleSkillBoxClick}></Input>
        </InputGroup>
      </Col>
  	</Row>

  	<Row>
  		<Col xs="4">
  			<p>Critical Boost {this.state.skills.criticalBoost[0]}</p>
  		</Col>
  		<Col xs="4">
  			<p>Critical Boost {this.state.skills.criticalBoost[0]}</p>
  		</Col>
  		<Col xs="4">
  			<p>Critical Element </p>
  		</Col>
  	</Row>
    <Row>
      <Col xs="4">
        <Input type="checkbox" name="criticalBoost" value="0.30" id="0" onChange={this.handleSkillBoxClick}></Input>
        <Input type="checkbox" name="criticalBoost" value="0.35" id="1" onChange={this.handleSkillBoxClick}></Input>
        <Input type="checkbox" name="criticalBoost" value="0.40" id="2" onChange={this.handleSkillBoxClick}></Input>
      </Col>
      <Col xs="4">
        <Input type="checkbox" name="criticalBoost" value="0.30" id="0" onChange={this.handleSkillBoxClick}></Input>
        <Input type="checkbox" name="criticalBoost" value="0.35" id="1" onChange={this.handleSkillBoxClick}></Input>
        <Input type="checkbox" name="criticalBoost" value="0.40" id="2" onChange={this.handleSkillBoxClick}></Input>
      </Col> 
      <Col xs="4">
        <Input type="checkbox" name="criticalElement" value=".2-.275-.35" id="0" onChange={this.handleSkillBoxClick}></Input>
      </Col>
    </Row>

    <Row>
      <Col xs="4">
        <label htmlFor="criticalEye">Critical Eye {this.state.skills.criticalEye[0]}</label>
      </Col>
      <Col xs="4">
        <label htmlFor="dragonAttack">Dragon Attack {this.state.skills.dragonAttack[0]}</label>
      </Col>
      <Col xs="4">
        <label htmlFor="fireAttack">Fire Attack {this.state.skills.fireAttack[0]}</label>
      </Col>
    </Row>
    <Row>
      <Col xs="4">
        <input type="checkbox" name="criticalEye" value="3" id="0" onChange={this.handleSkillBoxClick}></input>
        <input type="checkbox" name="criticalEye" value="6" id="1" onChange={this.handleSkillBoxClick}></input>
        <input type="checkbox" name="criticalEye" value="10" id="2" onChange={this.handleSkillBoxClick}></input>
        <input type="checkbox" name="criticalEye" value="15" id="3" onChange={this.handleSkillBoxClick}></input>
        <input type="checkbox" name="criticalEye" value="20" id="4" onChange={this.handleSkillBoxClick}></input>
        <input type="checkbox" name="criticalEye" value="25" id="5" onChange={this.handleSkillBoxClick}></input>
        <input type="checkbox" name="criticalEye" value="30" id="6" onChange={this.handleSkillBoxClick}></input>>
      </Col>
      <Col xs="4">
        <input type="checkbox" name="dragonAttack" value="30-1" id="0" onChange={this.handleSkillBoxClick}></input>
        <input type="checkbox" name="dragonAttack" value="60-1" id="1" onChange={this.handleSkillBoxClick}></input>
        <input type="checkbox" name="dragonAttack" value="100-1" id="2" onChange={this.handleSkillBoxClick}></input>
        <input type="checkbox" name="dragonAttack" value="100-1.05" id="3" onChange={this.handleSkillBoxClick}></input>
        <input type="checkbox" name="dragonAttack" value="100-1.10" id="4" onChange={this.handleSkillBoxClick}></input>
      </Col> 
      <Col xs="4">
        <label htmlFor="fireAttack">Fire Attack {this.state.skills.fireAttack[0]}</label>
        <input type="checkbox" name="fireAttack" value="30-1" id="0" onChange={this.handleSkillBoxClick}></input>
        <input type="checkbox" name="fireAttack" value="60-1" id="1" onChange={this.handleSkillBoxClick}></input>
        <input type="checkbox" name="fireAttack" value="100-1.05" id="3" onChange={this.handleSkillBoxClick}></input>
        <input type="checkbox" name="fireAttack" value="100-1.10" id="4" onChange={this.handleSkillBoxClick}></input>
      </Col>
    </Row>

    <Container>

    

    
    

    

    <label htmlFor="fortify">Fortify {this.state.skills.fortify[0]}</label>
    <input type="checkbox" name="fortify" value="0.10" id="0" onChange={this.handleSkillBoxClick}></input>
    <input type="checkbox" name="fortify" value="0.20" id="1" onChange={this.handleSkillBoxClick}></input>

    <label htmlFor="freeElem">Free Element </label>
    <input type="checkbox" name="freeElem" value="1" id="0" onChange={this.handleSkillBoxClick}></input>

    <label htmlFor="heroics">Heroics {this.state.skills.heroics[0]}</label>
    <input type="Checkbox" name="heroics" value="0.05" id="0" onChange={this.handleSkillBoxClick}></input>
    <input type="Checkbox" name="heroics" value="0.1" id="1" onChange={this.handleSkillBoxClick}></input>
    <input type="Checkbox" name="heroics" value="0.15" id="2" onChange={this.handleSkillBoxClick}></input>
    <input type="Checkbox" name="heroics" value="0.2" id="3" onChange={this.handleSkillBoxClick}></input>
    <input type="Checkbox" name="heroics" value="0.3" id="4" onChange={this.handleSkillBoxClick}></input>

    <label htmlFor="iceAttack">Ice Attack {this.state.skills.iceAttack[0]}</label>
    <input type="Checkbox" name="iceAttack" value="30-1" id="0" onChange={this.handleSkillBoxClick}></input>
    <input type="Checkbox" name="iceAttack" value="60-1" id="1" onChange={this.handleSkillBoxClick}></input>
    <input type="Checkbox" name="iceAttack" value="100-1" id="2" onChange={this.handleSkillBoxClick}></input>
    <input type="Checkbox" name="iceAttack" value="100-1.05" id="3" onChange={this.handleSkillBoxClick}></input>
    <input type="Checkbox" name="iceAttack" value="100-1.10" id="4" onChange={this.handleSkillBoxClick}></input>

    <label htmlFor="latentPower">Latent Power {this.state.skills.latentPower[0]}</label>
    <input type="Checkbox" name="latentPower" value="10" id="0" onChange={this.handleSkillBoxClick}></input>
    <input type="Checkbox" name="latentPower" value="20" id="1" onChange={this.handleSkillBoxClick}></input>
    <input type="Checkbox" name="latentPower" value="30" id="2" onChange={this.handleSkillBoxClick}></input>
    <input type="Checkbox" name="latentPower" value="40" id="3" onChange={this.handleSkillBoxClick}></input>
    <input type="Checkbox" name="latentPower" value="50" id="4" onChange={this.handleSkillBoxClick}></input>

    <label htmlFor="maximumMight">Maximum Might {this.state.skills.maximumMight[0]}</label>
    <input type="Checkbox" name="maximumMight" value="10" id="0" onChange={this.handleSkillBoxClick}></input>
    <input type="Checkbox" name="maximumMight" value="20" id="1" onChange={this.handleSkillBoxClick}></input>
    <input type="Checkbox" name="maximumMight" value="30" id="2" onChange={this.handleSkillBoxClick}></input>

    <label htmlFor="nonElementalBoost">Non-Elemental Boost </label>
    <input type="Checkbox" name="nonElementalBoost" value="1.1" id="0" onChange={this.handleSkillBoxClick}></input>

    <label htmlFor="peakPerformance">Peak Performance {this.state.skills.peakPerformance[0]}</label>
    <input type="Checkbox" name="peakPerformance" value="5" id="0" onChange={this.handleSkillBoxClick}></input>
    <input type="Checkbox" name="peakPerformance" value="10" id="1" onChange={this.handleSkillBoxClick}></input>
    <input type="Checkbox" name="peakPerformance" value="20" id="2" onChange={this.handleSkillBoxClick}></input>

    <label htmlFor="resentment">Resentment {this.state.skills.resentment[0]}</label>
    <input type="Checkbox" name="resentment" value="5" id="0" onChange={this.handleSkillBoxClick}></input>
    <input type="Checkbox" name="resentment" value="10" id="1" onChange={this.handleSkillBoxClick}></input>
    <input type="Checkbox" name="resentment" value="15" id="2" onChange={this.handleSkillBoxClick}></input>
    <input type="Checkbox" name="resentment" value="20" id="3" onChange={this.handleSkillBoxClick}></input>
    <input type="Checkbox" name="resentment" value="25" id="4" onChange={this.handleSkillBoxClick}></input>

    <label htmlFor="thunderAttack">Thunder Attack {this.state.skills.thunderAttack[0]}</label>
    <input type="Checkbox" name="thunderAttack" value="30-1" id="0" onChange={this.handleSkillBoxClick}></input>
    <input type="Checkbox" name="thunderAttack" value="60-1" id="1" onChange={this.handleSkillBoxClick}></input>
    <input type="Checkbox" name="thunderAttack" value="100-1" id="2" onChange={this.handleSkillBoxClick}></input>
    <input type="Checkbox" name="thunderAttack" value="100-1.05" id="3" onChange={this.handleSkillBoxClick}></input>
    <input type="Checkbox" name="thunderAttack" value="100-1.10" id="4" onChange={this.handleSkillBoxClick}></input>

    <label htmlFor="waterAttack">Water Attack {this.state.skills.waterAttack[0]}</label>
    <input type="Checkbox" name="waterAttack" value="30-1" id="0" onChange={this.handleSkillBoxClick}></input>
    <input type="Checkbox" name="waterAttack" value="60-1" id="1" onChange={this.handleSkillBoxClick}></input>
    <input type="Checkbox" name="waterAttack" value="100-1" id="2" onChange={this.handleSkillBoxClick}></input>
    <input type="Checkbox" name="waterAttack" value="100-1.05" id="3" onChange={this.handleSkillBoxClick}></input>
    <input type="Checkbox" name="waterAttack" value="100-1.10" id="4" onChange={this.handleSkillBoxClick}></input>

    <label htmlFor="weaknessExploit">Weakness Exploit {this.state.skills.weaknessExploit[0]}</label>
    <input type="Checkbox" name="weaknessExploit" value="15" id="0" onChange={this.handleSkillBoxClick}></input>
    <input type="Checkbox" name="weaknessExploit" value="30" id="1" onChange={this.handleSkillBoxClick}></input>
    <input type="Checkbox" name="weaknessExploit" value="50" id="2" onChange={this.handleSkillBoxClick}></input>
    </Container>
  </Container>






    

   

    


  renderSharpness = _ =>
  	<div className="Sharpness-div">
  		<Input type="select" id="Sharpness-select" onChange={this.handleSharpnessSelect}>
  			<option key="NONE" value="" disabled selected>---</option>
  			<option key="RED" value="0.50-0.25">Red</option>
  			<option key="ORANGE" value="0.75-0.50">Orange</option>
  			<option key="YELLOW" value="1.00-0.75">Yellow</option>
  			<option key="GREEN" value="1.05-1.00">Green</option>
  			<option key="BLUE" value="1.20-1.0625">Blue</option>
  			<option key="WHITE" value="1.32-1.125">White</option>
  		</Input>
  	</div>

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
		fetch(`http://localhost:3000/weapon-select?id=` + event.target.value)
			.then(response => response.json())
			.then(response => this.setState({ weaponValue: response.data[0] }))
			.catch(err => console.error(err))
	}

	monsterSelect = (event) => {

    fetch(`http://localhost:3000/monster-select?id=` + event.target.value)
      .then(response => response.json())
      .then(response => this.setState({ monsterValue: response.data }))
      .catch(err => console.error(err))
	}

	handleSkillBoxClick = (event) => {
		let box = document.getElementsByName(event.target.name);
		for(let [key, value] of Object.entries(this.state.skills)){
			if(key === event.target.name){
				let skills = Object.assign({}, this.state.skills);
				if(event.target.checked==true){
					for(var i = 0; i < event.target.id; i++){
						box[i].checked = true;
					}
					for(i = (event.target.id + 1); i < box.length; i++){
						if(box[i] !== undefined)
							if(box[i].checked) box[i].checked = false;
					}
					skills[key][1] = event.target.value;
					skills[key][0] = Number(event.target.id) + 1;
				}else{
          if(event.target.name == "dragonAttack" ||
             event.target.name == "fireAttack" ||
             event.target.name == "iceAttack" ||
             event.target.name == "thunderAttack" ||
             event.target.name == "waterAttack"){
            skills[key][1] = '1-0';
            skills[key][0] = '';
          }
          else if
            (event.target.name == "agitator" ||
             event.target.name == "attackBoost"){
            skills[key][1] = '0-0';
            skills[key][0] = '';
            }
          else{
            skills[key][1] = 0;
            skills[key][0] = '';
          }

					for(i = 0; i < box.length; i++){
						box[i].checked = false;
					}
				}
				this.setState({ skills: skills });
			}
		}
	}

	handleSharpnessSelect = (event) => { 
		let sharpnessSelect = event.target.value.toString().split('-');
		this.setState({ weaponSharpness: sharpnessSelect});
	}

	render() {
  	const { weapons } = this.state;
  	const { monsters } = this.state;
  	const { weaponValue } = this.state;
  	const { monsterValue } = this.state;
  	const { weaponType } = this.state;
  	const { skills } = this.state;
  	const { weaponSharpness } = this.state;

  	return (
  		<div className="App">
  			<Container fluid>
  				<Row>
  					<Col md="6">
	  					<Form id="weapon-1-form">
		    				<FormGroup>
				    			<Input type="select" name="select" id="Weapon-type-select" onChange={this.weaponTypeSelect}>
					    			<option value="0">All</option>
					    			{weaponType.map(this.renderWeaponType)}
					    		</Input>
		    				</FormGroup>
		    				<FormGroup>
					    		<Input type="select" name="select" id="Weapon-select" onChange={this.weaponSelect}>
					    			<option value="None">None</option>
					    			{weapons.map(this.renderWeapons)}
					    		</Input>
		    				</FormGroup>
		    				<FormGroup>
		    					{this.renderSharpness()}
		    				</FormGroup>
		    				<FormGroup>
					    		<Input type="select" id="Monster-select" onChange={this.monsterSelect}>
					    			<option value="None">None</option>
					    			{monsters.map(this.renderMonsters)}
					    		</Input>
		    				</FormGroup>
	    				</Form>
  					</Col>
  				</Row>
  				<Row>
  					<Col md="6">
	  					<Button onClick={this.toggle} style={{ marginBottom: '1rem' }} size="sm">Skills</Button>
	    				<Collapse isOpen={this.state.collapse}>
	    					<Card>
	    						<CardBody>
	    							{this.renderSkills()}
	    						</CardBody>
	    					</Card>
	    				</Collapse>
  					</Col>
  				</Row>
  			</Container>
    		
    		<Hitzone monster={monsterValue} />
        <Calculator weapon={weaponValue} monster={monsterValue} skills={skills} sharpness={weaponSharpness}/>

        <Button color="danger">Danger!</Button>
  		</div>
  	);
  }
}

export default App;
