import React, {useRef, useState, useEffect, useMemo} from 'react';
import {View, Text} from 'react-native';

export default AbilityButton = (props) => {
    // console.log(`Ability Button ${props.keyy} Loaded`);
    const [cooldown, setCooldown] = useState(0);

    const right = useRef(Math.floor((props.abilitiesLength - (props.keyy)) * (props.circleDims * props.distanceConst) +
            ((props.distanceConst - 1) * props.circleDims))).current;
    const top = useRef(Math.floor(props.deviceDims.deviceHeight - (props.circleDims * props.distanceConst))).current;

    if (!cooldown && isPressed(top, right, props.touch, props.circleDims, props.deviceDims.deviceWidth)) {
        addCooldown(props.ability, props.Character, cooldown, setCooldown);
    }
    
    const styles = useMemo(() => {return createStyle(props.ability, props.circleDims, top, right);}, [cooldown, top, right]);
    const textDisp = !cooldown ? "Click Me" : `${cooldown}`;
    const buttonDisp = useMemo(() => {
        return (<View style={styles.view} >
            <Text style={styles.text} >{textDisp}</Text>
            <View style={styles.subButton} ></View>
        </View>)
    }, [cooldown, props.circleDims, props.distanceConst])
    return (
        <>
            {buttonDisp}
        </>
    )
}

const updateCooldown = (ability, cdSpeed, interval, setCooldown) => {
    // console.log("updating cooldowns");
    // [name, levelReq, currentCD, cd, func, onCDColor, baseColor]
    ability[2] -= cdSpeed;
    ability[2] = Math.round(ability[2] * 1000) / 1000;
    if (ability[2] < 0) ability[2] = 0;
    if (!ability[2] === 0) {
        clearInterval(interval);
        interval = null;
        console.log("ability now off cooldown");
    }
    setCooldown(ability[2]);
}

const addCooldown = (ability, Character, cooldown, setCooldown) => {
    // [name, levelReq, currentCD, cd, func, onCDColor, baseColor]
    if (ability[2] != 0) return;
    ability[2] = ability[3];
    if (!cooldown) {
        console.log("using ability: " + JSON.stringify(ability));
        const inter = 100; const cdSpeed = (inter / 1000)
        const interval = setInterval(() => {
            updateCooldown(ability, cdSpeed, interval, setCooldown);
        }, inter)
        // activate ability
        ability[4](Character, "some data");
    }
}

const isPressed = (top, right, touch, circleDims, deviceWidth) => {
    if (!touch) return false;
    const dx = Math.abs(touch.pageX - (deviceWidth - right - (circleDims / 2)));
    const dy = Math.abs(touch.pageY - (top + (circleDims / 2)));
    // console.log("pageX: " + touch.pageX);
    // console.log("modRight: " + (deviceWidth - right));
    console.log("dx: " + dx);
    console.log("dy: " + dy);
    if (dx < (circleDims / 2) && dy < (circleDims / 2)) {
        return true;
    }
    return false;
}

const createStyle = (ability, circleDims, top, right) => {
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
            right: right,
            top: top,
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