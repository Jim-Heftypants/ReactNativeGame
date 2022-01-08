import React, {useMemo, useRef, useState} from "react";
import { View, Image } from "react-native";

// import Map from "./Map";

export default MapContainer = (props) => {
    console.log("Map Container loaded");
    // console.log(props.touches);
    // props = deviceDims={props.deviceDims} style={props.styles.openWorldMap} touches={touches.mapTouch.current} >
    //     imgData = { props.imgData } Character = { props.Character }
    // const [mapOffset, setMapOffset] = useState({ x: 0, y: 0 });
    const [state, setState] = useState(0);
    const mapOffset = useRef({ x: 0, y: 0 });
    const mapTimer = useRef();
    const nextTouch = useRef();
    const style = useRef({
        position: 'absolute',
        zIndex: -5,
        top: 0,
        left: 0,
        width: props.imgData.dims[0],
        height: props.imgData.dims[1],
    }).current;

    if (props.touches.next) nextTouch.current = props.touches.next;

    if (!props.touches.ID && mapTimer.current) {
        console.log("clearing mapContainer timer");
        // clear timer
        clearInterval(mapTimer.current);
        mapTimer.current = null;
        // update database (maybe needs to be on each change ?)
        // props.Character.DynamicData.currentPosition = [mapOffset.current.x, mapOffset.current.y];
    }
    if (!props.touches.next && props.touches.initial && !mapTimer.current) {
        console.log("starting mapContainer timer");
        // start timer -- timer must check if next exists
        mapTimer.current = setInterval(() => {
            if (nextTouch.current) {
                // console.log('x: ' + nextTouch.current.pageX + ' y: ' + nextTouch.current.pageY);
                mapFunc(props.touches.initial, nextTouch.current, props.deviceDims, props.Character, mapOffset);
                setState(state+1);
                console.log(state);
            }
        }, 20);
    }
    const map = useMemo(
        () => <View style={{ transform: [{ translateX: mapOffset.current.x }, { translateY: mapOffset.current.y }] }}>
            <Image source={{ uri: props.imgData.uri }} style={style} ></Image>
        </View>, [mapOffset.current.x, mapOffset.current.y]
    );
    return (
        <View>
            {map}
        </View>
    )
}

const mapFunc = (initialTouch, currentTouch, dims, Character, mapOffset) => {
    // NEED TO CONTINUE MOVING AND JUST UPDATE CURRENT POSITION -- NOT MOVE ON POSITION CHANGE
    const dx = initialTouch.pageX - currentTouch.pageX;
    const dy = initialTouch.pageY - currentTouch.pageY;

    const posTotal = Math.abs(dx) + Math.abs(dy);
    if (posTotal < 8) return;
    const horizontalPercent = dx / posTotal; const verticalPercent = dy / posTotal; // posTotal > 10
    // console.log("hPercent: " + horizontalPercent + "  vPercent: " + verticalPercent);
    const posMod = Character.DynamicData.movementSpeed / (dims.characterSize / dims.displayScale);
    // console.log("posMod: " + posMod);
    let tempX = mapOffset.current.x; let tempY = mapOffset.current.y;
    // console.log("tempX pre: " + tempX + " tempY pre: " + tempY);
    tempX += (horizontalPercent * posMod);
    tempY += (verticalPercent * posMod);
    if (tempX > 0) tempX = 0;
    if (tempX < -dims.widthMax) tempX = -dims.widthMax;
    if (tempY > 0) tempY = 0;
    if (tempY < -dims.heightMax) tempY = -dims.heightMax;
    // console.log("tempX: " + tempX + " tempY: " + tempY);
    mapOffset.current = ({ x: tempX, y: tempY });

    // Character.DynamicData.currentPosition = [tempX, tempY]; // seems slow to be here -- set on touch end ?
    // sets location in database
}