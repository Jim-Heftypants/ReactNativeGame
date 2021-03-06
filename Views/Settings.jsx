import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Slider, Text, Icon } from 'react-native-elements';

const Sliders = (props) => {
    const [value, setValue] = useState(1);

    const interpolate = (start, end) => {
        let k = (value - 1) / 2; // 1 =>min  && 2 => MAX
        return Math.ceil((1 - k) * start + k * end) % 256;
    };

    const color = () => {
        let r = interpolate(255, 0);
        let g = interpolate(0, 255);
        let b = interpolate(0, 0);
        return `rgb(${r},${g},${b})`;
    };

    function close() {
        props.that.setState({
            ...props.parentState, page: "Game Display", settings: {
                displayScale: value,
            }
        });
    }

    return (
        <View>
            <Icon
                name="times"
                type="font-awesome"
                size={20}
                reverse
                containerStyle={{ left: '90%' }}
                // color={color()}
                onPress={close}
            />
            <Text style={styles.subHeader}>Horizontal Slider</Text>
            <View style={[styles.contentView]}>
                <Slider
                    value={value}
                    onValueChange={setValue}
                    maximumValue={10}
                    minimumValue={0}
                    step={1}
                    allowTouchTrack={true}
                    trackStyle={{ height: 10, backgroundColor: 'transparent' }}
                    thumbStyle={{ height: 40, width: 20, backgroundColor: 'transparent' }}
                    thumbProps={{
                        children: (
                            <View style={{ ...styles.innerTextDisplay, backgroundColor: color() }} >
                                <Text style={{ fontSize: 20 }}>{value}</Text>
                            </View>
                        ),
                    }}
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    contentView: {
        padding: 20,
        width: '90%',
        marginLeft: '10%',
        justifyContent: 'center',
        alignItems: 'stretch',
    },
    subHeader: {
        backgroundColor: "#2089dc",
        color: "white",
        textAlign: "center",
        paddingVertical: 5,
        marginBottom: 10
    },
    innerTextDisplay: {
        width: 40,
        height: 40,
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center',
    }
});

export default Sliders;