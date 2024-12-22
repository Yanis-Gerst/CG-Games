import { Observer, Scene, Vector3 } from "@babylonjs/core";
import { Game } from "../../../Game";
import { IModel } from "../../Models/interface";
import { GameObject } from "../GameObject";

export class PickableMaterials extends GameObject {
  private pickedObserver: Observer<Scene>;
  constructor(model: IModel, game: Game, initialPosition: Vector3) {
    super(model, game);
    this.model.setPosition(initialPosition);
    this.pickedObserver = this.handlePickability();
  }

  handlePickability() {
    // TODO: Use pick up range of player
    const range = 1;
    return this.game.getScene().onBeforeRenderObservable.add(() => {
      const distance = this.game
        .getPlayer()
        .getDistanceToPlayer(this.model.getPosition());
      if (distance <= range) {
        this.pickUp();
      }
    });
  }
  public pickUp() {
    this.pickedObserver.remove();
    this.model.getRoot().dispose();
    return;
  }
}
