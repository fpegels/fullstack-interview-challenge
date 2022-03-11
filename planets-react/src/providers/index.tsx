import { StoreProvider } from "./storeProvider";

export const Providers: import("react").FunctionComponent = ({ children }) => {
  return <StoreProvider>{children}</StoreProvider>;
};
