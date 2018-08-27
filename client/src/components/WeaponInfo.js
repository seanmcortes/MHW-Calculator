import React, { Component } from 'react';
import { Card, CardBody, Container, Row, Col, Table } from 'reactstrap';
import './WeaponInfo.css';

class WeaponInfo extends Component{
  state={
    weapon: {}
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

    let weaponTypeIcon = "../images/" + tempText[this.state.weapon.weapon_class] + ".png";

    return(
      <Card className='weapon-info-card'>
        <CardBody>
          <Container className='weapon-info-card-container' fluid>
            <Row>
              <Col sm="1"><img src={weaponTypeIcon} className='weapon-info-card-weapon-icon' alt="Weapon Card Icon"></img></Col>
              <Col sm="11">
                <Table className="weapon-info-table" size="sm" responsive>
                  <tbody>
                    <tr>
                      <th>Attack</th>
                      <th>True Attack</th>
                      <th>Affinity</th>
                      <th>Element Type</th>
                      <th>Element Damage</th>
                    </tr>
                    <tr>
                      <td>{this.state.weapon.bloat_damage}</td>
                      <td>{this.state.weapon.real_damage}</td>
                      <td>{this.state.weapon.weapon_affinity}</td>
                      <td>{this.renderElementIcon()}</td>
                      <td>{this.state.weapon.element_damage}</td>
                    </tr>
                  </tbody>
                </Table>
              </Col>
            </Row>
          </Container>
        </CardBody>
      </Card>
    )
  }

  renderElementIcon = _ => {
    if(this.state.weapon.element_type !== ''){
      let elementTypeIcon = "../images/" + this.state.weapon.element_type + ".png";
      return(
        <img src={elementTypeIcon} className='weapon-info-card-element-icon' alt="Element Type Icon"></img>
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