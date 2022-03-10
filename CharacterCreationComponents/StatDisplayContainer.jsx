import React from 'react';
import { View } from 'react-native';

import StatDisplay from './StatDisplay';

export default StatDisplayContainer = (props) => {
    const dup = Object.assign({}, props.style);
    delete dup.left;
    dup.right = props.style.left;
    return (
        <>
            <StatDisplay {...props} ></StatDisplay>
            <StatDisplay {...props} style={dup} ></StatDisplay>
        </>
    )
}