import React from 'react';
import { View, Image } from 'react-native';

const colors = [['#d4aee0', '#8975b4', '#64518a', '#565190'],
['#44abac', '#2ca7d8', '#1482ce', '#05597c'],
['#b2dd57', '#57c443', '#05b853', '#19962e'],
['#fdc82e', '#fd9c2e', '#d5385a', '#911750']];

const opacities = [[1, 1, 1, 1], [1, 1, 1, 1], [1, 1, 1, 1], [1, 1, 1, 1]];

export default LoadingScreen = (props) => {
    console.log("Displaying loading screen");
    let row = -1;
    let col = 0;
    const width = props.deviceWidth; const height = props.deviceHeight;
    return (
        <View style={{ backgroundColor: 'gray', position: 'absolute', height, width }} >
            <View style={{ backgroundColor: 'white', position: 'absolute', height: height / 2, width: width / 2, marginLeft: (width / 4), marginTop: (height / 4) }}>
                {
                    colors.map((rowColors) => {
                        row++;
                        return <View key={row}
                            style={{ backgroundColor: 'white', height: props.deviceHeight / 8, width: props.deviceWidth / 2 }} >
                            {rowColors.map((color) => {
                                console.log(row, col % colors.length);
                                return <View style={{
                                    opacity: opacities[row][col % colors.length],
                                    marginLeft: (col % colors.length) * width / 8, position: 'absolute',
                                    backgroundColor: color, width: width / 8, height: height / 8
                                }} key={col++} ></View>
                            })
                            }
                        </View>;
                    })
                }
            </View>
        </View>
    )
}

