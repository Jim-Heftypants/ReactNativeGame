import Ability from "./AbilityBuilder";

const AuraOfDeath = new Ability("Aura of Death", 1, 20, (Character, Data) => { });
const LightningBolt = new Ability("Lightning Bolt", 1, 10, (Character, Data) => { });
// console.log("Ability: " + AuraOfDeath);
// console.log("Ability name " + AuraOfDeath.name);
// AbilityBuilder(abilityName, levelReq, cooldown, abilityFunc) => [function, boolean]
const Abilities = {
    Skeleton: {
        AuraOfDeath: AuraOfDeath,
    },
    Wizard: {
        LightningBolt: LightningBolt,
    }
};

export default Abilities;