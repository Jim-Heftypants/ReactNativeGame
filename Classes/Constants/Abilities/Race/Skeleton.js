// { name: [name, levelReq, currentCD, cd, func, onCDColor, baseColor]}
const skeletonCDColor = '255,255,255'; // white
const skeletonBaseColor = '0,0,0'; // black

const AuraOfDeathAction = (Character, data) => { // black circle aura
    // data == { direction, top, left, ...posChange, ...dims, circleDims }
    console.log(Character.Data.Name + " used Aura of Death with data == " + JSON.stringify(data));
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
    const width = Math.round((Math.sqrt(Math.pow(data.dx, 2) + Math.pow(data.dy, 2))) * 10) / 10; // triangles
    const props = {
        bottom: -data.top - data.circleDims / 2,
        right: data.deviceWidth - data.left + data.circleDims / 2,
        width: width,
        height: 10,
        rotationAngle: data.direction,
        color: 'purple',
    }
    return {component: AbilityVisualizer(rules, props), lifespan: rules.lifespan}; // returns component
}

const AuraOfDeath = ["Aura of Death", 1, 0, 12,
    AuraOfDeathAction,
    skeletonCDColor,
    skeletonBaseColor,
];

export default SkeletonAbilities = {
    AuraOfDeath,
};