export default function getImgDims(standardScale, imgWidth, imgHeight, dispScale) {
    // console.log("standardScale: " + standardScale);
    const wAngle = Math.atan(imgWidth / imgHeight);
    const hAngle = (Math.PI / 2) - wAngle;
    // const wAngle = Math.atan(this.props.imgHeight / this.props.imgWidth);
    // console.log("hAngle: " + hAngle + " wAngle: " + wAngle);
    const height = (Math.round(standardScale * Math.sin(hAngle) * 10) / 10) * dispScale;
    const width = (Math.round(standardScale * Math.sin(wAngle) * 10) / 10) * dispScale;
    // console.log("dispHeight: " + height + " dispWidth: " + width);
    return [width, height];
}