import Colors from "../Colors.js"
import { Enemy } from "../Enemy.js"

export default class ButterflyEnemy extends Enemy {
    constructor(x, y, w, h) {
        super(x, y, w, h)
        this.setHealth(1)
        this.SPD = 6
        this.movementDuration = 1e3
        this.randomAxis = {x: 0, y: 0}
        this.color = Colors.XP
    }

    update(dt) {
        this.movementDuration -= dt
        if(this.movementDuration <= 0) {
            this.randomAxis = { x: Math.round(-1 + Math.random() * 2), y: Math.round(-1 + Math.random() * 2)}
            this.movementDuration = Math.round(Math.random() * 1e3)
        }
        this.move(this.randomAxis.x, this.randomAxis.y)
        super.update()
    }
}