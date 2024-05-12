import Drawable from './Drawable.js'

export default class Moveable extends Drawable {
    constructor(x, y, w, h, color, speed) {
        super(x, y, w, h, color)
        this.SPD = speed
    }

    move(dx, dy) {
        if(dx && dy) {
            dx *= Math.sqrt(2) / 2
            dy *= Math.sqrt(2) / 2
        }

        this.x += dx * this.SPD;
        this.y += dy * this.SPD;

        
    }
}