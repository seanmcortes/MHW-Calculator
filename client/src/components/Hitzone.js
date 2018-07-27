import React, { Component } from 'react';

class Hitzone extends Component{
  state={
    hitzone: []
  }

  componentDidUpdate(prevProps){
    if(this.props.wep !== prevProps.wep || this.props.mon !== prevProps.mon){
      this.getHitZones(this.props.mon)
    }
    console.log(this.props.skills);
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
    bluntDamage = Math.ceil((weapon.real_damage * (1 + 0.25 * (weapon.weapon_affinity/100))) * (blunt/100));
    totalDamage += bluntDamage;
  } else {
    severDamage = Math.ceil((weapon.real_damage * (1 + 0.25 * (weapon.weapon_affinity/100))) * (sever/100));
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
      <div className = "Hitzone">
        <table className = "Hitzone-table">
          <tr className = "Hitzone-header">
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

export default Hitzone;