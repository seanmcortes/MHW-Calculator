# Monster Hunter World - Damage Calculator

## Description
Monster Hunter is a game series that is notorious for having convoluted mechanics that are hidden away from the players. Monster Hunter World comes with great quality of life improvements such as damage numbers, but it still hides away valuable information for min-maxers. This application provides a simple interface to calculate a weapon's damage versus a monster and provides  a way to compare two weapons against each other.

## Formula Breakdown
```
Total Damage = Raw Damage + Elemental Damage
```
```
Physical Damage = True Raw * (1 + 0.25 * (Affinity/100)) * Effectiveness * Sharpness
```
```
Elemental Damage = Element Attack / 10 * Effectiveness * Sharpness
```
True Attack is calculated by dividing the weapon's listed attack by it's weapon type's multiplier:

| Weapon Type | Weapon Multiplier |
| --- | --- |
| Hammer/Horn | 5.2 |
| Switch Axe | 5.4 |
| Great Sword | 4.8 |
| Charge Axe | 3.6  |
| Long Sword | 3.3 |
| Insect Glaive | 3.1 |
| Lance/Gunlance | 2.3 |
| Sword and Shield/Dual Swords | 1.4 |

*Table 1.0: Raw damage modifier*

| Sharpness | Raw | element |
| --- | --- | --- |
| Red | 0.50 | 0.25 |
| Orange | 0.75 | 0.50 |
| Yellow | 1.00 | 0.75 |
| Green | 1.05 | 1.00 |
| Blue | 1.20 | 1.06 |
| White | 1.32 | 1.12 |
| Purple | 1.44 | 1.20 |

*Table 1.1: Sharpness modifier table*



Sample Calculation:



## How to Use:

Navigate to website: http://the-handlers-notes.herokuapp.com/

Select Weapon Type, Weapon, and Weapon Sharpness
![weaponselect](https://user-images.githubusercontent.com/25808500/48650693-1e7dae80-e9ac-11e8-872a-1e6016570eaa.JPG)

Select Armor Skills. Each checkbox is representative of one point in each skill (in similar fashion as the game).
![armorskills](https://user-images.githubusercontent.com/25808500/48650775-74525680-e9ac-11e8-98d9-c2613fa40a6f.JPG)

Select a Monster. Displayed is a table of the monster's body parts and the effectiveness of all sources of damage.
![monster](https://user-images.githubusercontent.com/25808500/48650779-774d4700-e9ac-11e8-99e5-de711c634940.JPG)

Damage calculations for each part is dynamically displayed. Select Save to create a damage card. Mix and match weapons, skills, and monsters to compare damage.
![damage](https://user-images.githubusercontent.com/25808500/48650783-79170a80-e9ac-11e8-9670-653a2eb09a76.JPG)

## Running Locally
#### Prerequisites
Download and install Yarn: 
```
https://www.npmjs.com/package/yarn
```
#### Installation
Check Yarn version to ensure its installation:
```
$ yarn --version
```
Clone repository:
```
https://github.com/seanmcortes/mhw-calculator.git
```
Install server dependencies:
```
$ yarn install
```
Navigate to client folder and install dependencies:
```
$ cd client
$ yarn install
```
Return to root and run:
```
$ yarn start
```
