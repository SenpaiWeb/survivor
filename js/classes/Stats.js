const base = {
    totalKills: 0,
    totalShots: 0,
    frameCounter: 0
}

let Stats = {...base}

function resetStats() {
    Stats = {...base}
}

export { Stats, resetStats }