import Drawable from './Drawable.js'
import Colors from './Colors.js'
import Tags from './Tags.js'
import Enemies from './Enemies.js'
import { ctx } from '../canvas.js'

class Bullet extends Drawable {
    constructor(x, y, velocity) {
        super(x, y, 5, 5, Colors.BULLET)
        this.z = -1
        this.velocity = velocity
        this.size = this.w / 2
        this.SPD = 30
        this.ATK = 0
        this.addTag(Tags.BULLET)
    }

    draw() {
        ctx.beginPath();
        ctx.fillStyle = this.color
        ctx.arc(this.center.x, this.center.y, this.size, 0, Math.PI * 2)
        ctx.fill();
        ctx.closePath();
    }

    move() {
        this.x += -this.velocity.x * this.SPD
        this.y += -this.velocity.y * this.SPD
    }

    update() {
        this.move()
        this.draw()
        if(this.checkCollision()) {
            this.dispose()
        }
    }

    checkCollision() {
        const closestEnemy = Enemies.getClosest(this)
        if(!closestEnemy) return
        if(this.checkOverlap(closestEnemy)) {
            closestEnemy.inflictDamage(this.ATK)
            return true
        }
    }
}

export default class BulletBuilder {
    constructor(bullet) {
        this.bullet = bullet
    }

    setSPD(speed) {
        this.bullet.SPD = speed
        return this
    }

    setATK(atk) {
        this.bullet.ATK = atk
        return this
    }
    
    setVelocity(velocity) {
        this.bullet.velocity = velocity
        return this
    }

    setSize(size) {
        this.bullet.size = size
        this.bullet.w = size * 2
        this.bullet.h = size * 2
        return this
    }

    build() {
        return this.bullet
    }

    template(x, y, velocity) {
        return () => {
            return BulletBuilder.create(x || this.bullet.x, y || this.bullet.y, velocity || this.bullet.velocity)
                        .setATK(this.bullet.ATK)
                        .setSPD(this.bullet.SPD)
                        .setSize(this.bullet.size)
                        .build()
                    
        }
    }

    static create(x, y, velocity) {
        return new BulletBuilder(new Bullet(x, y, velocity))
    }
}