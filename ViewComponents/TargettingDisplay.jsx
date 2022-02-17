import React from "react";
import { View } from 'react-native';

const centerType = 1;

export default TargettingDisplay = (props) => {
    // console.log("Targetting Display Loaded");
    // console.log("touches: "); console.log(props.touches);

    const height = props.circleDims / 2;
    const top = centerType ? (props.dims.deviceHeight / 2) : (props.top + height);
    const right = centerType ? (props.dims.deviceWidth / 2) : (props.dims.deviceWidth - (props.left + height));
    const dx = right - props.touches.next.pageX;
    const dy = top - props.touches.next.pageY;
    const radians = Math.atan2(dy, dx);
    const transform = Math.round(radians * (180 / Math.PI) * 100)/100; // HORIZONTALLY SWAPPED (-,-) == quad 3 but is shown quad 4
    // console.log("transform: " + transform);
    props.targetDirection.current = transform;
    props.posChange.current = {dx, dy};

    const width = Math.round((Math.sqrt(Math.pow(dx, 2) + Math.pow(dy, 2)) - height)*10)/10; // triangles

    const opacity = 0.5;
    const color = 'white';
    const style = {
        body: {
            bottom: -top,
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
            borderBottomWidth: height / 2,
            borderLeftWidth: 0,
            borderRightWidth: height,
            borderTopWidth: height / 2,
            borderBottomColor: 'transparent',
            borderTopColor: 'transparent',
            borderLeftColor: 'transparent',
            borderRightColor: color,
            transform: [
                { translateX: -height },
                // { translateY: props.circleDims / 2 },
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