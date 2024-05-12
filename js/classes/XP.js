import Moveable from './Moveable.js'
import Colors from './Colors.js'

export default class XP extends Moveable {
    constructor(x, y, angle) {
        super(x, y, 2, 2, Colors.XP, 0)
    }


}