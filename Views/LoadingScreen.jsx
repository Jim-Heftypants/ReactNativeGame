import React, { useState, useEffect, useRef } from 'react';
import { View, Image } from 'react-native';

const numRows = 5;
const numCols = 5;
const nodeSizeScale = (0.2);
const maxOpacity = 1.0;
const minOpacity = 0.2;
const opacityUpdateScale = 0.05;
const refreshRate = 50;
const downTime = 0.5; // seconds

export default LoadingScreen = (props) => {
    const [state, setState] = useState(0);
    const colors = useRef(setColors(numRows, numCols));
    const opacities = useRef(setOpacities(colors.current.length, colors.current[0].length, minOpacity, maxOpacity));
    const scale = useRef(setScale(numRows, numCols, 1));
    // console.log("reloading");
    useEffect(() => {
        let timer = updateOpacities(opacities, scale, setState, opacityUpdateScale, minOpacity, maxOpacity, refreshRate, downTime);
        return () => clearInterval(timer);
    }, [])

    let row = -1;
    let col = 0;
    const width = props.deviceWidth;
    const height = props.deviceHeight;
    const subHeight = height * nodeSizeScale * numRows;
    const subWidth = width * nodeSizeScale * numCols;
    return (
        <View style={{ backgroundColor: 'gray', position: 'absolute', height, width }} >
            <View style={{
                backgroundColor: 'white', position: 'absolute', height: subHeight, width: subWidth,
                marginLeft: ((width - subWidth) / 2), marginTop: ((height - subHeight) / 2)
            }}>
                {colors.current.map((rowColors) => {
                    // console.log(rowColors);
                    row++;
                    return <View key={row}
                        style={{ backgroundColor: 'black', height: height * nodeSizeScale, width: subWidth }} >
                        {rowColors.map((color) => {
                            // console.log(color);
                            // console.log(row, col % colors.current.length);
                            return <View style={{ marginLeft: (col % colors.current.length) * width * nodeSizeScale,
                                position: 'absolute', width: width * nodeSizeScale, height: height * nodeSizeScale,
                                borderColor: color, borderWidth: 3, borderStyle: 'solid'
                            }} key={col++} >
                                <View style={{
                                backgroundColor: color, width: width * nodeSizeScale, height: height * nodeSizeScale
                                }} opacity={opacities.current[row][(col - 1) % colors.current[row].length]} ></View>
                            </View>
                        })
                        }
                    </View>;
                })}
            </View>
        </View>
    )
}

function generateRandomColor() {
    return ('#' + Math.floor((Math.random() * 15777215) + 1000000).toString(16));
}

function setColors(numRows, numCols) {
    const colors = [];
    for (let i = 0; i < numRows; i++) {
        colors.push([]);
        for (let j = 0; j < numCols; j++) {
            colors[i].push(generateRandomColor());
        }
    }
    // console.log(colors);
    return colors;
}

function setOpacities(numRows, numCols, min, max) {
    const opacities = [];
    const numNodes = numRows * numCols;
    max -= 0.01;
    const delta = (max - min) / numNodes;
    for (let i = 0; i < numRows; i++) {
        opacities.push([]);
        for (let j = 0; j < numCols; j++) {
            opacities[i].push(max);
            max -= delta;
        }
        // if (i % 2 === 1) {
        //     opacities[i].reverse();
        // }
    }
    return opacities;
}

function setScale(numRows, numCols, num) {
    const scale = [];
    for (let i = 0; i < numRows; i++) {
        scale.push([]);
        for (let j = 0; j < numCols; j++) {
            scale[i].push(num);
        }
    }
    return scale;
}

function updateOpacities(opacities, scale, setState, opacityUpdateScale, min, max, refreshRate, downTime) {
    return setInterval(() => {
        for (let i = 0; i < opacities.current.length; i++) {
            for (let j = 0; j < opacities.current[i].length; j++) {
                let val = opacities.current[i][j];
                val += (opacityUpdateScale * scale.current[i][j]);
                if (val < min) {
                    // if (scale.current[i][j] < 1) {
                    //     scale.current[i][j] += (downTime * 1000) / refreshRate;
                    //     if (scale.current[i][j] > 1) scale.current[i][j] = 1;
                    //     continue;
                    // }
                    scale.current[i][j] = Math.abs(scale.current[i][j]);
                }
                if (val >= max) {
                    scale.current[i][j] = -Math.abs(scale.current[i][j]);
                }

                // console.log(val);
                opacities.current[i][j] = val;
            }
        }
        // console.log(opacities);
        setState(state => state + 1);
    }, refreshRate);
}
