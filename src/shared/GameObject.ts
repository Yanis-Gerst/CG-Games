import {
  AbstractMesh,
  ISceneLoaderAsyncResult,
  Vector3,
} from "@babylonjs/core";
import { Game } from "../Game";

export class GameObject {
  model: ISceneLoaderAsyncResult;
  root: AbstractMesh;
  game: Game;

  constructor(model: ISceneLoaderAsyncResult, game: Game) {
    this.model = model;
    this.game = game;
    this.model.animationGroups.forEach((animation) => animation.stop());
    this.root = this.model.meshes[0];
  }

  setPosition(position: Vector3) {
    this.root.position = position;
  }

  private getAnimation(name: string) {
    const animation = this.model.animationGroups.find(
      (animationGroup) => animationGroup.name === name
    );
    if (!animation)
      throw new Error(`Can't find animation with the name ${name}`);
    return animation;
  }

  getGame() {
    return this.game;
  }

  playAnimation(name: string) {
    const animation = this.getAnimation(name);
    animation.play();
  }

  stopAnimation(name: string) {
    const animation = this.getAnimation(name);
    animation.stop();
  }
}
