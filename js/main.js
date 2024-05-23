import { canvas, ctx } from './canvas.js';
import { stateMachine } from './classes/StateMachine.js';
import GameplayState from './classes/states/GameplayState.js';
import UpgradeState from './classes/states/UpgradeState.js';
import PauseState from './classes/states/PauseState.js'

import {Stats} from './classes/Stats.js';
import DeathState from './classes/states/DeathState.js';

stateMachine.addState("gameplay", new GameplayState())
stateMachine.addState("upgrade", new UpgradeState())
stateMachine.addState("death", new DeathState())
stateMachine.addState("pause", new PauseState())
stateMachine.setState("gameplay")

let lastFrameTime = Date.now();

function gameLoop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    const currentTime = Date.now()
    const dt = currentTime - lastFrameTime

    stateMachine.update(dt)

    lastFrameTime = currentTime
    Stats.frameCounter++;
    requestAnimationFrame(gameLoop);
}

gameLoop();