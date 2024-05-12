const Stats = {
    totalKills: 0,
    totalShots: 0,
    frameCounter: 0
}

const base = {
    totalKills: 0,
    totalShots: 0,
    frameCounter: 0
}

function resetStats() {
    Stats = base
}

export { Stats, resetStats }