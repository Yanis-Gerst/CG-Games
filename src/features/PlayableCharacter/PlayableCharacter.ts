import { MovableKeys } from "../../shared/InputsManager/MovableKeys";
import { IDirection } from "../../shared/utils/type";
import { PlayerAnimation } from "./PlayerAnimation";
import { IWeapon } from "../Weapon/Weapon";
import { IModel } from "../../shared/Models/interface";
import { Units } from "../../shared/GameObject/Units/Units";
import { playerBaseStats } from "./playerBaseStats";
import { MagicWand } from "../Weapon/MagicWand/MagicWand";
import { LevelSystem } from "../LevelSystem/LevelSystem";
import { Vector3 } from "@babylonjs/core/Maths/math.vector";
import { getDistanceBetween } from "../../shared/utils/utils";
import {
  createModelFactory,
  ModelFactory,
} from "../../shared/Models/ModelsFactory";
import { Game } from "../../Game";

interface PlayerCharacterState {
  isInvincible: boolean;
  invincibleTime: number;
}

let modelPlayerFactory: ModelFactory;

const setupModel = (model: IModel) => {
  model
    .getRoot()
    .setBoundingInfo(model.getRoot().getChildMeshes()[0].getBoundingInfo());
  model.getRoot().showBoundingBox = true;
};

createModelFactory("./src/features/PlayableCharacter/models/Player.glb").then(
  (modelFactory) => {
    modelFactory.setGetSetup(setupModel);
    modelPlayerFactory = modelFactory;
  }
);

export class PlayableCharacter extends Units {
  movableKeys!: MovableKeys;
  currentDirection: IDirection | null = null;
  playerAnimation: PlayerAnimation;
  state: PlayerCharacterState;
  weapon: IWeapon[];
  levelSystem: LevelSystem;
  constructor(game: Game) {
    super(modelPlayerFactory.getModel(), game);
    this.playerAnimation = new PlayerAnimation(this);
    this.weapon = [new MagicWand(game)];
    this.state = {
      isInvincible: false,
      invincibleTime: 200,
    };
    this.getStatistical().setStatistical(playerBaseStats);
    this.levelSystem = new LevelSystem(this);
  }

  initCommands() {
    this.movableKeys = new MovableKeys(this.game, this);
    //TODO: A refaire le controller keyActivation
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

  getDistanceToPlayer(position: Vector3) {
    return getDistanceBetween(this.model.getPosition(), position);
  }

  getState() {
    return this.state;
  }

  getLevelSystem() {
    return this.levelSystem;
  }
}
