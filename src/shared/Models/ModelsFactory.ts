import { loadAssetContainerAsync, Scene } from "@babylonjs/core";
import { AssetContainer } from "@babylonjs/core";
import { IModel } from "./interface";
import { ModelsAssetContainer } from "./ModelsAssetContainer";

export class ModelFactory {
  static assetNumber = 0;
  private filePath: string;
  modelContainer!: AssetContainer;
  scene: Scene;
  getSetup: ((model: IModel) => void) | null = null;
  constructor(string: string, scene: Scene) {
    this.filePath = string;
    this.scene = scene;
    ModelFactory.assetNumber++;
  }

  setGetSetup(getSetup: (modelContainer: IModel) => void) {
    this.getSetup = getSetup;
  }

  async init() {
    this.modelContainer = await loadAssetContainerAsync(
      this.filePath,
      this.scene
    );

    const assetLoaded = new CustomEvent("assetLoaded");
    dispatchEvent(assetLoaded);
  }
  getModel(): IModel {
    const model = new ModelsAssetContainer(
      this.modelContainer.instantiateModelsToScene((name) => name)
    );
    if (this.getSetup) this.getSetup(model);
    return model;
  }
}
