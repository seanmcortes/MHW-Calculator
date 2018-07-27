import React, { Component } from 'react';
import {array} from 'prop-types';

class Hitzone extends Component{
  constructor(props){
    super(props);
  };

  state={
    monster: []
  };

  static propTypes = {
    monster: array
  };

  static defaultProps = {
  };

  componentDidMount(){
  }

  componentDidUpdate(prevProps){
  }


  renderHitZones = ({ monster_part_id, name, part, sever, blunt, shot, fire, water, thunder, ice, dragon, stun}) =>
  <tbody key={monster_part_id + '-tbody'}>
    <tr key={monster_part_id + '-tr'}> 
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
  </tbody>
  

  render(){
    const { monster } = this.props;
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
          {monster.map(this.renderHitZones)}
        </table>
      </div>
    );
  }
}

export default Hitzone;