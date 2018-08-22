import React, { Component } from 'react';
import { Card, CardBody, CardText, Container, Row, Col } from 'reactstrap';
import './WeaponInfo.css';

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
      console.log(this.state.weapon)
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

    let weaponTypeIcon = "../images/" + tempText[this.state.weapon.weapon_class] + ".png";

    let elementTypeIcon = "../images/" + this.state.weapon.element_type + ".png";

    return(
      <Card className='weapon-info-card'>
        <CardBody>
          <Container className='weapon-info-card-container'>
            <Row>
              <Col sm={3}><img src={weaponTypeIcon} className='weapon-info-card-weapon-icon'></img></Col>
              <Col sm={9}>
                <p>Attack: {this.state.weapon.bloat_damage}</p>
                <p>Affinity: {this.state.weapon.weapon_affinity}</p>
                <p>Element: {this.state.weapon.element_damage} {this.renderElementIcon()} </p>
              </Col>
            </Row>
          </Container>
        </CardBody>
      </Card>
    )
  }

  renderElementIcon = _ => {
    console.log("successful call")
    if(this.state.weapon.element_type != ''){
      let elementTypeIcon = "../images/" + this.state.weapon.element_type + ".png";
      return(
        <img src={elementTypeIcon} className='weapon-info-card-element-icon'></img>
      )
    }
  }

  render(){
    if(Object.keys(this.state.weapon).length === 0 ||
      this.state.weapon.weapon_id === 0){
      return(
        <div />
      )
    }

    return (
      <Container className='weapon-info-div'>
        {this.renderWeaponCard()}
      </Container>
    )
  }
}

export default WeaponInfo; 