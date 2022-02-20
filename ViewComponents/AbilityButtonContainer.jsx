import { View, Image, Text } from "react-native";
import React, { useRef, useState } from 'react';

import AbilityButton from "./AbilityButton";
import TargettingDisplay from './TargettingDisplay';

const circleDims = 100;
const distanceConst = 1.2;

export default AbilityButtonContainer = (props) => {
    // console.log("Ability Display Loaded");
    const targetData = useRef();
    const activeAbility = useRef();
    const charAbilities = props.Character.Data.Attributes.Abilities;
    // { name: [name, levelReq, currentCD, cd, func, onCDColor, baseColor]}
    const abilityKeys = Object.keys(charAbilities);

    const touchedAbility = useMemo(() => // string of key
        getTouchedAbility(props?.touches?.initial, circleDims, distanceConst, abilityKeys, props.deviceDims.deviceHeight, props.deviceDims.deviceWidth),
        [props.touches.initial.pageX, props.touches.initial.pageY]
    );

    const targettingDisp = useMemo(() => {
        if (!touchedAbility || charAbilities[touchedAbility][2]) return <></>;
        activeAbility.current = touchedAbility;
        return <TargettingDisplay touches={props.touches}
            circleDims={circleDims} dims={props.deviceDims} targetData={targetData} >
        </TargettingDisplay>
    }, [touchedAbility]
    );

    let activatedAbility;
    if (!props?.touches?.initial && targetData.current) {
        // flag ref for cooldown tracking
        activatedAbility = activeAbility.current;
        activeAbility.current = null;
        // set data
        const data = charAbilities[activatedAbility][4]({ targetData: targetData.current, prePos: props.Character.DynamicData.pos.slice() });
        props.Character.DynamicData.AnimEffects.push([activatedAbility, data])
        targetData.current = null;
        // need to set removeAbilityEffect here
        removeAbilityEffect(props.Character.DynamicData.AnimEffects, activatedAbility, data.rules.lifespan);
        // reload parent display
        props.addEffect(activatedAbility);
    }

    let abilityNumber = 1;
    const top = getButtonTop(props.deviceDims.deviceHeight, circleDims, distanceConst);
    return (
        <View>
            {abilityKeys.map((abilityName) => {
                abilityNumber++;
                const left = getButtonLeft(props.deviceDims.deviceWidth, circleDims, distanceConst, abilityNumber);
                const shouldStartCD = (abilityName === activatedAbility);
                return <View key={abilityName} >
                    <AbilityButton circleDims={circleDims} abilityName={abilityName} top={top} left={left}
                        shouldStartCD={shouldStartCD} Character={props.Character} dims={props.deviceDims}
                        ability={charAbilities[abilityName]} >
                    </AbilityButton>
                </View>
            })}
            {targettingDisp}
        </View>
    )
}

const getTouchedAbility = (touch, circleDims, distanceConst, keys, height, width) => {
    if (!touch) return null;
    const top = Math.floor(height - (circleDims * distanceConst * 2)); // very top of circle
    const centerY = top + (circleDims / 2);
    for (let i = 0; i < keys.length; i++) {
        const left = Math.floor(width - (circleDims * distanceConst) * i); // very left of circle
        const centerX = left + (circleDims / 2);
        const dx = Math.abs(touch.pageX - centerX);
        const dy = Math.abs(touch.pageY - centerY);
        if (dx < (circleDims / 2) && dy < (circleDims / 2)) return keys[i];
    }
    return null;
}

const getButtonTop = (deviceHeight, circleDims, distanceConst) => {
    return Math.floor(deviceHeight - (circleDims * distanceConst * 2));
}

const getButtonLeft = (deviceWidth, circleDims, distanceConst, abilityNumber) => {
    return Math.floor(deviceWidth - (circleDims * distanceConst) * abilityNumber);
}

const removeAbilityEffect = (effects, effect, lifespan) => {
    console.log('abilityDisplay lifespan (seconds): ' + lifespan / 1000);
    if (lifespan) {
        setTimeout(() => {
            effects.splice(effects.indexOf(effect), 1);
            console.log("abilityDisplay lifespan concluded");
        }, lifespan);
    } else {
        effects.splice(effects.indexOf(effect), 1);
        console.log("abilityDisplay lifespan concluded");
    }
}