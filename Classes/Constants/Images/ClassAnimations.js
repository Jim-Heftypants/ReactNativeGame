import ImageConverter from "../Utilities/ImageConverter";

import WizardCompiled from "../../../assets/ClassAssets/Wizard/WizardCompiled";

const Wizard = ImageConverter(WizardCompiled); // { animationName: [ {uri}, {uri} ] }

// console.log("Wizard Animations: " + JSON.stringify(WizardAnimations));

const ClassAnimations = {
    Wizard,

}

// console.log("Class Animations: " + JSON.stringify(ClassAnimations));

export default ClassAnimations;