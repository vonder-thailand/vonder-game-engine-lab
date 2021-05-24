// import * as PIXI from "pixi.js";

const GameContent = (app, gameRef, audioRef, updateRatioRef) => {
  const onMainResize = (width, height) => {
    // TODO: resize game container at here
  };
  const onRelease = () => {
    updateRatioRef.current.remove(onMainResize);
    console.warn("pixi released");
  };

  return [app, onRelease];
};

export default GameContent;
