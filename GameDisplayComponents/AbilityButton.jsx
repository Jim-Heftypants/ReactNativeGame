import React, { useRef, useState, useMemo } from 'react';
import { View, Text } from 'react-native';

// import TargettingDisplay from './TargettingDisplay';

export default AbilityButton = (props) => {
    // console.log(`Ability Button ${props.keyy} Loaded`);
    const [cooldown, setCooldown] = useState(0);
    const timer = useRef();

    useMemo(() => {
        if (props.shouldStartCD) addCooldown(props.ability, setCooldown, timer);
    }, [props.shouldStartCD]);

    const styles = useMemo(() => { return createStyle(props.ability, props.circleDims, props.top, props.left); },
        [cooldown, props.top, props.left]);
    const textDisp = !cooldown ? props.abilityName : `${cooldown}`;
    const buttonDisp = useMemo(() =>
        <View style={styles.view} >
            <Text style={styles.text} >{textDisp}</Text>
            <View style={styles.subButton} ></View>
        </View>,
        [cooldown, props.circleDims]
    );
    return (
        <>
            {buttonDisp}
        </>
    )
}

const updateCooldown = (ability, cdSpeed, setCooldown, timer) => {
    // [name, levelReq, currentCD, cd, func, onCDColor, baseColor]
    ability[2] -= cdSpeed;
    ability[2] = Math.round(ability[2] * 100) / 100;
    if (ability[2] < 0) ability[2] = 0;
    if (ability[2] === 0) {
        clearInterval(timer.current);
        timer.current = null;
        console.log("ability now off cooldown");
    }
    setCooldown(ability[2]);
}

const addCooldown = (ability, setCooldown, timer) => {
    // [name, levelReq, currentCD, cd, func, onCDColor, baseColor]
    if (ability[2]) return;
    ability[2] = ability[3];
    console.log("Adding cooldown for: " + JSON.stringify(ability));
    const inter = 100; const cdSpeed = (inter / 1000); // any cooldown speed mods go here
    timer.current = setInterval(() => {
        updateCooldown(ability, cdSpeed, setCooldown, timer);
    }, inter)
}

const createStyle = (ability, circleDims, top, left) => {
    // [name, levelReq, currentCD, cd, func, onCDColor, baseColor]
    const cdPercent = 1 - (ability[2] / ability[3]);
    const color = ability[2] ? ability[6] : ability[5];
    const textColor = ability[2] ? ability[5] : ability[6];

    const width = circleDims;
    const height = circleDims;
    const borderRadius = (width + height) / 4;
    const innerHeight = height * cdPercent;
    const innerWidth = width * cdPercent;
    const innerRadius = (innerHeight + innerWidth) / 4;

    return ({
        view: {
            position: 'absolute',
            left,
            top,
            alignItems: "center",
            justifyContent: 'center',
            width,
            height,
            borderRadius,
            backgroundColor: `rgba(${color},${cdPercent})`, // color, opacity
            zIndex: 100,
        },
        subButton: {
            position: 'absolute',
            width: innerWidth,
            height: innerHeight,
            borderRadius: innerRadius,
            backgroundColor: `rgb(${color})`,
            zIndex: 11,
        },
        text: {
            position: 'absolute',
            color: `rgb(${textColor})`,
            zIndex: 15,
        }
    });
}