import { Enemy } from "../Enemy.js"

export default class BasicEnemy extends Enemy {
    constructor(x, y, w, h) {
        super(x, y, w, h)
        this.SPD = 3
        this.setHealth(4)
    }

    update(dt) {
        const { direction, distance } = this.getPlayerDistance()

        if(distance > 0) {
            const angleX = direction.x / distance
            const angleY = direction.y / distance

            this.move(angleX, angleY)
        }
        super.update(dt)
    }
}