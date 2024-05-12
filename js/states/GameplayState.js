import { createPlayer, Player } from '../classes/Player.js'
import Enemies from '../classes/Enemies.js'
import { GameState, stateMachine } from '../StateMachine.js'
import { ctx, canvas } from '../canvas.js'
import {resetStats, Stats} from '../classes/Stats.js'
import GameObject from '../classes/GameObject.js'
import Colors from '../classes/Colors.js'

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

function buildUI() {
    ctx.font = "24px serif";
    ctx.fillStyle = "black";
    ctx.fillText(`Frames elapsed: ${Stats.frameCounter}`, 20, (1 * 24) + (1 * 10))
    ctx.fillText(`Entities alive: ${GameObject.list.length}`, 20, (2 * 24) + (2 * 10))
    ctx.fillText(`Total kills: ${Stats.totalKills}`, 20, (3 * 24) + (3 * 10))
    ctx.fillText(`Player level: ${Player.LVL}`, 20, (4 * 24) + (4 * 10))
    ctx.fillText(`Player health: ${Player.HP}`, 20, (5 * 24) + (5 * 10))
    ctx.fillText(`Total shots: ${Stats.totalShots}`, 20, (6 * 24) + (6 * 10))
    
    const barHeight = 20
    ctx.fillStyle = "gray"
    ctx.fillRect(40, canvas.height - 40, canvas.width - 80, barHeight)
    ctx.fillStyle = Colors.XP
    ctx.fillRect(40, canvas.height - 40, (canvas.width - 80) * (Player.XP / Player.neededXp), barHeight)
}

export default class GameplayState extends GameState {

    constructor() {
        super()
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

    update() {
        //return stateMachine.setState("upgrade")
        if(!Player.alive) return stateMachine.setState("death");
        if(Stats.frameCounter % Player.fireRate === 0) Player.fire();
    
        if(Stats.frameCounter % 10 === 0) createEnemy();
        const entities = [...GameObject.list].sort((a, b) => a.z - b.z);
        for(let i = 0; i < entities.length;i++) {
            const entity = entities[i]
            if(entity.update) entity.update()
        }

        buildUI()
    }
}