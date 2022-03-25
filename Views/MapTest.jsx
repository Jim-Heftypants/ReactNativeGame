import React, { useState, useRef } from 'react';
import { View, TouchableOpacity } from 'react-native';

import { getPath } from '../Maps/Utils/pathingUtils';
import testMap from '../Maps/testMap';

export default MapTest = (props) => {
    const nodeIDs = useRef(Object.keys(testMap)).current;
    const hexStyles = useRef({}).current;
    let [colors, setColors] = useState({});

    const randomNodeID = useRef(Math.floor(Math.random() * nodeIDs.length)).current;

    function applyPath(endNodeID) {
        const path = getPath(randomNodeID, endNodeID, testMap);
        console.log("path length:", path.length);

        colors = {};
        for (const nodeID in path) {
            colors[nodeID] = "blue";
        }
        setColors({ ...colors });
    }

    for (const nodeID of nodeIDs) {
        hexStyles[nodeID] = getHexStyles(testMap[nodeID]);
    }

    let key = 0;
    return (
        <View style={{ width: props.width, height: props.height, backgroundColor: 'grey' }} >
            {nodeIDs.map(nodeID => {
                const node = testMap[nodeID];
                hexStyles[nodeID].backgroundColor = colors[nodeID] ? colors[nodeID] : testMap[nodeID].color;
                const octagonKeys = Object.keys(hexStyles[nodeID]);
                return (
                    <TouchableOpacity style={{ width: node.size, height: node.size, position: 'absolute', left: node.center[0], top: node.center[1] }}
                        onPress={() => applyPath(nodeID)} key={key++} >
                        {octagonKeys.map(styleKey => {
                            return <View style={hexStyles[nodeID][styleKey]} key={styleKey} ></View>
                        })}
                    </TouchableOpacity>
                )
            })}
        </View>
    )
}

function getHexStyles(node) {
    // const angleMod = 360 / node.neighbors.length;
    const angleMod = 360 / 6;
    const width = node.size * 0.5;
    const height = node.size * 0.58;
    const rect = {
        width,
        height,
        position: 'absolute',
        backgroundColor: node.color,
        borderLeftWidth: 3,
    }
    let angle = 0;
    const styles = {};
    for (let i = 0; i < node.neighbors.length; i++) {
        const ID = node.neighbors[i];
        let borderColor = node.pathableNeighbors[ID] ? "green" : "red";
        if (ID === 0) borderColor = "black";
        styles[ID] = {
            ...rect,
            borderColor: borderColor,
            transform: [
                { translateX: width / 2 },
                { rotate: `${angle}deg` },
                { translateX: -width / 2 }
            ],
        }
        angle += angleMod;
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