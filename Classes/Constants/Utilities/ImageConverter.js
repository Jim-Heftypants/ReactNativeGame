import { Image } from 'react-native';

export default Images = (ImagesCompiled) => {
    const ImageArray = Object.values(ImagesCompiled); // array of objects
    const ImageKeys = Object.keys(ImagesCompiled); // array of object keys
    
    const Images = {};
    const ImageAnimationArrays = []; // array of arrays containing images
    for (let i = 0; i < ImageArray.length; i++) {
        ImageAnimationArrays.push(Object.values(ImageArray[i]));
        for (let j = 0; j < ImageAnimationArrays[i].length; j++) {
            // const { uri, width, height } = Image.resolveAssetSource(img);
            // change img into { uri, width, height } object
            // const { _packager_asset, uri, width, height, scale } = Image.resolveAssetSource(ImageAnimationArrays[i][j]);
            // ImageAnimationArrays[i][j] = [_packager_asset, uri, width, height, scale];
            ImageAnimationArrays[i][j] = Image.resolveAssetSource(ImageAnimationArrays[i][j]);
        }
        const vals = Object.values(ImageAnimationArrays[i]);
        Images[ImageKeys[i]] = vals;
        // { animationName: [ {uri, width, height}, {uri, width, height} ] }
        // console.log("key: " + ImageKeys[i] + " val: " + JSON.stringify(vals));
    }
    // console.log("images: " + JSON.stringify(Images));
    return Images;
}
