import Abilities from "./Abilities/Abilities";
import ObjectBuilder from "./ObjectBuilders/ObjectBuilder";
import Traits from "./Traits/Traits";
import ClassAnimations from './Images/ClassAnimations'

// console.log("Class Animations: " + JSON.stringify(ClassAnimations));

let noStats = [0, 0, 0, 0, 0, 0];

const WizardAbilities = Abilities.Wizard;
const WizardTraits = Traits.Wizard;
const WizardAnimations = ClassAnimations.WizardAnimations;
// const WizardAnimations = {};

const Classes = {
    Wizard: ObjectBuilder("Wizard", noStats, WizardAbilities, WizardTraits, WizardAnimations),
    Berserker: {

    },
    Ninja: {

    },
    Paladin: {

    },
    Necromancer: {

    },
    Rogue: {

    },
};

export default Classes;