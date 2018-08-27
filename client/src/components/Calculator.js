import React, {Component} from 'react';
import { Table, Card, CardBody, CardHeader, Button } from 'reactstrap'
import { calcRawModifier, calcAffinityModifier, calcElementDamage, calcRawDamage } from '../helper/calculatorHelpers'
import './Calculator.css';


class Calculator extends Component{
  constructor(props){
    super(props);
    this.handleCardDelete = this.handleCardDelete.bind(this);
  }

  state={
    rawDamage: 0,
    elementDamage: 0,
    totalDamage: 0,
    sharpness: 1,
    savedState: []
  };

  componentDidUpdate(prevProps, prevState){
    if(this.props.savedState !== prevProps.savedState){
      let tempSavedState = [...this.state.savedState];
      tempSavedState.push(this.props.savedState);
      this.setState({ savedState: tempSavedState });
    }
  }

  renderCalculations = (monster) => {
    let rawModifier = calcRawModifier(this.props.skills);
    let affinityModifier = calcAffinityModifier(this.props.skills);

    let element = calcElementDamage(this.props.weapon, this.props.skills, monster, this.props.sharpness);
    let raw = calcRawDamage(this.props.weapon, this.props.skills, monster, this.props.sharpness, rawModifier, affinityModifier);
    let total = element + raw;
    return(
      <tr>
        <td>{monster.part}</td>
        <td>{raw}</td>
        <td>{element}</td>
        <td>{total}</td>
      </tr>
    )
  }


  handleCardDelete = (event) => {
    let tempArray = [...this.state.savedState];
    let index = tempArray.findIndex(i => i.index === event.target.value);
    tempArray.splice(index, 1);
    this.setState({ savedState: tempArray });
  }

  renderSavedState = (savedState) => {
    return(
      <td>
        <Card className="saved-state-card">
          <CardHeader>
            {savedState.weaponValue.weapon_name} <br /> {savedState.monsterValue[0].name}
            <Button className="saved-state-delete-button float-right" color="danger" onClick={this.handleCardDelete} value={savedState.index}>X</Button>
          </CardHeader>
          <CardBody className="saved-state-card-body">
            {this.renderSavedSkills(savedState)}
            <Table size="sm" striped responsive>
              <tbody>
                <tr>
                  <th>Part</th>
                  <th>Raw</th>
                  <th>Element</th>
                  <th>Total</th>
                </tr>
                {savedState.monsterValue.map(this.renderSavedStateCalculations.bind(this, savedState))}
              </tbody>
            </Table>
          </CardBody>
        </Card>
      </td>
    )
  }

  renderSavedSkills = (savedState) => {
    let returnString = "";

    for (let i in savedState.skills){
      let skillLevel =  savedState.skills[i][0];
      if(skillLevel > 0){
        let skillName = i.replace(/([A-Z]+)*([A-Z][a-z])/g, "$1 $2");
        returnString = returnString.concat(skillName.charAt(0).toUpperCase() + skillName.slice(1) + 
          " " + skillLevel + ", ");
      }
    }
    returnString = returnString.slice(0, -2);

    return(
      returnString
    )
  }

  renderSavedStateCalculations = (savedState, monsterValue) => {
    let rawModifier = calcRawModifier(savedState.skills);
    let affinityModifier = calcAffinityModifier(savedState.skills);

    let element = calcElementDamage(savedState.weaponValue, savedState.skills, 
      monsterValue, savedState.weaponSharpness);
    let raw = calcRawDamage(savedState.weaponValue, savedState.skills, monsterValue, 
      savedState.weaponSharpness, rawModifier, affinityModifier);
    let total = element + raw;
    return(
      <tr>
        <td>{monsterValue.part}</td>
        <td>{raw}</td>
        <td>{element}</td>
        <td>{total}</td>
      </tr>
    );
  }
  
  render(){


    if(this.props.weapon.weapon_id === 0 || this.props.monster.length === 0){
      return <div />
    }

    return(
        <Card>
          <CardHeader>Damage</CardHeader>
            <CardBody>
              <Table className="calculator-table" size="sm" striped responsive>
                <tbody className="calculator-tbody">
                  <tr className="calculator-header">
                    <th>Part</th>
                    <th>Raw</th>
                    <th>Element</th>
                    <th>Total</th>
                  </tr>
                  {this.props.monster.map(this.renderCalculations)}
                </tbody>
              </Table>
              <Table className="saved-table" size="sm" responsive>
                <tbody>
                  <tr>
                    {this.state.savedState.map(this.renderSavedState)}
                  </tr>
                </tbody>
              </Table>
            </CardBody>
        </Card>  
    );
  }
}

export default Calculator;