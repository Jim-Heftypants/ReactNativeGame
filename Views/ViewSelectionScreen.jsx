import React from 'react';
import { View, Text, ScrollView } from 'react-native';

import normalizeFont from '../Utils/normalizeFont';

export default ViewSelectionContainer = (props) => {
    const scale = props.deviceDims.deviceHeight / 600;
    const fontSize = normalizeFont(20, scale);
    const selectView = (page) => {
        props.parentSetState({ ...props.parentState, page });
    }
    const pageDisplays = [];
    for (let i = 0; i < props.pages.length; i += 2) {
        pageDisplays.push(
            <View key={i} style={{ flex: 'horizontal', width: props.deviceDims.width, height: Math.ceil(props.deviceDims.height / 5) }} >
                <View style={{
                    backgroundColor: 'pink', borderColor: 'black', borderWidth: 2, borderRadius: 90, padding: props.deviceDims.width / 10, textAlign: 'center'
                }} onPress={() => selectView(props.pages[i])} >
                    <Text style={{ fontSize, color: 'black' }} >{props.pages[i]}</Text>
                </View>
                {props.pages.length > i + 1 ? <View style={{
                    backgroundColor: 'pink', borderColor: 'black', borderWidth: 2, borderRadius: 90, padding: props.deviceDims.width / 10, textAlign: 'center'
                }} onPress={() => selectView(props.pages[i + 1])} >
                    <Text style={{ fontSize, color: 'black' }} >{props.pages[i + 1]}</Text>
                </View> : <></>}
            </View>
        );
    }
    return (
        <ScrollView>
            {pageDisplays.map((pageDisplay) => pageDisplay)}
        </ScrollView>
    )
}