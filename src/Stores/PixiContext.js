import { createContext, useContext, useState } from "react";

const initialContext = {
  transparent: true,
  backgroundColor: null,
  antialias: false,
  autoDensity: false,
  sharedTicker: true,
  sharedLoader: true,
};

const getDevicePixelRatio = (d) => {
  if (window) {
    const dpi = window.devicePixelRatio;
    if (dpi > 0) return dpi;
  }
  return d;
};

const PixiContext = createContext(initialContext);

const PixiProvider = ({ children }) => {
  const pixiContext = useContext(PixiContext);
  const [resolution, setResolution] = useState(getDevicePixelRatio(1));
  return (
    <PixiContext.Provider value={{ ...pixiContext, resolution, setResolution }}>
      {children}
    </PixiContext.Provider>
  );
};

export { PixiContext, PixiProvider };
