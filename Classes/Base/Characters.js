import CharacterData from "./Constants/CharacterData";

const Characters = {
    PlayerOne: {
        Data: CharacterData.PlayerOne,
        DynamicData: {
            currentPosition: [0, 0],
            imageCycleId: 0,
            currentAnimationSet: [],
            Equipment: {

            },
            Items: {

            },
        },
        Actions: {
            updateAnimationSet: (that, setName) => {updateAnimationSet(that, setName)},
        },
    },
};

const updateAnimationSet = (that, setName) => {
    // console.log("that: " + JSON.stringify(that));
    // console.log("setName: " + setName);
    const animations = that.Data.Attributes.Animations;
    // add Equipment back in once it exists
    // const Equipment = Object.values(that.Data.Equipment);
    const names = [
        that.Data.RaceName,
        that.Data.ClassName,
        // ...Equipment,
    ]
    // console.log("namesArr: " + names);
    // const raceName = that.Data.raceName;
    // const className = that.Data.className;
    const animSet = [];
    for (let i = 0; i < names.length; i++) {
        animSet.push(animations[`${names[i]}${setName}`])
    }
    that.DynamicData.currentAnimationSet = animSet;
}

export default Characters;