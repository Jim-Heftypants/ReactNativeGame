import ImageConverter from "../Utilities/ImageConverter";

import SkeletonCompiled from "../../../assets/RaceAssets/Skeleton/SkeletonCompiled";
import CatCompiled from "../../../assets/RaceAssets/Cat/CatCompiled";


const Skeleton = ImageConverter(SkeletonCompiled); // { animationName: [ {uri}, {uri} ] }
const Cat = ImageConverter(CatCompiled);

const RaceAnimations = {
    Skeleton,
    Cat,
}

export default RaceAnimations;