import {
  ActionManager,
  ArcFollowCamera,
  Color3,
  Engine,
  HemisphericLight,
  MeshBuilder,
  Scene,
  SceneLoader,
  StandardMaterial,
  TargetCamera,
  Vector3,
} from "@babylonjs/core";
import { Controller } from "./shared/InputsManager/Controllers";
import { PlayableCharacter } from "./features/PlayableCharacter/PlayableCharacter";
import { Ennemy } from "./features/Ennemy/Ennemy";

const PLAYER_MODEL = "Player.glb";

export class Game {
  canvas: HTMLCanvasElement;
  engine: Engine;
  scene: Scene;
  controller: Controller;
  player!: PlayableCharacter;
  camera!: TargetCamera;

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
    this.engine = new Engine(canvas, true);
    this.scene = new Scene(this.engine);
    this.scene.actionManager = new ActionManager(this.scene);
    this.controller = new Controller(this);
  }

  async init() {
    this.createBaseScene();
    await this.createPlayer();
    await this.createEnnemy();
    this.cameraSetup();
    this.initRenderLoop();
    this.initController();
  }

  async createEnnemy() {
    new Ennemy(
      await SceneLoader.ImportMeshAsync(
        null,
        "./src/features/Ennemy/models/",
        "Player.glb",
        this.scene
      ),
      this
    );
  }

  createBaseScene() {
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
      await SceneLoader.ImportMeshAsync(
        null,
        "./src/features/PlayableCharacter/models/",
        PLAYER_MODEL,
        this.scene
      ),
      this
    );
    this.player.initCommands();
  }

  cameraSetup() {
    this.camera = new ArcFollowCamera(
      "camera",
      -Math.PI / 2,
      Math.PI / 4,
      60,
      this.player.root,
      this.scene
    );
    this.camera.attachControl(this.canvas, true);
  }

  initRenderLoop() {
    this.engine.runRenderLoop(() => {
      this.scene.render();
    });
    window.addEventListener("resize", () => {
      this.engine.resize();
    });
  }

  initController() {
    this.controller.handleCommands();
  }

  getScene() {
    return this.scene;
  }

  getController() {
    return this.controller;
  }

  getPlayer() {
    return this.player;
  }
}
