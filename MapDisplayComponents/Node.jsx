import React, { useMemo, useRef } from 'react';
import { TouchableOpacity, View } from 'react-native';

export default Node = (props) => {
    // nodeID={nodeID} node={node} styles={hexStyles[nodeID]} backgroundColor={backgroundColor}
    let styleValues = useRef(Object.values(props.styles)).current;

    let key = 0;
    const hexagon = useMemo(() => {
        for (let i = 0; i < styleValues.length; i++) {
            props.styles[i].backgroundColor = props.backgroundColor;
        }
        styleValues = Object.values(props.styles);
        return styleValues.map(style => {
            return <View style={style} key={key++} ></View>
        })
    },
        [props.backgroundColor]
    );

    const display = useMemo(() =>
        <TouchableOpacity style={{ width: props.node.size, height: props.node.size, position: 'absolute', left: props.node.center[0], top: props.node.center[1] }}
            onPress={() => props.applyPath(props.nodeID)} >
            {hexagon}
        </TouchableOpacity>,
        [props.backgroundColor]
    );

    return (
        <>
            {display}
        </>
    )
}