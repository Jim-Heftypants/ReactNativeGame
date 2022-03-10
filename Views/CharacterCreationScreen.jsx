import React, { useState, useRef } from 'react';
import { View } from 'react-native';

import StatDisplayContainer from '../CharacterCreationComponents/StatDisplayContainer';
import SelectionDisplayContainer from '../CharacterCreationComponents/SelectionDisplayContainer';
import DescriptionDisplayContainer from '../CharacterCreationComponents/DescriptionDisplayContainer';
import CharacterDisplay from '../CharacterCreationComponents/CharacterDisplay';
import CreateCharacterButton from '../CharacterCreationComponents/CreateCharacterButton';
import NameDisplay from '../CharacterCreationComponents/NameDisplay';

import normalizeFont from '../Utils/normalizeFont';

const spacing = 0.01;

export default CharacterCreationScreen = (props) => {
    const width = props.deviceDims.width;
    const height = props.deviceDims.height;
    const fontScale = props.deviceDims.height / 600;
    const wSpacing = width * spacing;
    const hSpacing = height * spacing;

    const titleFont = normalizeFont(30, fontScale);
    const descriptionFont = normalizeFont(20, fontScale);

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

    const defaults = {
        position: 'absolute',
        textAlign: 'center',
    }
    const descriptionDisplay = {
        width: wSpacing * 30,
        height: hSpacing * 25,
        left: wSpacing * 2,
        top: hSpacing * 2,
        fontSize: descriptionFont,
        backgroundColor: "lightgrey",
        ...defaults
    };
    const nameDisplay = {
        width: wSpacing * 30,
        height: hSpacing * 10,
        left: wSpacing * 35,
        top: hSpacing * 3,
        fontSize: titleFont,
        backgroundColor: 'lightblue',
        ...defaults
    }
    const createCharacter = {
        width: wSpacing * 30,
        height: hSpacing * 10,
        left: wSpacing * 35,
        top: hSpacing * 16,
        fontSize: titleFont,
        backgroundColor: 'lightblue',
        ...defaults
    }
    const charDisplay = {
        width: wSpacing * 44,
        height: hSpacing * 68,
        left: wSpacing * 28,
        top: hSpacing * 30,
        fontSize: titleFont,
        backgroundColor: 'lightgreen',
        ...defaults
    };
    const selectionDisplay = {
        width: wSpacing * 20,
        height: hSpacing * 50,
        left: wSpacing * 4,
        top: hSpacing * 30,
        fontSize: descriptionFont,
        backgroundColor: 'magenta',
        ...defaults
    };
    const statDisplay = {
        width: wSpacing * 24,
        height: hSpacing * 16,
        left: wSpacing * 2,
        top: hSpacing * 82,
        fontSize: descriptionFont,
        backgroundColor: 'orange',
        ...defaults
    };

    return (
        <>
            <StatDisplayContainer style={statDisplay} stats={stats} setStats={setStats} ></StatDisplayContainer>
            <SelectionDisplayContainer style={selectionDisplay} klass={klass} setKlass={setKlass} race={race} setRace={setRace} ></SelectionDisplayContainer>
            <DescriptionDisplayContainer style={descriptionDisplay} klass={klass} race={race} ></DescriptionDisplayContainer>
            <CharacterDisplay style={charDisplay} klass={klass} race={race} ></CharacterDisplay>
            <CreateCharacterButton style={createCharacter} parentState={props.parentState} setParentState={props.setParentState}
                name={name} race={race} klass={klass} stats={stats} ></CreateCharacterButton>
            <NameDisplay style={nameDisplay} name={name} ></NameDisplay>
        </>
    )
}