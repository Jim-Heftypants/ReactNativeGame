import matrixToGraph from './Utils/matrixToGraph';
import getDefaultMatrix from './Utils/getDefaultMatrix';
import randomizeMap from './Utils/randomizeMap';

const testMapMatrix = getDefaultMatrix(20, 20);
const testGraph = matrixToGraph(testMapMatrix, 50, "lightblue");
// console.log(Object.keys(testGraph));
randomizeMap(testGraph);
export default testGraph;