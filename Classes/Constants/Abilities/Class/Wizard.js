// { name: [name, levelReq, currentCD, cd, func, onCDColor, baseColor]}
const wizardCDColor = '0,0,255'; // blue
const wizardBaseColor = '255,0,0'; // red

const LightningBoltAction = (Character, ...Data) => {
    console.log(Character.Data.Name + "used Lightning Bolt with data == " + JSON.stringify(Data));
    return;
}

const LightningBolt = ["Lightning Bolt", 1, 0, 20,
    LightningBoltAction,
    wizardCDColor,
    wizardBaseColor
]

export default WizardAbilities = {
    LightningBolt,
};