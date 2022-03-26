export default function randomizeMap(graph) {
    const randomIdx = Math.floor(Math.random() * Object.keys(graph).length);
    // const startKey = Object.keys(graph)[randomIdx];
    const startNode = graph[randomIdx + 1];
    // console.log("startNode:", startNode.ID);
    const newNeighbors = {};
    const visited = new Set();
    const stack = [startNode];
    while (stack.length > 0) {
        const node = stack.pop();
        const neighborID = getUnvisitedSibling(node, visited);
        // console.log("neighborPos:",neighborPos);
        if (neighborID) {
            const neighbor = graph[neighborID];
            stack.push(node);
            stack.push(neighbor);
            visited.add(neighbor.ID);
            // delete wall between node and sibling
            if (!newNeighbors[node.ID]) newNeighbors[node.ID] = {};
            if (!newNeighbors[neighbor.ID]) newNeighbors[neighbor.ID] = {};
            newNeighbors[node.ID][neighbor.ID] = neighbor.ID;
            newNeighbors[neighbor.ID][node.ID] = node.ID;
        }
    }
    for (const nodeID in newNeighbors) {
        graph[nodeID].pathableNeighbors = newNeighbors[nodeID];
    }
}

function getUnvisitedSibling(node, visited) {
    const unvisited = [];
    for (const neighborID of node.neighbors) {
        if (neighborID === 0) continue;
        if (!visited.has(neighborID)) unvisited.push(neighborID);
    }
    if (unvisited.length === 0) return null;
    const randomIdx = Math.floor(Math.random() * unvisited.length);
    return unvisited[randomIdx];
}

// function oppNeighborKey(key) {
//     if (key === "topLeft") return "bottomRight";
//     if (key === "bottomRight") return "topLeft";
//     if (key === "topRight") return "bottomLeft";
//     if (key === "bottomLeft") return "topRight";
//     if (key === "left") return "right";
//     if (key === "right") return "left";
//     if (key === "top") return "bottom";
//     if (key === "bottom") return "top";
//     return "ur fooked m8";
// }