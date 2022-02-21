export default makeAbilityParams = (rules, params) => {
    // console.log("Making visual component with rules: ") + console.log(rules);
    // rules:
    // shouldFade(bool)  lifespan(double)  type(string/int)  opacity(double)
    // params: any

    let displayParams;
    switch (rules.type) {
        case 'line':
            displayParams = makeLineParams(rules, params);
            break;
        default:
            displayParams = {};
            break;
    }
    return displayParams;
}

const makeLineParams = (rules, params) => {
    // params requirements:
    // top, right, width, height, rotationAngle, color
    // params optionals:
    // colorVariant(children), zig-zag(children)
    const styles = {
        main: {
            position: 'absolute',
            top: params.top,
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
    return {
        styles,
        rules,
        params
    }

    // // const subComponent = <View style={styles.main}></View>;
    // // component = { subComponent }
    // const component = <AbilityComponent styles={styles} rules={rules} params={params} ></AbilityComponent>;
    // // console.log(component);
    // return component;
}