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
    const endNode = graph[end];
    const startNode = graph[start];
    const startScores = {};
    startScores[start] = 0;
    const endScores = {};
    endScores[start] = getNodeDistance(graph[start], graph[end]);
    const totalScores = {};
    totalScores[start] = startScores[start] + endScores[start];
    const nodes = {};
    nodes[start] = startNode;
    const pathMap = {};
    while (nodes.length > 0) {
        const minNode = getMinNode(nodes, totalScores);
        if (minNode.center[0] == end[0] && minNode.center[1] == end[1]) return reconstruct_path(pathMap, minNode);
        delete nodes[minNode];
        for (let i = 0; i < minNode.siblings.length; i++) {
            const sibling = minNode.siblings[i];
            const tempEndScore = endScores[minNode.center] + getNodeDistance(minNode, sibling);
            if (tempEndScore < endScores[sibling.center]) {
                pathMap[sibling.center] = minNode.center;
                endScores[sibling.center] = tempEndScore;
                totalScores[sibling.center] = tempEndScore + getNodeDistance(sibling, endNode);
                if (!nodes[sibling.center])
                    nodes[sibling.center] = sibling;
            }
        }

    }
    return null
}

function reconstruct_path(pathMap, endNode) {
    const total_path = [endNode];
    while (endNode in Object.keys(pathMap)) {
        endNode = pathMap[endNode.center];
        total_path.unshift(endNode);
    }
    return total_path;
}

function getMinNode(nodes, scores) {
    const keys = Object.keys(nodes);
    let minVal = -1;
    let minNode = nodes[keys[0]];
    for (let i = 0; i < keys.length; i++) {
        if (scores[keys[i]] < minVal) {
            minVal = scores[keys[i]];
            minNode = nodes[keys[i]];
        }
    }
    return minNode;
}

function getNodeDistance(a, b) {
    const dx = a.center[0] - b.center[0];
    const dy = a.center[1] - b.center[1];
    return Math.round(Math.sqrt(dx * dx + dy * dy) * 10) / 10;
}