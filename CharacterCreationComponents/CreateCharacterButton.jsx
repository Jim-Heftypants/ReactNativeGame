import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

import { getData, pushData, setData } from '../FirebaseUtils/firebaseRTDBUtils';

export default CreateCharacterButton = (props) => {
    return (
        <TouchableOpacity style={{ ...props.style, borderWidth: 2, borderColor: 'gray', borderRadius: 180 }} onPress={() => createCharacter(props)}>
            <Text style={{ fontSize: props.style.fontSize, textAlign: 'center', padding: props.style.fontSize / 4, color: 'black' }} >Create Character</Text>
        </TouchableOpacity>
    )
}

function createCharacter(props) {
    return false;
    if (!verifyName(props.name)) return null;
    console.log("Character name verified!");
    const charData = getNewCharacterData(props);
    pushData(props.name, charData).then(() => {
        pushData('Users/' + props.parentState.userID + '/characterList', props.name).then(() => {
            console.log("Character data added!");
        })
    })
}

async function checkDuplicate(name) {
    return getData(name).then((data) => {
        return !!data;
    })
}

function validateCharacters(name) {
    for (let i = 0; i < name.length; i++) {
        if (name.charCodeAt(i) < 32 || name.charCodeAt(i) === 127) return false;
    }
    return true;
}

function verifyName(name) {
    if (validateCharacters(name)) {
        console.log("Invalid characters used in name!");
        return false;
    }

    // only if we care about duplicate names
    return checkDuplicate(name).then((duplicateName) => {
        if (duplicateName) {
            console.log("Character name is already taken!");
            return false;
        }
        return true;
    })
}

function getNewCharacterData(props) {
    const Races = {};
    Races[props.race] = 1;
    const Classes = {};
    Classes[props.class] = 1;
    return {
        Races,
        Classes,
        Stats: props.stats,
        Zone: "Intro",
        Equipment: {},
        Items: {},
        pos: [0, 0],
        movementSpeed: 1000,
    }
}