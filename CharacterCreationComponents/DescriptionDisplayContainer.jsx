import React from 'react';
import { View } from 'react-native';

import DescriptionDisplay from './DescriptionDisplay';

export default DescriptionDisplayContainer = (props) => {
    const dup = Object.assign({}, props.style);
    delete dup.left;
    dup.right = props.style.left;
    return (
        <>
            <DescriptionDisplay {...props} ></DescriptionDisplay>
            <DescriptionDisplay {...props} style={dup} ></DescriptionDisplay>
        </>
    )
}