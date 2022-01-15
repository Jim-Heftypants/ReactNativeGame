import React from 'react';
import {View} from 'react-native';

import AbilityComponent from './AbilityComponent';

export default makeVisualAbilityComponent = (rules, params) => {
    // console.log("Making visual component with rules: ") + console.log(rules);
    // rules:
    // shouldFade(bool)  lifespan(double)  type(string/int)  opacity(double)
    // params: any

    let component;
    switch (rules.type) {
        case 'line':
            component = makeLineComponent(rules, params);
            break;
        default:
            component = <></>;
            break;
    }
    return component;
}

const makeLineComponent = (rules, params) => {
    // params requirements:
    // bottom, right, width, height, rotationAngle, color
    // params optionals:
    // colorVariant(children), zig-zag(children)
    const styles = {
        main: {
            position: 'absolute',
            bottom: params.bottom,
            right: params.right,
            width: params.width,
            height: params.height,
            transform: [
                { translateX: params.width / 2 },
                { rotate: `${params.rotationAngle}deg` },
                { translateX: -params.width / 2 }
            ],
            backgroundColor: params.color,
        }
    }
    // const subComponent = <View style={styles.main}></View>;
    // component = { subComponent }
    const component = <AbilityComponent styles={styles} rules={rules} params={params} ></AbilityComponent>;
    // console.log(component);
    return component;
}