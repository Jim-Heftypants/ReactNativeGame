import Abilities from "./Abilities/Abilities";
import ObjectBuilder from "./ObjectBuilders/ObjectBuilder";
import Traits from "./Traits/Traits";
import RaceAnimations from './Images/RaceAnimations';

// stats = [Str, Dex, Con, Int, Wis, Cha];
// base total = 20;
const SkeletonStats = [4, 2, 6, 2, 2, 2];
const SkeletonAbilities = Abilities.Skeleton;
const SkeletonTraits = Traits.Skeleton;
const SkeletonAnimations = RaceAnimations.SkeletonAnimations;
// const SkeletonAnimations = {};


export default Races = {
    // ObjectBuilder("name", [stats], {abilities}, {traits});
    Skeleton: ObjectBuilder("Skeleton", SkeletonStats, SkeletonAbilities, SkeletonTraits, SkeletonAnimations),
    Elf: {

    },
    Tabaxi: {

    },
    Human: {

    },
};