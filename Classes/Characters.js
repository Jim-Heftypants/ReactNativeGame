import CharacterData from "./Constants/CharacterData";

// Characters = { characterID: { Data: {}, DynamicData: {}, ID: {} } }
const Characters = {
    1: {
        Data: CharacterData.PlayerOne,
        DynamicData: {
            pos: [0, 0],
            AnimEffects: [], // [ [ name, data ] ]
            movementSpeed: 1000,
            imageCycleId: 0,
            currentAnimationSet: [],
            Equipment: {

            },
            Items: {

            },
        },
        ID: 1,
    },
};

export default Characters;