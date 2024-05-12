import Moveable from "./Moveable.js"

export default class Vulnerable extends Moveable {
    constructor(x, y, w, h, color, speed) {
        super(x, y, w, h, color, speed)
        this.maxHP = 0
        this.HP = this.maxHP
        this.ATK = 0
        this.selfATK = 0
    }

    inflictDamage(damage) {
        this.HP -= damage;

        if(!this.alive) this.die()
    }

    setHealth(hp) {
        this.maxHP = hp
        this.HP = hp
    }

    setATK(damage) {
        this.ATK = damage
    }

    die() {
        this.dispose()
    }

    get alive() {
        return this.HP > 0
    }

    update() {

    }
}