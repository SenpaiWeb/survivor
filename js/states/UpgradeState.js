import keyboard from "../keyboard.js"
import { GameState, stateMachine } from "../StateMachine.js"
import { Upgrades } from '../classes/Upgrade.js'
import { Player } from '../classes/Player.js'
import { canvas, ctx } from "../canvas.js"

let activeChoice = 0

const maxUpgrades = 4
let upgrades = []


function buildUI() {
    for(let i = 0; i < upgrades.length; i++) {
        const upgrade = upgrades[i]
        //const upgrade = translateUpgrade(upgradeProp)

        ctx.font = "24px serif"
        ctx.fillStyle = activeChoice === i ? "red" : "black"
        let x = canvas.width / maxUpgrades * i + (canvas.width / maxUpgrades * .3)
        if(upgrade.icon) {
            const image = new Image()
            image.src = "./icons/" + upgrade.icon
            ctx.drawImage(image, x, canvas.height / 2 - 160, 64, 64)
        }
        ctx.fillText(upgrade.title, x, canvas.height / 2 - 80)
        ctx.fillText(upgrade.description, x, canvas.height / 2)
    }
}

function translateUpgrade(upgradeProp) {
    const upgradeName = Object.getOwnPropertyNames(upgradeProp)[0]
    const upgrade = upgradeProp[upgradeName](Player.LVL)

    return upgrade
}

function getRandomUpgrade() {
    let upgrade
    do {
        upgrade = translateUpgrade({...Upgrades[Math.floor(Math.random() * Upgrades.length)]})
    } while(upgrades.find(translated => translated.title == upgrade.title))
    return upgrade
}


export default class UpgradeState extends GameState {
    constructor() {
        super()
        this.leftHold = false
        this.rightHold = false
        this.enterHold = false
        this.upgrades = []
    }

    start() {
        super.start()
        this.leftHold = true
        this.rightHold = true
        this.enterHold = true
        upgrades = []
        for(let i = 0; i < maxUpgrades; i++) upgrades.push(getRandomUpgrade())
    }

    processInputs() {
        if(this.enterHold && !keyboard["Enter"]) this.enterHold = false
        if(keyboard["ArrowLeft"]) {
            if(!this.leftHold) activeChoice = Math.max(activeChoice - 1, 0)
            this.leftHold = true
        } else this.leftHold = false
        if(keyboard["ArrowRight"]) {
            if(!this.rightHold) activeChoice = Math.min(activeChoice + 1, upgrades.length - 1)
            this.rightHold = true
        } else this.rightHold = false

        if(keyboard["Enter"]) {
            const upgrade = upgrades[activeChoice]
            Player.addUpgrade(upgrade)
            stateMachine.setState("gameplay")
        }
    }

    update(dt) {
        this.processInputs()
        buildUI()
        //ctx.fillText("")
    }
}