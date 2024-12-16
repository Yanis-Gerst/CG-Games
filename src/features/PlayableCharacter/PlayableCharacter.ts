import { ISceneLoaderAsyncResult } from "@babylonjs/core";
import { GameObject } from "../../shared/GameObject";
import { MovableKeys } from "../../shared/InputsManager/MovableKeys";
import { Game } from "../../Game";
import { IDirection } from "../../shared/utils/type";
import { PlayerAnimation } from "./PlayerAnimation";

export class PlayableCharacter extends GameObject {
  movableKeys!: MovableKeys;
  speed = 2.5;
  isMoving = false;
  currentDirection: IDirection | null = null;
  playerAnimation: PlayerAnimation;

  constructor(model: ISceneLoaderAsyncResult, game: Game) {
    super(model, game);
    this.playerAnimation = new PlayerAnimation(this);
  }

  initCommands() {
    this.movableKeys = new MovableKeys(this.game, this);
    this.game
      .getController()
      .registerKeyActivation(this.game.scene.actionManager);

    window.addEventListener("commandPressing", (_) => {
      const executingCommands = Object.values(
        this.movableKeys.getMoveCommand()
      ).filter((cmd) => cmd.isExecuting);
      this.isMoving = executingCommands.length > 0;
      this.currentDirection = this.isMoving
        ? executingCommands[0].direction
        : null;
      this.playerAnimation.animate();
    });
  }
}
