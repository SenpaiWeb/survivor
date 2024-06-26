import { createPlayer, Player } from '../Player.js'
import Enemies from '../Enemies.js'
import { GameState, stateMachine } from '../StateMachine.js'
import { ctx, canvas } from '../../canvas.js'
import {resetStats, Stats} from '../Stats.js'
import GameObject from '../GameObject.js'
import Colors from '../Colors.js'
import keyboard from '../../keyboard.js'

function createEnemy() {
    let x = 0,
    y = 0

    if(Math.random() >= .5) {
        x = Math.floor(Math.random() * canvas.width)
        y = Math.random() >= .5 ? canvas.height + 40 : -40
    } else {
        y = Math.floor(Math.random() * canvas.height)
        x = Math.random() >= .5 ? canvas.width + 40 : -40
    }

    Enemies.spawnEnemy(x, y)
}

function drawProgressBar(x, y, progress, length, color) {
    const barHeight = 20
    ctx.fillStyle = "gray"
    ctx.fillRect(x, y, length, barHeight)
    ctx.fillStyle = color
    ctx.fillRect(x, y, progress, barHeight)
}

function buildUI() {
    ctx.font = "24px serif";
    ctx.fillStyle = "black";
    ctx.fillText(`Frames elapsed: ${Stats.frameCounter}`, 20, (1 * 24) + (1 * 10))
    ctx.fillText(`Entities alive: ${GameObject.list.length}`, 20, (2 * 24) + (2 * 10))
    ctx.fillText(`Total kills: ${Stats.totalKills}`, 20, (3 * 24) + (3 * 10))
    ctx.fillText(`Player level: ${Player.LVL}`, 20, (4 * 24) + (4 * 10))
    ctx.fillText(`Player health: ${(Player.HP).toFixed(2)}`, 20, (5 * 24) + (5 * 10))
    ctx.fillText(`Total shots: ${Stats.totalShots}`, 20, (6 * 24) + (6 * 10))
    
    drawProgressBar(40, canvas.height - 60, (canvas.width - 80) * (Player.HP / Player.maxHP), canvas.width - 80, Colors.HP)
    drawProgressBar(40, canvas.height - 40, (canvas.width - 80) * (Player.XP / Player.neededXp), canvas.width - 80, Colors.XP)
}

export default class GameplayState extends GameState {

    constructor() {
        super()
        this.escapeHold = false
    }

    start() {
        super.start()
        GameObject.RemoveAllEntities()
        createPlayer()
        resetStats()
        Player.setPosition(canvas.width / 2, canvas.height / 2)
        Player.setHealth(100)
        Player.setATK(2)
    }

    update(dt) {
        if(keyboard["Escape"] && !this.escapeHold) stateMachine.resetState("pause")
        if(this.escapeHold && !keyboard["Escape"]) this.escapeHold = false
        //return stateMachine.setState("upgrade")
        if(!Player.alive) return stateMachine.setState("death");
        //if(Player.LVL < 25 && Stats.frameCounter % 10 === 0) return Player.levelUp()
        if(Stats.frameCounter % Math.max(10 - Player.LVL, 1) === 0) createEnemy();
        const entities = [...GameObject.list].sort((a, b) => a.z - b.z);
        for(let i = 0; i < entities.length;i++) {
            const entity = entities[i]
            if(entity.update) entity.update(dt)
        }

        buildUI()
    }
}