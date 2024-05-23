import { GameState, stateMachine } from "../StateMachine.js"
import keyboard from "../../keyboard.js"
import { canvas, ctx } from "../../canvas.js"

function buildUI() {
    ctx.fillText("Play again?", canvas.width / 2, canvas.height / 2)
}

export default class DeathState extends GameState {

    constructor() {
        super()
    }

    processInputs() {
        if(keyboard["Enter"]) stateMachine.resetState("gameplay")
    }

    update(dt) {
        this.processInputs()
        buildUI()
    }
}