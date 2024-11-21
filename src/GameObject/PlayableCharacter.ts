import { ISceneLoaderAsyncResult, Scene } from "@babylonjs/core";
import { Controller } from "../InputsManager/controllers";
import { GameObject } from "./GameObject";
import { MovableKeys } from "../InputsManager/MovableKeys";

export class PlayableCharacter extends GameObject {
  controller: Controller;
  movableKeys: MovableKeys;

  constructor(model: ISceneLoaderAsyncResult, scene: Scene) {
    super(model);
    this.controller = new Controller(scene);
    this.movableKeys = new MovableKeys(this, this.controller, scene);
    this.controller.registerKeyActivation(scene.actionManager);
    this.movableKeys.setupMovementOnKeyPress();
    this.movableKeys.setupAnimationOnPlayerMouvement();
  }
}
