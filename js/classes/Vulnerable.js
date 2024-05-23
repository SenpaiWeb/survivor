import Moveable from "./Moveable.js"

export default class Vulnerable extends Moveable {
    constructor(x, y, w, h, color, speed) {
        super(x, y, w, h, color, speed)
        this.maxHP = 0
        this.HP = this.maxHP
        this.ATK = 0
        this.invulnerableCooldown = 0
        this.baseInvulnerableCooldown = 0
        this.healOverTime = 0
        this.effects = []
        this.selfATK = 0
    }

    inflictDamage(damage) {
        if(this.invulnerableCooldown > 0) return
        this.HP -= damage;
        this.invulnerableCooldown = this.baseInvulnerableCooldown

        if(!this.alive) this.die()
    }

    setHealth(hp) {
        this.maxHP = hp
        this.HP = hp
    }

    setATK(damage) {
        this.ATK = damage
    }

    addEffect(effectClass) {
        const foundEffect = this.effects.find(activeEffect => activeEffect instanceof effectClass)
        let effect
        if(!foundEffect) {
            effect = new effectClass()
            this.effects.push(effect)
        } else effect = foundEffect
        effect.run(this)
    }

    die() {
        this.dispose()
    }

    get alive() {
        return this.HP > 0
    }

    update(dt) {
        this.invulnerableCooldown -= dt;
        this.HP = Math.min(this.HP + this.healOverTime, this.maxHP)
        for(let i = 0; i < this.effects.length; i++) {
            const effect = this.effects[i]
            effect.update(dt)
        }
    }
}