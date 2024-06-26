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