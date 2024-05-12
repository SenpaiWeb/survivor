import Vulnerable from './Vulnerable.js'
import Colors from './Colors.js'
import Tags from './Tags.js'
import { Player } from './Player.js'
import XP from './XP.js'
import {Stats} from './Stats.js'
import { canvas, ctx } from '../canvas.js'
import { getDistance, substractDistance } from '../util/geometry.js'

export class Enemy extends Vulnerable {
    constructor(x, y, w, h) {
        super(x, y, w, h, Colors.ENEMY, 1)
        this.xpReward = 1
        this.baseInvulnerableCooldown = 80
        this.addTag(Tags.ENEMY)
    }

    draw() {
        super.draw()

        ctx.fillStyle = Colors.HP
        ctx.fillRect(this.x, this.y + this.h, this.w * (Math.max(this.HP, 0) / this.maxHP), this.h / 5)
    }

    dispose() {
        super.dispose()
        Player.addXP(this.xpReward);
        Stats.totalKills++;
    }

    getPlayerDistance() {
        const direction = substractDistance(Player.center, this.center)
        const distance = getDistance(Player.center, this.center)
        return { direction, distance }
    }

    update() {
        super.update()
        this.draw()
        if(this.x > canvas.width + 200 || this.y > canvas.height + 200 || this.x < -200 || this.y < -200) super.dispose()
    }
}















export class EnemyBuilder {
    constructor(enemy) {
        this.enemy = enemy
    }

    setHP(hp) {
        this.enemy.maxHP = hp
        this.enemy.HP = hp
        return this
    }

    setSPD(speed) {
        this.enemy.SPD = speed
        return this
    }

    setXP(xp) {
        this.enemy.xpReward = xp
        return this
    }

    setATK(atk) {
        this.enemy.ATK = atk
        return this
    }

    build() {
        return this.enemy
    }

    static create(base, x, y, w, h) {
        return new EnemyBuilder(new base(x, y, w, h))
    }
}