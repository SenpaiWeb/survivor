import { BladeEffect } from './effects/BladeEffect.js';
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
            icon: 'cannon-shot.png',
            description: `Attack +${(level * 5).toFixed(2)}%`,
            effect: () => Player.ATK += Player.ATK * (level * 5) / 100
        }
    }
}, 
{
    HP: (level) => {
        return {
            title: `HP ${romanize(level)}`,
            icon: 'medpack.png',
            description: `HP +${level}%`,
            effect: () => Player.setHealth(Player.maxHP + (Player.maxHP * level / 100))
        }
    }
}, 
{
    'ORBIT BLADE': (level) => {
        return {
            title: `ORBIT BLADE ${romanize(level)}`,
            icon: 'spinning-blades.png',
            description: `Add +${level} blade revolving around you`,
            effect: () => Player.addEffect(BladeEffect)
        }
    }
},
{
    REGEN: (level) => {
        return {
            title: `REGEN ${romanize(level)}`,
            icon: 'spinning-blades.png',
            description: `REGEN +${(level * .1).toFixed(2)}/s`,
            effect: () => Player.addEffect(BladeEffect)
        }
    }
},
{
    ATKSPD: (level) => {
        return {
            title: `ATTACK SPEED ${romanize(level)}`,
            icon: 'minigun.png',
            description: `Attack speed -${level}%`,
            effect: () => Player.baseFireRate -= Player.baseFireRate * (level / 100)
        }
    }
},
{
    SPD: (level) => {
        return {
            title: `SPEED ${romanize(level)}`,
            icon: 'boots.png',
            description: `Move faster by ${level * 5}%`,
            effect: () => Player.SPD += Player.SPD * (level * 5) / 100
        }
    }
}]