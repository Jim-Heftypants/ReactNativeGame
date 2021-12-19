import ImageConverter from "../Utilities/ImageConverter";

import SkeletonCompiled from "../../../../assets/RaceAssets/Skeleton/SkeletonCompiled";
import CatCompiled from "../../../../assets/RaceAssets/Cat/CatCompiled";


const SkeletonAnimations = ImageConverter(SkeletonCompiled); // { animationName: [ {uri}, {uri} ] }
const CatAnimations = ImageConverter(CatCompiled);

const RaceAnimations = {
    SkeletonAnimations: SkeletonAnimations,
    CatAnimations,
}

export default RaceAnimations;