import { canvas, ctx } from "./canvas.js"

class StateMachine {
    constructor(initialState) {
        this.currentState = initialState
        this.states = {}
        this.currentName = ""
    }

    addState(name, state) {
        this.states[name] = state
    }

    setSceneText() {
        ctx.font = "48px serif"
        ctx.fillStyle = "black"
        ctx.fillText(this.currentName, canvas.width / 2 - this.currentName.length * 8, 40)
    }

    resetState(name) {
        this.setState(name)
        this.currentState.started = false
    }

    setState(name) {
        this.currentState = this.states[name]
        this.currentName = name
    }

    update(dt) {
        if(this.currentState) {
            if(!this.currentState.started) this.currentState.start(dt)
            this.currentState.update(dt)
            this.setSceneText()
        }
    }
}

export class GameState {
    constructor() {
        this.started = false
    }

    start() {
        this.started = true
    }

    update(dt) {
        
    }
}

const stateMachine = new StateMachine();

export { stateMachine }