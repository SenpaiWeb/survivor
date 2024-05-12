import keyboard from "../keyboard.js"
import { GameState, stateMachine } from "../StateMachine.js"
import { Upgrades } from '../classes/Upgrade.js'
import { Player } from '../classes/Player.js'
import { canvas, ctx } from "../canvas.js"

let activeChoice = 0

const maxUpgrades = 4
let upgrades = []

let leftHold = false,
    rightHold = false


function buildUI() {
    for(let i = 0; i < upgrades.length; i++) {
        const upgradeProp = upgrades[i]
        const upgrade = translateUpgrade(upgradeProp)

        ctx.font = "24px serif"
        ctx.fillStyle = activeChoice === i ? "red" : "black"
        let x = canvas.width / maxUpgrades * i + (canvas.width / maxUpgrades * .3)
        ctx.fillText(upgrade.title, x, canvas.height / 2 - 80)
        ctx.fillText(upgrade.description, x, canvas.height / 2)
    }
}

function translateUpgrade(upgradeProp) {
    const upgradeName = Object.getOwnPropertyNames(upgradeProp)[0]
    const upgrade = upgradeProp[upgradeName](Player.LVL)

    return upgrade
}


export default class UpgradeState extends GameState {
    constructor() {
        super()
    }

    start() {
        super.start()

        upgrades = [...Upgrades]
        /*for(let i = 0;i < maxUpgrades; i++) {
            const upgrade = getRandomUpgrade()
            upgrades.push(upgrade)
        }*/
    }

    processInputs() {
        if(keyboard["ArrowLeft"]) {
            if(!leftHold) activeChoice = Math.max(activeChoice - 1, 0)
            leftHold = true
        } else leftHold = false
        if(keyboard["ArrowRight"]) {
            if(!rightHold) activeChoice = Math.min(activeChoice + 1, upgrades.length)
            rightHold = true
        } else rightHold = false

        if(keyboard["Enter"]) {
            const upgrade = translateUpgrade(upgrades[activeChoice])
            console.log(upgrade)
            Player.addUpgrade(upgrade)
            stateMachine.setState("gameplay")
        }
    }

    update() {
        this.processInputs()
        buildUI()
        //ctx.fillText("")
    }
}