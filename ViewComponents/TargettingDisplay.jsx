import React from "react";
import { View } from 'react-native';

export default TargettingDisplay = (props) => {
    // console.log("Targetting Display Loaded");
    // console.log("touches: "); console.log(props.touches);

    if (props.touchedNode) {
        console.log("Node has already been touched and not reset by abilityButton " + props.keyy);
        return <></>
    }

    const nextTouch = props.touches.next;
    const initialTouch = props.touches.initial;

    const dx = initialTouch.pageX - nextTouch.pageX; // goes from touch to touch -- not center to touch
    const dy = initialTouch.pageY - nextTouch.pageY;
    // const dx = 0 - nextTouch.pageX; // get center of circle
    // const dy = 0 - nextTouch.pageY;
    const radians = Math.atan2(dy, dx);
    const transform = Math.round(radians * (180 / Math.PI) * 100)/100;
    // console.log("transform: " + transform);
    
    if (!initialTouch && !nextTouch) {
        console.log("Targetting Display touch released");
        // use ability
        props.ability[4](props.Character, " direction: " + transform);
        // reload parent
        props.setTouchedNode(() => props.keyy);
        return <></>;
    }

    const width = Math.round((Math.sqrt(Math.pow(dx, 2) + Math.pow(dy, 2)) - props.circleDims/2)*10)/10; // triangles
    const height = props.circleDims / 2;

    const opacity = 0.5;
    const color = 'white';
    const style = {
        body: {
            bottom: -props.top - props.circleDims / 2,
            left: props.left + props.circleDims / 2,
            position: 'absolute',
            width,
            height,
            backgroundColor: color,
            opacity,
            transform: [
                {translateX: width/2}, 
                {rotate: `${transform}deg`},
                {translateX: -width/2}
            ],
            zIndex: -10,
        },
        top: {
            width: 0,
            height: 0,
            backgroundColor: 'transparent',
            borderStyle: 'solid',
            borderBottomWidth: props.circleDims * 3 / 8, // 50% more width than body
            borderLeftWidth: 0,
            borderRightWidth: props.circleDims * 3 / 4,
            borderTopWidth: props.circleDims * 3 / 8,
            borderBottomColor: 'transparent',
            borderTopColor: 'transparent',
            borderLeftColor: 'transparent',
            borderRightColor: color,
            transform: [
                { translateX: -props.circleDims * 6 / 8 },
                { translateY: -props.circleDims / 8 },
            ],
            zIndex: -9,
        }
    }

    return (
        <View style={style.body} >
            <View style={style.top} ></View>
        </View>
    )
}