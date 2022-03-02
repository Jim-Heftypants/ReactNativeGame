import React from 'react';
import { View, Text, ScrollView } from 'react-native';

import normalizeFont from 'normalize-font';

export default ViewSelectionContainer = (props) => {
    const scale = props.deviceDims.deviceHeight / 600;
    const fontSize = normalizeFont(20, scale);
    const selectView = (page) => {
        props.parentSetState({ ...props.parentState, page });
    }
    let count = 0;
    return (
        <ScrollView>
            {props.pages.map(page => {
                return (
                    <View key={count++} style={{
                        width: props.deviceDims.width / 2, height: Math.ceil(props.deviceDims.height / 5), backgroundColor: 'pink',
                        borderColor: 'black', borderWidth: 2, borderRadius: 90, padding: props.deviceDims.width / 10, textAlign: 'center'
                    }} onPress={() => selectView(page)} >
                        <Text style={{ fontSize }} >{page}</Text>
                    </View>
                )
            })}
        </ScrollView>
    )
}