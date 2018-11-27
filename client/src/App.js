import React, { Component } from 'react';
import './App.css';
import Hitzone from './components/Hitzone';
import Calculator from './components/Calculator'
import WeaponInfo from './components/WeaponInfo'

import { Button, Form, FormGroup, Input, Collapse, 
  Card, CardBody, CardHeader, Row, Col, Container, Navbar, Nav, NavItem } from 'reactstrap';

const API = 'http://the-handlers-notes.herokuapp.com'
// const API = 'http://localhost:3000'

class App extends Component {  
	constructor(props){
		super(props);
		this.handleSkillBoxClick = this.handleSkillBoxClick.bind(this);
    this.handleSaveClick = this.handleSaveClick.bind(this);
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
	      affinitySliding: [0,0],
	      agitator: [0,'0-0'],
	      attackBoost: [0,'0-0'],
	      criticalBoost: [0,0],
	      criticalElement: [0,0],
	      criticalEye: [0,0],
	      dragonAttack: [0,'0-1'],
	      fireAttack: [0,'0-1'],
	      fortify: [0,0],
	      freeElem: [0,0],
	      heroics: [0,0],
	      iceAttack: [0,'0-1'],
	      latentPower: [0,0],
	      maximumMight: [0,0],
	      nonElementalBoost: [0,0],
	      peakPerformance: [0,0],
	      resentment: [0,0],
	      thunderAttack: [0,'0-1'],
	      waterAttack: [0,'0-1'],
	      weaknessExploit: [0,0]
    	},
    savedState: {},
    index: 0
	};

	componentDidMount() {
    document.title = "the Handler's Notes";
		this.getWeapons();
		this.getMonsters();
		this.getWeaponType();
  }

	componentDidUpdate(prevState){
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
  <Container fluid className="skills-container">
  	<Row>
  		<Col xs="4">
        <label className="skills-label">Affinity Sliding:</label><br className="skills-br"></br>
        <input type="checkbox" className="input-checkbox" name="affinitySliding" value="30" id="0" onChange={this.handleSkillBoxClick}></input>
  		</Col>
  		<Col xs="4">
        <label className="skills-label">Agitator:</label><br/>
        <input type="checkbox" className="input-checkbox" name="agitator" value="4-3" id="0" onChange={this.handleSkillBoxClick}></input>
        <input type="checkbox" className="input-checkbox" name="agitator" value="8-6" id="1" onChange={this.handleSkillBoxClick}></input>
        <input type="checkbox" className="input-checkbox" name="agitator" value="12-9" id="2" onChange={this.handleSkillBoxClick}></input>
        <input type="checkbox" className="input-checkbox" name="agitator" value="16-12" id="3" onChange={this.handleSkillBoxClick}></input>
        <input type="checkbox" className="input-checkbox" name="agitator" value="20-15" id="4" onChange={this.handleSkillBoxClick}></input>
  		</Col>
  		<Col xs="4">
        <label className="skills-label">Attack Boost:</label><br></br>
        <input type="checkbox" className="input-checkbox" name="attackBoost" value="3-0" id="0" onChange={this.handleSkillBoxClick}></input>
        <input type="checkbox" className="input-checkbox" name="attackBoost" value="6-0" id="1" onChange={this.handleSkillBoxClick}></input>
        <input type="checkbox" className="input-checkbox" name="attackBoost" value="9-0" id="2" onChange={this.handleSkillBoxClick}></input>
        <input type="checkbox" className="input-checkbox" name="attackBoost" value="12-5" id="3" onChange={this.handleSkillBoxClick}></input>
        <input type="checkbox" className="input-checkbox" name="attackBoost" value="15-5" id="4" onChange={this.handleSkillBoxClick}></input>
        <input type="checkbox" className="input-checkbox" name="attackBoost" value="18-5" id="5" onChange={this.handleSkillBoxClick}></input>
        <input type="checkbox" className="input-checkbox" name="attackBoost" value="21-5" id="6" onChange={this.handleSkillBoxClick}></input>
      </Col>
  	</Row>

    <Row>
      <Col xs="4">
        <label className="skills-label">Critical Boost:</label><br></br>
        <input type="checkbox" className="input-checkbox" name="criticalBoost" value="0.30" id="0" onChange={this.handleSkillBoxClick}></input>
        <input type="checkbox" className="input-checkbox" name="criticalBoost" value="0.35" id="1" onChange={this.handleSkillBoxClick}></input>
        <input type="checkbox" className="input-checkbox" name="criticalBoost" value="0.40" id="2" onChange={this.handleSkillBoxClick}></input>
      </Col>
      <Col xs="4">
        <label className="skills-label">Critical Element:</label><br></br>
        <input type="checkbox" className="input-checkbox" name="criticalElement" value=".2-.275-.35" id="0" onChange={this.handleSkillBoxClick}></input>
      </Col>
      <Col xs="4">
        <label className="skills-label">Critical Eye:</label><br></br>
        <input type="checkbox" className="input-checkbox" name="criticalEye" value="3" id="0" onChange={this.handleSkillBoxClick}></input>
        <input type="checkbox" className="input-checkbox" name="criticalEye" value="6" id="1" onChange={this.handleSkillBoxClick}></input>
        <input type="checkbox" className="input-checkbox" name="criticalEye" value="10" id="2" onChange={this.handleSkillBoxClick}></input>
        <input type="checkbox" className="input-checkbox" name="criticalEye" value="15" id="3" onChange={this.handleSkillBoxClick}></input>
        <input type="checkbox" className="input-checkbox" name="criticalEye" value="20" id="4" onChange={this.handleSkillBoxClick}></input>
        <input type="checkbox" className="input-checkbox" name="criticalEye" value="25" id="5" onChange={this.handleSkillBoxClick}></input>
        <input type="checkbox" className="input-checkbox" name="criticalEye" value="30" id="6" onChange={this.handleSkillBoxClick}></input>
      </Col>
    </Row>

    <Row>
      <Col xs="4">
        <label className="skills-label">Dragon Attack:</label><br></br>
        <input type="checkbox" className="input-checkbox" name="dragonAttack" value="30-1" id="0" onChange={this.handleSkillBoxClick}></input>
        <input type="checkbox" className="input-checkbox" name="dragonAttack" value="60-1" id="1" onChange={this.handleSkillBoxClick}></input>
        <input type="checkbox" className="input-checkbox" name="dragonAttack" value="100-1" id="2" onChange={this.handleSkillBoxClick}></input>
        <input type="checkbox" className="input-checkbox" name="dragonAttack" value="100-1.05" id="3" onChange={this.handleSkillBoxClick}></input>
        <input type="checkbox" className="input-checkbox" name="dragonAttack" value="100-1.10" id="4" onChange={this.handleSkillBoxClick}></input>
      </Col>
      <Col xs="4">
        <label className="skills-label">Fire Attack:</label><br></br>
        <input type="checkbox" className="input-checkbox" name="fireAttack" value="30-1" id="0" onChange={this.handleSkillBoxClick}></input>
        <input type="checkbox" className="input-checkbox" name="fireAttack" value="60-1" id="1" onChange={this.handleSkillBoxClick}></input>
        <input type="checkbox" className="input-checkbox" name="fireAttack" value="100-1.05" id="3" onChange={this.handleSkillBoxClick}></input>
        <input type="checkbox" className="input-checkbox" name="fireAttack" value="100-1.10" id="4" onChange={this.handleSkillBoxClick}></input>
      </Col>
      <Col xs="4">
        <label className="skills-label">Fortify:</label><br></br>
        <input type="checkbox" className="input-checkbox" name="fortify" value="0.10" id="0" onChange={this.handleSkillBoxClick}></input>
        <input type="checkbox" className="input-checkbox" name="fortify" value="0.20" id="1" onChange={this.handleSkillBoxClick}></input>
      </Col>
    </Row>

    <Row>
      <Col xs="4">
        <label className="skills-label">Free Element:</label><br></br>
        <input type="checkbox" className="input-checkbox" name="freeElem" value="1" id="0" onChange={this.handleSkillBoxClick}></input>
      </Col>
      <Col xs="4">
        <label className="skills-label">Heroics:</label><br></br>
        <input type="Checkbox" className="input-checkbox" name="heroics" value="0.05" id="0" onChange={this.handleSkillBoxClick}></input>
        <input type="Checkbox" className="input-checkbox" name="heroics" value="0.1" id="1" onChange={this.handleSkillBoxClick}></input>
        <input type="Checkbox" className="input-checkbox" name="heroics" value="0.15" id="2" onChange={this.handleSkillBoxClick}></input>
        <input type="Checkbox" className="input-checkbox" name="heroics" value="0.2" id="3" onChange={this.handleSkillBoxClick}></input>
        <input type="Checkbox" className="input-checkbox" name="heroics" value="0.3" id="4" onChange={this.handleSkillBoxClick}></input>
      </Col>
      <Col xs="4">
        <label className="skills-label">Ice Attack:</label><br></br>
        <input type="Checkbox" className="input-checkbox" name="iceAttack" value="30-1" id="0" onChange={this.handleSkillBoxClick}></input>
        <input type="Checkbox" className="input-checkbox" name="iceAttack" value="60-1" id="1" onChange={this.handleSkillBoxClick}></input>
        <input type="Checkbox" className="input-checkbox" name="iceAttack" value="100-1" id="2" onChange={this.handleSkillBoxClick}></input>
        <input type="Checkbox" className="input-checkbox" name="iceAttack" value="100-1.05" id="3" onChange={this.handleSkillBoxClick}></input>
        <input type="Checkbox" className="input-checkbox" name="iceAttack" value="100-1.10" id="4" onChange={this.handleSkillBoxClick}></input>
      </Col>
    </Row>

    <Row>
      <Col xs="4">
        <label className="skills-label">Latent Power:</label><br></br>
        <input type="Checkbox" className="input-checkbox" name="latentPower" value="10" id="0" onChange={this.handleSkillBoxClick}></input>
        <input type="Checkbox" className="input-checkbox" name="latentPower" value="20" id="1" onChange={this.handleSkillBoxClick}></input>
        <input type="Checkbox" className="input-checkbox" name="latentPower" value="30" id="2" onChange={this.handleSkillBoxClick}></input>
        <input type="Checkbox" className="input-checkbox" name="latentPower" value="40" id="3" onChange={this.handleSkillBoxClick}></input>
        <input type="Checkbox" className="input-checkbox" name="latentPower" value="50" id="4" onChange={this.handleSkillBoxClick}></input>
      </Col>
      <Col xs="4">
        <label className="skills-label">Maximum Might:</label><br></br>
        <input type="Checkbox" className="input-checkbox" name="maximumMight" value="10" id="0" onChange={this.handleSkillBoxClick}></input>
        <input type="Checkbox" className="input-checkbox" name="maximumMight" value="20" id="1" onChange={this.handleSkillBoxClick}></input>
        <input type="Checkbox" className="input-checkbox" name="maximumMight" value="30" id="2" onChange={this.handleSkillBoxClick}></input>
      </Col>
      <Col xs="4">
        <label className="skills-label">Non-Elemental Boost:</label><br></br>
        <input type="Checkbox" className="input-checkbox" name="nonElementalBoost" value="1.1" id="0" onChange={this.handleSkillBoxClick}></input>
      </Col>
    </Row>

    <Row>
      <Col xs="4">
        <label className="skills-label">Peak Performance:</label><br></br>
        <input type="Checkbox" className="input-checkbox" name="peakPerformance" value="5" id="0" onChange={this.handleSkillBoxClick}></input>
        <input type="Checkbox" className="input-checkbox" name="peakPerformance" value="10" id="1" onChange={this.handleSkillBoxClick}></input>
        <input type="Checkbox" className="input-checkbox" name="peakPerformance" value="20" id="2" onChange={this.handleSkillBoxClick}></input>
      </Col>
      <Col xs="4">
        <label className="skills-label">Resentment:</label><br></br>
        <input type="Checkbox" className="input-checkbox" name="resentment" value="5" id="0" onChange={this.handleSkillBoxClick}></input>
        <input type="Checkbox" className="input-checkbox" name="resentment" value="10" id="1" onChange={this.handleSkillBoxClick}></input>
        <input type="Checkbox" className="input-checkbox" name="resentment" value="15" id="2" onChange={this.handleSkillBoxClick}></input>
        <input type="Checkbox" className="input-checkbox" name="resentment" value="20" id="3" onChange={this.handleSkillBoxClick}></input>
        <input type="Checkbox" className="input-checkbox" name="resentment" value="25" id="4" onChange={this.handleSkillBoxClick}></input>
      </Col>
      <Col xs="4">
        <label className="skills-label">Thunder Attack:</label><br></br>
        <input type="Checkbox" className="input-checkbox" name="thunderAttack" value="30-1" id="0" onChange={this.handleSkillBoxClick}></input>
        <input type="Checkbox" className="input-checkbox" name="thunderAttack" value="60-1" id="1" onChange={this.handleSkillBoxClick}></input>
        <input type="Checkbox" className="input-checkbox" name="thunderAttack" value="100-1" id="2" onChange={this.handleSkillBoxClick}></input>
        <input type="Checkbox" className="input-checkbox" name="thunderAttack" value="100-1.05" id="3" onChange={this.handleSkillBoxClick}></input>
        <input type="Checkbox" className="input-checkbox" name="thunderAttack" value="100-1.10" id="4" onChange={this.handleSkillBoxClick}></input>
      </Col>
    </Row>

    <Row>
      <Col xs="4">
        <label className="skills-label">Water Attack:</label><br></br>
        <input type="Checkbox" className="input-checkbox" name="waterAttack" value="30-1" id="0" onChange={this.handleSkillBoxClick}></input>
        <input type="Checkbox" className="input-checkbox" name="waterAttack" value="60-1" id="1" onChange={this.handleSkillBoxClick}></input>
        <input type="Checkbox" className="input-checkbox" name="waterAttack" value="100-1" id="2" onChange={this.handleSkillBoxClick}></input>
        <input type="Checkbox" className="input-checkbox" name="waterAttack" value="100-1.05" id="3" onChange={this.handleSkillBoxClick}></input>
        <input type="Checkbox" className="input-checkbox" name="waterAttack" value="100-1.10" id="4" onChange={this.handleSkillBoxClick}></input>
      </Col>
      <Col xs="4">
        <label className="skills-label">Weakness Exploit:</label><br></br>
        <input type="Checkbox" className="input-checkbox" name="weaknessExploit" value="15" id="0" onChange={this.handleSkillBoxClick}></input>
        <input type="Checkbox" className="input-checkbox" name="weaknessExploit" value="30" id="1" onChange={this.handleSkillBoxClick}></input>
        <input type="Checkbox" className="input-checkbox" name="weaknessExploit" value="50" id="2" onChange={this.handleSkillBoxClick}></input>
      </Col>
      <Col xs="4">
      </Col>
    </Row>
  </Container>

  renderSharpness = _ =>
  	<div className="sharpness-div">
  		<Input type="select" id="sharpness-select" size="sm" onChange={this.handleSharpnessSelect} required>
  			<option key="NONE" value="" disabled selected>Sharpness</option>
  			<option key="RED" value="0.50-0.25">Red</option>
  			<option key="ORANGE" value="0.75-0.50">Orange</option>
  			<option key="YELLOW" value="1.00-0.75">Yellow</option>
  			<option key="GREEN" value="1.05-1.00">Green</option>
  			<option key="BLUE" value="1.20-1.0625">Blue</option>
  			<option key="WHITE" value="1.32-1.125">White</option>
  		</Input>
  	</div>

  renderHeader = _ => {
    return(
      <div>
        <h1>{"the Handler's Notes"}</h1>
        <p>
          Specify a weapon, its sharpness level, offensive armor skills, and a target
          monster. <br />
          You may save a combination for comparison with others.
        </p>
      </div>
    )
  }

	getWeapons = _ => {
		fetch(API + `/weapon`)
			.then(response => response.json())
			.then(response => this.setState({ weapons: response.data }))
			.catch(err => console.error(err))
	}

	getWeaponType = _ => {
		fetch(API + `/weapon-type`)
			.then(response => response.json())
			.then(response => this.setState({ weaponType: response.data }))
			.catch(err => console.error(err))
	}

	getMonsters = _ => {
		fetch(API + `/monster`)
			.then(response => response.json())
			.then(response => this.setState({ monsters: response.data }))
			.catch(err => console.error(err))
	}

	weaponTypeSelect = (event) => {
		fetch(API + `/weapon`, {
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
		fetch(API + `/weapon-select?id=` + event.target.value)
			.then(response => response.json())
			.then(response => this.setState({ weaponValue: response.data[0] }))
			.catch(err => console.error(err))
	}

	monsterSelect = (event) => {
    fetch(API + `/monster-select?id=` + event.target.value)
      .then(response => response.json())
      .then(response => this.setState({ monsterValue: response.data }))
      .catch(err => console.error(err))
	}

	handleSkillBoxClick = (event) => {
		let box = document.getElementsByName(event.target.name);
    let tempSkills = Object.assign({}, this.state.skills);
		for(let [key] of Object.entries(this.state.skills)){
			if(key === event.target.name){
				if(event.target.checked === true){
					for(var i = 0; i < event.target.id; i++){
						box[i].checked = true;
					}
					for(i = (event.target.id + 1); i < box.length; i++){
						if(box[i] !== undefined)
							if(box[i].checked) box[i].checked = false;
					}
					tempSkills[key][1] = event.target.value;
					tempSkills[key][0] = Number(event.target.id) + 1;
				}else{
          if(event.target.name === "dragonAttack" ||
             event.target.name === "fireAttack" ||
             event.target.name === "iceAttack" ||
             event.target.name === "thunderAttack" ||
             event.target.name === "waterAttack"){
            tempSkills[key][1] = '0-1';
            tempSkills[key][0] = 0;
          }
          else if
            (event.target.name === "agitator" ||
             event.target.name === "attackBoost"){
            tempSkills[key][1] = '0-0';
            tempSkills[key][0] = 0;
            }
          else{
            tempSkills[key][1] = 0;
            tempSkills[key][0] = 0;
          }

					for(i = 0; i < box.length; i++){
						box[i].checked = false;
					}
				}
			}
		}
    this.setState({ skills: tempSkills });
	}

  handleSaveClick = (event) => {
    event.preventDefault();
    event.stopPropagation();

    let tempSkills = JSON.stringify(this.state.skills);
    let deepSkills = JSON.parse(tempSkills);

    let values = {
      index: this.state.index,
      weaponValue: this.state.weaponValue, 
      monsterValue: this.state.monsterValue, 
      weaponSharpness: this.state.weaponSharpness, 
      skills: deepSkills
    }
    this.setState({ 
      savedState: values,
      index: this.state.index + 1 
    })
  }

	handleSharpnessSelect = (event) => { 
		let sharpnessSelect = event.target.value.toString().split('-');
		this.setState({ weaponSharpness: sharpnessSelect});
	}

	render() {
  	const { weapons, monsters, weaponValue, 
      monsterValue, weaponType, skills, 
      weaponSharpness, savedState } = this.state;

  	return (
  		<div className="App">
        <Navbar className="justify-content-center top-navbar">
          <Nav className="top-nav">
            <NavItem className="top-nav-item max-auto">
                <img src="../images/felyne-icon.png" className="felyne-icon" alt="Felyne Icon"></img>
            </NavItem>
          </Nav>
        </Navbar>

  			<Container className="app-container" fluid>
  				<Row>
            <Col xs="1" className="outer-padding" />
  					<Col xs="10" className="inner-app">

              <div className="app-header">{this.renderHeader()}</div>
	  					<Form id="weapon-1-form">
		    				<FormGroup row>
                  <Card className="weapon-card">
                    <CardHeader>Select a Weapon</CardHeader>
                    <CardBody>
                      <Container>
                        <Row>
                          <Col sm="3" className="weapon-col">
                            <Row>
                              <Input type="select" name="select" id="weapon-type-select" size="sm" onChange={this.weaponTypeSelect}>
                                <option key="NONE" value="" disabled selected>Weapon Type</option>
                                <option value="0">All</option>
                                {weaponType.map(this.renderWeaponType)}
                              </Input>
                            </Row>                            
                            <Row>
                              <Input type="select" name="select" id="weapon-select" size="sm" onChange={this.weaponSelect} required>
                                <option key="NONE" value="" disabled selected>Weapon</option>
                                {weapons.map(this.renderWeapons)}
                              </Input>
                            </Row>
                            <Row>
                              {this.renderSharpness()}
                            </Row>
                          </Col>
                          <Col sm="9" className="weapon-info-col">
                            <WeaponInfo weapon={weaponValue} skills={skills}/>
                          </Col>
                        </Row>      
                      </Container>
                    </CardBody>
                  </Card>
		    				</FormGroup>

                <FormGroup>
                  <Button onClick={this.toggle} className="btn-block btn-outline-secondary text-left">Select Armor Skills</Button>
                  <Collapse isOpen={this.state.collapse}>
                    <div className="skills-div border">
                      {this.renderSkills()}
                    </div>
                  </Collapse>
                </FormGroup>

		    				<FormGroup>
                  <Card>
                    <CardHeader>Select a Monster</CardHeader>
                    <CardBody>
                      <Input type="select" id="monster-select" size="sm" onChange={this.monsterSelect} required>
                        <option key="NONE" value="" disabled selected>Monster</option>
                        {monsters.map(this.renderMonsters)}
                      </Input>

                      <Hitzone monster={monsterValue} />
                    </CardBody>
                  </Card>
		    				</FormGroup>

                <FormGroup>
                  <Button color="info" type="btn" onClick={this.handleSaveClick}>Save</Button>
                </FormGroup>
	    				</Form>
              
              <Calculator weapon={weaponValue} monster={monsterValue} skills={skills} sharpness={weaponSharpness} savedState={savedState} />

            </Col>
            <Col xs="1" className="outer-padding" />
  				</Row>
  			</Container>



        <Navbar className="justify-content-center fixed-bottom bottom-navbar">
          <Nav className="bottom-nav">
            <NavItem className="bottom-nav-item">
              <a href="https://github.com/seanmcortes/mhw-calculator">
                <img src="../images/github.png" className="git-icon" alt="GitHub Icon"></img>
              </a>
            </NavItem>
          </Nav>
        </Navbar>
  		</div>
  	);
  }
}

export default App;
