import matrixToGraph from './Utils/matrixToGraph';
import getDefaultMatrix from './Utils/getDefaultMatrix';
import randomizeMap from './Utils/randomizeMap';

const testMapMatrix = getDefaultMatrix(50, 50);
const testGraph = matrixToGraph(testMapMatrix, 22, "lightblue");
var startTime = performance.now()
randomizeMap(testGraph);
var endTime = performance.now()
console.log(`randomizeMap took ${Math.round((endTime - startTime) * 10) / 10} milliseconds`)
export default testGraph;