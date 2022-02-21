import React from "react";
import AbilityEffect from "./AbilityEffect";

export default EffectsContainer = (props) => {
    const animEffects = props?.Character?.DynamicData.AnimEffects;
    let key = 0;
    return (
        <>
            {Object.values(animEffects).map((data) => {
                return <AbilityEffect key={key++} styles={data.styles} params={data.params} rules={data.rules} pos={props.Character.DynamicData.pos} ></AbilityEffect>
            })}
        </>
    )
}