import { Game } from "../Game";

export const createGameHTML = () => {
  const app = document.getElementById("app") as HTMLDivElement;
  app.innerHTML = `
    <canvas
        id="renderCanvas"
        class="w-screen h-screen"
        touch-action="none"
    ></canvas>
    <div
        id="levelDisplay"
        style="
            position: absolute;
            top: 80px;
            left: 20px;
            width: 200px;
            height: 20px;
            color: white;
            font-size: 16px;
            font-weight: bold;
        "
    >
        Level: <span id="level">1</span>
    </div>
    <div
        id="healthBar"
        style="
            position: absolute;
            top: 20px;
            left: 20px;
            width: 200px;
            height: 20px;
            background-color: #333;
            border: 2px solid #000;
        "
    >
        <div
            id="health"
            style="width: 100%; height: 100%; background-color: #00ff00"
        ></div>
    </div>
    <div
        id="xpBar"
        style="
            position: absolute;
            top: 50px;
            left: 20px;
            width: 200px;
            height: 20px;
            background-color: #333;
            border: 2px solid #000;
        "
    >
        <div
            id="xp"
            style="width: 0%; height: 100%; background-color: #0088ff"
        ></div>
    </div>
  </div>
    `;
};

export const initGameAndHandleUI = () => {
  const canvas = document.getElementById("renderCanvas") as HTMLCanvasElement;
  const health = document.getElementById("health") as HTMLDivElement;
  const xp = document.getElementById("xp") as HTMLDivElement;
  const levelDisplay = document.getElementById(
    "levelDisplay"
  ) as HTMLDivElement;
  if (!canvas)
    throw new Error("Need to create an cava element the id renderCanvas");

  const game = new Game(canvas);
  game.init().then(() => {
    game.getScene().onBeforeRenderObservable.add(() => {
      const percentage =
        (game.getPlayer().getStatistical().hp /
          game.getPlayer().getStatistical().maxHp) *
        100;
      health.style.width = `${percentage}%`;
    });

    game.getScene().onBeforeRenderObservable.add(() => {
      const percentage =
        (game.getPlayer().getLevelSystem().getXp() /
          game.getPlayer().getLevelSystem().getMaxXp()) *
        100;
      xp.style.width = `${percentage}%`;
      levelDisplay.innerHTML = `Level: ${game
        .getPlayer()
        .getLevelSystem()
        .getLevel()}`;
    });
  });
};
