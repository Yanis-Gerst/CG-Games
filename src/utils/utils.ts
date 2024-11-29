import { Scene, SceneLoader } from "@babylonjs/core";

export const baseKeys = ["z", "q", "d", "s", "a"] as const;

export const importModel = async (scene: Scene, fileName: string) => {
  return await SceneLoader.ImportMeshAsync(
    "",
    "./src/models/",
    fileName,
    scene
  );
};
