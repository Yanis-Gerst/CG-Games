import {
  AbstractMesh,
  ISceneLoaderAsyncResult,
  Vector3,
} from "@babylonjs/core";

export class GameObject {
  model: ISceneLoaderAsyncResult;
  root: AbstractMesh;

  constructor(model: ISceneLoaderAsyncResult) {
    this.model = model;
    this.model.animationGroups.forEach((animation) => animation.stop());
    console.log(this.model.animationGroups);
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

  playAnimation(name: string) {
    const animation = this.getAnimation(name);
    animation.play();
  }

  stopAnimation(name: string) {
    const animation = this.getAnimation(name);
    animation.stop();
  }
}
