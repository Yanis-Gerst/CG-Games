import { InstantiatedEntries, Mesh, Vector3 } from "@babylonjs/core";
import { IAnimation, IModel } from "./interface";

export class ModelsAssetContainer implements IModel {
  model: InstantiatedEntries;
  root: Mesh;
  constructor(model: InstantiatedEntries) {
    this.model = model;
    this.root = model.rootNodes[0] as Mesh;
    console.log(this.model);
  }

  getRoot(): Mesh {
    return this.root;
  }

  getPosition(): Vector3 {
    return this.root.position;
  }

  setPosition(position: Vector3): void {
    this.root.position = position;
  }

  getAnimation(name: string): IAnimation {
    return this.model.animationGroups.filter(
      (animation) => animation.name === name
    )[0];
  }

  playAnimation(name: string): void {
    this.getAnimation(name)?.play();
  }

  stopAnimation(name: string): void {
    this.getAnimation(name)?.stop();
  }
}
