import {View} from 'react-native';

import AbilityComponent from './AbilityComponent';

export default makeVisualAbilityComponent = (rules, params) => {
    // rules:
    // shouldFade(bool)  lifespan(double)  type(string/int)  opacity(double)
    // params: any

    let component;
    switch (rules.type) {
        case 'line':
            component = makeLineComponent(rules, params);
        default:
            component = <></>;
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
    const subComponent = <View style={styles.main}></View>;
    const component = <AbilityComponent component={subComponent} rules={rules} params={params} ></AbilityComponent>;
    return component;
}