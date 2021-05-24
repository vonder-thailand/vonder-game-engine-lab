import { createContext, useContext, useEffect, useRef, useState } from "react";
import AppAudio from "../Classes/AppAudio";
import UpdateRatio from "./UpdateRatio";

const AppContext = createContext(null);

function useWindowSize(scene) {
  const [windowSize, setWindowSize] = useState({
    width: 0,
    height: 0,
    maxWidth: 0,
    maxHeight: 0,
  });

  useEffect(() => {
    function handleResize() {
      setWindowSize({
        width: window.innerWidth,
        height:
          window.innerHeight <= window.innerWidth * 0.5625
            ? window.innerHeight
            : window.innerWidth * 0.5625,
        maxWidth: window.innerHeight * 1.7778,
        maxHeight: window.innerWidth * 0.5625,
      });
    }

    // Add event listener
    window.addEventListener("resize", handleResize);

    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, [scene]);

  return windowSize;
}
function AppProvider({ children }) {
  const gameRef = useRef({});
  const audioRef = useRef(new AppAudio());
  const updateRatioRef = useRef(new UpdateRatio());
  const size = useWindowSize();
  const [width, setWidth] = useState(size.width);
  const [height, setHeight] = useState(size.height);

  const [maxWidth, setMaxWidth] = useState(size.maxWidth);
  const [maxHeight, setMaxHeight] = useState(size.maxHeight);

  useEffect(() => {
    if (size) {
      setWidth(size.width);
      setHeight(size.height);
      setMaxWidth(size.maxWidth);
      setMaxHeight(size.maxHeight);
    }
  }, [size]);

  return (
    <AppContext.Provider
      value={{
        gameRef,
        audioRef,
        updateRatioRef,
        width,
        height,
        maxWidth,
        maxHeight,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

const useAppContext = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error("Error AppContext undefined");
  }
  return context;
};

export { AppContext, AppProvider, useAppContext };
