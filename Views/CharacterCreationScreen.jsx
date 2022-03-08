import React, { useState, useRef } from 'react';
import { View } from 'react-native';

import StatDisplayContainer from '../CharacterCreationComponents/StatDisplayContainer';
import SelectionDisplayContainer from '../CharacterCreationComponents/SelectionDisplayContainer';
import DescriptionDisplayContainer from '../CharacterCreationComponents/DescriptionDisplayContainer';
import CharacterDisplay from '../CharacterCreationComponents/CharacterDisplay';
import CreateCharacterButton from '../CharacterCreationComponents/CreateCharacterButton';
import NameDisplay from '../CharacterCreationComponents/NameDisplay';

import normalizeFont from '../Utils/normalizeFont';

export default CharacterCreationScreen = (props) => {
    const fontScale = props.deviceDims.height / 600;

    const name = useRef("").current;
    const [race, setRace] = useState("");
    const [klass, setKlass] = useState("");
    const [stats, setStats] = useState({
        str: 0,
        dex: 0,
        con: 0,
        int: 0,
        skl: 0,
        cha: 0,
    });

    const spacing = {
        wSpacing: 0.05 * props.deviceDims.width,
        hSpacing: 0.05 * props.deviceDims.height,
    }
    const charDisplay = {
        width: props.deviceDims.width * 0.4,
        height: props.deviceDims.height * 0.4,
    };
    const selectionDisplay = {
        width: props.deviceDims.width * 0.2,
        height: props.deviceDims.height * 0.6,
        fontSize: normalizeFont(25, fontScale),
    };
    const statDisplay = {
        width: props.deviceDims.width * 0.4,
        height: props.deviceDims.height * 0.2,
        fontSize: normalizeFont(20, fontScale),
    };
    const descriptionDisplay = {
        width: props.deviceDims.width * 0.3,
        height: props.deviceDims.height * 0.25,
        fontSize: normalizeFont(20, fontScale),
    };
    const nameDisplay = {
        width: props.deviceDims.width * 0.4,
        height: props.deviceDims.height * 0.1,
        fontSize: normalizeFont(30, fontScale),
    }
    const createCharacter = {
        width: props.deviceDims.width * 0.4,
        height: props.deviceDims.height * 0.1,
        fontSize: normalizeFont(30, fontScale),
    }

    return (
        <>
            <StatDisplayContainer {...spacing} {...statDisplay} stats={stats} setStats={setStats} ></StatDisplayContainer>
            <SelectionDisplayContainer {...spacing} {...selectionDisplay} klass={klass} setKlass={setKlass} race={race} setRace={setRace} ></SelectionDisplayContainer>
            <DescriptionDisplayContainer {...spacing} {...descriptionDisplay} klass={klass} race={race} ></DescriptionDisplayContainer>
            <CharacterDisplay {...spacing} {...charDisplay} klass={klass} race={race} ></CharacterDisplay>
            <CreateCharacterButton {...spacing} {...createCharacter} parentState={props.parentState} setParentState={props.setParentState}
                name={name} race={race} klass={klass} stats={stats} ></CreateCharacterButton>
            <NameDisplay {...spacing} {...nameDisplay} name={name} ></NameDisplay>
        </>
    )
}