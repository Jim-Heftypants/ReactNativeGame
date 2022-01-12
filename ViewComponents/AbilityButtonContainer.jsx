import { View, Image, Text } from "react-native";
import React, {useRef, useState} from 'react';

import AbilityButton from "./AbilityButton";
import TargettingDisplay from './TargettingDisplay';

const circleDims = 100;
const distanceConst = 1.2;

export default AbilityButtonContainer = (props) => {
    // console.log("Ability Display Loaded");
    const targetDirection = useRef();
    const posChange = useRef();
    const currentNodeID = useRef();
    const charAbilities = props.Character.Data.Attributes.Abilities;
    // { name: [name, levelReq, currentCD, cd, func, onCDColor, baseColor]}
    const abilitiesArr = Object.values(charAbilities);
    // modding this will not update values for character object
    let key = 1;

    const top = Math.floor(props.deviceDims.deviceHeight - (circleDims * distanceConst * 2));
    return (
        <View>
            {abilitiesArr.map((ability) => {
                key++;
                const left = Math.floor(props.deviceDims.deviceWidth - (circleDims * distanceConst) * key);
                const shouldDisp = !ability[2] && isPressed(props.touches.initial, circleDims, left, top);
                const targettingDisp = shouldDisp ? <TargettingDisplay touches={props.touches}
                    circleDims={circleDims} top={top} left={left} keyy={key} dims={props.deviceDims}
                    targetDirection={targetDirection} posChange={posChange} >
                </TargettingDisplay> : <></>;
                if (shouldDisp) currentNodeID.current = key;
                return <View key={key} >
                            <AbilityButton circleDims={circleDims} ability={ability} top={top} left={left}
                                targetDirection={targetDirection} currentNodeID={currentNodeID} keyy={key}
                                Character={props.Character} touch={props.touches.initial} posChange={posChange} >
                            </AbilityButton>
                            {targettingDisp}
                        </View>
            })}
        </View>
    )
}

const isPressed = (touch, circleDims, left, top) => {
    if (!(touch)) return false;
    const dx = Math.abs(touch.pageX - (left + (circleDims / 2)));
    const dy = Math.abs(touch.pageY - (top + (circleDims / 2)));
    return (dx < (circleDims / 2) && dy < (circleDims / 2));
}