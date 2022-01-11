import React, {useRef, useState, useEffect, useMemo} from 'react';
import {View, Text} from 'react-native';

import TargettingDisplay from './TargettingDisplay';

export default AbilityButton = (props) => {
    // console.log(`Ability Button ${props.keyy} Loaded`);
    const [cooldown, setCooldown] = useState(0);

    const timer = useRef();
    // const right = useRef(Math.floor((props.abilitiesLength - (props.keyy)) * (props.circleDims * props.distanceConst) +
    //         ((props.distanceConst - 1) * props.circleDims))).current;
    const left = useRef(Math.floor(props.deviceDims.deviceWidth - (props.circleDims * props.distanceConst) * props.keyy)).current;
    const top = useRef(Math.floor(props.deviceDims.deviceHeight - (props.circleDims * props.distanceConst))).current;

    // useEffect(() => {return () => {if (timer.current) clearInterval(timer.current);}}) // breaks the timer

    if (!cooldown && props.touches) {
        addCooldown(props.ability, props.Character, cooldown, setCooldown, timer);
    }
    
    const styles = useMemo(() => {return createStyle(props.ability, props.circleDims, top, left);}, [cooldown, top, left]);
    const textDisp = !cooldown ? "Click Me" : `${cooldown}`;
    const buttonDisp = useMemo(() => 
        <View style={styles.view} >
            <Text style={styles.text} >{textDisp}</Text>
            <View style={styles.subButton} ></View>
        </View>,
        [cooldown, props.circleDims, props.distanceConst]
    );
    let nextX; let nextY;
    if (props.nextTouch) {
        nextX = props.nextTouch.pageX;
        nextY = props.nextTouch.pageY;
    }
    const targettingDisp = useMemo(() => {
            return cooldown ? <TargettingDisplay initialTouch={props.touch} nextTouch={props.nextTouch}
                circleDims={props.circleDims} top={top} left={left} >
                </TargettingDisplay> : <></>;
        }, [nextX, nextY]
    );
    return (
        <>
            {buttonDisp}
            {targettingDisp}
        </>
    )
}

const updateCooldown = (ability, cdSpeed, setCooldown, timer) => {
    // [name, levelReq, currentCD, cd, func, onCDColor, baseColor]
    ability[2] -= cdSpeed;
    ability[2] = Math.round(ability[2] * 1000) / 1000;
    if (ability[2] < 0) ability[2] = 0;
    if (!ability[2] === 0) {
        clearInterval(timer.current);
        timer.current = null;
        console.log("ability now off cooldown");
    }
    setCooldown(ability[2]);
}

const addCooldown = (ability, Character, cooldown, setCooldown, timer) => {
    // [name, levelReq, currentCD, cd, func, onCDColor, baseColor]
    if (cooldown || ability[2]) return;
    ability[2] = ability[3];
    console.log("using ability: " + JSON.stringify(ability));
    const inter = 100; const cdSpeed = (inter / 1000); // any cooldown speed mods go here
    timer.current = setInterval(() => {
        // console.log("here");
        updateCooldown(ability, cdSpeed, setCooldown, timer);
    }, inter)
    // activate ability
    ability[4](Character, "some data");
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