import React, { useState } from 'react';
import { View, Text, TextInput } from 'react-native';

export default NameDisplay = (props) => {
    const [charName, setCharName] = useState("");
    props.name = charName;
    return (
        <TextInput
            onFocus={() => { }}
            onBlur={() => { }}
            style={{
                width: props.width, height: props.height, textAlign: 'center', marginTop: props.hSpacing, marginLeft: props.wSpacing, backgroundColor: 'lightgrey',
                borderTopWidth: 0, borderLeftWidth: 0, borderRightWidth: 0, borderBottomWidth: 2, borderColor: 'black',
            }}
            placeholder="Name"
            onChangeText={setCharName}
            defaultValue={charName}
        />
    )
}