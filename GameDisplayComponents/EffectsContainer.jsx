import React from "react";
import AbilityEffect from "./AbilityEffect";

export default EffectsContainer = (props) => {
    const animEffects = props?.Character?.DynamicData.AnimEffects;
    if (!animEffects) return <></>;
    // const prePos = animEffects?.LightningBolt?.params.prePos; // negative values
    const pos = props.Character.DynamicData.pos;
    // if (prePos) {
    //     const dx = prePos[0] - pos[0];
    //     const dy = prePos[1] - pos[1];
    //     console.log("dx: " + dx + ", dy: " + dy);
    // }
    let key = 0;
    return (
        <>
            {Object.values(animEffects).map((data) => {
                return <AbilityEffect key={key++} styles={data.styles} params={data.params} rules={data.rules} pos={pos} deviceDims={props.deviceDims} ></AbilityEffect>
            })}
        </>
    )
}