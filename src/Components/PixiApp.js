import { useState, useContext, useEffect, useRef } from "react";
import * as PIXI from "pixi.js";
import { AppContext } from "../Stores/AppContext";
import { PixiContext } from "../Stores/PixiContext";

const createPixiApp = (view, options) => {
  PIXI.utils.skipHello();
  const newOptions = { ...options, view };
  let app = new PIXI.Application(newOptions);
  return app;
};

const PixiApp = ({ content }) => {
  const {
    width,
    height,
    maxWidth,
    maxHeight,
    audioRef,
    updateRatioRef,
    gameRef,
  } = useContext(AppContext);
  const pixiContext = useContext(PixiContext);
  const { resolution } = pixiContext;
  const viewRef = useRef();
  const appRef = useRef();
  const [initialOption] = useState({
    ...pixiContext,
    width,
    height,
  });

  useEffect(() => {
    if (appRef.current) {
      console.error(
        "PIXI Application will be reset if context is changed. Please don't change context!"
      );
    } else {
      const [app, onRelease] = content(
        createPixiApp(viewRef.current, initialOption),
        gameRef,
        audioRef,
        updateRatioRef
      );
      appRef.current = app;
      return () => {
        onRelease();
      };
    }
  }, [audioRef, content, gameRef, initialOption, updateRatioRef]);

  useEffect(() => {
    appRef.current.renderer.resolution = resolution;
  }, [resolution]);

  useEffect(() => {
    appRef.current.renderer.resize(width, height);
    updateRatioRef.current.update(width, height);
  }, [width, height, updateRatioRef]);

  return (
    <canvas
      ref={viewRef}
      style={{
        width: width,
        height: height,
        maxWidth: maxWidth,
        maxHeight: maxHeight,
        zIndex: 1,
      }}
    />
  );
};

export default PixiApp;
