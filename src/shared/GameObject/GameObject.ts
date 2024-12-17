import { Vector3 } from "@babylonjs/core";
import { Game } from "../../Game";
import { IModel } from "../Models/interface";

export class GameObject {
  game: Game;
  model: IModel;

  constructor(model: IModel, game: Game) {
    this.model = model;
    this.game = game;
  }

  setPosition(position: Vector3) {
    this.model.setPosition(position);
  }

  private getAnimation(name: string) {
    return this.model.getAnimation(name);
  }

  getGame() {
    return this.game;
  }

  playAnimation(name: string) {
    const animation = this.getAnimation(name);
    if (!animation)
      throw new Error(`Can't find animation with the name ${name}`);
    this.model.playAnimation(name);
  }

  stopAnimation(name: string) {
    const animation = this.getAnimation(name);
    if (!animation)
      throw new Error(`Can't find animation with the name ${name}`);
    this.model.stopAnimation(name);
  }
}
