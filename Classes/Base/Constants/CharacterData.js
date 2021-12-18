import Races from './Race';
import Classes from './Class';
import { mergeObjects } from './Utilities/ObjectMerge';

const CharacterData = {
    PlayerOne: {
        Name: "Player One",
        RaceName: Races.Skeleton.Name,
        ClassName: Classes.Wizard.Name,
        Attributes: mergeObjects(Races.Skeleton, Classes.Wizard),
    },
}

export default CharacterData;