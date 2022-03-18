import { getData, setData } from '../FirebaseUtils/firebaseRTDBUtils';
import createUser from '../databaseUtils/createUser';

import getNewCharacterData from '../CharacterUtils/getNewCharacterData';
import validName from '../CharacterUtils/validateName';

export default async function createCharacter(props) {
    if (!props.parentState.userID) return "No user is signed in";
    const userData = await getData(props.parentState.userID);
    if (!userData) {
        userData = await createUser(props.parentState.userID, props.parentState.username);
    }
    const characterList = userData.characterList;
    if (!validName(props.name)) return "Invalid name"; // maybe update parent state with error message?
    console.log("Character name verified!");
    const charData = getNewCharacterData(props);
    await setData(props.name, charData);
    await setData(props.parentState.userID + '/characterList/' + props.name, props.name);
    await setData("Characters/" + props.name, props.name);
    characterList[props.name] = props.name;
    console.log("Character data added!");
    props.setParentState({ ...props.parentState, page: "Character Selection", characterName: props.name, characterList});
}