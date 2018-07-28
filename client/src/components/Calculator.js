import React, {Component} from 'react';
import { object, array } from 'prop-types';

class Calculator extends Component{
  state={
    rawDamage: 0,
    elementDamage: 0,
    totalDamage: 0,
    sharpness: 1
  };

  static propTypes = {  
    weapon: object,
    monster: array,
    skills: object
  }

  static defaultProps = {
  }

  
  // calculateDamage = _ => {
  //   let weapon = this.props.weapon;
  //   let skill = this.props.skills;
  //   let monster = this.props.monster;
  //   let severDamage, bluntDamage, shotDamage, stunDamage, totalDamage = 0;

  //   function calcElement(){
  //     var trueElement = weapon.element_damage/10;

  //     switch(weapon.element_type){
  //       case "":
  //       break;
  //       case "Fire":
  //       var fireDamage = Math.round(trueElement * (fire/100));
  //       totalDamage += fireDamage;
  //       break;
  //       case "Water":
  //       var waterDamage = Math.round(trueElement * (water/100));
  //       totalDamage += waterDamage;
  //       break;
  //       case "Thunder":
  //       var thunderDamage = Math.round(trueElement * (thunder/100));
  //       totalDamage += thunderDamage;
  //       break;
  //       case "Ice":
  //       var iceDamage = Math.round(trueElement * (ice/100));
  //       totalDamage += iceDamage;
  //       break;
  //       case "Dragon":
  //       var dragonDamage = Math.round(trueElement * (dragon/100));
  //       totalDamage += dragonDamage;
  //       break;
  //     }
  //   }

  //   function calcRaw(){
  //     weapon.real_damage + 
  //   }

  //   if(weapon.weapon_class == 5 || weapon.weapon_class == 6){
  //     bluntDamage = Math.round((weapon.real_damage * (1 + 0.25 * (weapon.weapon_affinity/100))) * (blunt/100));
  //     totalDamage += bluntDamage;
  //   } else {
  //     severDamage = Math.round((weapon.real_damage * (1 + 0.25 * (weapon.weapon_affinity/100))) * (sever/100));
  //     totalDamage += severDamage;
  //   }
  // }
  

  componentDidUpdate(prevProps){
    if(this.props.weapon !== prevProps.weapon || this.props.monster !== prevProps.monster){

    }
    console.log(this.props);
  }

  renderCalculations = ({ part, sever, shot, blunt, fire, water, thunder, ice, dragon, stun }) => {
    let weapon = this.props.weapon;
    let skills = this.props.skills;

    function calculateElementDamage(){
      let elementHitZone = 0;
      let elementBoost = "0-1";
      switch(weapon.element_type){
        case "":
          break;
        case "Fire":
          elementHitZone = fire;
          elementBoost = skills.fireAttack[1];
          break;
        case "Water":
          elementHitZone = water;
          elementBoost = skills.waterAttack[1];
          break;
        case "Thunder":
          elementHitZone = thunder;
          elementBoost = skills.thunderAttack[1];
          break;
        case "Ice":
          elementHitZone = ice;
          elementBoost = skills.iceAttack[1];
          break;
        case "Dragon":
          elementHitZone = dragon;
          elementBoost = skills.dragonAttack[1];
          break;
        default:
          console.log("Error in calculateElementDamage() switch!");
          break;
      }

      elementBoost = elementBoost.toString().split('-');
      let elementBloat = weapon.element_damage * parseInt(elementBoost[1]) + parseInt(elementBoost[0]);
      let elementCap = weapon.element_damage * 1.3;
      if(elementBloat > elementCap){
        elementBloat = elementCap;
      }

      let critEle = 0;
      if(skills.criticalElement[0] == 1){
        let critEleArray = skills.criticalElement[1].toString().split('-');
        
        if(weapon.weapon_class == 1)
          critEle = critEleArray[0];
        else if (weapon.weapon_class == 3 || weapon.weapon_class == 4)
          critEle = critEleArray[2];
        else
          critEle = critEleArray[1];

        return (Math.round(elementBloat/10 * (1 + critEle * weapon.weapon_affinity/100) * elementHitZone/10));
      }
      return(Math.round(elementBloat/10 * elementHitZone/10));
    }


    let test = calculateElementDamage();

    return(
      <tr>
        <td>{part}</td>
        <td>test</td>
        <td>{test}</td>
      </tr>
    )
  }
    
    

  render(){
    return(
      <div className="Calculator">
        <p>{this.state.rawDamage}</p>
        <table className="Calculator-table">
          <tbody className="Calculator-tbody">
            <tr className="Calculator-header">
              <th>Part</th>
              <th>Raw</th>
              <th>Element</th>
              <th>Total</th>
            </tr>
            {this.props.monster.map(this.renderCalculations)}
          </tbody>
        </table>
        
      </div>
    );
  }
}

export default Calculator;