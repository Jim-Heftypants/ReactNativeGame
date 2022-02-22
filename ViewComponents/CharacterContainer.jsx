import React, { useState, useRef, useEffect } from 'react';
import { View, Image, Text } from "react-native";

import CharacterDisplay from "./CharacterDisplay"
import AbilityDisplay from "./AbilityDisplay"

const CharacterContainer = (props) => {


    return (
        <View>
            <CharacterDisplay {...props.deviceDims} Character={props.Character} ></CharacterDisplay>
            <AbilityDisplay {...props.deviceDims} Character={props.Character} ></AbilityDisplay>
        </View>
    )
}

export default CharacterContainer;