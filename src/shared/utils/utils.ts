import { Scene, SceneLoader, Vector3 } from "@babylonjs/core";

export const baseKeys = ["z", "q", "d", "s", "a"] as const;

export const importModel = async (scene: Scene, fileName: string) => {
  return await SceneLoader.ImportMeshAsync(
    "",
    "./src/models/",
    fileName,
    scene
  );
};

export const getDistanceBetween = (position1: Vector3, position2: Vector3) => {
  return Math.abs(Vector3.Distance(position1, position2));
};
