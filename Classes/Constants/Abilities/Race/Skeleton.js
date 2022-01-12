// { name: [name, levelReq, currentCD, cd, func, onCDColor, baseColor]}
const skeletonCDColor = '255,255,255'; // white
const skeletonBaseColor = '0,0,0'; // black

const AuraOfDeathAction = (Character, ...Data) => {
    console.log(Character.Data.Name + " used Aura of Death with data == " + JSON.stringify(Data));
    return;
}

const AuraOfDeath = ["Aura of Death", 1, 0, 12,
    AuraOfDeathAction,
    skeletonCDColor,
    skeletonBaseColor,
];

export default SkeletonAbilities = {
    AuraOfDeath,
};