import Colors from './Colors.js'
import Tags from './Tags.js'
import Enemies from './Enemies.js'
import { getDirection } from '../util/geometry.js'
import Vulnerable from './Vulnerable.js'
import {Stats} from './Stats.js'
import keyboard from '../keyboard.js'
import BulletBuilder from './Bullet.js'
import { stateMachine } from '../StateMachine.js'
import GameObject from './GameObject.js'

const PLAYER_WIDTH = 35;
const PLAYER_HEIGHT = 35;
const PLAYER_SPEED = 5;

/**
 * @type {PlayerBase}
 */
let Player

function createPlayer() {
    if(Player) console.warn("Creating new player while another already exists")
    Player = new PlayerBase(0, 0)
}

function deletePlayer() {
    Player = null
}

class PlayerBase extends Vulnerable {
    constructor(x, y) {
        super(x, y, PLAYER_WIDTH, PLAYER_HEIGHT, Colors.PLAYER, PLAYER_SPEED)
        this.z = 10
        this.LVL = 0
        this.XP = 0
        this.baseFireRate = 100
        this.fireRate = this.baseFireRate
        this.upgrades = []
        this.baseInvulnerableCooldown = 2e3
        this.addTag(Tags.PLAYER)
    }

    addUpgrade(upgrade) {
        this.upgrades.push(upgrade)
        upgrade.effect()
    }

    addXP(xpAmount) {
        this.XP += xpAmount
        if(this.missingXp <= 0) {
            this.XP -= this.neededXp
            this.levelUp()
        }
    }

    get neededXp() {
        return 50 + 25 * this.LVL
    }

    get missingXp() {
        return this.neededXp - this.XP
    }

    levelUp() {
        this.LVL++;
        stateMachine.resetState("upgrade")
    }

    fire() {
        const nearestEnemy = Enemies.getClosest(this)
        if(!nearestEnemy) return
        const velocity = getDirection(this.center, nearestEnemy.center)
        BulletBuilder.create(this.center.x, this.center.y, velocity)
        .setATK(this.ATK)
        .setSPD(10)
        .setSize(10)
        .build()
        Stats.totalShots++;
    }

    checkCollision() {
        const closestEnemy = Enemies.getClosest(this)
        if(!closestEnemy) return
        if(this.checkOverlap(closestEnemy)) {
            closestEnemy.inflictDamage(10)
            this.inflictDamage(10)
            return true
        }
    }

    processInputs() {
        let 
        x = 0,
        y = 0
    
        if(keyboard["ArrowUp"]) y -= 1
        if(keyboard["ArrowDown"]) y += 1
        if(keyboard["ArrowLeft"]) x -= 1
        if(keyboard["ArrowRight"]) x += 1

        if(keyboard["Enter"]) console.log(GameObject.list)
    
        this.move(x, y)
    }

    update(dt) {
        this.fireRate -= dt

        if(this.fireRate <= 0) {
            this.fire()
            this.fireRate = this.baseFireRate
        }
        this.processInputs()
        super.update(dt)
        this.draw()
        this.checkCollision()
    }
}

export { Player, createPlayer, deletePlayer }