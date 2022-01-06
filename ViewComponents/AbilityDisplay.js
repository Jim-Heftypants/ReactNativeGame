import { View, Image, Text, StyleSheet, TouchableOpacity } from "react-native";
import React, {useEffect, useState} from 'react';

const circleDims = 100;

const AbilityDisplay = (props) => {
    // console.log("touches: ");
    // console.log(props.touches);
    let timer;
    const charAbilities = props.Character.Data.Attributes.Abilities;
    // { name: [name, levelReq, currentCD, cd, func, onCDColor, baseColor]}
    const abilitiesArr = Object.values(charAbilities);
    // modding this will not update values for character object

    const updateCooldowns = (interval) => {
        // console.log("updating cooldowns");
        // [name, levelReq, currentCD, cd, func, onCDColor, baseColor]
        let count = 0;
        for (let i = 0; i < abilitiesArr.length; i++) {
            if (abilitiesArr[i][2] < 0) {
                abilitiesArr[i][2] = 0;
                console.log("ability now off cooldown");
            }
            if (abilitiesArr[i][2] === 0) continue;
            abilitiesArr[i][2] -= (interval / 1000);
            abilitiesArr[i][2] = Math.round(abilitiesArr[i][2] * 1000) / 1000;
            count++;
        }
        if (!count) {
            clearInterval(timer);
            timer = null;
        }
        // this.setState({ state: this.state });
    }
    const trackCooldowns = () => {
        console.log("beginning cooldown intervel");
        const interval = 100;
        timer = setInterval(() => {
            updateCooldowns(interval);
        }, interval)
    }
    const addCooldown = (ability) => {
        // [name, levelReq, currentCD, cd, func, onCDColor, baseColor]
        if (ability[2] != 0) return;
        console.log("ability added: " + JSON.stringify(ability));
        ability[2] = ability[3];
        if (!timer) {
            trackCooldowns();
        }
        // activate ability
        ability[4](props.Character, "some data");
    }
    useEffect(() => {
        return function cleanup() {
            clearInterval(timer);
        }
    })
    const isPressed = (top, right) => {
        if (!props.touches.current.initial) return false;
        const touch = props.touches.current.initial;
        const dx = Math.abs(touch.pageX - (props.deviceWidth - right - (circleDims/2)));
        const dy = Math.abs(touch.pageY - (top + (circleDims/2)));
        // console.log("pageX: " + touch.pageX);
        // console.log("modRight: " + (props.deviceWidth - right));
        console.log("dx: " + dx);
        console.log("dy: " + dy);
        if (dx < (circleDims/2) && dy < (circleDims/2)) {
            console.log("ability pressed");
            return true;
        }
        return false;
    }
    let key = 0;
    // console.log("abilitiesArr: " + JSON.stringify(this.abilitiesArr));
    return (
        <View>
            {abilitiesArr.map((ability) => {
                // console.log("ability: " + JSON.stringify(ability));
                const [styles, top, right] = createStyle(ability, key, abilitiesArr, props.deviceHeight);
                if (isPressed(top, right)) addCooldown(ability);
                const textDisp = !ability[2] ? "Click Me" : `${ability[2]}`;
                return (
                    <View key={key++} style={styles.view} >
                        <Text style={styles.text} >{textDisp}</Text>
                        <View style={styles.subButton} ></View>
                    </View>
                )
            })}
        </View>
    )
}

export default AbilityDisplay;

const createStyle = (ability, key, abilitiesArr, deviceHeight) => {
    // [name, levelReq, currentCD, cd, func, onCDColor, baseColor]
    const cdPercent = 1 - (ability[2] / ability[3]);
    const color = ability[2] ? ability[6] : ability[5];
    const textColor = ability[2] ? ability[5] : ability[6];

    const width = circleDims;
    const height = circleDims;
    const borderRadius = (width + height) / 4;

    const distanceConst = 1.1;
    const right = Math.floor((abilitiesArr.length - (key)) * (circleDims * distanceConst) + ((distanceConst - 1) * circleDims));
    const top = Math.floor(deviceHeight - (circleDims * distanceConst));

    const innerHeight = height * cdPercent;
    const innerWidth = width * cdPercent;
    const innerRadius = (innerHeight + innerWidth) / 4;

    return ([{
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
    }, top, right]);
}