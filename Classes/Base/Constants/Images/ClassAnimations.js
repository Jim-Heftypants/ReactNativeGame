import ImageConverter from "../Utilities/ImageConverter";

import WizardCompiled from "../../../../assets/ClassAssets/Wizard/WizardCompiled";

const WizardAnimations = ImageConverter(WizardCompiled); // { animationName: [ {uri}, {uri} ] }

// console.log("Wizard Animations: " + JSON.stringify(WizardAnimations));

const ClassAnimations = {
    WizardAnimations: WizardAnimations,

}

// console.log("Class Animations: " + JSON.stringify(ClassAnimations));

export default ClassAnimations;