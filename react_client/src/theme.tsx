import { createContext, useState, useMemo } from "react";
import { createTheme } from "@mui/material/styles";

export const themeSettings = (mode: any) => {
    return {
      palette: {
        mode: mode
      },
    };
  };

// context for color mode
export const ColorModeContext = createContext({
  toggleColorMode: () => {},
});

export const useMode = () => {
  const [mode, setMode] = useState("dark");

  const colorMode = useMemo(
    () => ({
      toggleColorMode: () =>
        setMode((prev) => (prev === "light" ? "dark" : "light")),
    }),
    []
  );

  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);
  return [theme, colorMode];
};
