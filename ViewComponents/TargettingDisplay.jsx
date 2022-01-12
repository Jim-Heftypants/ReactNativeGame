import React from "react";
import { View } from 'react-native';

export default TargettingDisplay = (props) => {
    // console.log("Targetting Display Loaded");
    // console.log("touches: "); console.log(props.touches);

    const dx = props.touches.initial.pageX - props.touches.next.pageX; // goes from touch to touch -- not center to touch
    const dy = props.touches.initial.pageY - props.touches.next.pageY;
    const height = props.circleDims / 2;
    // const dx = props.left - height - props.touches.next.pageX; // get center of circle
    // const dy = props.top - height - props.touches.next.pageY;
    const radians = Math.atan2(dy, dx);
    const transform = Math.round(radians * (180 / Math.PI) * 100)/100;
    // console.log("transform: " + transform);
    props.targetDirection.current = transform;

    const width = Math.round((Math.sqrt(Math.pow(dx, 2) + Math.pow(dy, 2)) - props.circleDims/2)*10)/10; // triangles

    const opacity = 0.5;
    const color = 'white';
    const bottom = -props.top - height;
    // const left = props.left + height;
    const right = props.dims.deviceWidth - (props.left + height);
    const style = {
        body: {
            bottom,
            // left,
            right,
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