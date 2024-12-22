import { ISceneLoaderAsyncResult, Scene, SceneLoader } from "@babylonjs/core";

export class Map {
  private scene: Scene;
  private mapModel!: ISceneLoaderAsyncResult;
  constructor(scene: Scene) {
    this.scene = scene;
  }

  async generateMap() {
    this.mapModel = await SceneLoader.ImportMeshAsync(
      null,
      "./src/features/Map/models/",
      "map.glb",
      this.getScene()
    );
  }

  getScene() {
    return this.scene;
  }

  getMapModel() {
    return this.mapModel;
  }
}
