import { GameState, stateMachine } from "../StateMachine.js"
import keyboard from "../../keyboard.js"
import { canvas, ctx } from "../../canvas.js"

function buildUI() {
    ctx.fillText("Pause", canvas.width / 2, canvas.height / 2)
}

export default class PauseState extends GameState {

    constructor() {
        super()
        this.escapeHold = false
    }

    start() {
        super.start()
        this.escapeHold = true
    }

    processInputs() {
        if(!keyboard["Escape"]) this.escapeHold = false
        if(this.escapeHold) return
        if(keyboard["Enter"] || keyboard["Escape"]) stateMachine.setState("gameplay")
    }

    update(dt) {
        this.processInputs()
        buildUI()
    }
}