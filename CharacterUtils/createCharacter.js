import { getData, setData } from '../FirebaseUtils/firebaseRTDBUtils';

import getNewCharacterData from '../CharacterUtils/getNewCharacterData';
import validName from '../CharacterUtils/validateName';

export default async function createCharacter(props) {
    if (!validName(props.name)) return; // maybe update parent state with error message?
    console.log("Character name verified!");
    const charData = getNewCharacterData(props);
    await setData(props.name, charData);
    await setData(props.parentState.userID + '/characterList/' + props.name, props.name);
    await setData("Characters/" + props.name, props.name);
    const characterList = Object.values(await getData(props.parentState.userID + '/characterList'));
    console.log("Character data added!");
    props.setParentState({ ...props.parentState, page: "Character Selection", characterName: props.name, characterList});
}