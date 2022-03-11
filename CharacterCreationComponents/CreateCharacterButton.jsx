import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

import createCharacter from '../CharacterUtils/createCharacter';

export default CreateCharacterButton = (props) => {
    return (
        <TouchableOpacity style={{ ...props.style, borderWidth: 2, borderColor: 'gray', borderRadius: 180 }} onPress={() => createCharacter(props)}>
            <Text style={{ fontSize: props.style.fontSize, textAlign: 'center', padding: props.style.fontSize / 4, color: 'black' }} >Create Character</Text>
        </TouchableOpacity>
    )
}