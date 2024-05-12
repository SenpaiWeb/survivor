import Vulnerable from './Vulnerable.js'
import Colors from './Colors.js'
import Tags from './Tags.js'
import Enemies from './Enemies.js'
import { Player } from './Player.js'
import XP from './XP.js'
import {Stats} from './Stats.js'
import { ctx } from '../canvas.js'
import { getDistance, substractDistance } from '../util/geometry.js'

class Enemy extends Vulnerable {
    constructor(x, y, w, h) {
        super(x, y, w, h, Colors.ENEMY, 1)
        this.xpReward = 1
        this.addTag(Tags.ENEMY)
    }

    draw() {
        super.draw()

        ctx.fillStyle = Colors.HP
        ctx.fillRect(this.x, this.y + this.h, this.w * (Math.max(this.HP, 0) / this.maxHP), this.h / 5)
    }

    inflictDamage(damage) {
        super.inflictDamage(damage)
        console.log('received', damage, 'damage')
    }

    dispose() {
        super.dispose()
        Player.addXP(this.xpReward);
        Stats.totalKills++;
    }

    checkCollision() {
    }

    getPlayerDistance() {
        const direction = substractDistance(Player.center, this.center)
        const distance = getDistance(Player.center, this.center)
        return { direction, distance }
    }

    update() {
        const { direction, distance } = this.getPlayerDistance()

            if(distance > 0) {
                const angleX = direction.x / distance
                const angleY = direction.y / distance
    
                this.move(angleX, angleY)
            }
        this.draw()
    }
}















export default class EnemyBuilder {
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

    static create(x, y, w, h) {
        return new EnemyBuilder(new Enemy(x, y, w, h))
    }
}