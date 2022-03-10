import React from 'react';
import { View } from 'react-native';

import SelectionDisplay from './SelectionDisplay';

export default SelectionDisplayContainer = (props) => {
    const dup = Object.assign({}, props.style);
    delete dup.left;
    dup.right = props.style.left;
    return (
        <>
            <SelectionDisplay {...props} ></SelectionDisplay>
            <SelectionDisplay {...props} style={dup} ></SelectionDisplay>
        </>
    )
}