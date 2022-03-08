import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

import { getData, pushData, setData } from '../FirebaseUtils/firebaseRTDBUtils';

export default CreateCharacterButton = (props) => {
    return (
        <TouchableOpacity style={{
            width: props.width, height: props.height, textAlign: 'center', marginTop: props.hSpacing, marginLeft: props.wSpacing, backgroundColor: 'lightgrey',
            borderWidth: 2, borderColor: 'gray'
        }} onPress={() => createCharacter(props)}>
            <Text style={{ fontSize: props.fontSize, color: 'black' }} >Create Character</Text>
        </TouchableOpacity>
    )
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
    return {
        RaceName: props.race,
        ClassName: props.klass,
        Attributes: props.stats,
        Zone: "Intro",
        Equipment: {},
        Items: {},
        DynamicData: {
            pos: [0, 0],
            AnimEffects: {},
            movementSpeed: 1000,
            imageCycleId: 0,
            currentAnimationSet: [],
        },
    }
}

function createCharacter(props) {
    if (!verifyName(props.name)) return null;
    console.log("Character name verified!");
    const charData = getNewCharacterData(props);
    pushData(props.name, charData).then(() => {
        pushData('Users/' + props.parentState.userID + '/characterList', props.name).then(() => {
            console.log("Character data added!");
        })
    })
}