let keyboard = {}

document.onkeydown = e => keyboard[e.key] = 1
document.onkeyup = e => keyboard[e.key] = 0

export default keyboard