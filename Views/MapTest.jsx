import React, { useState, useRef } from 'react';
import { View, TouchableOpacity } from 'react-native';

import { getPath } from '../Maps/Utils/pathingUtils';
import testMap from '../Maps/testMap';

export default MapTest = (props) => {
    const nodeIDs = useRef(Object.keys(testMap)).current;
    const hexStyles = useRef({}).current;
    let [colors, setColors] = useState({});
    // console.log("colors:", colors);

    const randomNodeID = useRef(Math.floor(Math.random() * nodeIDs.length) + 1).current;

    function applyPath(endNodeID) {
        const path = getPath(randomNodeID, endNodeID, testMap);
        console.log("path length:", path.length);

        colors = {};
        for (const nodeID of path) {
            // console.log(nodeID);
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
                const backgroundColor = colors[nodeID] ? colors[nodeID] : testMap[nodeID].color;
                const hexStyleValues = Object.values(hexStyles[nodeID]);
                let secondaryKey = 0;
                return (
                    <TouchableOpacity style={{ width: node.size, height: node.size, position: 'absolute', left: node.center[0], top: node.center[1] }}
                        onPress={() => applyPath(nodeID)} key={key++} >
                        {hexStyleValues.map(style => {
                            return <View style={{ ...style, backgroundColor: backgroundColor }} key={secondaryKey++} ></View>
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
        borderLeftWidth: 4,
    }
    let angle = 0;
    const styles = {};
    if (node.neighbors.length !== 6) console.log("hmmmm?");
    for (let i = 0; i < node.neighbors.length; i++) {
        const ID = node.neighbors[i];
        let borderColor = node.pathableNeighbors[ID] ? "green" : "red"; // prob not gonna work
        if (ID === 0) borderColor = "black";
        styles[i] = {
            ...rect,
            borderColor,
            transform: [
                { translateX: width / 2 },
                { rotate: `${angle}deg` },
                { translateX: -width / 2 }
            ],
        }
        angle += angleMod;
    }
    if (Object.keys(styles).length !== 6) console.log("the actual fuck");
    return styles;
}