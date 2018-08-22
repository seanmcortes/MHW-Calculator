import React, { Component } from 'react';
import {array} from 'prop-types';
import { Table } from 'reactstrap';
import './Hitzone.css';

class Hitzone extends Component{
  constructor(props){
    super(props);
  };

  state={
    monster: [],
    data: false
  };

  static propTypes = {
    monster: array
  };

  static defaultProps = {
  };

  componentDidMount(){
  }

  componentDidUpdate(prevProps){
    if(this.props.monster !== prevProps.monster){
      this.setState({ data: true })
    }
  }


  renderHitZones = ({ monster_part_id, name, part, sever, blunt, shot, fire, water, thunder, ice, dragon, stun}) =>
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

  

  render(){
    if(!this.state.data){
      return <div />
    }

    const { monster } = this.props;
    return(
      <div className = "hitzone">
        <h1>{monster[0].name} Hitzones</h1>
        <Table className = "hitzone-table" size="xs" responsive>
          <tbody>
            <tr className = "hitzone-header">
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
            </tr>
            {monster.map(this.renderHitZones)}
          </tbody>
        </Table>
      </div>
    );
  }
}

export default Hitzone;