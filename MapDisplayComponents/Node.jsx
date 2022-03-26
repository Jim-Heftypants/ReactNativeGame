import React, { useMemo, useRef } from 'react';
import { TouchableOpacity, View } from 'react-native';

export default Node = (props) => {
    // possibleColors={["lightblue", "blue"]} nodeID={nodeID} node={node} styles={hexStyles[nodeID]} backgroundColor={backgroundColor}
    // const styleValues = useRef(JSON.parse(JSON.stringify(Object.values(props.styles)))).current;
    let styleValues = useRef(Object.values(props.styles)).current;
    const hexagons = useMemo(() => {
        const hexes = {};
        for (let i = 0; i < props.possibleColors.length; i++) {
            let key = 0;
            hexes[props.possibleColors[i]] = <TouchableOpacity style={{ width: props.node.size, height: props.node.size, position: 'absolute', left: props.node.center[0], top: props.node.center[1] }}
                onPress={() => props.applyPath(props.nodeID)} >
                {styleValues.map(style => <View style={{ ...style, backgroundColor: props.possibleColors[i] }} key={key++} ></View>)}
            </TouchableOpacity>
        }
        return hexes;
    }, [styleValues.length]);

    const hexagon = useMemo(() => {
        if (hexagons[props.backgroundColor]) return hexagons[props.backgroundColor];
        let key = 0;
        return <TouchableOpacity style={{ width: props.node.size, height: props.node.size, position: 'absolute', left: props.node.center[0], top: props.node.center[1] }}
            onPress={() => props.applyPath(props.nodeID)} >
            {styleValues.map(style => <View style={{ ...style, backgroundColor: props.backgroundColor }} key={key++} ></View>)}
        </TouchableOpacity>
    }, [props.backgroundColor]
    );

    return (
        <>
            {hexagon}
        </>
    )
}



// useMemo(() => {
//     const newVals = [];
//     for (let i = 0; i < styleValues.length; i++) {
//         newVals.push(JSON.parse(JSON.stringify(styleValues[i])));
//         newVals[i].backgroundColor = props.backgroundColor;
//     }
//     styleValues = newVals;
// }, [props.backgroundColor]);

// let key = 0;
// const hexagon = useMemo(() => {
//     return styleValues.map(style => {
//         return <View style={style} key={key++} ></View>
//     })
// },
//     [props.backgroundColor]
// );

// const display = useMemo(() =>
//     <TouchableOpacity style={{ width: props.node.size, height: props.node.size, position: 'absolute', left: props.node.center[0], top: props.node.center[1] }}
//         onPress={() => props.applyPath(props.nodeID)} >
//         {hexagon}
//     </TouchableOpacity>,
//     [props.backgroundColor]
// );
/* {display} */