import { deletePlayer, Player } from './Player.js'

export default class GameObject {
    static list = []
    constructor(x, y, w, h) {
        this.x = x
        this.y = y
        this.z = 0
        this.w = w
        this.h = h
        this.createdAt = Date.now()
        this.tags = []
        GameObject.list.push(this)
    }

    setPosition(x, y) {
        this.x = x
        this.y = y
    }

    setCenter(x, y) {
        this.x = x + this.w / 2
        this.y = y + this.h / 2
    }

    dispose() {
        const index = GameObject.list.indexOf(this)
        if(index === -1) return console.log('could not find index of ', this)
        GameObject.list.splice(index, 1)
    }

    addTag(tag) {
        this.tags.push(tag)
        return this
    }

    removeTag(tag) {
        const index = this.tags.indexOf(tag)
        this.tags.splice(index, 1)
        return this
    }
    
    checkOverlap(go) {
        const overlapX = this.x + this.w >= go.x && go.x + go.w >= this.x;
        const overlapY = this.y + this.h >= go.y && go.y + go.h >= this.y;

        return overlapX && overlapY
    }

    get center() {
        return { x: this.x + this.w / 2, y: this.y + this.h / 2 }
    }

    get age() {
        return Date.now() - this.createdAt
    }

    static GetAllWithTag(tag) {
        if(!tag) return GameObject.list
        return GameObject.list.filter(go => go.tags.includes(tag))
    }

    static RemoveAllEntities() {
        this.list = []
        deletePlayer()
    }
}