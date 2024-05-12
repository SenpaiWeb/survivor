export function substractDistance(pointA, pointB) {
    return { x: pointA.x - pointB.x, y: pointA.y - pointB.y }
}

export function getDistance(pointA, pointB) {
    const d = substractDistance(pointA, pointB)

    return Math.sqrt(d.x * d.x + d.y * d.y)
}

export function getDirection(pointA, pointB) {
    const d = substractDistance(pointA, pointB)
    const dist = getDistance(pointA, pointB)

    return { x: d.x / dist, y: d.y / dist }
}

export function isOverlapping(goA, goB) {
    const overlapX = goA.x>= goB.center.x
    const overlapY = goA.y >= goB.center.y
    const dist = getDistance(goA.center, goB.center)
    
    return overlapX && overlapY//dist <= 20
}