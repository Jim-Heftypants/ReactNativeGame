import React, { useState } from 'react';
import { View, TouchableOpacity } from 'react-native';

import { getPath } from '../Utils/pathingUtils';
import { testMap } from '../Maps/testMap';

export default MapTest = (props) => {
    const startNode = testMap[[100, 100]];
    const nodes = Object.values(testMap);
    const [colors, setColors] = useState(getColors(nodes));

    function applyPath(node) {
        // console.log('here');
        const path = getPath(nodes[66].center, node.center, testMap);
        console.log(path);
        for (const node in path) {
            colors[node.center] = "blue";
        }
        setColors(colors);
    }

    let key = 0;
    return (
        <View style={{ width: props.width, height: props.height, backgroundColor: 'grey' }} >
            {nodes.map(node => {
                return (
                    <TouchableOpacity style={{ width: node.size, height: node.size, position: 'absolute', left: node.center[0], top: node.center[1], backgroundColor: colors[node.center], borderWidth: 1 }}
                        onPress={() => applyPath(node)} key={key++} ></TouchableOpacity>
                )
            })}
        </View>
    )
}

const getColors = (nodes) => {
    const colors = {};
    nodes.map(node => {
        colors[node.center] = node.color;
    });
    return colors;
}