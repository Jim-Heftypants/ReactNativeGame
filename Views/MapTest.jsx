import React, { useState, useRef } from 'react';
import { View, TouchableOpacity } from 'react-native';

import { getPath } from '../Utils/pathingUtils';
import testMap from '../Maps/testMap';

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
                const color = colors[node.center] ? colors[node.center] : node.unpathable ? "red" : "green";
                const octagon = getOctagon(node, color);
                return (
                    <TouchableOpacity style={{ width: node.size, height: node.size, position: 'absolute', left: node.center[0], top: node.center[1] }}
                        onPress={() => applyPath(node)} key={key++} >
                        {octagon}
                    </TouchableOpacity>
                )
            })}
        </View>
    )
}

function getBorderColors(node) {
    const colors = {};
    for (const key in node.neighbors) {
        if (node.pathableNeighbors[key]) {
            colors[key] = "green";
            continue;
        }
        colors[key] = "red";
    }
    return colors;
}

function getOctagon(node, faceColor) {
    const colors = getBorderColors(node);
    const style = {
        innerSquare: {
            width: node.size * 0.8,
            height: node.size * 0.8,
            backgroundColor: faceColor,
            position: 'absolute',
        },
        outerSection: {
            width: node.size * 0.1,
            height: node.size * 0.1,
            position: 'absolute',
            // transform: 'rotate'
        }

    };
    // #octagon {
    //     width: 100px;
    //     height: 100px;
    //     background: red;
    //     position: relative;
    //   }
    //   #octagon:before {
    //     content: "";
    //     width: 100px;
    //     height: 0;
    //     position: absolute;
    //     top: 0;
    //     left: 0;
    //     border-bottom: 29px solid red;
    //     border-left: 29px solid #eee;
    //     border-right: 29px solid #eee;
    //   }
    //   #octagon:after {
    //     content: "";
    //     width: 100px;
    //     height: 0;
    //     position: absolute;
    //     bottom: 0;
    //     left: 0;
    //     border-top: 29px solid red;
    //     border-left: 29px solid #eee;
    //     border-right: 29px solid #eee;
    //   }
}

