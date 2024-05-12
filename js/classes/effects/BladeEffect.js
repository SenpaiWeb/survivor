import BulletBuilder from '../Bullet.js'
import Effect from '../Effect.js'

export class BladeEffect extends Effect {
    constructor() {
        super()
        this.target = null
        this.blades = []
        this.angle = 0
    }

    run(target) {
        this.target = target
        this.addBlade()
    }

    addBlade() {
        const blade = BulletBuilder.create(this.target.x, this.target.y, {x: 0, y: 0})
                                   .setInfinite(true)
                                   .setSize(10)
                                   .setATK(10)
                                   .build()
        this.blades.push(blade)
    }

    removeBlade() {
        this.blades.pop()
    }

    update(dt) {
        if(this.blades.length === 0) return
        const bladeSpeed = 6
        this.angle += bladeSpeed
        if(this.angle >= 360) this.angle = 0
        for(let i = 0; i < this.blades.length; i++) {
            const blade = this.blades[i]
            const radius = 80
            const angle = (this.angle + (360 / this.blades.length * i)) * (Math.PI / 180)
            const x = this.target.x + Math.cos(angle) * radius
            const y = this.target.y + Math.sin(angle) * radius

            blade.setPosition(x, y)
        }
    }
}