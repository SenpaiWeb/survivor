import GameObject from './GameObject.js'
import { ctx } from '../canvas.js'

export default class Drawable extends GameObject {
    constructor(x, y, w, h, color) {
        super(x, y, w, h)
        this.color = color
    }

    draw() {
        ctx.fillStyle = this.color
        ctx.fillRect(this.x, this.y, this.w, this.h)
    }
}