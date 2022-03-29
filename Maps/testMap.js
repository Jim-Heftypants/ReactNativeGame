import matrixToGraph from './Utils/matrixToGraph';
import getDefaultMatrix from './Utils/getDefaultMatrix';
import randomizeMap from './Utils/randomizeMap';

const nodeSize = 100;
export default function getTestMap(width, height) {
    console.log(width, height);
    // const widthNodes = 4;
    // const heightNodes = 2;
    const widthNodes = Math.ceil(width / nodeSize) + 1;
    const heightNodes = Math.ceil(height / nodeSize) + 2;
    console.log("widthNodes:", widthNodes, "heightNodes:", heightNodes);
    
    const testMapMatrix = getDefaultMatrix(widthNodes, heightNodes);
    const testGraph = matrixToGraph(testMapMatrix, nodeSize, "lightblue");
    var startTime = performance.now()
    randomizeMap(testGraph);
    var endTime = performance.now()
    console.log(`randomizeMap took ${Math.round((endTime - startTime) * 10) / 10} milliseconds`)
    return testGraph;
}
