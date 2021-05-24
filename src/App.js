import "./App.css";
import Laboratory from "./Components/Laboratory";
import { AppProvider } from "./Stores/AppContext";
import { PixiProvider } from "./Stores/PixiContext";
import { LaboratoryProvider } from "./Stores/LaboratoryContext";
import PixiApp from "./Components/PixiApp";
import GameContent from "./Game/PixiCores/GameContent";

function App() {
  return (
    <AppProvider>
      <PixiProvider>
        <PixiApp content={GameContent} />
      </PixiProvider>
      <LaboratoryProvider>
        <Laboratory></Laboratory>
      </LaboratoryProvider>
    </AppProvider>
  );
}

export default App;
