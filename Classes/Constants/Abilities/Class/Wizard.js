import AbilityVisualizer from "../../Utilities/AbilityVisualizer";

// { name: [name, levelReq, currentCD, cd, func, onCDColor, baseColor]}
const wizardCDColor = '0,0,255'; // blue
const wizardBaseColor = '255,0,0'; // red

const LightningBoltAction = (data) => {
    // console.log(data)
    // data == { direction, top, left, ...posChange, prePos }
    // new => data == { targetData ( direction, posChange, initialPos ), prePos }
    // console.log(Character.Data.Name + " used Lightning Bolt with data == " + JSON.stringify(data));
    const rules = {
        shouldFade: true,
        lifespan: 5000,
        type: 'line',
        opacity: 1,
    };
    // params requirements:
    // bottom, right, width, height, rotationAngle, color
    // params optionals:
    // colorVariant(children), zig-zag(children)
    const width = Math.round((Math.sqrt(Math.pow(data.targetData.posChange.dx, 2) + Math.pow(data.targetData.posChange.dy, 2))) * 10) / 10; // triangles
    const params = {
        top: data.targetData.initialPos.top,
        right: data.targetData.initialPos.right,
        width: width,
        height: 10,
        rotationAngle: data.targetData.direction,
        color: 'purple',
        prePos: data.prePos,
    }
    return AbilityVisualizer(rules, params); // returns props
    // return { component: AbilityVisualizer(rules, params), lifespan: rules.lifespan }; // returns component
}

const LightningBolt = ["Lightning Bolt", 1, 0, 10,
    LightningBoltAction,
    wizardCDColor,
    wizardBaseColor
]

export default WizardAbilities = {
    LightningBolt,
};