import {
  ActionManager,
  ArcFollowCamera,
  AssetContainer,
  Color3,
  Engine,
  HavokPlugin,
  HemisphericLight,
  IPhysicsCollisionEvent,
  MeshBuilder,
  Observable,
  Scene,
  StandardMaterial,
  TargetCamera,
  Vector3,
} from "@babylonjs/core";
import HavokPhysics from "@babylonjs/havok";
import { Controller } from "./shared/InputsManager/Controllers";
import { PlayableCharacter } from "./features/PlayableCharacter/PlayableCharacter";
import { Ennemy } from "./features/Ennemy/Ennemy";
import { EnnemySpawner } from "./features/EnnemySpanwer/EnnemySpawner";
import { testEnnemyModelFactory } from "./features/Ennemy/TestEnnemy/TestEnnemy";
import { ModelFactory } from "./shared/Models/ModelsFactory";

export class Game {
  canvas: HTMLCanvasElement;
  engine: Engine;
  scene: Scene;
  controller: Controller;
  player!: PlayableCharacter;
  camera!: TargetCamera;
  ennemySpawner!: EnnemySpawner;
  physicsPlugin!: HavokPlugin;
  collisionObservable!: Observable<IPhysicsCollisionEvent>;
  assetContainer!: AssetContainer;

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
    this.engine = new Engine(canvas, true);
    this.scene = new Scene(this.engine);
    this.scene.actionManager = new ActionManager(this.scene);
    this.controller = new Controller(this);
  }

  async init() {
    this.createBaseScene();
    console.log("Load assets");
    await this.importAsset();
    console.log("Assets loaded");
    await this.initPhysics();
    await this.createPlayer();
    await this.createEnnemy();
    this.cameraSetup();
    this.initRenderLoop();
    this.initController();
  }

  async importAsset() {
    return new Promise((resolve) => {
      let assetLoaded = 0;
      window.addEventListener("assetLoaded", () => {
        assetLoaded++;
        if (assetLoaded === ModelFactory.assetNumber) {
          resolve(true);
        }
      });
    });
  }

  async createEnnemy() {
    this.ennemySpawner = new EnnemySpawner(this);
    setTimeout(() => {
      this.ennemySpawner.spawnEnnemy(1);
    }, 1000);
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
    this.assetContainer = new AssetContainer(this.scene);
    const sceneInitEvent = new CustomEvent("sceneInit", {
      detail: { scene: this.scene, assetContainer: this.assetContainer },
    });
    dispatchEvent(sceneInitEvent);
  }

  async createPlayer() {
    this.player = new PlayableCharacter(
      testEnnemyModelFactory.getModel(),
      this
    );
    this.player.initCommands();
  }

  async initPhysics() {
    var gravityVector = new Vector3(0, -9.81, 0);
    const havokInstance = await HavokPhysics();
    this.physicsPlugin = new HavokPlugin(true, havokInstance);
    this.scene.enablePhysics(gravityVector, this.physicsPlugin);
    this.collisionObservable = this.physicsPlugin.onCollisionObservable;
  }

  cameraSetup() {
    this.camera = new ArcFollowCamera(
      "camera",
      -Math.PI / 2,
      Math.PI / 4,
      50,
      this.player.model.getRoot(),
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

  getCollisionObservable() {
    return this.collisionObservable;
  }

  getEnnemySpawner() {
    return this.ennemySpawner;
  }
}
