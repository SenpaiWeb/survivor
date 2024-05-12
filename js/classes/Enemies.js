import EnemyBuilder from './Enemy.js'
import { Player } from './Player.js'
import { getDistance, substractDistance } from '../util/geometry.js'
import { ctx } from '../canvas.js'
import GameObject from './GameObject.js'
import GameplayTags from './Tags.js'

let enemiesInstance

class Enemies {

    constructor() {
    }

    spawnEnemy(x, y) {
        const speed = 3 + (-.2 + (Math.random() * .4))
        const enemy = EnemyBuilder.create(x, y, 25, 25)
                                  .setSPD(speed)
                                  .setHP(4)
                                  .setXP(3)
                                  .build()

        return enemy
    }

    /*createBigEnemy() {
        const initialEnemy = this.createEnemy()
    }*/

    getClosest(go) {
        return [...GameObject.GetAllWithTag(GameplayTags.ENEMY)].sort((a, b) => getDistance(a.center, go.center) - getDistance(b.center, go.center))[0]
    }

    get sorted() {
        return GameObject.GetAllWithTag(GameplayTags.ENEMY).sort((a, b) => getDistance(a.center, Player.center) - getDistance(b.center, Player.center))
    }

    get closest() {
        return this.sorted[0]
    }
}

enemiesInstance = new Enemies()

export default enemiesInstance