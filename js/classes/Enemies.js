import {EnemyBuilder} from './Enemy.js'
import { getDistance } from '../util/geometry.js'
import GameObject from './GameObject.js'
import GameplayTags from './Tags.js'
import BasicEnemy from './enemies/BasicEnemy.js'
import ButterflyEnemy from './enemies/ButterflyEnemy.js'
import Boss from './enemies/Boss.js'

let enemiesInstance

const enemyTypes = [BasicEnemy, ButterflyEnemy, /*Boss*/]

class Enemies {

    constructor() {
    }

    spawnEnemy(x, y) {
        const speed = 3 + (-.2 + (Math.random() * .4))
        const base = enemyTypes[Math.floor(Math.random() * enemyTypes.length)]
        const enemy = EnemyBuilder.create(base, x, y, 25, 25)
                                  .setXP(3)
                                  .build()

        return enemy
    }

    getClosest(go) {
        return [...GameObject.GetAllWithTag(GameplayTags.ENEMY)].sort((a, b) => getDistance(a.center, go.center) - getDistance(b.center, go.center))[0]
    }
}

enemiesInstance = new Enemies()

export default enemiesInstance