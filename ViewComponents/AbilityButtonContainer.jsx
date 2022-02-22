import { View, Image, Text } from "react-native";
import React, { useRef, useMemo, useEffect } from 'react';

import AbilityButton from "./AbilityButton";
import TargettingDisplay from './TargettingDisplay';

const circleDims = 100;
const distanceConst = 1.2;
const rightOffset = 2;

export default AbilityButtonContainer = (props) => {
    // console.log("Ability Display Loaded");
    const targetData = useRef();
    const activeAbility = useRef();
    const charAbilities = props.Character.Data.Attributes.Abilities;
    // { name: [name, levelReq, currentCD, cd, func, onCDColor, baseColor]}
    const abilityKeys = Object.keys(charAbilities);

    const touchedAbility = useMemo(() => // string of key
        getTouchedAbility(props.touches, circleDims, distanceConst, abilityKeys, props.deviceDims.deviceHeight, props.deviceDims.deviceWidth, rightOffset),
        [props.touches?.initial?.pageX, props.touches?.initial?.pageY]
    );
    // console.log(touchedAbility);
    const targettingDisp = useMemo(() => {
        if (!touchedAbility || charAbilities[touchedAbility][2]) return <></>;
        activeAbility.current = touchedAbility;
        return <TargettingDisplay touches={props.touches} circleDims={circleDims} dims={props.deviceDims} targetData={targetData} ></TargettingDisplay>
    }, [touchedAbility, props.touches?.next?.pageX, props.touches?.next?.pageY]); // re-renders every time -- no point in memo

    // console.log(props.touches?.initial?.pageX);
    // console.log(activeAbility.current);
    // console.log(targetData.current);
    useEffect(() => {
        if (!props.touches?.initial?.pageX && activeAbility.current && targetData.current) {
            console.log("Activating ability");
            // set data
            const data = charAbilities[activeAbility.current][4]({ targetData: targetData.current, prePos: props.Character.DynamicData.pos.slice() });
            let key = activeAbility.current; let iter = 0;
            while (props.Character.DynamicData.AnimEffects[key]) {
                key = key + iter++;
            }
            props.Character.DynamicData.AnimEffects[key] = data;
            targetData.current = null;
            // need to set removeAbilityEffect here
            removeAbilityEffect(props.Character.DynamicData.AnimEffects, key, data.rules.lifespan, props.addEffect);
            // reload parent display
            props.addEffect(key);
        }
    }, [props.touches?.initial?.pageX])

    let abilityNumber = 0;
    const top = getButtonTop(props.deviceDims.deviceHeight, circleDims, distanceConst);
    return (
        <View>
            {abilityKeys.map((abilityName) => {
                const left = getButtonLeft(props.deviceDims.deviceWidth, circleDims, distanceConst, abilityNumber++, rightOffset);
                let shouldStartCD;
                if (!props.touches?.initial?.pageX && abilityName === activeAbility.current) {
                    console.log('Should start cooldown for ' + abilityName);
                    shouldStartCD = true;
                }
                return <AbilityButton key={abilityName} circleDims={circleDims} abilityName={abilityName} top={top} left={left}
                    Character={props.Character} dims={props.deviceDims}
                    ability={charAbilities[abilityName]} shouldStartCD={shouldStartCD} >
                </AbilityButton>
            })}
            {targettingDisp}
        </View>
    )
}

const getTouchedAbility = (touch, circleDims, distanceConst, keys, height, width, rightOffset) => {
    if (!touch?.initial) return null;
    const top = getButtonTop(height, circleDims, distanceConst); // very top of circle
    const centerY = top + (circleDims / 2);
    for (let i = 0; i < keys.length; i++) {
        const left = getButtonLeft(width, circleDims, distanceConst, i, rightOffset); // very left of circle
        const centerX = left + (circleDims / 2);
        const dx = Math.abs(touch.initial.pageX - centerX);
        const dy = Math.abs(touch.initial.pageY - centerY);
        if (dx < (circleDims / 2) && dy < (circleDims / 2)) return keys[i];
    }
    return null;
}

const getButtonTop = (deviceHeight, circleDims, distanceConst) => {
    return Math.floor(deviceHeight - (circleDims * distanceConst * 2));
}

const getButtonLeft = (deviceWidth, circleDims, distanceConst, abilityNumber, rightOffset) => {
    return Math.floor(deviceWidth - (((circleDims * distanceConst) * abilityNumber) + (rightOffset * circleDims)));
}

const removeAbilityEffect = (effects, effect, lifespan, addEffect) => {
    console.log('abilityDisplay lifespan (seconds): ' + lifespan / 1000);
    if (lifespan) {
        setTimeout(() => {
            // effects.splice(effects.indexOf(effect), 1);
            delete effects[effect];
            console.log("abilityDisplay lifespan concluded");
            addEffect(null);
        }, lifespan);
    } else {
        // effects.splice(effects.indexOf(effect), 1);
        delete effects[effect];
        console.log("abilityDisplay lifespan concluded");
        addEffect(null);
    }
}