import { View, Image, Text } from "react-native";
import React from 'react';

import AbilityButton from "./AbilityButton";

const circleDims = 100;
const distanceConst = 1.1;

export default AbilityButtonContainer = (props) => {
    // console.log("Ability Display Loaded");
    const charAbilities = props.Character.Data.Attributes.Abilities;
    // { name: [name, levelReq, currentCD, cd, func, onCDColor, baseColor]}
    const abilitiesArr = Object.values(charAbilities);
    // modding this will not update values for character object
    let key = 1;

    return (
        <View>
            {abilitiesArr.map((ability) => {
                const pressed = isPressed(key, props.touches.initial, circleDims, distanceConst, props.deviceDims);
                const touches = pressed ? props.touches : null;
                return <AbilityButton circleDims={circleDims} ability={ability} key={key} abilitiesLength={abilitiesArr.length}
                    keyy={key++} deviceDims={props.deviceDims} Character={props.Character}
                    distanceConst={distanceConst} touches={touches} ></AbilityButton>
            })}
        </View>
    )
}

const isPressed = (key, touch, circleDims, distanceConst, dims) => {
    if (!(touch)) return false;
    const left = Math.floor(dims.deviceWidth - (circleDims * distanceConst) * key);
    const top = Math.floor(dims.deviceHeight - (circleDims * distanceConst));
    const dx = Math.abs(touch.pageX - (left + (circleDims / 2)));
    const dy = Math.abs(touch.pageY - (top + (circleDims / 2)));
    return (dx < (circleDims / 2) && dy < (circleDims / 2));
}