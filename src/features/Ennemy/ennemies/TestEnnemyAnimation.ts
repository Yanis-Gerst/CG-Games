import { TestEnnemy } from "./TestEnnemy";

export class TestEnnemyAnimation {
  private ennemy: TestEnnemy;
  constructor(ennemy: TestEnnemy) {
    this.ennemy = ennemy;
    this.animate();
  }

  public handleAnimation() {
    if (this.ennemy.getMovingState().getIsMoving()) {
      this.ennemy.playAnimation("Rotation");
    } else {
      this.ennemy.stopAnimation("Rotation");
    }
  }

  public animate() {
    this.ennemy
      .getGame()
      .getScene()
      .onBeforeRenderObservable.add(() => {
        this.handleAnimation();
      });
  }
}
