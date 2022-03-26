import matrixToGraph from './Utils/matrixToGraph';
import getDefaultMatrix from './Utils/getDefaultMatrix';
import randomizeMap from './Utils/randomizeMap';

const testMapMatrix = getDefaultMatrix(40, 40);
const testGraph = matrixToGraph(testMapMatrix, 25, "lightblue");
// console.log(Object.keys(testGraph));
randomizeMap(testGraph);
export default testGraph;