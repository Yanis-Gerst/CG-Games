import {
  ActionManager,
  ArcFollowCamera,
  Color3,
  Engine,
  HavokPlugin,
  HemisphericLight,
  IPhysicsCollisionEvent,
  MeshBuilder,
  Observable,
  Scene,
  SceneLoader,
  StandardMaterial,
  TargetCamera,
  Vector3,
} from "@babylonjs/core";
import HavokPhysics from "@babylonjs/havok";
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
  physicsPlugin!: HavokPlugin;
  collisionObservable!: Observable<IPhysicsCollisionEvent>;

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
    this.engine = new Engine(canvas, true);
    this.scene = new Scene(this.engine);
    this.scene.actionManager = new ActionManager(this.scene);
    this.controller = new Controller(this);
  }

  async init() {
    this.createBaseScene();
    await this.initPhysics();
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
      this,
      new Vector3(15, this.getPlayer().root.position.y, 15)
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

  getCollisionObservable() {
    return this.collisionObservable;
  }
}
