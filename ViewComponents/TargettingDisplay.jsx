import React from "react";
import { View } from 'react-native';

export default TargettingDisplay = (props) => {
    console.log("Targetting Display Loaded");

    if (!props.initialTouch || !props.nextTouch) {
        console.log("touch missing");
        return <></>;
    }

    const dx = props.initialTouch.pageX - props.nextTouch.pageX;
    const dy = props.initialTouch.pageY - props.nextTouch.pageY;
    const radians = Math.atan2(dy, dx);
    const transform = radians * (180 / Math.PI);
    console.log("transform: " + transform);

    // const total = Math.abs(dx) + Math.abs(dy);
    // const xRatio = dx / total;
    // const yRatio = dy / total;

    const width = Math.round((Math.sqrt(Math.pow(dx, 2) + Math.pow(dy, 2)) - props.circleDims/2)*10)/10; // triangles
    const height = props.circleDims / 2;

    // top == yRatio || bottom == -yRatio

    const opacity = 0.5;
    const color = 'white';
    const style = {
        body: {
            bottom: -props.top - props.circleDims / 2,
            right: props.right + props.circleDims / 2,
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
        <>
            <View style={style.body} >
                <View style={style.top} ></View>
            </View>
        </>
    )
}