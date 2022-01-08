import React from "react";
import { View } from 'react-native';

const ControlCircle = (props) => {
    // controlType = { props.controlType } animPos = { animPos } {...props.deviceDims }
    // Character = { props.Character } touches = { touches.left }

    const circleDims = props.deviceHeight * 0.35;
    const styles = {
        circle: {
            position: 'absolute',
            alignItems: "center",
            justifyContent: 'center',
            top: props.deviceHeight - (circleDims * 1.1),
            left: circleDims * 0.2,
            borderRadius: circleDims / 2,
            width: circleDims,
            height: circleDims,
            backgroundColor: 'black',
            zIndex: -5,
        },
        transparent: {
            position: 'absolute',
            zIndex: -5,
        },
    };

    return (
        <View style={styles[props.controlType]} ></View>
    )
}

export default ControlCircle;