import React, { useState, useRef } from 'react';
import { View, TouchableOpacity } from 'react-native';

import { getPath } from '../Utils/pathingUtils';
import { testMap } from '../Maps/testMap';

export default MapTest = (props) => {
    const nodes = useRef(Object.values(testMap)).current;
    let [colors, setColors] = useState({});

    function applyPath(node) {
        console.log("Pathfinder called");
        // var startTime = performance.now();
        const path = getPath(nodes[66].center, node.center, testMap);
        console.log("path length:", path.length);
        // var endTime = performance.now()
        // console.log(`Call to doSomething took ${endTime - startTime} milliseconds`)

        colors = {};
        for (let i = 0; i < path.length; i++) {
            colors[path[i].center] = "blue";
        }
        setColors({ ...colors });
    }

    let key = 0;
    return (
        <View style={{ width: props.width, height: props.height, backgroundColor: 'grey' }} >
            {nodes.map(node => {
                const color = colors[node.center] ? colors[node.center] : node.color;
                return (
                    <TouchableOpacity style={{
                        width: node.size, height: node.size, position: 'absolute', left: node.center[0], top: node.center[1],
                        backgroundColor: color, borderWidth: 1
                    }}
                        onPress={() => applyPath(node)} key={key++} >
                    </TouchableOpacity>
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