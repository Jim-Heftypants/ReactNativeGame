import StatObject from "./StatBuilder";
import AbilityBuilder from "./AbilityBuilder";
import TraitBuilder from './TraitBuilder';
import AnimationBuilder from './AnimationBuilder';

// inputs called in object builder passed to other builders
export default ObjectBuilder = (name, stats, abilities, traits, animations) => {
    return (
        {
            Name: name,
            Stats: StatObject(stats),
            Abilities: AbilityBuilder(abilities),
            Traits: TraitBuilder(traits),
            Animations: AnimationBuilder(animations),
        }
    )
};