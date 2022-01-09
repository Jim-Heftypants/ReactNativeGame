import { View, Image, Text, StyleSheet, TouchableOpacity } from "react-native";
import React, {useEffect, useState} from 'react';

import AbilityButton from "./AbilityButton";

const circleDims = 100;
const distanceConst = 1.1;

export default AbilityButtonContainer = (props) => {
    console.log("Ability Display Loaded");
    const charAbilities = props.Character.Data.Attributes.Abilities;
    // { name: [name, levelReq, currentCD, cd, func, onCDColor, baseColor]}
    const abilitiesArr = Object.values(charAbilities);
    // modding this will not update values for character object
    let key = 1;
    return (
        <View>
            {abilitiesArr.map((ability) => {
                return <AbilityButton circleDims={circleDims} ability={ability} key={key} abilitiesLength={abilitiesArr.length}
                    touch={props.touch} keyy={key++} deviceDims={props.deviceDims} Character={props.Character}
                distanceConst={distanceConst} ></AbilityButton>
            })}
        </View>
    )
}