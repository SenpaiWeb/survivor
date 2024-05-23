import keyboard from "../../keyboard.js"
import { GameState, stateMachine } from "../StateMachine.js"
import { Upgrades } from '../Upgrade.js'
import { Player } from '../Player.js'
import { canvas, ctx } from "../../canvas.js"

let activeChoice = 0

const maxUpgrades = 4
let upgrades = []

let enemyChoice = 0


function buildUI() {
    for(let i = 0; i < upgrades.length; i++) {
        const upgrade = upgrades[i]
        //const upgrade = translateUpgrade(upgradeProp)

        ctx.font = (activeChoice === i ? "32px" : "24px") + " 'Segoe UI Emoji'"
        ctx.fillStyle =  "black"
        let x = canvas.width / maxUpgrades * i + (canvas.width / maxUpgrades * .3)

        if(upgrade.card) {
            const image = new Image()
            image.src = "./cards/" + upgrade.card
            ctx.drawImage(image, x, canvas.height / 2 - 160, 244, 386)
        }
        ctx.fillText(upgrade.title, x + 244 / 2 - upgrade.title.length * 8, canvas.height / 2 + 160)
        ctx.fillText(upgrade.description, x, canvas.height / 2 + 200)
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

    giveUpgrade(target, upgrade) {
            target.addUpgrade(upgrade)
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
            this.giveUpgrade(Player, upgrade)
            stateMachine.setState("gameplay")
        }
    }

    update(dt) {
        this.processInputs()
        buildUI()
        //ctx.fillText("")
    }
}