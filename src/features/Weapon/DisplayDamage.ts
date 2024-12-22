import {
  CreatePlane,
  DynamicTexture,
  Mesh,
  StandardMaterial,
  Vector3,
} from "@babylonjs/core";
import { Game } from "../../Game";

export class DisplayDamage {
  private game: Game;
  constructor(game: Game) {
    this.game = game;
  }

  public displayDamage(damage: number, spawnPosition: Vector3) {
    const plane = CreatePlane(
      "damage-text",
      {
        width: 10,
        height: 10,
      },
      this.game.getScene()
    );
    plane.billboardMode = Mesh.BILLBOARDMODE_ALL;
    const textPosition = new Vector3(
      spawnPosition.x,
      spawnPosition.y + 2,
      spawnPosition.z
    );
    plane.position = textPosition;

    const dynamicTexture = new DynamicTexture(
      "damage-texture",
      { width: 256, height: 128 },
      this.game.getScene(),
      true
    );

    const material = new StandardMaterial(
      "damage-material",
      this.game.getScene()
    );

    material.alpha = 1;
    material.diffuseTexture = dynamicTexture;
    material.opacityTexture = dynamicTexture;
    material.backFaceCulling = false;
    plane.material = material;

    dynamicTexture.drawText(
      damage.toString(),
      null,
      null,
      "bold 24px Arial",
      "white",
      "",
      true
    );

    setTimeout(() => {
      plane.dispose();
    }, 1000);
  }
}
