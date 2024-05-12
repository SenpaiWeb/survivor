import { Player } from './Player.js'

function romanize(num) {
    if (isNaN(num))
        return NaN;
    var digits = String(+num).split(""),
        key = ["","C","CC","CCC","CD","D","DC","DCC","DCCC","CM",
               "","X","XX","XXX","XL","L","LX","LXX","LXXX","XC",
               "","I","II","III","IV","V","VI","VII","VIII","IX"],
        roman = "",
        i = 3;
    while (i--)
        roman = (key[+digits.pop() + (i * 10)] || "") + roman;
    return Array(+digits.join("") + 1).join("M") + roman;
}

export const Upgrades = [
{
    ATK: (level) => {
        return {
            title: `ATK ${romanize(level)}`,
            description: `Attack +${(level * 5).toFixed(2)}%`,
            effect: () => Player.ATK += Player.ATK * (level * 5) / 100
        }
    }
}, 
{
    HP: (level) => {
        return {
            title: `HP ${romanize(level)}`,
            description: `HP +${level}%`,
            effect: () => Player.setHealth(Player.maxHP + (Player.maxHP * level / 100))
        }
    }
}, 
{
    REGEN: (level) => {
        return {
            title: `REGEN ${romanize(level)}`,
            description: `REGEN +${(level * .1).toFixed(2)}/s`,
            effect: () => Player.regenHP = level * .1
        }
    }
},
/*{
    ATKSPD: (level) => {
        return {
            title: `ATTACK SPEED ${romanize(level)}`,
            description: `Attack speed -${(level * .1).toFixed(2)}%`,
            effect: () => Player.fireRate -= Player.fireRate * (level * .1)
        }
    }
}*/
{
    SPD: (level) => {
        return {
            title: `SPEED ${romanize(level)}`,
            description: `Move faster by ${level * 5}%`,
            effect: () => Player.SPD += Player.SPD * (level * 5) / 100
        }
    }
}]