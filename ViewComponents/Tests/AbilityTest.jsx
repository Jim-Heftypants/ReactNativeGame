import React from "react";
import {View} from 'react-native';

import AbilityVisualizer from "../../Classes/Constants/Utilities/AbilityVisualizer";
import AbilityComponent from "../../Classes/Constants/Utilities/AbilityComponent";

export default AbilityTest = (props) => {
    const rules = {
        shouldFade: false,
        lifespan: 5000,
        type: 'line',
        opacity: 1,
    };
    const params = {
        bottom: -300,
        right: 300,
        width: 100,
        height: 10,
        rotationAngle: 90,
        color: 'purple',
    }
    const styles = {
        main: {
            position: 'absolute',
            bottom: params.bottom,
            right: params.right,
            width: params.width,
            height: params.height,
            // transform: [
            //     { translateX: params.width / 2 },
            //     { rotate: `${params.rotationAngle}deg` },
            //     { translateX: -params.width / 2 }
            // ],
            backgroundColor: params.color,
        }
    }

    // const component = AbilityVisualizer(rules, params);
    return (
        <View style={{width: 1000, height: 1000, backgroundColor: 'red', position: 'absolute'}} >
            <AbilityComponent styles={{ width: 250, height: 50, backgroundColor: 'powderblue' }} rules={rules} params={params} >
            </AbilityComponent>
            {/* <AbilityComponent styles={styles} rules={rules} params={params} ></AbilityComponent> */}
            {/* {component} */}
        </View>
    )
}