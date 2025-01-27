import { Vector3 } from "@babylonjs/core/Maths/math.vector";
import { PickableMaterials } from "../../shared/GameObject/PickableMaterials/PickableMaterials";
import {
  createModelFactory,
  ModelFactory,
} from "../../shared/Models/ModelsFactory";
import { ObservableProvider } from "../../shared/Observable/Observable";
import { Game } from "../../Game";

let xpMaterialsModelFactory: ModelFactory;

createModelFactory("./src/features/Collectible/models/xp_orb.glb").then(
  (modelFactory) => {
    xpMaterialsModelFactory = modelFactory;
  }
);

export class XpMaterials extends PickableMaterials {
  private xpAmount: number;
  private xpPickedObserver: ObservableProvider;
  constructor(
    game: Game,
    initialPosition: Vector3,
    xpAmount: number,
    xpPickedObserver: ObservableProvider
  ) {
    super(xpMaterialsModelFactory.getModel(), game, initialPosition);
    this.xpAmount = xpAmount;
    this.xpPickedObserver = xpPickedObserver;
  }

  public pickUp() {
    super.pickUp();
    this.game.getPlayer().getLevelSystem().gainXp(this.xpAmount);
    this.xpPickedObserver.notify(this);
  }
}
