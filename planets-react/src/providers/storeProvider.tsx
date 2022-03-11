import React, { createContext, useContext, useState } from "react";
import { Planet } from "../api/planets/get/types";

type State = {
  planets: Planet[];
};

export const initialState: State = Object.freeze({
  planets: [],
});

const StoreStateContext = createContext<
  [State, React.Dispatch<React.SetStateAction<State>>]
>([initialState, () => {}]);

const StoreProvider = ({
  children,
}: {
  children: import("react").ReactNode;
}) => {
  const state = useState(initialState);

  return (
    <StoreStateContext.Provider value={state}>
      {children}
    </StoreStateContext.Provider>
  );
};

function useStoreState() {
  const context = useContext(StoreStateContext);
  if (context === undefined) {
    throw new Error("useStoreState must be used within a StoreProvider");
  }

  return context;
}

export { StoreProvider, useStoreState };
