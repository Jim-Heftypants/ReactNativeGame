import React, { useState, useRef } from 'react';
import { View, TouchableOpacity } from 'react-native';

import { getPath } from '../Utils/pathingUtils';
import testMap from '../Maps/testMap';

export default MapTest = (props) => {
    const nodes = useRef(Object.values(testMap)).current;
    let [colors, setColors] = useState({});

    function applyPath(node) {
        const path = getPath(nodes[66].center, node.center, testMap);
        console.log("path length:", path.length);

        colors = {};
        for (let i = 0; i < path.length; i++) {
            colors[path[i].center] = "blue";
        }
        setColors({ ...colors });
    }

    const octagonStyles = useRef({}).current;
    for (const node of nodes) {
        const color = node.unpathable ? "red" : "green";
        octagonStyles[node.center] = getOctagonStyles(node, color);
    }

    let key = 0;
    return (
        <View style={{ width: props.width, height: props.height, backgroundColor: 'grey' }} >
            {nodes.map(node => {
                octagonStyles[node.center].backgroundColor = colors[node.center] ? colors[node.center] : node.unpathable ? "red" : "green";
                const octagonKeys = Object.keys(octagonStyles[node.center]);
                return (
                    <TouchableOpacity style={{ width: node.size, height: node.size, position: 'absolute', left: node.center[0], top: node.center[1] }}
                        onPress={() => applyPath(node)} key={key++} >
                        {octagonKeys.map(styleKey => {
                            return <View style={octagonStyles[node.center][styleKey]} key={styleKey} ></View>
                        })}
                    </TouchableOpacity>
                )
            })}
        </View>
    )
}

function getOctagonStyles(node, faceColor) {
    const rotations = {
        right: 180,
        topRight: 225,
        top: 270,
        topLeft: 315,
        left: 0,
        bottomLeft: 45,
        bottom: 90,
        bottomRight: 135,
    }
    const width = node.size * 0.5;
    const height = node.size * 0.2;
    const rect = {
        width,
        height,
        position: 'absolute',
        backgroundColor: faceColor,
        borderLeftWidth: 4,
    }
    const styles = {};
    for (const key in node.neighbors) {
        styles[key] = {
            ...rect,
            borderColor: node.pathableNeighbors[key] ? "green" : "pink",
            transform: [
                { translateX: width / 2 },
                { rotate: `${rotations[key]}deg` },
                { translateX: -width / 2 }
            ],
        }
    }
    return styles;
}


// function getBorderColors(node) {
//     const colors = {};
//     for (const key in node.neighbors) {
//         if (node.pathableNeighbors[key]) {
//             colors[key] = "green";
//             continue;
//         }
//         colors[key] = "red";
//     }
//     return colors;
// }