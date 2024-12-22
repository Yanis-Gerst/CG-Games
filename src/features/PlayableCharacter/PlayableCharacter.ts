import { MovableKeys } from "../../shared/InputsManager/MovableKeys";
import { Game } from "../../Game";
import { IDirection } from "../../shared/utils/type";
import { PlayerAnimation } from "./PlayerAnimation";
import { IWeapon } from "../Weapon/Weapon";
import { IModel } from "../../shared/Models/interface";
import { Units } from "../../shared/GameObject/Units/Units";
import { playerBaseStats } from "./playerBaseStats";
import { MagicWand } from "../Weapon/MagicWand/MagicWand";
import { LevelSystem } from "./LevelSystem";

interface PlayerCharacterState {
  isInvincible: boolean;
  invincibleTime: number;
}

export class PlayableCharacter extends Units {
  movableKeys!: MovableKeys;
  currentDirection: IDirection | null = null;
  playerAnimation: PlayerAnimation;
  state: PlayerCharacterState;
  weapon: IWeapon[];
  levelSystem: LevelSystem;
  constructor(model: IModel, game: Game) {
    super(model, game);
    this.playerAnimation = new PlayerAnimation(this);
    this.weapon = [new MagicWand(game)];
    this.state = {
      isInvincible: false,
      invincibleTime: 200,
    };
    this.getStatistical().setStatistical(playerBaseStats);
    this.levelSystem = new LevelSystem(game, this);
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
      this.getMovingState().setIsMoving(executingCommands.length > 0);
      this.getMovingState().setDirection(
        this.getMovingState().getIsMoving()
          ? executingCommands[0].direction
          : null
      );
      this.playerAnimation.animate();
    });
    this.weapon.forEach((weapon) => weapon.activate());
  }

  public takeDamage(damage: number) {
    if (this.state.isInvincible || this.getStatistical().hp <= 0) return;
    this.getStatistical().hp -= damage;
    this.state.isInvincible = true;
    setTimeout(() => {
      this.state.isInvincible = false;
    }, this.state.invincibleTime);
  }

  getState() {
    return this.state;
  }

  getLevelSystem() {
    return this.levelSystem;
  }
}
