import React, { setState } from 'react';
import { View } from 'react-native';

import { getPath } from '../Utils/pathingUtils';
import { testMap } from '../Maps/testMap';

export default MapTest = (props) => {
    const startNode = testMap[[100, 100]];
    const nodes = Object.values(testMap);
    const [colors, setColors] = setState(getColors(nodes));

    const applyPath = (node) => {
        const path = getPath(startNode, node, testMap);
        console.log(path);
        for (const node in path) {
            colors[node.center] = "blue";
        }
        setColors(colors);
    }

    return (
        <View style={{ width: props.width, height: props.height, backgroundColor: 'grey' }} >
            {nodes.map(node => {
                return (
                    <View style={{ width: node.size, height: node.size, position: 'absolute', left: node.center[0], top: node.center[1], backgroundColor: colors[node.center] }}
                        onPress={() => applyPath(node)} ></View>
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