import { Game } from "../../Game";
import { Units } from "../../shared/GameObject/Units/Units";
import { ObservableProvider } from "../../shared/Observable/Observable";
import { XpMaterials } from "./XpMaterials";

export class XpMaterialsSpawner {
  private game: Game;
  private xpMaterials: XpMaterials[];
  private xpPickedObserver: ObservableProvider;
  constructor(game: Game) {
    this.game = game;
    this.xpMaterials = [];
    this.xpPickedObserver = new ObservableProvider();
  }

  setupXpPickedObserver() {
    this.xpPickedObserver.subscribe((xpMaterials: XpMaterials) => {
      this.xpMaterials = this.xpMaterials.filter(
        (xpMaterial) => xpMaterial.getId() !== xpMaterials.getId()
      );
    });
  }

  setupXpSpwanOnDeadOf(observer: ObservableProvider) {
    observer.subscribe((unit: Units) => {
      this.spawnXpMaterials(unit);
    });
  }

  spawnXpMaterials(unit: Units) {
    const xpMaterials = new XpMaterials(
      this.game,
      unit.model.getPosition(),
      unit.getStatistical().maxHp * 10,
      this.xpPickedObserver
    );
    this.xpMaterials.push(xpMaterials);
  }
}
