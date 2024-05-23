import BasicEnemy from './BasicEnemy.js'

export default class Boss extends BasicEnemy {
    constructor(x, y, w, h) {
        super(x, y, w, h)
        this.setSize(40, 40)
        this.SPD = 3
        this.selfATK = 20
        this.ATK = 10
        this.setHealth(180)
    }
}