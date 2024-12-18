import { Vector3 } from "@babylonjs/core";
import { Game } from "../../../Game";
import { Ennemy } from "../Ennemy";
import {
  createModelFactory,
  ModelFactory,
} from "../../../shared/Models/ModelsFactory";
import { TestEnnemyAnimation } from "./TestEnnemyAnimation";
import { IModel } from "../../../shared/Models/interface";
import { ennemyBaseStats } from "./ennemyBaseStats";
export let testEnnemyModelFactory: ModelFactory;

const setupModel = (model: IModel) => {
  model
    .getRoot()
    .setBoundingInfo(model.getRoot().getChildMeshes()[0].getBoundingInfo());
  model.getRoot().showBoundingBox = true;
};

createModelFactory("./src/features/Ennemy/models/Player.glb").then(
  (modelFactory) => {
    modelFactory.setGetSetup(setupModel);
    testEnnemyModelFactory = modelFactory;
  }
);

export class TestEnnemy extends Ennemy {
  private testEnnemynimation: TestEnnemyAnimation;
  constructor(game: Game, initialPosition: Vector3) {
    super(testEnnemyModelFactory.getModel(), game, initialPosition);
    this.testEnnemynimation = new TestEnnemyAnimation(this);
    this.getStatistical().setStatistical(ennemyBaseStats);
    this.testEnnemynimation.animate();
  }
}
