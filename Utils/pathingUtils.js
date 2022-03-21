export function getPath(startPos, endPos, map) {
    // if (!map) return mapLessPath(startPos, endPos);
    const path = aStar(startPos, endPos, map);
    return path;
}

// function mapLessPath(startPos, endPos) {
//     // linear path
//     const dx = endPos.x - startPos.x;
//     const dy = endPos.y - startPos.y;
//     const distance = dx + dy;
//     const movementPerFrame = distance;
//     const x = dx / movementPerFrame;
//     const y = dy / movementPerFrame;
//     const path = [];
//     for (let i = 0; i < distance; i += movementPerFrame) {
//         path.push({ x, y });
//     }
//     return path;
// }

function aStar(start, end, graph) {
    console.log("startNode:", start);
    console.log("endNode:", end);
    const startScores = {};     startScores[start] = 0; // distance from start node to node n
    const totalScores = {};     totalScores[start] = getDistance(start, end, graph[start].size); // startScore of node n + distance between node n and end node
    const nodes = {};           nodes[start] = graph[start]; // map of all applicable nodes
    const pathMap = {}; // map of node traversal path
    let nodeLength = 1;

    let first = true;
    while (nodeLength > 0) {
        const minNode = getMinNode(nodes, totalScores); // find node with minimum total distance
        delete nodes[minNode.center]; nodeLength--; // remove found node from pick list
        // console.log("nodes:", Object.values(nodes).length);
        if (minNode.center[0] == end[0] && minNode.center[1] == end[1]) return reconstruct_path(pathMap, minNode); // if node is end node return path

        for (let i = 0; i < minNode.siblings.length; i++) { // traverse siblings of min distance node
            const sibling = graph[minNode.siblings[i]];
            if (sibling.unpathable) continue; // node is non-traversable
            
            const potentialStartScore = startScores[minNode.center] + getDistance(minNode.center, sibling.center, minNode.size);
            if (!startScores[sibling.center] || potentialStartScore < startScores[sibling.center]) {
                pathMap[sibling.center] = minNode;
                startScores[sibling.center] = potentialStartScore;
                totalScores[sibling.center] = potentialStartScore + getDistance(sibling.center, end, minNode.size);
                if (!nodes[sibling.center]) {
                    nodes[sibling.center] = sibling;
                    nodeLength++;
                }
            }
        }
        if (first) {
            first = false;
            console.log("start:",startScores);
            console.log("total:",totalScores);
        }
    }
    console.log("Failed to find solution to aStar path");
    return [];
}

function reconstruct_path(pathMap, endNode) {
    const total_path = [endNode];
    let currentNode = endNode;
    while (pathMap[currentNode.center]) {
        // console.log("endNode:", currentNode.center);
        currentNode = pathMap[currentNode.center];
        total_path.unshift(currentNode);
    }
    return total_path;
}

function getMinNode(nodes, scores) {
    const keys = Object.keys(nodes);
    let minVal = -Infinity;
    let minNode = nodes[keys[0]];
    for (let i = 0; i < keys.length; i++) {
        if (!scores[keys[i]]) continue;
        if (scores[keys[i]] < minVal) {
            minVal = scores[keys[i]];
            minNode = nodes[keys[i]];
        }
    }
    return minNode;
}

function getDistance(a, b, size = null) {
    if (a[0] == b[0]) return Math.abs(a[1] - b[1]);
    if (a[1] == b[1]) return Math.abs(a[0] - b[0]);
    const dx = a[0] - b[0];
    const dy = a[1] - b[1];
    if (size && dx === dy) return Math.round(1.4 * size * 10) / 10;
    return Math.round(Math.sqrt(dx * dx + dy * dy) * 10) / 10;
}