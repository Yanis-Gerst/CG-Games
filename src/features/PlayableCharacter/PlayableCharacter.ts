import { AbstractMesh } from "@babylonjs/core";
import { GameObject } from "../../shared/GameObject/GameObject";
import { MovableKeys } from "../../shared/InputsManager/MovableKeys";
import { Game } from "../../Game";
import { IDirection } from "../../shared/utils/type";
import { PlayerAnimation } from "./PlayerAnimation";
import { Weapon } from "../Weapon/Weapon";
import { IModel } from "../../shared/Models/interface";
import { MovingState } from "../../shared/GameObject/MovingState";

export class PlayableCharacter extends GameObject {
  movableKeys!: MovableKeys;
  speed = 0.5;
  invincibleTime = 200;
  movingState: MovingState;
  hp: number;
  isInvincible = false;
  currentDirection: IDirection | null = null;
  playerAnimation: PlayerAnimation;
  weapon: Weapon[];

  constructor(model: IModel, game: Game) {
    super(model, game);
    this.playerAnimation = new PlayerAnimation(this);
    this.hp = 100;
    this.weapon = [new Weapon(game)];
    this.movingState = new MovingState();
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
      this.movingState.setIsMoving(executingCommands.length > 0);
      this.movingState.setDirection(
        this.movingState.getIsMoving() ? executingCommands[0].direction : null
      );
      this.playerAnimation.animate();
    });
    this.weapon.forEach((weapon) => weapon.activate());
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
