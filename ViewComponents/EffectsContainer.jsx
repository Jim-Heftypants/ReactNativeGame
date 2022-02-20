import React from "react";

export default EffectsContainer = (props) => {


    const animEffects = Object.entries(props.Character.DynamicData.AnimEffects);
    let key = 0;
    return (
        <>
            {animEffects.map((params) => {
                console.log(params[0]); // ability name
                // console.log(props.Character.DynamicData.pos);
                return <AbilityComponent key={key++} styles={params[1].styles} params={params[1].params} rules={params[1].rules} pos={props.Character.DynamicData.pos} ></AbilityComponent>
            })}
        </>
    )
}