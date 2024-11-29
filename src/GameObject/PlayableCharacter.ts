import { ISceneLoaderAsyncResult } from "@babylonjs/core";
import { GameObject } from "./GameObject";
import { MovableKeys } from "../InputsManager/MovableKeys";
import { Game } from "../Game";
import { Controller } from "../InputsManager/Controllers";

export class PlayableCharacter extends GameObject {
  controller: Controller;
  movableKeys: MovableKeys;
  speed = 0.3;

  constructor(model: ISceneLoaderAsyncResult, game: Game) {
    super(model);
    this.controller = new Controller(game.scene);
    this.movableKeys = new MovableKeys(game, this.controller);
    this.controller.registerKeyActivation(game.scene.actionManager);
    this.controller.handleCommands();
  }
}
