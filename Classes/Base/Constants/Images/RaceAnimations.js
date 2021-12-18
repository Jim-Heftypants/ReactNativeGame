import ImageConverter from "../Utilities/ImageConverter";

import SkeletonCompiled from "../../../../assets/RaceAssets/Skeleton/SkeletonCompiled";


const SkeletonAnimations = ImageConverter(SkeletonCompiled); // { animationName: [ {uri}, {uri} ] }

const RaceAnimations = {
    SkeletonAnimations: SkeletonAnimations,

}

export default RaceAnimations;