import * as Abilities from "./Abilities/Abilities";
import ObjectBuilder from "./ObjectBuilders/ObjectBuilder";
import Traits from "./Traits/Traits";
import Animations from './Images/ClassAnimations'

const NoStats = [0, 0, 0, 0, 0, 0];
// stats = [Str, Dex, Con, Int, Wis, Cha];
// base total = 20;

const Stats = {
    Wizard: [0, 0, 0, 0, 0, 0],
    NoStats,
};

const nameList = [
    "Wizard",
];

const Classes = {};
for (let i = 0; i < nameList.length; i++) {
    const name = nameList[i];
    Classes[name] = ObjectBuilder(name, Stats[name], Abilities[name + 'Abilities'], Traits[name], Animations[name]);
}

export default Classes;