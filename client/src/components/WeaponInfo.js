import React, { Component } from 'react';
import { Card, CardBody, CardText } from 'reactstrap';

class WeaponInfo extends Component{

  state={
    weapon: {}
  }

  constructor(props){
    super(props);
  }

  componentDidUpdate(prevProps){
    if(this.props !== prevProps){
      let tempObject = Object.assign({}, this.props.weapon)
      this.setState({ weapon: tempObject })
    }
  }

  renderWeaponCard = _ => {
    let tempText = [
      "none",
      "great_sword",
      "long_sword",
      "sword_and_shield",
      "dual_blades",
      "hammer",
      "hunting_horn",
      "lance",
      "gunlance",
      "switch_axe",
      "charge_blade",
      "insect_glaive"
    ]

    let imageUrl = "../images/" + tempText[this.state.weapon.weapon_class] + ".png";

    return(
      
      <Card className='weapon-info-card'>
        <CardText>
          <img src={imageUrl} className='weapon-info-card-image'></img>
          Testing!
        </CardText>
      </Card>
    )
  }

  render(){
    if(Object.keys(this.state.weapon).length === 0 ||
      this.state.weapon.weapon_id === 0){
      return(
        <div />
      )
    }

    return (
      <div className='weapon-info-div'>
        {this.renderWeaponCard()}
      </div>
    )
  }
}

export default WeaponInfo; 