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
import { PlayableCharacter } from "./GameObject/PlayableCharacter";
import { importModel } from "./utils/utils";

const PLAYER_MODEL = "Player.glb";

export class Game {
  canvas: HTMLCanvasElement;
  engine: Engine;
  scene: Scene;
  player!: PlayableCharacter;
  camera!: ArcRotateCamera;

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
    this.engine = new Engine(canvas, true);
    this.scene = new Scene(this.engine);
    this.scene.actionManager = new ActionManager(this.scene);
  }

  async init() {
    this.createBaseScene();
    await this.createPlayer();
    this.cameraSetup();
    this.initRenderLoop();
  }

  createBaseScene() {
    //TODO: Faire une classe appart
    new HemisphericLight("light", new Vector3(0, 1, 0));

    const groundMat = new StandardMaterial("groundMat");
    groundMat.diffuseColor = Color3.FromHexString("#7c7f7a");
    const ground = MeshBuilder.CreateGround("ground", {
      width: 100,
      height: 100,
    });

    ground.material = groundMat;
  }

  async createPlayer() {
    this.player = new PlayableCharacter(
      await importModel(this.scene, PLAYER_MODEL),
      this
    );
  }

  cameraSetup() {
    this.camera = new ArcRotateCamera(
      "camera",
      -Math.PI / 2,
      Math.PI / 2.5,
      15,
      new Vector3(0, 0, 0)
    );
    this.camera.attachControl(this.canvas, true);
    this.camera.setTarget(this.player.root);
  }

  initRenderLoop() {
    this.engine.runRenderLoop(() => {
      this.scene.render();
    });
    window.addEventListener("resize", () => {
      this.engine.resize();
    });
  }

  getScene() {
    return this.scene;
  }
}
