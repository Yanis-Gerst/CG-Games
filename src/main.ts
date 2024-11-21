import "./style.css";
import {
  ActionManager,
  ArcRotateCamera,
  Color3,
  Engine,
  HemisphericLight,
  MeshBuilder,
  Scene,
  StandardMaterial,
  Vector3,
} from "@babylonjs/core";
import { registerBuiltInLoaders } from "@babylonjs/loaders/dynamic";
import { importModel } from "./utils/import";
import { PlayableCharacter } from "./GameObject/PlayableCharacter";
registerBuiltInLoaders();

const canvas = document.getElementById("renderCanvas") as HTMLCanvasElement; // Get the canvas element
if (!canvas)
  throw new Error("Need to create an cava element the id renderCanvas");
const engine = new Engine(canvas, true); // Generate the BABYLON 3D engine

const createScene = async function () {
  const scene = new Scene(engine);

  const camera = new ArcRotateCamera(
    "camera",
    -Math.PI / 2,
    Math.PI / 2.5,
    15,
    new Vector3(0, 0, 0)
  );
  camera.attachControl(canvas, true);
  new HemisphericLight("light", new Vector3(0, 1, 0));

  scene.actionManager = new ActionManager(scene);

  const player = new PlayableCharacter(
    await importModel(scene, "Player.glb"),
    scene
  );
  camera.setTarget(player.root);

  //Ground
  const groundMat = new StandardMaterial("groundMat");
  groundMat.diffuseColor = Color3.FromHexString("#7c7f7a");
  const ground = MeshBuilder.CreateGround("ground", {
    width: 100,
    height: 100,
  });

  ground.material = groundMat;

  return scene;
};

const scene = await createScene(); //Call the createScene function

// Register a render loop to repeatedly render the scene
engine.runRenderLoop(function () {
  scene.render();
});

// Watch for browser/canvas resize events
window.addEventListener("resize", function () {
  engine.resize();
});
