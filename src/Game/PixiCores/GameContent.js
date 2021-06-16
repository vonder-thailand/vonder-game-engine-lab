import * as PIXI from "pixi.js";
import bunny from "Assets/bunny.png";

const GameContent = (app, gameRef, audioRef, updateRatioRef) => {
  const container = new PIXI.Container();

  app.stage.addChild(container);

  const loader = new PIXI.Loader();
  loader.add("bunny", bunny);
  loader.load((loader, resource) => {
    console.log("resource", resource);
    console.log("resource['bunny']", resource["bunny"]);
  });

  const texture = PIXI.Texture.from(bunny);

  // Create a 5x5 grid of bunnies
  for (let i = 0; i < 100; i++) {
    const bunny = new PIXI.Sprite(texture);
    bunny.anchor.set(0.5);
    bunny.x = (i % 10) * 40;
    bunny.y = Math.floor(i / 10) * 40;
    container.addChild(bunny);
  }

  // Move container to the center
  // container.x = app.renderer.screen.width / 2;
  // container.y = app.renderer.screen.height / 2;

  // Center bunny sprite in local container coordinates
  container.pivot.x = container.width / 2;
  container.pivot.y = container.height / 2;

  // Listen for animate update
  app.ticker.add((delta) => {
    // rotate the container!
    // use delta to create frame-independent transform
    container.rotation -= 0.01 * delta;
  });

  const onMainResize = (width, height) => {
    // TODO: resize game container at here
    container.position.set(width / 2, height / 2);
  };
  updateRatioRef.current.add(onMainResize);
  const onRelease = () => {
    updateRatioRef.current.remove(onMainResize);
    console.warn("pixi released");
  };

  console.log("container", container);
  return [app, onRelease];
};

export default GameContent;
