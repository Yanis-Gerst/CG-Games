import { Mesh } from "@babylonjs/core";
import { Vector3 } from "@babylonjs/core/Maths/math.vector";

export interface IModel {
  getPosition(): Vector3;
  setPosition(position: Vector3): void;
  getAnimation(name: string): IAnimation;
  playAnimation(name: string): void;
  stopAnimation(name: string): void;
  getRoot(): Mesh;
}

export interface IAnimation {
  name: string;
  play(): void;
  stop(): void;
}
