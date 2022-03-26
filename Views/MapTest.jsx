import React, { useState, useRef, useMemo } from 'react';
import { View, TouchableOpacity } from 'react-native';

import { getPath } from '../Maps/Utils/pathingUtils';
import testMap from '../Maps/testMap';

import Node from '../MapDisplayComponents/Node';

export default MapTest = (props) => {
    const nodeIDs = useRef(Object.keys(testMap)).current;
    const hexStyles = useRef({}).current;
    const randomNodeID = useRef(Math.floor(Math.random() * nodeIDs.length) + 1).current;
    let [colors, setColors] = useState({});
    colors[randomNodeID] = "turquoise";
    // console.log("colors:", colors);


    function applyPath(endNodeID) {
        var startTime = performance.now()
        const path = getPath(randomNodeID, endNodeID, testMap);
        var endTime = performance.now()
        console.log(`aStar took ${Math.round((endTime - startTime) * 10) / 10} milliseconds`)
        console.log("path length:", path.length);

        colors = {};
        for (const nodeID of path) {
            // console.log(nodeID);
            colors[nodeID] = "blue";
        }
        colors[randomNodeID] = "turquoise";
        setColors({ ...colors });
    }

    useMemo(() => {
        for (const nodeID of nodeIDs)
            hexStyles[nodeID] = getHexStyles(testMap[nodeID]);
    },
        [nodeIDs.length]
    );

    let key = 0;
    return (
        <View style={{ width: props.width, height: props.height, backgroundColor: 'grey' }} >
            {nodeIDs.map(nodeID => {
                const node = testMap[nodeID];
                const backgroundColor = colors[nodeID] ? colors[nodeID] : testMap[nodeID].color;
                return (
                    <Node possibleColors={["lightblue", "blue"]} nodeID={nodeID} node={node} styles={hexStyles[nodeID]} backgroundColor={backgroundColor}
                        applyPath={applyPath} key={key++} ></Node>
                )
            })}
        </View>
    )
}

function getHexStyles(node) {
    const angleMod = 360 / node.neighbors.length;
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
    for (let i = 0; i < node.neighbors.length; i++) {
        const ID = node.neighbors[i];
        let borderColor = node.pathableNeighbors[ID] ? "green" : "red";
        if (ID == 0) borderColor = "black";
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
    return styles;
}