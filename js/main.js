import { canvas, ctx } from './canvas.js';
import { stateMachine } from './StateMachine.js';
import GameplayState from './states/GameplayState.js';
import UpgradeState from './states/UpgradeState.js';

import {Stats} from './classes/Stats.js';
import DeathState from './states/DeathState.js';

stateMachine.addState("gameplay", new GameplayState())
stateMachine.addState("upgrade", new UpgradeState())
stateMachine.addState("death", new DeathState())
stateMachine.setState("gameplay")

let lastFrameTime = Date.now();

function gameLoop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    const currentTime = Date.now()
    const dt = currentTime - lastFrameTime

    stateMachine.update()

    lastFrameTime = currentTime
    Stats.frameCounter++;
    requestAnimationFrame(gameLoop);
}

gameLoop();