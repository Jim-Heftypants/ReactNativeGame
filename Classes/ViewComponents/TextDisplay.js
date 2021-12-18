import React, { useState } from 'react';
import { Text, TextInput, View } from 'react-native';
import Characters from '../Base/Characters';
import textStyles from '../../Style-Sheets/text';

class TextDisplay extends React.Component {
    render() {
        let data = Characters.PlayerOne.data;
        let abilities = Object.values(data.Attributes.Abilities);
        let abilityDisplay = [];
        for (let i = 0; i < abilities.length; i++) {
            abilityDisplay.push(<Text key={i} >{"\n" + abilities[i].name}</Text>);
        }
        return (
            <View style={{ padding: 10, position: "absolute" }}>
                <Text style={textStyles.header} >{data.Name}</Text>
                <Text style={textStyles.subHeader} >{data.Race.Name}</Text>
                <Text style={textStyles.subHeader} >{data.Class.Name}</Text>
                <Text>
                    Abilities:
                    {/* key needs to be fixed */}
                    {/* {abilities.map(ability => <Text key={ability.name} name={ability.name} >{"\n" + ability.name}</Text>)} */}
                    {abilityDisplay}
                </Text>
                <Text>{data.Attributes.Name}</Text>
            </View>
        );
    };
}

export default TextDisplay;