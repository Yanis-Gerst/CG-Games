import { ISceneLoaderAsyncResult } from "@babylonjs/core";
import { GameObject } from "../../shared/GameObject";
import { MovableKeys } from "../../shared/InputsManager/MovableKeys";
import { Game } from "../../Game";
import { IDirection } from "../../shared/utils/type";
import { PlayerAnimation } from "./PlayerAnimation";

export class PlayableCharacter extends GameObject {
  movableKeys!: MovableKeys;
  speed = 0.5;
  invincibleTime = 200;
  isMoving = false;
  hp: number;
  isInvincible = false;
  currentDirection: IDirection | null = null;
  playerAnimation: PlayerAnimation;

  constructor(model: ISceneLoaderAsyncResult, game: Game) {
    super(model, game);
    this.playerAnimation = new PlayerAnimation(this);
    this.hp = 100;
    this.root.setBoundingInfo(this.model.meshes[2].getBoundingInfo());
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

  public takeDamage(damage: number) {
    if (this.isInvincible || this.hp <= 0) return;
    this.hp -= damage;
    this.isInvincible = true;
    setTimeout(() => {
      this.isInvincible = false;
    }, this.invincibleTime);
  }
}
