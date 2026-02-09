import { useContext } from "react";
import { SongsContext } from "../contexts/SongsContext";

export function useSongs() {
  const context = useContext(SongsContext);
  if (!context) {
    throw new Error("useSongs should be use inside SongsProvider");
  }
  return context;
}
