import * as Abilities from "./Abilities/Abilities";
import ObjectBuilder from "./ObjectBuilders/ObjectBuilder";
import Traits from "./Traits/Traits";
import Animations from './Images/RaceAnimations';

const NoStats = [0, 0, 0, 0, 0, 0];
// stats = [Str, Dex, Con, Int, Wis, Cha];
// base total = 20;

const Stats = {
    Skeleton: [4, 2, 6, 2, 2, 2],
    Cat: [4, 4, 3, 3, 3, 3],
    NoStats,
};

const nameList = [
    "Skeleton",
    "Cat"
];

const Races = {};
for (let i = 0; i < nameList.length; i++) {
    const name = nameList[i];
    Races[name] = ObjectBuilder(name, Stats[name], Abilities[name + "Abilities"], Traits[name], Animations[name]);
}

// console.log("Abilities: " + JSON.stringify(Abilities));
// console.log("Races: " + JSON.stringify(Races));

export default Races;

// export default Races = {
//     // ObjectBuilder("name", [stats], {abilities}, {traits});
//     Skeleton: ObjectBuilder("Skeleton", SkeletonStats, SkeletonAbilities, SkeletonTraits, SkeletonAnimations),
//     Cat: ObjectBuilder("Cat", CatStats, Abilities[`${name}Abilities`]),
//     Elf: {

//     },
//     Human: {

//     },
// };