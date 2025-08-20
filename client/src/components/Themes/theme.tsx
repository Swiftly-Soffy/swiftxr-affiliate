
import { useState } from "react";
import { createTheme, ThemeProvider } from "@mui/material";
import type { ReactNode } from "react";

const THEME_SETTINGS_LIGHT = createTheme({
  typography: {
    fontFamily: "'Inter', sans-serif",
    fontSize: 14,
  },
  palette: {
    mode: "light",
    primary: {
      main: "#0084e3",
    },
    secondary: {
      main: "#e47094",
    },
    text: {
      primary: '#1b1b1b',
      secondary: '#43001B',
      //@ts-expect-error neutral
      neutral: '#ffffff'
    },
    background: {
      default: '#FFFFFF',
      paper: '#FFE1EE',
      //@ts-expect-error neutral
      neutral: "#FFF8FB"
    },
    action: {
      active: '#1b1b1b',
    },
  },
});

const THEME_SETTINGS_DARK = createTheme({
  typography: {
    fontFamily: "'Inter', sans-serif",
    fontSize: 14,
  },
  palette: {
    mode: "dark",
    primary: {
      // main: "#0084e3",
      main: "#f3f3f3",
      // main: "#f9eef6",
    },
    secondary: {
      main: "#e47094",
    },
    text: {
      primary: '#f3f3f3',
      secondary: '#CECECE',
    },
    background: {
      default: '#1b1b1b',
      paper: "#FCF6F8",
      //@ts-expect-error neutral
      neutral: "#323232"
    },
    action: {
      active: '#f3f3f3',
    },
  },
});

function AppThemeProvider({ children, mode }: {
  children: ReactNode
  mode?: string
}) {

  const [panelTheme] = useState(mode || "dark");

  return (
    <ThemeProvider theme={panelTheme === "dark" ? THEME_SETTINGS_DARK : THEME_SETTINGS_LIGHT} >
      {children}
    </ThemeProvider>
  )

}

export { AppThemeProvider }