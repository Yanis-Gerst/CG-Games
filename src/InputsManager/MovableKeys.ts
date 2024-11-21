import { Scene } from "@babylonjs/core";
import { PlayableCharacter } from "../GameObject/PlayableCharacter";
import { baseKeys } from "../utils/import";
import { Controller } from "./controllers";

const positionUpdateOnKey = {
  z: 1,
  s: -1,
  q: -1,
  d: 1,
};
export class MovableKeys {
  player: PlayableCharacter;
  controller: Controller;
  scene: Scene;

  constructor(player: PlayableCharacter, controller: Controller, scene: Scene) {
    this.player = player;
    this.controller = controller;
    this.scene = scene;
  }

  setupMovementOnKeyPress() {
    baseKeys.forEach((key) => {
      this.controller.onKeyPress(
        this.scene,
        key,
        () => {
          const positionToUpdate = key === "z" || key === "s" ? "z" : "x";
          this.player.root.position[positionToUpdate] +=
            positionUpdateOnKey[key];
        },
        () => {}
      );
    });
  }

  setupAnimationOnPlayerMouvement() {
    this.scene.onBeforeRenderObservable.add(() => {
      if (this.controller.oneKeyIsPress()) {
        console.log("Aniamtion ");
        this.player.playAnimation("Rotation");
      } else {
        this.player.stopAnimation("Rotation");
      }
    });
  }
}
