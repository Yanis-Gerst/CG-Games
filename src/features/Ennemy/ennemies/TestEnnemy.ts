import { Vector3 } from "@babylonjs/core";
import { Game } from "../../../Game";
import { Ennemy } from "../Ennemy";
import { ModelFactory } from "../../../shared/Models/ModelsFactory";
import { TestEnnemyAnimation } from "./TestEnnemyAnimation";

export let testEnnemyModelFactory: ModelFactory;

window.addEventListener("sceneInit", async (event) => {
  const scene = (event as CustomEvent).detail.scene;
  testEnnemyModelFactory = new ModelFactory(
    "./src/features/Ennemy/models/Player.glb",
    scene
  );
  await testEnnemyModelFactory.init();
  testEnnemyModelFactory.setGetSetup((model) => {
    model
      .getRoot()
      .setBoundingInfo(model.getRoot().getChildMeshes()[0].getBoundingInfo());
  });
});

export class TestEnnemy extends Ennemy {
  private testEnnemynimation: TestEnnemyAnimation;
  constructor(game: Game, initialPosition: Vector3) {
    super(testEnnemyModelFactory.getModel(), game, initialPosition);
    this.testEnnemynimation = new TestEnnemyAnimation(this);

    this.testEnnemynimation.animate();
  }
}
