export function calcRawModifier(skills){
  let attackBoost = skills.attackBoost[1].toString().split('-');
  let agitator = skills.agitator[1].toString().split('-');
  let rawModifier = parseInt(agitator[0], 10) +
    parseInt(attackBoost[0], 10) +
    parseInt(skills.peakPerformance[1], 10) +
    parseInt(skills.resentment[1], 10);

  return rawModifier;
}

export function calcAffinityModifier(skills){
    let attackBoost = skills.attackBoost[1].toString().split('-');
    let agitator = skills.agitator[1].toString().split('-');
    let affinityModifier = parseInt(skills.affinitySliding[1], 10) +
      parseInt(agitator[1], 10) + 
      parseInt(attackBoost[1], 10) +
      parseInt(skills.criticalEye[1], 10) +
      parseInt(skills.latentPower[1], 10) +
      parseInt(skills.maximumMight[1], 10) +
      parseInt(skills.weaknessExploit[1], 10);
    return affinityModifier;
}

export function calcElementDamage(weapon, skills, monster, sharpness, affinityModifier){
  let elementHitZone = 0;
  let elementBoost = "0-1";
  switch(weapon.element_type){
    case "":
      break;
    case "Fire":
      elementHitZone = monster.fire;
      elementBoost = skills.fireAttack[1];
      break;
    case "Water":
      elementHitZone = monster.water;
      elementBoost = skills.waterAttack[1];
      break;
    case "Thunder":
      elementHitZone = monster.thunder;
      elementBoost = skills.thunderAttack[1];
      break;
    case "Ice":
      elementHitZone = monster.ice;
      elementBoost = skills.iceAttack[1];
      break;
    case "Dragon":
      elementHitZone = monster.dragon;
      elementBoost = skills.dragonAttack[1];
      break;
    default:
      console.log("Error in calculateElementDamage() switch!");
      break;
  }

  elementBoost = elementBoost.toString().split('-');
  let elementBloat = weapon.element_damage * parseInt(elementBoost[1], 10) + parseInt(elementBoost[0], 10);
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

    return (Math.round(elementBloat/10 * sharpness[1] * (1 + critEle * weapon.weapon_affinity/100) * elementHitZone/100));
  }
  return (Math.round(elementBloat/10 * sharpness[1] * elementHitZone/100));
}

export function calcRawDamage(weapon, skills, monster, sharpness, rawModifier, affinityModifier){
  let damageType = 0;
  if(weapon.weapon_class == 5 || weapon.weapon_class == 6){
    damageType = monster.blunt;
  } else {
    damageType = monster.sever;
  }


  let criticalBoost = 0.25;
  if(skills.criticalBoost[1] !== 0){
    criticalBoost = skills.criticalBoost[1];
  } else {
    criticalBoost = 0.25;
  }

  let finalRaw = parseInt(weapon.real_damage, 10) + rawModifier;
  let finalCrit = 1 + criticalBoost * (parseInt(weapon.weapon_affinity, 10) + affinityModifier)/100;
  let extraModifiers = (1.00 + parseFloat(skills.fortify[1]) + parseFloat(skills.heroics[1])).toFixed(2);

  return Math.round(
      finalRaw * finalCrit * extraModifiers * (damageType/100)
    ); 
}