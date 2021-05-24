import { createContext, useContext } from "react";

const LaboratoryContext = createContext(null);

function LaboratoryProvider({ children }) {
  return <LaboratoryContext.Provider>{children}</LaboratoryContext.Provider>;
}

const useLaboratoryContext = () => {
  const context = useContext(LaboratoryContext);
  if (context === undefined) {
    throw new Error("Error LaboratoryContext undefined");
  }
  return context;
};

export { LaboratoryContext, LaboratoryProvider, useLaboratoryContext };
