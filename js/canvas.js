const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth
canvas.height = window.innerHeight

window.onresize = () => {
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight
}

export { canvas, ctx };
